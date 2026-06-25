# FigmaCN

中文 Figma 插件，设计师人工翻译校验。

## 油猴脚本版

* 访问 [油猴脚本商店](https://greasyfork.org/zh-CN/scripts/526503)

## Chrome 商店版

* 访问 [Chrome 商店](https://chrome.google.com/webstore/detail/japkpjkpfdakpkbcehooampdjfgefndj)
* 点击「添加至 Chrome」按钮
* 安装完成后，刷新 Figma 页面即可生效

## Edge 商店版

* 访问 [Edge 商店](https://microsoftedge.microsoft.com/addons/detail/ogiidbjdjdppamedjpjdffjjdbnehgjc?hl=zh-CN)
* 点击「获取」按钮
* 安装完成后，刷新 Figma 页面即可生效

## Firefox 附加组件社区版

* 访问 [Firefox 附加组件社区](https://addons.mozilla.org/zh-CN/firefox/addon/figmacn/)
* 点击「添加到 Firefox」按钮
* 安装完成后，刷新 Figma 页面即可生效

## Chromium（Chrome / Edge）手动安装

* 点击[下载插件包](https://github.com/Figma-Cool/figmaCN/releases)（选择 `FigmaCN-chromium-x.x.x.zip`）到电脑
* 解压到本地的文件夹
* 打开 Chrome，在地址栏输入 `chrome://extensions` 回车，打开插件管理页面
  （Edge 则输入 `edge://extensions`，打开左下角「开发人员模式」开关）
* 打开右上角「开发者模式」开关
* 点击「加载已解压的扩展程序」按钮（Edge 为右上角「加载解压缩的扩展」）
* 选择刚才解压的文件夹
* 刷新 Figma 页面即可生效

## Firefox 手动安装

* 点击[下载插件包](https://github.com/Figma-Cool/figmaCN/releases)（选择 `FigmaCN-firefox-x.x.x.zip`）到电脑
* 解压到本地的文件夹
* 打开 Firefox，在地址栏输入 `about:debugging` 回车
* 点击「此 Firefox」→「临时载入附加组件」
* 选择解压目录中的 `manifest.json` 文件
* 刷新 Figma 页面即可生效

## 自动构建与发布

推送到 `v*` 格式的 tag（如 `v1.6.0`）时，GitHub Actions 会自动构建并发布到 Release，产物包括：

* `FigmaCN-chromium-x.x.x.zip` —— Chrome / Edge 通用包
* `FigmaCN-firefox-x.x.x.zip` —— Firefox 专用包（自动改写 `background.scripts` 并补 `browser_specific_settings.gecko.id`）

也可以在 Actions 页面手动触发 `Release` 工作流，并指定要发布的版本号。
