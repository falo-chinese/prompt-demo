# AI_Teach_Classroom / aiocr-pro01 Gemini OCR 參考整理

本文用途：把 `AI_Teach_Classroom` 與 `falo-taiwan/aiocr-pro01` 裡的 Gemini OCR 模型路由、影像處理方式、資料保存邊界，整理成 FALO Prompt Manager v0.3 的參考設計。

參考來源：

- GitHub repo: https://github.com/falo-taiwan/aiocr-pro01
- 本次檢視的 clone：`/tmp/aiocr-pro01-reference`
- 主要檔案：`README.md`、`docs/runtime-notes.md`、`index.html`
- 本機參考：`/Users/force/AI-CodeX/AI_Teach_Classroom/gemini35-ocr`
- 本機參考：`/Users/force/AI-CodeX/AI_Teach_Classroom/falo_ocr_server_node/docs`

注意：本文件是「參考設計」，不是要把 Pro01 的完整 OCR/HITL 系統搬進 Prompt Manager。Prompt Manager v0.3 仍維持教材版、PWA、本地優先、無後端。

---

## 1. Pro01 的核心定位

`aiocr-pro01` 不是單純發票 OCR 頁面，而是一個 local-first 的文件 AI ETL / HITL workbench。

它的流程可簡化為：

```text
image / document / form
-> template field schema
-> prompt schema
-> AI1 / AI2 proposal
-> human reconciliation
-> confirmed result
-> evidence package export
```

對 Prompt Manager 的啟發：

- OCR 不應只是「辨識文字」。
- OCR 後要進入 Prompt、Schema、人工檢查、JSON 匯出。
- Prompt Manager 目前只需要保留「資料入口 + Prompt 題庫 + JSON Connect」，不需要先做完整 reconciliation table。

---

## 2. Gemini 模型路由參考

參考專案裡出現兩種路線：一種是教學用直接瀏覽器呼叫，另一種是 Pro02 Runtime Adapter 中轉。對 Prompt Manager v0.3 來說，這些都先作為「模型菜菜單上的廚師選項」，不直接啟動 API。

### 2.1 教學型 Gemini 直接呼叫路線

`gemini35-ocr` 的公開教學路線：

| 角色 | 模型 | 用途 |
| --- | --- | --- |
| Main low-cost route | `gemini-3.1-flash-lite` | 清楚 A4 圖片的第一版 JSON 草稿 |
| Stronger review route | `gemini-3.5-flash` | 小字、表格、手寫或結果衝突時的第二輪審查 |
| Baseline comparison | `gemini-2.5-flash` | 舊路線比較 |
| Older lite baseline | `gemini-2.5-flash-lite` | 歷史低成本比較 |

### 2.2 Pro01 / Pro02 Runtime 路線

Pro01 B 版在 UI 文案中採用過兩種 Gemini 雙模型路由：

| 路由 | AI1 | AI2 | 用途 |
| --- | --- | --- | --- |
| 預設雙模型 | `gemini-2.5-flash` | `gemini-3.1-flash-lite` | 一般比較 / 教學展示 |
| 強化雙模型 | `gemini-3.1-flash-lite` | `gemini-3.5-flash` | 較高精度或較難圖片 |

Pro02 Runtime 文件則把 Gemini 視為 `google_gemini` adapter，Client 不需要直接知道模型主機，只需要送出 adapter、model、input normalization mode 與 runtime prompt。

重要提醒：這些模型名稱是本機參考專案與 repo 中的設計記錄。未來真正接 API 前，要再用 Google 官方文件或實測確認當下可用模型。

對 Prompt Manager 的採用建議：

1. v0.3 不直接跑 Gemini API，只在 OCR / Gemini 預留區放「參考路由」。
2. 如果未來要接 Gemini API，先做單模型測試，再做雙模型比較。
3. 教學時可以說明：
   - AI1 是第一位廚師
   - AI2 是第二位廚師
   - 人工檢查是品管
   - 最終確認結果才是暫時 ground truth

---

## 3. Gemini API 呼叫方式參考

瀏覽器教學版使用 `generateContent`，並建議把 image part 與 text prompt 一起送出。

```text
POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
```

Payload 概念：

```json
{
  "contents": [
    {
      "parts": [
        {
          "inline_data": {
            "mime_type": "image/webp",
            "data": "base64-image-without-prefix"
          }
        },
        { "text": "OCR prompt text" }
      ]
    }
  ],
  "generationConfig": {
    "responseMimeType": "application/json",
    "temperature": 0
  }
}
```

對 Prompt Manager 的採用建議：

- v0.3 保留 API Key 欄位，但不主動送出，也不儲存 API key。
- 未來接 API 時，API key 只能存在使用者瀏覽器或當次 job，不寫入公開原始碼、log、SQLite、JSON export。
- Prompt Card 應先教使用者如何寫 OCR prompt 與 JSON output contract。

---

## 4. 影像處理策略參考

這次從 `AI_Teach_Classroom` 看到更完整的重點：影像準備和 prompt 一樣重要。教材上要讓學員理解，OCR 不是「越大越好」，而是要清楚、可讀、成本合理、可追蹤。

影像轉換優先留在瀏覽器本機，用 Canvas API 完成，不需要本地 Python server、OCR server 或 OS 工具。

### 4.1 教學版 WebP Preset

`gemini35-ocr` 的公開預設：

```text
Input: local image file
Preprocess: browser Canvas
Output: WebP
Max long side: 768 px
Quality: 0.85
Upscale: no
```

推薦 preset：

| Preset | 格式 | 長邊 | 品質 | 用途 |
| --- | --- | --- | --- | --- |
| Trial | WebP | 768 | 0.85 | 快速低成本試辨識 |
| Balanced | WebP | 1280 | 0.88 | 一般 A4 文件 |
| Detail | WebP | 1600 | 0.9 | 小字、表格、較密集版面 |
| Archive evidence | Original | 不變 | 不變 | 保留原始證據 |

### 4.2 Runtime Normalization Preset

Pro01 / Pro02 也有 runtime-oriented 的送圖策略，適合日後做成 adapter 或 OCR server。

| 策略 | 格式 | 縮放規則 | 用途 |
| --- | --- | --- | --- |
| `original` | 原檔 | 不轉檔 | 證據優先，保留來源 |
| `webp_ocr_768` | WebP | 長邊超過 768px 才縮小，quality 0.85 | 教學版低成本 Gemini OCR trial |
| `jpg_compressed` | JPEG | 長邊超過 1400px 才縮小，quality 0.6 | 小檔、快速，可能傷文字邊緣 |
| `jpg_high` | JPEG | 長邊超過 2200px 才縮小，quality 0.9 | 照片型文件 |
| `png_standard` | PNG | 長邊約 1600-1800px | 一般 OCR / AI vision 平衡點 |
| `png_high` | PNG | 長邊約 3000-3200px | 小字、章戳、掃描件、難辨識文件 |

不同 prototype 使用的長邊數值略有差異，所以 Prompt Manager 不把數值寫死成唯一標準；應記錄 `strategy`、`max_long_side`、`quality`，讓日後可比較。

### 4.3 關鍵原則

```text
Do not upscale small images.
```

原因：

- 放大不會創造真實細節。
- 會增加傳輸成本與 token / tile 成本。
- 可能讓模糊文字變大，但不一定更準。

對 Prompt Manager 的採用建議：

- v0.3 先不做圖片轉檔 UI，但把策略寫進 OCR 題庫與參考文件。
- v0.4 若做最輕量 Gemini OCR，可先只做 `webp_ocr_768`、`balanced_webp_1280` 和 `png_standard` 三種。
- 教學時可以把它說成「送菜前先切適合入口大小」：不是越大越好，而是要清楚、可辨識、成本合理。

---

## 5. Metadata 與資料保存邊界

Pro01 的重要資料邊界：

- API key 不寫入公開原始碼；v0.3 預留欄位不保存 key。
- 若未來教學 demo 暫存 key，必須有清楚的清除按鈕與儲存說明。
- 本地 DB、JSON export、Excel export 不保存原始圖片 bytes。
- 可在工作畫面顯示當前圖片，但持久化紀錄只保留 metadata 與分析結果。

建議記錄的 metadata：

```json
{
  "name": "",
  "type": "",
  "size": 0,
  "size_kb": 0,
  "width": 0,
  "height": 0,
  "strategy": "",
  "strategy_label": "",
  "converted": true,
  "resized": false,
  "scale": 1,
  "max_long_side": 768,
  "quality": 0.85
}
```

對 Prompt Manager 的採用建議：

- `Input Material JSON` 不存圖片 base64。
- 只存 OCR 文字、摘要、來源、圖片 metadata、模型名稱、影像策略與人工檢查點。
- 若未來做 HTML evidence package，machine-readable JSON block 不應包含圖片 bytes。

建議 `Input Material JSON` 形狀：

```json
{
  "type": "inputMaterial",
  "source": "gemini-ocr",
  "rawText": "",
  "summary": "",
  "imageMetadata": {
    "source": {
      "name": "",
      "mime_type": "",
      "width": 0,
      "height": 0,
      "size_bytes": 0
    },
    "sent": {
      "mime_type": "image/webp",
      "width": 0,
      "height": 0,
      "size_bytes": 0,
      "strategy": "webp_long_side_768_quality_085",
      "quality": 0.85,
      "upscaled": false
    }
  },
  "model": "gemini-3.1-flash-lite",
  "review_flags": []
}
```

---

## 6. Multi-source Vision Runtime 觀念

`AI_Teach_Classroom` 裡的 Pro02 文件提醒：OCR / Vision 不應綁死單一引擎。真正的治理流程是：

```text
OCR / Vision Source Adapter
-> Prompt-based Extraction
-> Structured JSON
-> Normalization
-> Audit Trail
-> HITL
-> ERP / Workflow ETL
```

對 Prompt Manager 的意義：

- `Gemini Vision`、`AI Browser`、`PaddleOCR`、`Human Input` 都可以是資料來源。
- 每個來源都要收斂成同一種 `Input Material JSON` 或 Prompt Card 變數。
- v0.3 不處理 runtime orchestration，但要先把 Prompt、Schema、Workflow 位置設計對。

---

## 7. 對 Prompt Manager v0.3 的落地方式

v0.3 只採用以下「參考級」內容：

1. OCR / Gemini 預留區文案註明 `AI_Teach_Classroom` 與 Pro01 參考策略。
2. OCR Prompt Pack 補一張「Gemini OCR 影像策略檢查」卡片。
3. 文件記錄模型路由、影像策略、metadata 保存邊界。
4. JSON Connect 繼續作為主線，不強迫本系統直接呼叫 Gemini API。

v0.3 不做：

- 不做完整圖片上傳與 Gemini API OCR。
- 不做 AI1 / AI2 reconciliation table。
- 不做 IndexedDB OCR evidence package。
- 不做 Excel export。
- 不做圖像 base64 持久化。

---

## 8. 未來 v0.4 可考慮

若要把 Gemini OCR 做進 Prompt Manager，可以採最小步：

1. 新增圖片選擇欄位。
2. Canvas 轉 `webp_ocr_768` 或 `balanced_webp_1280`。
3. 呼叫單一 Gemini 模型。
4. 把結果寫入 `[OCR_Text]`。
5. 產生 `Input Material JSON`。
6. 匯出時只保留 metadata，不保留圖片 bytes。

等這條穩了，再考慮：

- 預設雙模型
- 強化雙模型
- AI1 / AI2 比對
- Human confirmed as temporary ground truth

---

## 9. 教學說法

可以這樣對學員說：

> OCR 不是按一下辨識完就結束。真正重要的是：圖片如何被送進模型、模型如何輸出 JSON、人如何檢查、最後資料如何進入 Prompt workflow。

也可以接回模型菜：

> OCR 是把紙本食材洗乾淨；影像策略是切菜大小；Gemini 模型是廚師；JSON Connect 是把成品裝成標準餐盒；人工審查是出餐前品管。
