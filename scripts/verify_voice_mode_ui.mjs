import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const url = process.env.FALO_PROMPT_URL || "http://127.0.0.1:4174/packages/local-html/index.html?verify=voice-mode-ui";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1300 } });

try {
  await page.addInitScript(() => {
    class FakeSpeechRecognition {
      constructor() {
        this.lang = "";
        this.interimResults = false;
        this.continuous = false;
      }
      start() {
        window.__fakeRecognition = this;
        this.onstart?.();
      }
      stop() {
        this.onend?.();
      }
    }
    window.SpeechRecognition = FakeSpeechRecognition;
    window.webkitSpeechRecognition = FakeSpeechRecognition;
  });

  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    localStorage.clear();
    for (const key of await caches.keys()) await caches.delete(key);
  });
  await page.reload({ waitUntil: "networkidle" });

  await page.getByRole("button", { name: "編輯" }).first().click();
  await page.locator('textarea[data-draft-field="promptText"]').first().click();
  await page.getByRole("button", { name: "語音插入" }).first().click();

  await assertVisibleText("#voiceCaptureMode", "編輯區語音插入");
  await assertVisibleText("#voiceCaptureTarget", "Prompt 內容編輯");
  await assertVisibleText("#voiceCaptureHelp", "按「停止語音」結束");

  const activeEditorButtons = await page.locator(".button.voice-recording").count();
  assert.ok(activeEditorButtons >= 1, "editor voice button should show recording style");

  await page.evaluate(() => window.__fakeRecognition.stop());
  await assertVisibleText("#voiceCaptureMode", "編輯區語音插入");
  await assertVisibleText("#voiceCaptureTarget", "Prompt 內容編輯");

  console.log("voice-mode-ui-ok");
} finally {
  await browser.close();
}

async function assertVisibleText(selector, text) {
  await page.locator(selector).filter({ hasText: text }).first().waitFor({ state: "visible", timeout: 5000 });
}
