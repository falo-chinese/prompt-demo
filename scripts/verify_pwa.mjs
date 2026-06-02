import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDir = path.join(root, "packages", "local-html");
const indexPath = path.join(appDir, "index.html");
const manifestPath = path.join(appDir, "manifest.webmanifest");
const swPath = path.join(appDir, "service-worker.js");
const examplePath = path.join(root, "examples", "prompt_database_template.json");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function assertIncludes(text, needle, label) {
  assert.ok(text.includes(needle), `${label} should include ${needle}`);
}

const index = read(indexPath);

assert.ok(fs.existsSync(manifestPath), "manifest.webmanifest should exist");
assert.ok(fs.existsSync(swPath), "service-worker.js should exist");

const manifest = JSON.parse(read(manifestPath));
assert.equal(manifest.name, "FALO Prompt Manager v1.01");
assert.equal(manifest.version, "v1.01");
assert.equal(manifest.author, "Falo x Force Cheng");
assert.equal(manifest.display, "standalone");
assert.equal(manifest.start_url, "./index.html");

const example = JSON.parse(read(examplePath));
const serializedExample = JSON.stringify(example);

for (const category of [
  "OCR 資料轉換",
  "Voice 口述輸入",
  "JSON Connect 匯入整理",
  "Gemini OCR 影像策略檢查"
]) {
  assertIncludes(serializedExample, category, "example prompt database");
}

for (const token of [
  "manifest.webmanifest",
  "service-worker.js",
  "installButton",
  "exportButton",
  "backupButton",
  "themeSelect",
  "voiceButton",
  "Voice_Text",
  "OCR 資料轉換",
  "openOcrWorkbenchButton",
  "https://falo-taiwan.github.io/ai-ocr-demo/",
  "Gemini OCR 影像策略檢查",
  "navigator.serviceWorker",
  "beforeinstallprompt"
]) {
  assertIncludes(index, token, "index.html");
}

const scripts = [...index.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
assert.equal(scripts.length, 1, "index.html should keep a single inline app script");
for (const script of scripts) {
  new Function(script);
}

const sw = read(swPath);
assertIncludes(sw, "CACHE_NAME", "service worker");
assertIncludes(sw, "install", "service worker");
assertIncludes(sw, "fetch", "service worker");

console.log("pwa-verification-ok");
