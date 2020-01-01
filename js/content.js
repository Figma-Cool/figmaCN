document.body.addEventListener(
  'DOMSubtreeModified',
  () => {
    var menuTitles = document.querySelectorAll('div[class*="multilevel_dropdown--name"]')
    var menuTitlesSpan = document.querySelectorAll('span[class*="multilevel_dropdown--name"]')
    var actionOption = document.querySelectorAll('div[class*="action_option--text"]')
    var panelTitle = document.querySelectorAll('div[class*="panelTitle"]')
    var panelTitleText = document.querySelectorAll('div[class*="panelTitleText"]')
    var panelTab = document.querySelectorAll('div[class*="panel--tab"]')
    var selectOptionText = document.querySelectorAll('span[class*="select--optionText"]')
    var selectOptionInputText = document.querySelectorAll('span[class*="select--inputText"]')
    var imageAdjustLabel = document.querySelectorAll('div[class*="image_settings_modal--colorAdjustLabel"]')
    var checkboxLabel = document.querySelectorAll('label[class*="checkboxLabel"]')
    var toolBarDropDown = document.querySelectorAll('a[class*="dropdown"]')
    var inputPlaceholder = document.querySelectorAll('input')
    var allLabel = document.querySelectorAll('label')
    var spanSidebar = document.querySelectorAll('span[class*="sidebar"]')
    var divSidebar = document.querySelectorAll('div[class*="sidebar"]')
    var spanToolBar = document.querySelectorAll('span[class*="tool_bar"]')

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

        for (var i = 0; i < selectOptionTextData.length; i++) {
          if (el.textContent === selectOptionTextData[i][0]) {
            el.innerHTML = selectOptionTextData[i][1]
          }
        }
        for (var i = 0; i < checkboxLabelData.length; i++) {
          if (el.textContent === checkboxLabelData[i][0]) {
            el.innerHTML = checkboxLabelData[i][1]
          }
        }
        for (var i = 0; i < toolBarDropDownData.length; i++) {
          if (el.textContent === toolBarDropDownData[i][0]) {
            el.innerHTML = toolBarDropDownData[i][1]
          }
        }
        for (var i = 0; i < inputPlaceholderData.length; i++) {
          if (el.placeholder === inputPlaceholderData[i][0]) {
            el.placeholder = inputPlaceholderData[i][1]
          }
        }
        for (var i = 0; i < allLabelData.length; i++) {
          if (el.innerHTML === allLabelData[i][0]) {
            el.innerHTML = allLabelData[i][1]
          }
        }
        for (var i = 0; i < spanSidebarToolbarData.length; i++) {
          if (el.innerHTML === spanSidebarToolbarData[i][0]) {
            el.innerHTML = spanSidebarToolbarData[i][1]
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
    replaceTextNodes(selectOptionText)
    replaceTextNodes(selectOptionInputText)
    replaceTextNodes(imageAdjustLabel)
    replaceTextNodes(checkboxLabel)
    replaceTextNodes(toolBarDropDown)
    replaceTextNodes(inputPlaceholder)
    replaceTextNodes(allLabel)
    replaceTextNodes(spanSidebar)
    replaceTextNodes(spanToolBar)
    replaceTextNodes(divSidebar)
  },
  false
)



