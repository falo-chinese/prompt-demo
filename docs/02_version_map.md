# 版本地圖

## 目前版本

### v1.01 發布標記

| 項目 | 內容 |
| --- | --- |
| 版本 | v1.01 |
| 標記 | Falo x Force Cheng |
| 日期 | 2026/6/1 |
| 交付 | Local-first PWA / single-file HTML 主體 |
| 地理標記 | Taiwan |

v1.01 是 Prompt Manager 教材版的第一個公開展示整理版。它保留 v0.3 的產品骨架，但把本地 PWA、編修模式、變數即時預覽、Voice / OCR 入口與 Warm 主題整理成更適合展示與上課的版本。

| 區塊 | 狀態 | 說明 |
| --- | --- | --- |
| `packages/local-html` | v1.01 | 清爽風格本地 PWA，含 Warm 主題、即時欄位預覽、Voice / OCR 入口 |
| `packages/shared-schema` | 初版 | Prompt Card schema 文件與 JSON Schema |
| `packages/shared-schema/capability-pack.schema.json` | 藍圖 | Runtime 階段預留，不進 v0.3 主線 |
| `packages/chrome-extension` | 預留 | 尚未實作 |
| `packages/gas-sync` | 預留 | 尚未實作 |
| `examples` | 初版 | 共用範例資料 |

## v0.3 優先順序

v0.3 屬於 FALO Prompt，不是 FALO Runtime。

優先把 Prompt Manager 做好：

1. Prompt 分類
2. Prompt Card
3. Variable
4. 搜尋
5. Tag
6. Status
7. Workflow Step
8. 匯入 / 匯出 JSON
9. 教材展示感
10. README 說明

每張 Prompt Card 都要能回答：

- 用途是什麼？
- 需要哪些輸入？
- 預期輸出是什麼？
- 人工檢查點在哪裡？
- 它屬於哪個 Workflow / Step？

## 建議演進順序

1. 穩定本地 HTML 版
2. 補上 schema 驗證與範例資料測試
3. 將本地版抽出可重用的資料處理邏輯
4. 建立 Chrome 外掛版最小 MVP
5. 建立 GAS 同步範例與部署手冊
6. Prompt Manager 成熟後，再評估 Capability Pack / Runtime

## 不急著做的事

- 不急著上大型前端框架
- 不急著做帳號登入
- 不急著做後端資料庫
- 不急著產品化成 SaaS
- 不急著做 Capability Pack 匯入啟用 UI
- 不急著做 Runtime / Marketplace / API credits
- 不急著做完整 GAS 派送與授權

先讓它成為一個乾淨、可教、可複製的 Prompt 管理器主題單元。
