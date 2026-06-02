# Prompt Card Schema

## 為什麼先定義 Schema

Prompt Manager 會有多種版本：

- 本地 HTML 版
- Chrome 外掛版
- GAS / Google Sheet 同步版

如果每個版本都自己定義資料格式，專案很快會分裂。

所以本專案先定義共用資料模型：

> 介面可以不同，但 Prompt Card 的核心欄位必須一致。

## 資料總覽

最外層是一個陣列，每個項目是一個分類。

```json
[
  {
    "id": "rfp",
    "title": "01_標前需求預判",
    "description": "用於讀取 RFP、抽取硬性需求與建立初始 checklist。",
    "items": []
  }
]
```

每個分類底下有多張 Prompt Card。

```json
{
  "id": "rfp-checklist",
  "title": "讀取外部 RFP 自動預判 Checklist",
  "description": "讓 AI 協助抽取招標文件中的硬性要求。",
  "promptText": "請深度閱讀 [RFP_Path]，整理四大合規需求。",
  "tags": ["RFP", "合規"],
  "status": "stable"
}
```

## Category 欄位

| 欄位 | 必填 | 說明 |
| --- | --- | --- |
| `id` | 是 | 分類 ID，建議使用英文小寫與 dash |
| `title` | 是 | 顯示在畫面上的分類名稱 |
| `description` | 否 | 分類用途說明 |
| `items` | 是 | Prompt Card 陣列 |

## Prompt Card 欄位

| 欄位 | 必填 | 說明 |
| --- | --- | --- |
| `id` | 是 | Prompt 卡片 ID |
| `title` | 是 | 卡片標題 |
| `description` | 否 | 教學說明與預期輸出 |
| `promptText` | 是 | Prompt 模板本文 |
| `tags` | 否 | 標籤陣列 |
| `status` | 否 | `stable`、`draft`、`review`、`deprecated` |

## 變數格式

支援兩種變數格式：

```text
[PM]
{{PM}}
```

建議教材與範例優先使用 `[Variable_Name]`，因為對初學者比較直覺。

常用變數：

| 變數 | 用途 |
| --- | --- |
| `[PM]` | 專案經理或負責人 |
| `[Client]` | 客戶或外部單位 |
| `[Target_SLA]` | 目標服務水準 |
| `[Location]` | 專案地點 |
| `[RFP_Path]` | 招標文件或資料路徑 |

## Google Sheet 對應

GAS 版可以使用以下欄位：

| Google Sheet 欄位 | 對應 Schema |
| --- | --- |
| `CategoryId` | category.id |
| `CategoryTitle` | category.title |
| `Id` | item.id |
| `Title` | item.title |
| `Description` | item.description |
| `PromptText` | item.promptText |
| `Tags` | item.tags，以逗號分隔 |
| `Status` | item.status |

若 Google Sheet 使用多分頁模式，也可以讓每個分頁代表一個 category。

## 設計原則

- Schema 要簡單，讓非工程師也能看懂
- Prompt Card 只描述 Prompt，不混入 UI 狀態
- 變數只做文字代入，不做複雜程式邏輯
- 顯示介面可以擴充，但不要破壞資料格式
