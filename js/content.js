

// var data = {
//   sideBar: {
//     layers: ['Layers', '图层'],
//     assets: ['Assets', '资源'],
//     file: ['File', '文件'],
//   },
//   menu: [
//     ['Back to Files', '回到文件'],
//     ['File', '文件'],
//     ['Edit', '编辑'],
//     ['View', '视图'],
//     ['Object', '对象'],
//     ['Vector', '矢量'],
//     ['Text', '文本'],
//     ['Arrange', '范围'],
//     ['Plugins', '插件'],
//     ['Integrations', '集成'],
//     ['Preferences', '设置'],
//     ['Libraries', '库'],
//     ['Open in Desktop App', '打开桌面应用'],
//     ['Help and Account', '帮助和账户'],
//     {
//       file: [
//         ['New', '新建'],
//         ['New from Sketc Files...', '从 Sketch 文件新建'],
//         ['Place Image', '替换图片'],
//         ['Save as .fig...', '另存为 .fig 文件'],
//         ['Save to Version History', '保存至历史版本'],
//       ]
//     }
//   ],
// }

var data2 = [
  ['Back to Files', '回到文件'],
  ['File', '文件'],
  ['Edit', '编辑'],
  ['View', '视图'],
  ['Object', '对象'],
  ['Vector', '矢量'],
  ['Text', '文本'],
  ['Arrange', '范围'],
  ['Plugins', '插件'],
  ['Integrations', '集成'],
  ['Preferences', '设置'],
  ['Libraries', '库'],
  ['Open in Desktop App', '打开桌面应用'],
  ['Help and Account', '帮助和账户'],
  //////////// File //////////////////
  ['New', '新建'],
  [`New from Sketch File...`, '从 Sketch 文件新建'],
  ['Place Image', '替换图片'],
  [`Save as .fig...`, '另存为 .fig 文件'],
  [`Save to Version History...`, '保存至历史版本'],
  ['Show Version History', '查看历史版本'],
  [`Export...`, '导出'],
  [`Export Frames to PDF...`, '导出框架为PDF'],
  //////////// Edit //////////////////
  [`Undo`, '撤销'],
  [`Redo`, '恢复'],
  [`Copy as`, '复制为'],
  [`Copy as Text`, '复制为文本'],
  [`Copy as CSS`, '复制为 CSS'],
  [`Copy as SVG`, '复制为 SVG'],
  [`Paste Over Selection`, '粘贴至选中位置'],
  [`Duplicate`, '复制为副本'],
  [`Delete`, '删除'],
  [`Set Default Properties`, '设置默认属性'],
  [`Copy Properties`, '复制属性'],
  [`Paste Properties`, '粘贴属性'],
  [`Pick Color`, '选择颜色'],
  [`Select All`, '全选'],
  [`Select None`, '取消选择'],
  [`Select Inverse`, '反选'],
  [`Select All with Same Properties`, '选择全部相同属性'],
  [`Select All with Same Fill`, '选择全部相同填充颜色'],
  [`Select All with Same Stroke`, '选择全部相同描边'],
  [`Select All with Same Effect`, '选择全部相同效果'],
  [`Select All with Same Text Properties`, '选择全部相同文本属性'],
  [`Select All with Same Font`, '选择全部相同字体'],
  [`Select All with Same Instance`, '选择全部相同组件'],
  //////////// View //////////////////
  [`Pixel Grid`, '像素网格'],
  [`Layout Grids`, '布局网格'],
  [`Mask Outlines`, '蒙版轮廓'],
  [`Frame Outlines`, '框架轮廓'],
  [`Resource Use`, '资源使用'],
  [`Rulers`, '标尺'],
  [`Outlines`, '轮廓'],
  [`Show/Hide UI`, '显示/隐藏界面'],
  [`Layers Panel`, '图层面板'],
  [`Show Multiplayer Cursors`, '显示多用户鼠标指针'],


]

                  
// document.querySelector('.fullscreen_view--page--1QuyL').addEventListener(
//   'DOMSubtreeModified',
//   () => {
//     var aElements = document.getElementsByTagName('div');
//     for (var i = 0; i < aElements.length; i++) {
//       var j = i
//       console.log(j)
//       if (aElements[i].innerHTML === data.menu.file[0][0]) {
//         aElements[i].innerHTML = data.menu.file[0][1]
//       }
//       if (aElements[i].innerHTML === data.menu.file[1][0]) {
//         aElements[i].innerHTML = data.menu.file[1][1]
//       }
//       if (aElements[i].innerHTML === data.menu.file[2][0]) {
//         aElements[i].innerHTML = data.menu.file[2][1]
//       }
//     }

//   },
//   false
// )

// var aElements = document.querySelector('.fullscreen_view--page--1QuyL').querySelectorAll('div')[2]
// var aElements1 = document.querySelector('.fullscreen_view--page--1QuyL')

// console.log(aElements)

// setTimeout(() => {
//   replaceTextNodes(aElements)
// }, 6000);


document.body.addEventListener(
  'DOMSubtreeModified',
  () => {
    var aElements = document.querySelector('.dropdown--dropdown--35dH4')
    var menuTitles = document.querySelectorAll('.multilevel_dropdown--name--1abLT')

    function replaceTextNodes(node) {
      node.forEach(function (el) {
        for (var i = 0; i < data2.length; i++) {
          if (el.textContent === data2[i][0]) {
            el.innerHTML = data2[i][1]
          }
        }
      })
    }
    replaceTextNodes(menuTitles)
  },
  false
)
// document.body.addEventListener(
//   'DOMSubtreeModified',
//   () => {
//     // var aElements = document.getElementsByTagName('div');
//     var aElements = document.querySelector('.dropdown--dropdown--35dH4')
//     var menuTitles = document.querySelectorAll('.multilevel_dropdown--name--1abLT')
//     // replaceTextNodes(aElements)

//     function replaceTextNodes(node) {
//       node.forEach(function (el) {
//         console.log(el)

//         for (var i = 0; i < data.menu.length; i++) {
//           if (el.textContent === data.menu[i][0]) {
//             el.innerHTML = data.menu[i][1]
//             console.log(i)
//           }
//         }
//         for (var i = 0; i < data.menu[data.menu.length - 1].file.length; i++) {
//           if (el.textContent === data.menu[data.menu.length - 1].file[i][0]) {
//             el.innerHTML = data.menu[data.menu.length - 1].file[i][1]
//             console.log(i)
//           }
//         }
//       })
//     }
//     replaceTextNodes(menuTitles)
//   },
//   false
// )




// function replaceTextNodes(node) {
//   node.childNodes.forEach(function (el, i) {
//     console.log(el, i)

//     if (el.textContent === data.menu[0][0]) { 
//       el.nodeValue = data.menu[0][1]
//     }
//     if (el.textContent === data.menu[1][0]) { 
//       el.nodeValue = data.menu[1][1]
//     }
//     if (el.textContent === data.menu[2][0]) {
//       el.nodeValue = data.menu[2][1]
//     }
//     if (el.textContent === data.menu[3][0]) { 
//       el.nodeValue = data.menu[3][1]
//     }
//     // }
//   })
// }



