
var data = [
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
  ['Preferences', '偏好设置'],
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
  [`Bold`, '加粗'],
  [`Italic`, '斜体'],
  [`Underline`, '下划线'],
  [`Strikethrough`, '删除线'],
  [`Original Case`, '恢复原状'],
  [`Upper Case`, '大写'],
  [`Lower Case`, '小写'],
  [`Increase Font Size`, '增大字号'],
  [`Decrease Font Size`, '缩小字号'],
  [`Increase Line Height`, '增加行高'],
  [`Decrease Line Height`, '减少行高'],
  [`Increase Letter Spacing`, '增大字间距'],
  [`Decrease Letter Spacing`, '减少行高'],
  [`Align`, '对其'],
  [`Text Align Left`, '文本左对齐'],
  [`Text Align Center`, '文本居中对齐'],
  [`Text Align Right`, '文本右对齐'],
  [`Text Align Justified`, '文本向两侧对其'],
  [`Text Align Top`, '文本向上对齐'],
  [`Text Align Middle`, '文本居中对齐'],
  [`Text Align Bottom`, '文本向下对齐'],
  //////////// Text //////////////////
  [`Round to Pixel`, '像素整数化'],
  [`Align Left`, '左对齐'],
  [`Align Horizontal Centers`, '水平居中'],
  [`Align Right`, '右对齐'],
  [`Align Top`, '顶部对齐'],
  [`Align Vertical Centers`, '垂直居中'],
  [`Align Bottom`, '底部对齐'],
  [`Tidy Up`, '整理'],
  [`Pack Horizontal`, '水平贴合'],
  [`Pack Vertical`, '垂直贴合'],
  [`Distribute Horizontal Spacing`, '水平均分'],
  [`Distribute Vertical Spacing`, '垂直均分'],
  [`Distribute Left`, '向左均分'],
  [`Distribute Horizontal Centers`, '向左均分'],
  [`Distribute Right`, '向左均分'],
  [`Distribute Top`, '向左均分'],
  [`Distribute Vertical`, '向左均分'],
  [`Distribute Vertical Centers`, '向左均分'],
  [`Distribute Bottom`, '向左均分'],
  //////////// Preferences //////////////////
  [`Snap to Geometry`, '对齐到几何'],
  [`Snap to Objects`, '对齐到对象'],
  [`Snap to Pixel Grid`, '对齐到像素'],
  [`Keep Tool Selected after Use`, '使用后保持工具选择'],
  [`Highlight Layers on Hover`, '突出显示悬停图层'],
  [`Rename Duplicated Layers`, '重命名副本图层'],
  [`Show Dimensions on Objects`, '在对象上显示尺寸'],
  [`Hide Canvas UI During Changes`, '在更改期间隐藏画布 UI'],
  [`Keyboard Zooms into Selection`, '键盘控制缩放'],
  [`Substitute Smart Quotes`, '智能引号替换'],
  [`Show Google Fonts`, '显示谷歌字体'],
  [`Flip Objects While Resizing`, '调整大小时翻转对象'],
  [`Invert Zoom Direction`, '反转缩放方向'],
  [`Use Number Keys for Opacity`, '使用数字控制透明度'],
  [`Open Links in Desktop App`, '从桌面应用打开'],
  [`Nudge Amount...`, '单位微调'],
  //////////// Help and Account //////////////////
  [`Help Page`, '帮助页面'],
  [`Keyboard Shortcuts`, '键盘快捷键'],
  [`Community Forum`, '论坛'],
  [`Video Tutorials`, '视频教程'],
  [`Release Notes`, '版本记录'],
  [`Open Font Settings`, '打开字体设置'],
  [`Legal Summary`, '法律文件'],
  [`Account Settings`, '账号设置'],
  [`Log Out`, '退出'],
  //////////// right-click panel //////////////////
  [`Copy/Paste`, '复制/粘贴'],
  [`Search...`, '搜索'],
  [`Select Layer`, '选择图层'],
  [`Ungroup`, '解组'],
  [`Flatten`, '扁平'],
  [`Show/Hide`, '显示/隐藏'],
  [`Lock/Unlock`, '锁定/解锁'],







]

var actionOptionData = [
  [`Move`, '移动'],
  [`Scale`, '缩放'],
  [`Frame`, '框架'],
  [`Slice`, '切片'],
  [`Rectangle`, '矩形'],
  [`Line`, '线'],
  [`Arrow`, '箭头'],
  [`Ellipse`, '椭圆'],
  [`Polygon`, '多边形'],
  [`Star`, '星心'],
  [`Pen`, '钢笔'],
  [`Pencil`, '铅笔'],
]


document.body.addEventListener(
  'DOMSubtreeModified',
  () => {
    var aElements = document.querySelector('.dropdown--dropdown--35dH4')
    var menuTitles = document.querySelectorAll('.multilevel_dropdown--name--1abLT')
    var actionOption = document.querySelectorAll('.action_option--text--3Rze3')

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
      })
    }



    replaceTextNodes(menuTitles)
    replaceTextNodes(actionOption)
  },
  false
)
