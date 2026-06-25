// ==UserScript==
// @name         Figma CN
// @namespace    https://figma.cool
// @match        *://*.figma.com/*
// @icon         https://cdn.jim-nielsen.com/macos/1024/figma-2021-05-05.png
// @license      GPL-3.0 license
// @version      1.7.0
// @description  中文 Figma 插件，设计师人工翻译校验。远程加载仓库最新代码，跟随 master 分支自动更新。
// @author       Figma-Cool
// @homepageURL  https://figma.cool
// @supportURL   https://github.com/Figma-Cool/figmaCN/issues
// @run-at       document-end
// @connect      raw.githubusercontent.com
// @connect      *.githubusercontent.com
// ==/UserScript==

(function () {
    'use strict';

    // 远程脚本基础路径：始终拉取 master 分支最新版本
    const rawBase = 'https://raw.githubusercontent.com/Figma-Cool/figmaCN/refs/heads/master';
    const contentScriptUrl = `${rawBase}/js/content.js`;
    // 翻译数据已从 translations.js 迁移为 JSON 格式，可直接解析，无需 new Function 求值
    const translationsUrl = `${rawBase}/js/translations.json`;

    console.log('FigmaCN 脚本开始加载...');

    Promise.all([
        fetch(contentScriptUrl).then(res => res.text()),
        fetch(translationsUrl).then(res => res.json())
    ])
        .then(([contentScriptText, translationData]) => {
            console.log('FigmaCN: 远程脚本已成功获取。');

            // 校验翻译数据（二维数组：[[key, val], ...]）
            if (!translationData || !Array.isArray(translationData) || translationData.length === 0) {
                throw new Error('FigmaCN: 未能成功解析翻译数据，或者数据为空。');
            }
            console.log(`FigmaCN: 已加载 ${translationData.length} 条翻译词条。`);

            // 移除远程脚本中会引发错误的自动执行调用 `loadTranslationData()`
            // 该函数内部使用了 chrome.runtime.getURL（扩展专属 API），在油猴环境下不可用
            // 使用正则表达式以应对可能的空格差异，增强稳定性
            const modifiedContentScript = contentScriptText.replace(
                /loadTranslationData\s*\(\s*\)\s*;/g,
                '//$& -- 被用户脚本禁用'
            );

            // 创建一个安全的、独立的执行器函数
            // 这个函数接收一个名为 `allData` 的参数
            // 函数体是修改后的远程脚本，它会定义 `initializeTranslation` 函数，然后我们紧接着调用它
            const mainLogicRunner = new Function('allData', `
                // --- 以下是远程 content.js 脚本的内容 ---
                ${modifiedContentScript}
                // --- 远程脚本内容结束 ---

                // 在这个独立的作用域内，直接调用刚刚被定义的函数
                if (typeof initializeTranslation === 'function') {
                    console.log('FigmaCN: 启动翻译引擎...');
                    initializeTranslation(allData);
                    console.log('FigmaCN: 翻译功能已激活！');
                } else {
                    throw new Error('FigmaCN: 核心函数 initializeTranslation 未找到，可能是远程脚本已更新。');
                }
            `);

            // 运行执行器，并传入获取到的翻译数据
            mainLogicRunner(translationData);
        })
        .catch(error => {
            console.error('FigmaCN: 加载或执行脚本时发生严重错误:', error);
        });
})();
