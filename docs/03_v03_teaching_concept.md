# FALO Prompt Manager v0.3 教材版概念對齊稿

本文用途：給 AI 與協作者快速理解 FALO Prompt Manager v0.3 的設計方向。

本文不是最終產品規格，也不是大型平台藍圖。它是給 smf 討論用的概念對齊稿，目標是先確認方向，再決定下一步是否動工。

---

## 1. 一句話定位

FALO Prompt Manager v0.3 是一個可拿來教學的 Prompt 管理器。

它不是一般 Prompt Library，而是把 Prompt 視為可管理、可教學、可備份、可轉換、可逐步接到 workflow 的「指令資產」。

在 FALO 產品線中，這個專案屬於 FALO Prompt。

它目前不是 FALO Book，也不是 FALO Runtime。

更簡單地說：

> Prompt Manager 是 AI Workflow 的指令菜單與資料入口。

交付形態上，v0.3 應走 local-first PWA：

> FALO 模型菜是內容與方法論，PWA 是讓使用者可下載、可安裝、可離線使用的載體。

---

## 2. 這一版的目標

v0.3 的目標不是做大型平台，而是讓使用者與學生能在課堂上看懂：

1. Prompt 可以被分類管理。
2. Prompt 可以被變數化與重複使用。
3. Prompt 可以匯入、匯出、備份。
4. Prompt 不只是問句，而是一個 workflow step。
5. OCR 不是附加功能，而是一種資料轉換 Prompt 題庫。
6. 語音輸入不是語音平台，而是把口述 idea 轉成 Prompt 素材的輕量入口。
7. Gemini Gem、ChatGPT GPTs、小工具可以透過 JSON Connect 把資料接進系統。
8. PWA 讓使用者可以像下載小工具一樣使用這套餐模型菜。

這一版要能展示、能教學、能逐步升級。

Capability Pack / 功能卡概念保留，但它屬於未來 FALO Runtime 藍圖，不主導 v0.3。

---

## 3. 三層定位

### 3.1 好用：日常 Prompt 管理器

使用者可以快速完成：

- 找 Prompt
- 看 Prompt
- 改變數
- 複製 Prompt
- 匯入 JSON
- 匯出 JSON
- 備份資料
- 安裝成 PWA
- 離線打開
- 切換顯示風格
- 用熱鍵加快操作

這一層面向日常使用，不需要理解完整系統架構也能上手。

### 3.2 可教：AI Workflow 教學工具

每張 Prompt Card 不只放 promptText，也要讓學生理解：

- 這張卡適合什麼情境
- 使用前要準備什麼資料
- AI 預期會輸出什麼
- 人要檢查哪些風險
- 它在 workflow 裡是第幾步

因此 v0.3 最重要的升級是：

> 每張卡都是 Prompt，也是 Workflow Step。

這一層面向課程與教學。

### 3.3 可治理：Prompt Asset Management 的雛形

v0.3 不做複雜治理功能，但要預留治理語言：

- status：stable / draft / review / deprecated
- version：Prompt 版本
- source：來源
- author：建立者
- targetAI：適合 ChatGPT / Gemini / Claude / NotebookLM
- role：PM / 講師 / 學員 / 顧問
- course：適用課程

這一層不是要做企業平台，而是讓資料模型先有治理意識。

---

## 4. 和一般 Prompt Library 的差異

| 一般 Prompt Library | FALO Prompt Manager v0.3 |
| --- | --- |
| 收集好用 Prompt | 管理 Prompt 指令資產 |
| 以分類和搜尋為主 | 同時考慮 workflow、教學與資料轉換 |
| Prompt 是孤立文字 | Prompt 是一道模型菜，也是一個 workflow step |
| 使用者自己判斷何時用 | 卡片會說明情境、輸入、輸出與人工檢查點 |
| 只處理文字 prompt | 預留 OCR / Voice / JSON Connect 作為資料入口 |
| 偏收藏工具 | 偏教學工具與工作流前身 |

---

## 5. 模型菜比喻

FALO Prompt Manager 可以用「模型菜菜單」理解。

| 模型菜說法 | 系統概念 |
| --- | --- |
| 每張 Prompt Card 是一道菜 | 一個可執行、可教學、可管理的 Prompt |
| 每個 Workflow 是一套套餐 | 多張 Prompt 按順序形成流程 |
| 每個 Project 是一桌任務 | 某次實際任務或課程練習 |
| 每個 AI Model 是不同廚師 | ChatGPT、Gemini、Claude、NotebookLM |
| 每個變數是食材 | PM、Client、RFP_Path、Target_SLA |
| 每個輸出是成品 | 摘要、表格、Checklist、草稿、JSON |
| humanReviewPoints 是品管檢查點 | 人要確認正確性、風險與可交付性 |
| OCR 是處理紙本食材 | 把圖片、手寫、歷史文件轉成可用素材 |
| Voice 是口頭點菜單 | 把口述 idea、會議片段、臨場想法轉成文字素材 |
| PWA 是可帶走的菜單 | 讓使用者安裝後離線查菜、備料、複製指令 |

教學語言：

> 新手不是背 Prompt，而是學會點菜、備料、看流程、驗成品。

---

## 6. 資料轉換入口：OCR、Voice、JSON Connect

OCR 與語音輸入在此系統中不是附加炫技功能，而是資料轉換入口。

它們的共同目的，是把原本不容易進入 Prompt workflow 的材料，轉成可管理、可備份、可匯入、可套 Prompt 的素材。

```text
歷史文件 / 拍照 idea / 手寫文件 / 截圖 / 紙本資料 / 口述 idea / 會議片段
  ↓
OCR / Vision / Web Speech API / 外部小工具
  ↓
文字 / 摘要 / 表格 / JSON
  ↓
FALO Prompt Manager
  ↓
Prompt Card / Workflow / 教學素材 / Agent 指令
```

因此 v0.3 應把 OCR 視為預設 Prompt 題庫之一，而不是急著做完整 OCR 引擎。

語音輸入也應採取同樣原則：

- 使用瀏覽器 Web Speech API
- 只做開始聽寫 / 停止聽寫
- 轉出的文字放進 `[Voice_Text]`
- 不保存音檔
- 不做長時間會議錄音
- 不做多人語者辨識
- 不接雲端 STT

---

## 7. 內建預設題庫：OCR / Voice / JSON Connect Prompt Pack

v0.3 建議內建一組 OCR / Voice / JSON Connect 資料轉換 Prompt 題庫。

這組題庫的用途是教使用者如何把非結構資料與臨場想法，變成 AI workflow 可使用的素材。

建議 Prompt Card：

| Prompt Card | 用途 |
| --- | --- |
| 拍照 idea 轉文字 | 把白板、便條、現場靈感整理成文字 |
| 手寫文件轉結構化摘要 | 把手寫筆記轉成段落、重點、待辦 |
| 歷史文件 OCR 校正 | 對舊文件 OCR 結果做修正與補漏 |
| 截圖轉表格 | 把圖片中的表格轉成 Markdown / JSON |
| OCR 結果轉 Input Material JSON | 把辨識結果包成系統可匯入格式 |
| OCR 素材轉 Prompt 變數 | 從 OCR 結果抽出 Client、Date、Topic 等變數 |
| OCR 結果風險檢查 | 檢查辨識錯字、欄位缺漏、語意不確定處 |
| Gemini OCR 影像策略檢查 | 檢查 WebP 768、PNG standard、不放大小圖、metadata 保存邊界 |
| 口述 idea 整理 | 把臨時想到的點子整理成條列 |
| 口述需求轉任務清單 | 把口述內容轉成任務、負責人、期限 |
| 課堂即席筆記整理 | 把老師口頭說明整理成教學摘要 |
| 會議片段轉 action items | 把短語音內容整理成決議與待辦 |
| 口述內容轉 Input Material JSON | 把 Voice_Text 包成可匯入素材 |

教學說法：

> OCR 是第一類資料轉換菜。它把照片、手寫、舊文件、截圖，變成後續 Prompt workflow 可以吃的食材。

> Voice 是第二類資料轉換菜。它把口述 idea、課堂即席說明、會議片段，變成可以套 Prompt 的文字食材。

---

## 8. Gemini API 的位置

v0.3 不急著做完整 OCR API。

只預留 Gemini Cloud API 方向：

- Gemini API Key 設定區
- 圖片或文字輸入入口
- 狀態標示為「預留 / 實驗」
- 說明未來可用 Gemini 做 OCR / Vision / 資料轉換
- 影像策略先參考 `AI_Teach_Classroom/gemini35-ocr`：WebP 768 trial、WebP 1280 balanced、WebP 1600 detail、必要時 PNG standard / PNG high
- 核心原則：不放大小圖，不持久化圖片 bytes，只保留 OCR 文字、模型、策略與 metadata

但主線不應依賴 API。

更推薦 v0.3 先支援外部工具輸出 JSON：

- Gemini Gem
- ChatGPT GPTs
- 手動整理工具
- 其他 OCR 小工具

這些工具可以先完成 OCR，再輸出標準 JSON 匯入本系統。

這樣本系統不一定要燒 token，也可以搭配現有 AI 工具。

---

## 9. JSON Connect 概念

JSON Connect 是讓外部 AI 小工具和 FALO Prompt Manager 對接的最小協議。

核心概念：

> 外部工具負責轉換，FALO Prompt Manager 負責接收、整理、管理、備份、套用。

v0.3 建議至少定義兩種 JSON：

### 9.1 Prompt Database JSON

用來管理 Prompt Card 題庫。

用途：

- 匯入 Prompt 題庫
- 匯出 Prompt 題庫
- 備份 Prompt 題庫
- 未來接 GAS / Chrome extension

### 9.2 Input Material JSON

用來接 OCR 或外部小工具轉換後的素材。

也可以接 Web Speech API 轉出的口述文字。

範例：

```json
{
  "type": "inputMaterial",
  "source": "gemini-gem",
  "title": "手寫會議筆記 OCR",
  "contentType": "handwritten-note",
  "rawText": "這裡是 OCR 出來的文字。",
  "summary": "這份筆記主要在討論課程設計與下一步分工。",
  "suggestedTags": ["會議", "手寫", "idea"],
  "variables": {
    "Topic": "課程設計",
    "Owner": "PM"
  },
  "createdAt": "2026-06-01"
}
```

---

## 10. PWA 的位置

v0.3 應明確做成 PWA，但 PWA 只是載體，不代表要做大型平台。

PWA 的用途：

- 讓使用者可以安裝到桌面或 Chrome App
- 沒有網路也能打開 Prompt Manager
- 快取本地 HTML、CSS、JS、範例 JSON
- 搭配匯入、匯出、備份形成 local-first 使用方式
- 上課時可以像一個已安裝工具一樣展示

PWA 架構：

```text
FALO Prompt Manager PWA
  ├─ 離線核心
  │   ├─ Prompt 題庫
  │   ├─ OCR Prompt Pack
  │   ├─ Voice Prompt Pack
  │   ├─ 變數代入
  │   ├─ 搜尋
  │   ├─ 匯入 / 匯出 / 備份
  │   └─ Web Speech API 輕量語音輸入
  │
  └─ 線上擴充
      ├─ Gemini API OCR 預留
      ├─ GAS 同步預留
      └─ 外部 JSON Connect
```

技術上需新增：

- `manifest.webmanifest`
- `service-worker.js`
- PWA icon
- 安裝提示按鈕
- 離線快取策略

注意：PWA 測試通常需要 `localhost` 或 HTTPS，不能只靠 `file://` 完整驗證。

---

## 11. v0.3 功能範圍

### 11.1 應該做

- 清爽本地單檔 HTML
- PWA manifest
- service worker 離線快取
- 安裝到桌面提示
- 預設 Prompt 題庫
- OCR / Voice / JSON Connect 題庫
- 分類切換
- 搜尋
- 變數代入
- Web Speech API 輕量語音輸入
- `[Voice_Text]` 變數
- 一鍵複製
- 匯入 JSON
- 匯出 JSON
- 一鍵備份 JSON
- 還原範例資料
- 熱鍵
- 皮膚切換
- 教學投影模式
- 缺漏變數提示
- 使用說明區

### 11.2 暫時不做

- 後端
- 登入
- 權限系統
- 真正 workflow engine
- 真正 agent runner
- 完整 OCR API
- 完整語音平台
- 音檔保存
- 多人語者辨識
- 長時間會議錄音
- Chrome extension
- GAS 雲同步
- 複雜版本管理

---

## 12. 建議小技巧

這版可以多做小技巧，讓課堂展示有感。

### 12.1 熱鍵

| 熱鍵 | 功能 |
| --- | --- |
| Cmd / Ctrl + K | 快速搜尋 |
| Cmd / Ctrl + Enter | 複製目前選中 Prompt |
| 1 / 2 / 3 | 切換分類 |
| V | 聚焦語音輸入區或切換聽寫 |
| Esc | 清除搜尋或關閉說明 |

### 12.2 皮膚

| 模式 | 用途 |
| --- | --- |
| Light | 日常使用 |
| Dark | 夜間或投影 |
| Warm | 課堂投影與初學者展示，採暖色馬卡龍風格 |

### 12.3 備份

建議提供：

- 匯出目前資料
- 一鍵下載備份
- 檔名自動帶日期，例如 `falo_prompt_backup_20260601.json`
- 還原內建範例

---

## 13. v0.3 UI 構想

建議版面：

```text
上方：
  標題 / 匯入 / 匯出 / 備份 / 安裝 PWA / 皮膚切換

左側：
  分類清單
  題庫來源
  OCR / Voice / JSON Connect 入口提示

中間：
  Prompt Card 列表
  搜尋列
  狀態與標籤

右側：
  變數代入
  語音輸入 Voice_Text
  使用說明
  預期輸出
  人工檢查點

底部或提示區：
  熱鍵提示
  匯入狀態
  備份狀態
  PWA 離線狀態
```

畫面原則：

- 清爽
- 不炫技
- 字要適合投影
- 卡片資訊不要一次塞太滿
- 進階欄位可以折疊

---

## 14. v0.3 Prompt Card 欄位建議

這版不要塞太多欄位，但要比目前更有教學性。

### 必做欄位

```json
{
  "id": "ocr-handwritten-summary",
  "title": "手寫文件轉結構化摘要",
  "description": "把手寫筆記或拍照文件整理成段落、重點與待辦。",
  "promptText": "請將以下 OCR 文字整理成摘要、待辦與風險提醒：\\n[OCR_Text]",
  "tags": ["OCR", "手寫", "摘要"],
  "status": "stable",
  "variables": ["OCR_Text"],
  "expectedOutput": "摘要、重點、待辦事項、需要人工確認的模糊處。",
  "humanReviewPoints": ["人名是否辨識正確", "日期是否正確", "手寫模糊字是否需要回看原圖"]
}
```

語音輸入 Prompt Card 範例：

```json
{
  "id": "voice-idea-to-actions",
  "title": "口述 idea 轉任務清單",
  "description": "把臨場口述內容整理成可以追蹤的任務清單。",
  "promptText": "請將以下口述內容整理成：摘要、任務清單、可能風險、下一步建議：\\n[Voice_Text]",
  "tags": ["Voice", "口述", "任務"],
  "status": "stable",
  "variables": ["Voice_Text"],
  "expectedOutput": "摘要、任務、負責人或待補資訊、下一步。",
  "humanReviewPoints": ["語音辨識是否誤聽", "任務是否過度推論", "是否需要補充時間或負責人"]
}
```

### 可先預留、不一定顯示

- version
- source
- author
- targetAI
- role
- course
- workflowId
- workflowStep
- riskNotes
- createdAt
- updatedAt

---

## 15. 建議預設分類

v0.3 預設題庫可以先放：

1. 基礎 Prompt 管理
2. RFP / 標案工作流
3. 現場經驗轉 Prompt
4. OCR 資料轉換
5. Voice 口述輸入
6. JSON Connect 匯入整理

其中 OCR、Voice 與 JSON Connect 是這版的亮點。

---

## 16. 給 smf 討論的問題

建議討論時先問這些問題：

1. v0.3 是否應明確命名為「教材版」？
2. OCR 是否先以 Prompt 題庫為主，而不是 API 功能為主？
3. Voice 是否先採 Web Speech API 的最輕量輸入，不做語音平台？
4. PWA 是否作為 v0.3 的正式交付形態？
5. JSON Connect 是否要成為對外工具整合的核心語言？
6. 預設題庫要偏 RFP 案例，還是偏通用課程案例？
7. 皮膚與熱鍵是否適合放進第一波改版？
8. Input Material JSON 是否要和 Prompt Database JSON 分開？

---

## 17. 建議結論

v0.3 應收斂成「教材展示版」：

- 它要比一般 Prompt Library 強。
- 但不要變成大型平台。
- 它要能教出 Prompt Asset Management 的觀念。
- OCR 要作為預設題庫與資料轉換入口。
- Voice 要作為最輕量的口述資料入口。
- PWA 是使用者可下載、可安裝、可離線使用的載體。
- JSON Connect 是未來接 Gemini Gem、ChatGPT GPTs、小工具、GAS、Chrome extension 的共同語言。

一句話：

> 先做一個能上課、能展示、能安裝、能離線、能備份、能匯入匯出、能理解 OCR 與語音資料轉換的 Prompt Manager 教材版。
