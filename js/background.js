chrome.runtime.onInstalled.addListener(function (details) {
  // 仅在首次安装时打开主页，避免每次更新都弹标签页打扰用户
  if (details && details.reason === 'install') {
    chrome.tabs.create({ url: 'https://figma.cool' });
  }
});
