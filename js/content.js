



// function replaceTextNodes() {

// const menuTitles = document.querySelectorAll('div[class*="multilevel_dropdown--name"]');
// const menuTitlesSpan = document.querySelectorAll('span[class*="multilevel_dropdown--name"]');
// const actionOption = document.querySelectorAll('div[class*="action_option--text"]');
// const panelTitle = document.querySelectorAll('div[class*="panelTitle"]');
// const panelTitleText = document.querySelectorAll('div[class*="panelTitleText"]');
// const panelTab = document.querySelectorAll('div[class*="panel--tab"]');
// const selectOptionText = document.querySelectorAll('span[class*="select--optionText"]');
// const selectOptionInputText = document.querySelectorAll('span[class*="select--inputText"]');
// const imageAdjustLabel = document.querySelectorAll('div[class*="image_settings_modal--colorAdjustLabel"]');
// const checkboxLabel = document.querySelectorAll('label[class*="checkboxLabel"]');
// const toolBarDropDown = document.querySelectorAll('a[class*="dropdown"]');
// const inputPlaceholder = document.querySelectorAll('input');
// const allLabel = document.querySelectorAll('label');
// const spanSidebar = document.querySelectorAll('span[class*="sidebar"]');
// const divSidebar = document.querySelectorAll('div[class*="sidebar"]');
// const spanToolBar = document.querySelectorAll('span[class*="tool_bar"]');
// const allSelectedDOM = [menuTitles, menuTitlesSpan, actionOption, panelTitle, panelTitleText, panelTab, selectOptionText, selectOptionInputText, imageAdjustLabel, checkboxLabel, toolBarDropDown, inputPlaceholder, allLabel, spanSidebar, divSidebar, spanToolBar];

//   allChangedDOM.forEach(el => {


// console.log(el.childList)
//     for (let i = 0; i < allData.length; i++) {
//       if (el.textContent === allData[i][0]) {
//         el.textContent = allData[i][1]
//       }
//     }

// for (let i = 0; i < actionOptionData.length; i++) {
//   if (el.textContent === actionOptionData[i][0]) {
//     el.textContent = actionOptionData[i][1]
//   }
// }

// for (let i = 0; i < panelTitleText.length; i++) {
//   if (el.textContent === panelTitleText[i][0]) {
//     el.textContent = panelTitleText[i][1]
//   }
// }
// for (let i = 0; i < panelTitles.length; i++) {
//   if (el.textContent === panelTitles[i][0]) {
//     el.textContent = panelTitles[i][1]
//   }
// }
// for (let i = 0; i < panelTabs.length; i++) {
//   if (el.getAttribute('data-label') === panelTabs[i][0]) {
//     el.setAttribute('data-label', panelTabs[i][1])
//     el.textContent = panelTabs[i][1]
//   }
// }

// for (let i = 0; i < selectOptionTextData.length; i++) {
//   if (el.textContent === selectOptionTextData[i][0]) {
//     el.textContent = selectOptionTextData[i][1]
//   }
// }
// for (let i = 0; i < checkboxLabelData.length; i++) {
//   if (el.textContent === checkboxLabelData[i][0]) {
//     el.textContent = checkboxLabelData[i][1]
//   }
// }
// for (let i = 0; i < toolBarDropDownData.length; i++) {
//   if (el.textContent === toolBarDropDownData[i][0]) {
//     el.textContent = toolBarDropDownData[i][1]
//   }
// }
// for (let i = 0; i < inputPlaceholderData.length; i++) {
//   if (el.placeholder === inputPlaceholderData[i][0]) {
//     el.placeholder = inputPlaceholderData[i][1]
//   }
// }
// for (let i = 0; i < allLabelData.length; i++) {
//   if (el.textContent === allLabelData[i][0]) {
//     el.textContent = allLabelData[i][1]
//   }
// }
// for (let i = 0; i < spanSidebarToolbarData.length; i++) {
//   if (el.textContent === spanSidebarToolbarData[i][0]) {
//     el.textContent = spanSidebarToolbarData[i][1]
//   }
// }

//   })
// }

let allChangedDOM = [];

let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let MutationObserverConfig = {
  childList: true,
  subtree: true,
  characterData: true
};

let observer = new MutationObserver(function (mutations) {


  mutations.forEach(function (mutation) {



    if (mutation.target.querySelectorAll('div')) {
      for (let i = 0; i <= allData.length; i++) {
        mutation.target.querySelectorAll('div').forEach(item2 => {
          if (item2.textContent === allData[i][0]) {
            console.log(item2)
            item2.textContent = allData[i][1]
          }

        })
      }
    }
  })
});

observer.observe(document.body, MutationObserverConfig);

