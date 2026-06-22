// FigmaCN v1.6.0 - 2026-06-22
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

  let MutationObserver = window.MutationObserver || window['WebKitMutationObserver'];
  let MutationObserverConfig = {
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

  // 按 key 长度降序排序，确保 applyExactMatches 时长词条优先匹配（避免 "Edu" 先于 "Education" 命中）
  const sortedExactEntries = [...dataMap.entries()].sort((a, b) => b[0].length - a[0].length);

  const DOM_NODE_TYPE = {
    TEXT_NODE: 3,
  }

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
        return true;
      }
      
      currentElement = currentElement.parentElement;
    }
    
    return false;
  }

  // 对模式匹配结果再做精确匹配兜底（如 Education→教育版、Jul→7）
  function applyExactMatches(text) {
    let result = text;
    for (const [exactKey, exactVal] of sortedExactEntries) {
      if (exactKey.length > 1 && result.includes(exactKey)) {
        result = result.replace(exactKey, exactVal);
      }
    }
    return result;
  }

  let observer = new MutationObserver(function (mutations) {
    let treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_ALL,
      {
        acceptNode: function (node) {
          /**
           * [issue](https://github.com/Figma-Cool/figmaCN/issues/143)
           *
           * 跳过 local variable 设置面板中的的名称节点，避免 local variable 里面的名称被翻译
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
            if (isNodeInCodeEditor(node)) {
              return NodeFilter.FILTER_REJECT;
            }
          }

          if (nodeIsTextNode) return NodeFilter.FILTER_ACCEPT;

          if (typeof node.hasAttribute !== 'function') return NodeFilter.FILTER_SKIP;
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
        if (!isNodeInCodeEditor(currentNode)) {
          let key1 = currentNode.textContent;
          // 先尝试精确匹配
          if (dataMap.has(key1)) {
            currentNode.textContent = dataMap.get(key1);
          } else if (patternEntries.length > 0) {
            // 兜底：尝试 {@} 通配符模式匹配
            for (const { regex, template } of patternEntries) {
              const match = key1.match(regex);
              if (match) {
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
                currentNode.textContent = applyExactMatches(result);
                break;
              }
            }
          }
        }
      } else {
        // 同样检查属性节点
        if (!isNodeInCodeEditor(currentNode)) {
          let key2 = currentNode.getAttribute('data-label');
          if (key2) {
            if (dataMap.has(key2)) {
              currentNode.setAttribute('data-label', dataMap.get(key2));
            } else if (patternEntries.length > 0) {
              for (const { regex, template } of patternEntries) {
                const match = key2.match(regex);
                if (match) {
                  let result = template;
                  const hasNumbered = /\{[1-9]\d*\}/.test(result);
                  if (hasNumbered) {
                    for (let i = 1; i < match.length; i++) {
                      result = result.replace(new RegExp(`\\{${i}\\}`, 'g'), match[i]);
                    }
                  } else {
                    for (let i = 1; i < match.length; i++) {
                      result = result.replace('{@}', match[i]);
                    }
                  }
                  currentNode.setAttribute('data-label', applyExactMatches(result));
                  break;
                }
              }
            }
          }

          let key3 = currentNode.getAttribute('placeholder') || '';
          const trimmedKey3 = key3.trim();
          if (trimmedKey3) {
            if (dataMap.has(trimmedKey3)) {
              currentNode.setAttribute('placeholder', dataMap.get(trimmedKey3));
            } else if (patternEntries.length > 0) {
              for (const { regex, template } of patternEntries) {
                const match = trimmedKey3.match(regex);
                if (match) {
                  let result = template;
                  const hasNumbered = /\{[1-9]\d*\}/.test(result);
                  if (hasNumbered) {
                    for (let i = 1; i < match.length; i++) {
                      result = result.replace(new RegExp(`\\{${i}\\}`, 'g'), match[i]);
                    }
                  } else {
                    for (let i = 1; i < match.length; i++) {
                      result = result.replace('{@}', match[i]);
                    }
                  }
                  currentNode.setAttribute('placeholder', applyExactMatches(result));
                  break;
                }
              }
            }
          }
        }
      }

      currentNode = treeWalker.nextNode();
    }
  });

  observer.observe(document.body, MutationObserverConfig);
}