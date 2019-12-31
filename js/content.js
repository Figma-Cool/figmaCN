

document.body.addEventListener(
  'DOMSubtreeModified',
  () => {
    var menuTitles = document.querySelectorAll('div[class*="multilevel_dropdown--name"]')
    var menuTitlesSpan = document.querySelectorAll('span[class*="multilevel_dropdown--name"]')
    var actionOption = document.querySelectorAll('div[class*="action_option--text"]')
    var panelTitle = document.querySelectorAll('div[class*="panelTitle"]')
    var panelTitleText = document.querySelectorAll('div[class*="panelTitleText"]')
    var panelTab = document.querySelectorAll('div[class*="panel--tab"]')
    
    function replaceTextNodes(node) {
      node.forEach(function (el) {
        for (var i = 0; i < data.length; i++) {
          if (el.textContent === data[i][0]) {
            el.innerHTML = data[i][1]
          }
        }

        for (var i = 0; i < actionOptionData.length; i++) {
          if (el.textContent === actionOptionData[i][0]) {
            el.innerHTML = actionOptionData[i][1]
          }
        }

        for (var i = 0; i < panelTitleText.length; i++) {
          if (el.textContent === panelTitleText[i][0]) {
            el.textContent = panelTitleText[i][1]
          }
        }
        for (var i = 0; i < panelTitles.length; i++) {
          if (el.textContent === panelTitles[i][0]) {
            el.textContent = panelTitles[i][1]
          }
        }
        for (var i = 0; i < panelTabs.length; i++) {
          if (el.getAttribute('data-label') === panelTabs[i][0]) {
            el.setAttribute('data-label', panelTabs[i][1])
            el.textContent = panelTabs[i][1]
          }
        }
      })
    }


    replaceTextNodes(panelTitleText)
    replaceTextNodes(panelTitle)
    replaceTextNodes(panelTab)
    replaceTextNodes(menuTitlesSpan)
    replaceTextNodes(menuTitles)
    replaceTextNodes(actionOption)
  },
  false
)



