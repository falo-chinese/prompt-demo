# 專案定位：Prompt 管理器主題單元

## 核心概念

Prompt Manager 的重點不是「收集很多 Prompt」。

真正的重點是：

> 把 Prompt 從一次性文字，升級成可管理、可分發、可治理的工作流資產。

在 FALO 產品線中，本專案屬於 **FALO Prompt**。

```text
FALO Book    = Knowledge，讓使用者理解
FALO Prompt  = Skill，讓使用者快速套用與共創
FALO Runtime = Execution，讓事情真正發生
```

所以目前要先把 Prompt Asset Management 做好，不要太早把 Runtime / Capability Pack 的複雜度搬進 v0.3。

對初學者來說，這個主題可以幫他們跨過一個重要門檻：

- 從「我會問 AI 問題」
- 進到「我會設計可重複使用的 AI 工作流指令」

## 它解決什麼問題

傳統 Prompt 使用方式常見問題：

| 問題 | 結果 |
| --- | --- |
| Prompt 散落在聊天紀錄、Word、Notion | 找不到、版本混亂 |
| 每次手動改人名、路徑、SLA | 容易漏改或改錯 |
| 沒有分類與標籤 | 新手不知道何時用哪張 Prompt |
| 沒有預期輸出說明 | Prompt 雖然能用，但難以教學 |
| 團隊更新靠人工通知 | 管理成本高 |

Prompt Manager 的做法：

| 做法 | 效果 |
| --- | --- |
| Prompt Card | 每張 Prompt 有標題、說明、標籤、狀態 |
| Category | 分類可對應課程章節或工作流程階段 |
| Variables | 用 `[PM]`、`[Client]` 等變數減少手動改字 |
| Workflow Step | 每張卡知道自己在流程中的用途、輸入、輸出與人工檢查點 |
| JSON Schema | 讓本地、外掛、GAS 共用資料格式 |
| Copy Ready | 一鍵產生可直接貼給 AI 的完整指令 |

## 三種版本的關係

### 1. 本地 HTML 版

本地版是教學起點。

它適合示範：

- Prompt 如何變成卡片
- JSON 如何驅動 UI
- 變數如何即時代入
- 單檔工具如何離線使用

### 2. Chrome 外掛版

Chrome 版是工作流嵌入。

它適合示範：

- Prompt 工具如何跟日常瀏覽器工作結合
- 如何在不同網站、文件、AI 工具旁邊取用 Prompt
- 側邊欄如何成為 AI workflow control panel

### 3. GAS 同步版

GAS 版是團隊維護與分發。

它適合示範：

- Google Sheet 如何成為非工程師可管理的後台
- Apps Script 如何提供簡單 API
- 管理員更新資料後，使用者介面如何同步

## 一句話教學說法

> Prompt 管理器不是 Prompt 倉庫，而是 AI 工作流的指令中控台。
