let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let MutationObserverConfig = {
  childList: true,
  subtree: true,
  characterData: true
};

let observer = new MutationObserver(function (mutations) {
  let treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    { acceptNode: function (node) { return NodeFilter.FILTER_ACCEPT; } },
    false
  );

  let nodeList = [];
  let currentNode = treeWalker.currentNode;
  while (currentNode) {
    nodeList.push(currentNode);

    // console.log(currentNode.textContent)
    allData.forEach(item => {
      if (currentNode.textContent === item[0]) {
        currentNode.textContent = item[1]
      }

      if (currentNode.parentNode.getAttribute('data-label') == item[0]) {
        currentNode.parentNode.setAttribute('data-label', item[1])
      }
      // if (currentNode.parentNode.placeholder == item[0]) {
      //   currentNode.parentNode.placeholder = item[1]
      // }
    })

    currentNode = treeWalker.nextNode();
  }
});

observer.observe(document.body, MutationObserverConfig);