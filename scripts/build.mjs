#!/usr/bin/env node
/**
 * FigmaCN 构建脚本
 *
 * 根据同一份源码，生成两个平台的扩展包：
 * - Chromium（Chrome / Edge）：直接使用根目录 manifest.json（MV3），二者扩展格式完全通用
 * - Firefox：需要 manifest 的 background.service_worker 改写为 background.scripts，
 *   并添加 browser_specific_settings（gecko id），否则 AMO 审核会缺失应用 ID
 *
 * 用法：node scripts/build.mjs
 * 产物：dist/chromium、dist/firefox 两个目录
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// 需要打包进每个平台的源文件 / 目录（相对仓库根）
// 注意：manifest.json 由 buildTarget 单独写入（可能带平台 override），不在此列表
const SHARED_FILES = [
  'js/content.js',
  'js/background.js',
  'js/translations.json',
  'img',
  'LICENSE',
  'README.md',
];

// Firefox (AMO) 上注册的固定 addon ID，更新版本时必须保持一致
// 来源：https://addons.mozilla.org/api/v5/addons/addon/figmacn/ 的 guid 字段
const FIREFOX_ID = '{60e40d1e-1089-4e17-9559-6d8aa7e922d0}';

async function copyFile(src, dest) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.cp(src, dest, { recursive: true });
  } else {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
  }
}

async function readManifest() {
  const raw = await fs.readFile(path.join(ROOT, 'manifest.json'), 'utf8');
  return JSON.parse(raw);
}

// 同步油猴脚本版本号：把 figmaCN.user.js 的 @version 改写为 manifest 的 version
// 让油猴脚本跟随插件版本一起更新，避免两处手动维护导致漂移
async function syncUserscriptVersion(version) {
  const file = path.join(ROOT, 'scripts', 'figmaCN.user.js');
  try {
    await fs.access(file);
  } catch {
    // 油猴脚本不存在时静默跳过，不影响扩展打包
    return;
  }
  const src = await fs.readFile(file, 'utf8');
  const next = src.replace(/\/\/\s*@version\s+.*/, `// @version      ${version}`);
  if (next !== src) {
    await fs.writeFile(file, next, 'utf8');
    console.log(`[build] synced figmaCN.user.js @version -> ${version}`);
  }
}

async function buildTarget(targetName, manifestOverride) {
  const targetDir = path.join(DIST, targetName);
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(targetDir, { recursive: true });

  // 写入 manifest（可带 override）
  const manifest = manifestOverride ? manifestOverride(await readManifest()) : await readManifest();
  await fs.writeFile(
    path.join(targetDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  // 拷贝共享文件
  for (const rel of SHARED_FILES) {
    const src = path.join(ROOT, rel);
    try {
      await fs.access(src);
    } catch {
      // 某些文件可能不存在（如 LICENSE），跳过
      continue;
    }
    await copyFile(src, path.join(targetDir, rel));
  }

  console.log(`[build] ${targetName} -> ${path.relative(ROOT, targetDir)}`);
  return targetDir;
}

function firefoxManifest(base) {
  const m = JSON.parse(JSON.stringify(base));
  // Firefox MV3 仍支持 background.scripts，service_worker 在 Firefox 稳定支持较晚，
  // 为兼容性与 AMO 审核改为 scripts 形式
  if (m.background && m.background.service_worker) {
    m.background = { scripts: [m.background.service_worker] };
  }
  m.browser_specific_settings = {
    gecko: { id: FIREFOX_ID, strict_min_version: '115.0' },
  };
  return m;
}

async function main() {
  const version = (await readManifest()).version;
  console.log(`[build] FigmaCN v${version}`);

  // 先同步油猴脚本版本，再打包扩展
  await syncUserscriptVersion(version);

  await buildTarget('chromium');
  await buildTarget('firefox', firefoxManifest);

  console.log('[build] done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
