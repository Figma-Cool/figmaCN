
// function replaceTextNodes() {
//   const menuTitles = document.querySelectorAll('div[class*="multilevel_dropdown--name"]');
//   const menuTitlesSpan = document.querySelectorAll('span[class*="multilevel_dropdown--name"]');
//   const actionOption = document.querySelectorAll('div[class*="action_option--text"]');
//   const panelTitle = document.querySelectorAll('div[class*="panelTitle"]');
//   const panelTitleText = document.querySelectorAll('div[class*="panelTitleText"]');
//   const panelTab = document.querySelectorAll('div[class*="panel--tab"]');
//   const selectOptionText = document.querySelectorAll('span[class*="select--optionText"]');
//   const selectOptionInputText = document.querySelectorAll('span[class*="select--inputText"]');
//   const imageAdjustLabel = document.querySelectorAll('div[class*="image_settings_modal--colorAdjustLabel"]');
//   const checkboxLabel = document.querySelectorAll('label[class*="checkboxLabel"]');
//   const toolBarDropDown = document.querySelectorAll('a[class*="dropdown"]');
//   const inputPlaceholder = document.querySelectorAll('input');
//   const allLabel = document.querySelectorAll('label');
//   const spanSidebar = document.querySelectorAll('span[class*="sidebar"]');
//   const divSidebar = document.querySelectorAll('div[class*="sidebar"]');
//   const spanToolBar = document.querySelectorAll('span[class*="tool_bar"]');
//   const allSelectedDOM = [menuTitles, menuTitlesSpan, actionOption, panelTitle, panelTitleText, panelTab, selectOptionText, selectOptionInputText, imageAdjustLabel, checkboxLabel, toolBarDropDown, inputPlaceholder, allLabel, spanSidebar, divSidebar, spanToolBar];

//   allSelectedDOM.forEach(els => {
//     els.forEach(el => {
//       for (let i = 0; i < data.length; i++) {
//         if (el.textContent === data[i][0]) {
//           el.innerHTML = data[i][1]
//         }
//       }

//       for (let i = 0; i < actionOptionData.length; i++) {
//         if (el.textContent === actionOptionData[i][0]) {
//           el.innerHTML = actionOptionData[i][1]
//         }
//       }

//       for (let i = 0; i < panelTitleText.length; i++) {
//         if (el.textContent === panelTitleText[i][0]) {
//           el.textContent = panelTitleText[i][1]
//         }
//       }
//       for (let i = 0; i < panelTitles.length; i++) {
//         if (el.textContent === panelTitles[i][0]) {
//           el.textContent = panelTitles[i][1]
//         }
//       }
//       for (let i = 0; i < panelTabs.length; i++) {
//         if (el.getAttribute('data-label') === panelTabs[i][0]) {
//           el.setAttribute('data-label', panelTabs[i][1])
//           el.textContent = panelTabs[i][1]
//         }
//       }

//       for (let i = 0; i < selectOptionTextData.length; i++) {
//         if (el.textContent === selectOptionTextData[i][0]) {
//           el.innerHTML = selectOptionTextData[i][1]
//         }
//       }
//       for (let i = 0; i < checkboxLabelData.length; i++) {
//         if (el.textContent === checkboxLabelData[i][0]) {
//           el.innerHTML = checkboxLabelData[i][1]
//         }
//       }
//       for (let i = 0; i < toolBarDropDownData.length; i++) {
//         if (el.textContent === toolBarDropDownData[i][0]) {
//           el.innerHTML = toolBarDropDownData[i][1]
//         }
//       }
//       for (let i = 0; i < inputPlaceholderData.length; i++) {
//         if (el.placeholder === inputPlaceholderData[i][0]) {
//           el.placeholder = inputPlaceholderData[i][1]
//         }
//       }
//       for (let i = 0; i < allLabelData.length; i++) {
//         if (el.innerHTML === allLabelData[i][0]) {
//           el.innerHTML = allLabelData[i][1]
//         }
//       }
//       for (let i = 0; i < spanSidebarToolbarData.length; i++) {
//         if (el.innerHTML === spanSidebarToolbarData[i][0]) {
//           el.innerHTML = spanSidebarToolbarData[i][1]
//         }
//       }
//     })
//   })
// }

let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let MutationObserverConfig = {
  childList: true,
  subtree: true,
  characterData: true
};
let observer = new MutationObserver(function (mutations) {
  mutations.forEach((el) => {


    function traversal(dom) {
      var len = dom.length;
      var d = null;
      for (var i = 0; i < len; i++) {
        d = dom[i];

        if (d.childNodes) {
          traversal(d.childNodes)

          if (d.nodeType === 3) {

            if (d.textContent === data[i][0]) {
              d.textContent = data[i][1]
              console.log(d)
            }

          }
        }

      }
    }

    traversal(el.target.childNodes)

  })
  // mutations.forEach((mutation) => {
  //   console.log(`mutation.type = ${mutation.type}`);

  //   mutation.addedNodes.forEach(el => {

  //     console.log(el);

  //     for (let i = 0; i < mutation.addedNodes.length; i++) {
  //       if (el.textContent === data[i][0]) {
  //         el.textContent = data[i][1]
  //       }
  //     }


  //   })



  //   for (let i = 0; i < mutation.removedNodes.length; i++) {
  //     console.log(`${mutation.removedNodes[i].textContent} removed`);
  //   }
  // });
  // replaceTextNodes();
});

observer.observe(document.body, MutationObserverConfig);
// const clearRecord = observer.takeRecords();

// clearRecord.forEach((mutation) => {
//   for (let i = 0;i < mutation.addedNodes.length; i++) {
//     console.log(`${mutation.addedNodes[i].textContent} added`);
//   }
// })