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
  allData.forEach(([key, val]) => {
    if (key && !dataMap.has(key)) {
      dataMap.set(key, val);
    }
  });

  const DOM_NODE_TYPE = {
    TEXT_NODE: 3,
  }

  // 检测节点是否在代码编辑器内
  function isNodeInCodeEditor(node) {
    let currentElement = node.nodeType === DOM_NODE_TYPE.TEXT_NODE ? node.parentElement : node;
    
    while (currentElement && currentElement !== document.body) {
      // 检测 translate="no" 属性 - 这是代码编辑器的标记
      if (currentElement.getAttribute('translate') === 'no') {
        return true;
      }
      
      currentElement = currentElement.parentElement;
    }
    
    return false;
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

          /**
           * 跳过代码编辑器中的内容，避免代码关键字如 export 被翻译
           */
          if (isNodeInCodeEditor(node)) {
            return NodeFilter.FILTER_REJECT;
          }

          const nodeIsTextNode = node.nodeType === DOM_NODE_TYPE.TEXT_NODE;
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
          if (dataMap.has(key1)) currentNode.textContent = dataMap.get(key1);
        }
      } else {
        // 同样检查属性节点
        if (!isNodeInCodeEditor(currentNode)) {
          let key2 = currentNode.getAttribute('data-label');
          if (key2 && dataMap.has(key2)) currentNode.setAttribute('data-label', dataMap.get(key2));

          let key3 = currentNode.getAttribute('placeholder') || '';
          const trimmedKey3 = key3.trim();
          if (trimmedKey3 && dataMap.has(trimmedKey3)) {
            currentNode.setAttribute('placeholder', dataMap.get(trimmedKey3));
          }
        }
      }

      currentNode = treeWalker.nextNode();
    }
  });

  observer.observe(document.body, MutationObserverConfig);
}