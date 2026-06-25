console.log('[FigmaCN] content.js loaded');
// 引入翻译数据
// 使用 fetch 方式加载 JSON 格式的翻译数据

async function loadTranslationData() {
  try {
    const response = await fetch(chrome.runtime.getURL('js/translations.json'));

    // 直接解析为 JSON，避免 eval / new Function
    const allData = await response.json();

    initializeTranslation(allData);
  } catch (error) {
    console.error('FigmaCN: Failed to load translation data:', error);
  }
}

// 启动加载
loadTranslationData();

function initializeTranslation(allData) {

  const MutationObserver = window.MutationObserver || window['WebKitMutationObserver'];
  const MutationObserverConfig = {
    childList: true,
    subtree: true,
    attributeFilter: ['data-label'],
    characterData: true
  };

  // 初始化时转换一次翻译数组格式，避免 MutationObserver 触发时重复转换
  const dataMap = new Map();
  const patternEntries = []; // {@} 通配符模式匹配
  allData.forEach(([key, val]) => {
    if (key && !dataMap.has(key)) {
      if (key.includes('{@}')) {
        // 将 {@} 转换为正则捕获组，整串精确匹配
        // 注意顺序：先保护 {@} 再转义，避免花括号先被转义导致 {@} 无法替换
        const escaped = key
          .replace(/\{@\}/g, '\x00HOLDER\x00')
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .replace(/\x00HOLDER\x00/g, '(.+)');
        patternEntries.push({ regex: new RegExp('^' + escaped + '$'), template: val });
      } else {
        dataMap.set(key, val);
      }
    }
  });

  const DOM_NODE_TYPE = {
    TEXT_NODE: 3,
  };

  const DONE_FLAG = 'data-figmacn-done';

  // 跳过区域根节点缓存：记录最近一次判定为"跳过区域"的根节点，避免对其子树反复向上遍历
  let skipRootCache = null;

  // 检测节点是否在代码编辑器内
  function isNodeInCodeEditor(node) {
    let currentElement = node.nodeType === DOM_NODE_TYPE.TEXT_NODE ? node.parentElement : node;

    while (currentElement && currentElement !== document.body) {
      // 跳过非元素节点（如注释节点），它们没有 getAttribute 方法
      if (typeof currentElement.getAttribute !== 'function') {
        return false;
      }
      // 检测 translate="no" 属性 - 这是代码编辑器的标记
      if (currentElement.getAttribute('translate') === 'no') {
        skipRootCache = currentElement; // 缓存命中，子树直接跳过
        return true;
      }

      currentElement = currentElement.parentElement;
    }

    return false;
  }

  function isNodeInVariableNameArea(node) {
    let currentElement = node.nodeType === DOM_NODE_TYPE.TEXT_NODE ? node.parentElement : node;

    while (currentElement && currentElement !== document.body) {
      if (currentElement.classList && currentElement.classList.value.includes('variable_name--root')) {
        skipRootCache = currentElement;
        return true;
      }

      currentElement = currentElement.parentElement;
    }

    return false;
  }

  function shouldSkipTranslation(node) {
    // 命中缓存：当前节点位于上次标记的跳过根节点之内，直接跳过
    if (skipRootCache && skipRootCache.contains(node)) {
      return true;
    }
    return isNodeInCodeEditor(node) || isNodeInVariableNameArea(node);
  }

  // 按 key 长度降序排序，确保兜底精确匹配时长词条优先（避免 "Edu" 先于 "Education" 命中）
  const sortedExactEntries = [...dataMap.entries()].sort((a, b) => b[0].length - a[0].length);

  // 对模式匹配结果再做精确匹配兜底（如 Education→教育版、Jul→7）
  // 仅在模式命中时调用，且只对足够长的英文词条兜底，避免整串里的英文片段被误替
  function applyExactMatches(text) {
    let result = text;
    for (const [exactKey, exactVal] of sortedExactEntries) {
      if (exactKey.length > 3 && result.includes(exactKey)) {
        result = result.replace(exactKey, exactVal);
      }
    }
    return result;
  }

  // 统一的文本翻译入口：精确 -> 模式 -> 编号/旧占位符替换 -> 兜底精确匹配
  // 返回译文（字符串）或 null（未命中）
  function translateText(text) {
    if (text == null) return null;

    if (dataMap.has(text)) {
      return dataMap.get(text);
    }

    if (patternEntries.length === 0) return null;

    for (const { regex, template } of patternEntries) {
      const match = text.match(regex);
      if (!match) continue;

      let result = template;
      const hasNumbered = /\{[1-9]\d*\}/.test(result);
      if (hasNumbered) {
        // 使用编号占位符 {1} {2} {3} ... 支持语序调整
        for (let i = 1; i < match.length; i++) {
          result = result.replace(new RegExp(`\\{${i}\\}`, 'g'), match[i]);
        }
      } else {
        // 兼容旧格式：按顺序替换 {@}
        for (let i = 1; i < match.length; i++) {
          result = result.replace('{@}', match[i]);
        }
      }
      return applyExactMatches(result);
    }

    return null;
  }

  // 翻译文本节点的 textContent（写回前判断已译则跳过，避免自我循环）
  function translateTextNodeContent(node) {
    if (shouldSkipTranslation(node)) return;
    const original = node.textContent;
    const translated = translateText(original);
    if (translated != null && translated !== original) {
      node.textContent = translated;
    }
  }

  // 翻译属性（data-label / placeholder）
  function translateAttribute(node, attr) {
    if (shouldSkipTranslation(node)) return;
    const raw = node.getAttribute(attr);
    if (!raw) return;
    // placeholder 允许首尾空白，匹配用 trimmed，写回用译文
    const key = attr === 'placeholder' ? raw.trim() : raw;
    const translated = translateText(key);
    if (translated != null && translated !== raw) {
      node.setAttribute(attr, translated);
    }
  }

  // 翻译 Figma 自定义 <i18n-text> 元素（其文字在 textContent，不在属性中）
  function translateI18nText(el) {
    if (shouldSkipTranslation(el)) return;
    if (el.hasAttribute && el.hasAttribute(DONE_FLAG)) return;
    const original = el.textContent;
    const translated = translateText(original);
    if (translated != null && translated !== original) {
      el.textContent = translated;
    }
    if (el.setAttribute) el.setAttribute(DONE_FLAG, '');
  }

  // 对单个节点及其子树做局部 TreeWalker 翻译
  function translateSubtree(root) {
    const treeWalker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_ALL,
      {
        acceptNode: function (node) {
          /**
           * [issue](https://github.com/Figma-Cool/figmaCN/issues/143)
           *
           * 跳过 local variable 设置面板中的名称节点，避免 local variable 里面的名称被翻译
           */
          const nodeUnderVariableInput = node.classList && node.classList.value.includes('variable_name--root');
          if (nodeUnderVariableInput) {
            // 这个节点以下的子节点（包括该节点）全部过滤掉
            return NodeFilter.FILTER_REJECT;
          }

          const nodeIsTextNode = node.nodeType === DOM_NODE_TYPE.TEXT_NODE;

          /**
           * 跳过代码编辑器中的内容，避免代码关键字如 export 被翻译
           * 只在文本节点和元素节点上调用 isNodeInCodeEditor，其他节点类型（注释、脚本等）没有 getAttribute 方法
           */
          if (nodeIsTextNode || typeof node.hasAttribute === 'function') {
            if (shouldSkipTranslation(node)) {
              return NodeFilter.FILTER_REJECT;
            }
          }

          if (nodeIsTextNode) return NodeFilter.FILTER_ACCEPT;

          if (typeof node.hasAttribute !== 'function') return NodeFilter.FILTER_SKIP;

          // 接受 Figma <i18n-text> 元素以便翻译其内文
          if (node.tagName === 'I18N-TEXT') return NodeFilter.FILTER_ACCEPT;

          const nodeHasTargetTextAttribute = node.hasAttribute('data-label') || node.hasAttribute('placeholder');
          return nodeHasTargetTextAttribute
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        }
      },
      false
    );

    let currentNode = treeWalker.currentNode;
    while (currentNode) {
      if (currentNode.nodeType === DOM_NODE_TYPE.TEXT_NODE) {
        // 在替换前再检查一次是否在代码编辑器内
        translateTextNodeContent(currentNode);
      } else if (typeof currentNode.hasAttribute === 'function') {
        // 处理 Figma 自定义 <i18n-text> 元素（其文字不在属性中，而是 textContent）
        if (currentNode.tagName === 'I18N-TEXT') {
          translateI18nText(currentNode);
        }
        // 同样检查属性节点
        translateAttribute(currentNode, 'data-label');
        translateAttribute(currentNode, 'placeholder');
      }
      currentNode = treeWalker.nextNode();
    }
  }

  // 单一合并观察者：处理 childList / characterData / data-label 属性变化
  const observer = new MutationObserver(function (mutations) {
    for (const m of mutations) {
      if (m.type === 'characterData') {
        // 文本内容变化：文本节点或 i18n-text 文字
        const el = m.target.parentElement;
        if (m.target.nodeType === DOM_NODE_TYPE.TEXT_NODE) {
          translateTextNodeContent(m.target);
        } else if (el && el.tagName === 'I18N-TEXT') {
          translateI18nText(el);
        }
        continue;
      }

      if (m.type === 'attributes') {
        // data-label 属性变化
        if (m.attributeName === 'data-label' && m.target && m.target.nodeType === 1) {
          translateAttribute(m.target, 'data-label');
        }
        continue;
      }

      // childList：新增节点
      if (m.type === 'childList') {
        for (const node of m.addedNodes) {
          if (node.nodeType === DOM_NODE_TYPE.TEXT_NODE) {
            translateTextNodeContent(node);
          } else if (node.nodeType === 1) {
            if (node.tagName === 'I18N-TEXT') {
              translateI18nText(node);
            }
            // 对新增元素子树做局部遍历（覆盖其内部文本 / 属性 / i18n-text）
            translateSubtree(node);
          }
        }
      }
    }
  });

  observer.observe(document.body, MutationObserverConfig);

  // 翻译初始 body 内已有的内容
  translateSubtree(document.body);
  document.querySelectorAll('i18n-text').forEach(translateI18nText);
}
