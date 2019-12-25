

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
  [`Select All with Same Instance`, '选择全部相同组件实例'],
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
  [`Pixel Preview`, '像素预览'],
  [`Zoom In`, '放大'],
  [`Zoom Out`, '缩小'],
  [`Zoom to 100%`, '缩放至 100%'],
  [`Zoom to Fit`, '缩放至适合大小'],
  [`Zoom to Selection`, '缩放至选中范围'],
  [`Previous Page`, '上一页'],
  [`Next Page`, '下一页'],
  [`Zoom to Previous Frame`, '缩放至上一个框架'],
  [`Zoom to Next Frame`, '缩放至下一个框架'],
  [`Find Previous Frame`, '查看上一个框架'],
  [`Find Next Frame`, '查看下一个框架'],
  //////////// Object //////////////////
  [`Group Selection`, '选中项成组'],
  [`Frame Selection`, '选中项框架化'],
  [`Ungroup Selection`, '取消成组'],
  [`Use as Mask`, '用作蒙版'],
  [`Restore Default Thumbnail`, '恢复默认缩略图'],
  [`Add Auto Layout`, '增加自动布局'],
  [`Create Component`, '创建组件'],
  [`Reset Instance`, '重置组件实例'],
  [`Detach Instance`, '分离组件实例'],
  [`Master Component`, '主组件'],
  [`Bring to Front`, '到最前'],
  [`Bring Forward`, '向前'],
  [`Send Backward`, '向后'],
  [`Send to Back`, '到最后'],
  [`Flip Horizontal`, '水平翻转'],
  [`Flip Vertical`, '垂直翻转'],
  [`Rotate 180B0`, '旋转 180°'],
  ['Rotate 90B0 Left', '向左旋转 90°'],
  [`Rotate 90° Right`, '向右旋转 90°'],
  [`Flatten Selection`, '拼合选中项'],
  [`Outline Stroke`, '描边轮廓化'],
  [`Boolean Groups`, '布尔组合'],
  [`Union Selection`, '拼合路径'],
  [`Subtract Selection`, '减去'],
  [`Intersect Selection`, '相交'],
  [`Exclude Selection`, '排除'],
  [`Exclude Selection`, '排除'],
  [`Rasterize Selection`, '像素化'],
  [`Collapse Layers`, '折叠图层'],
  [`Show/Hide Selection`, '显示/隐藏'],
  [`Lock/Unlock Selection`, '锁定/解锁'],
  [`Hide Other Layers`, '隐藏其余图层'],
  [`Remove Fill`, '移除填充'],
  [`Remove Stroke`, '移除描边'],
  [`Swap Fill and Stroke`, '互换填充和描边'],
  //////////// Vector //////////////////
  [`Join Selection`, '连接'],
  [`Smooth Join Selection`, '平滑连接'],
  [`Delete and Heal Selection`, '删除和修复'],
  //////////// Vector //////////////////




              


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



