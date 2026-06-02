# FALO Product Strategy Alignment

本文用途：對齊 FALO Prompt Manager 目前所屬產品線，避免太早把 Runtime / Capability Pack 的複雜度帶進 v0.3。

結論先說：

> 先把 Prompt 做成產品。Capability Pack 留在藍圖。不要急著把 Runtime 搬進來。

---

## 1. 第一原則

Capability Pack / 功能卡概念保留。

但它不主導 v0.3。

FALO Prompt Manager 還在產品雛型階段，前期不需要太早處理：

- 授權
- Marketplace
- 金流
- 完整 GAS 派送
- 加密簽章
- Runtime 功能治理

v0.3 的重點是先把 Prompt 主功能做到：

- 好用
- 可教
- 可展示
- 可分享
- 可逐步升級

---

## 2. FALO 未來三條產品線

### 2.1 FALO Book

定位：學習、閱讀、教材。

對象：

- 一般人
- 學員
- 老師
- SME 老闆

內容：

- 電子書
- 教材
- NotebookLM 學習包
- 題庫
- 案例
- 圖文

核心：Knowledge

目的：讓使用者理解。

### 2.2 FALO Prompt

定位：Prompt Asset Management。

對象：

- AI 使用者
- Prompt Engineer
- Skill Engineer
- Context Engineer
- 顧問

內容：

- Prompt Pack
- KM Pack
- Workflow Prompt
- Prompt Card
- Variable
- Context

核心：Skill

目的：讓使用者快速套用與共創。

### 2.3 FALO Runtime

定位：能力執行平台。

對象：

- 顧問
- PM
- 工程師
- 企業

內容：

- Capability Pack
- Connect Pack
- Workflow Pack
- Agent Pack
- API Credits

核心：Execution

目的：讓事情真正發生。

---

## 3. 本專案位置

現在這個專案：

```text
FALO Prompt Manager
```

主要屬於：

```text
FALO Prompt
```

不是：

```text
FALO Runtime
```

因此，Capability Pack 可以保留在設計文件、schema 與 roadmap 中，但不要讓它成為 v0.3 的主功能。

---

## 4. v0.3 優先順序

v0.3 先把 Prompt Manager 做好。

優先：

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

這一版不應把時間花在完整授權、Runtime、Marketplace 或 GAS 線上服務。

---

## 5. Workflow 思維

目前要把每張 Prompt 視為：

```text
Prompt + Workflow Step
```

而不是孤立文字。

每張卡都要知道：

- 用途
- 輸入
- 輸出
- 人工檢查點
- 所屬流程

這是 v0.3 最重要的升級。

---

## 6. Capability Pack 的位置

Capability Pack 保留，但先不要實作。

現階段只保留：

- docs
- schema
- roadmap

等 Prompt Manager 成熟後，再往 Runtime 演進。

簡單說：

```text
v0.3 = Prompt Asset Layer
future = Runtime / Capability Pack Layer
```

---

## 7. 正式架構觀念

```text
Google Drive
  = Single Source of Truth

NotebookLM
  = Knowledge Interface

GAS
  = Distribution Hub

FALO Prompt
  = Prompt Asset Layer

FALO Runtime
  = Execution Layer
```

這個分工很重要：

- Google Drive 管內容來源。
- NotebookLM 幫人理解。
- GAS 負責分發。
- FALO Prompt 管 Prompt / Workflow / Context。
- FALO Runtime 才負責真正執行與能力調度。

---

## 8. 對目前專案的決策

### 8.1 要做

- 強化 Prompt Card 欄位。
- 讓卡片清楚呈現用途、輸入、輸出、人工檢查點、Workflow Step。
- 強化搜尋、分類、標籤、狀態。
- 保持 PWA 可展示、可教學。
- 讓 README 能清楚說明本專案屬於 FALO Prompt。

### 8.2 先不做

- Capability Pack 匯入啟用 UI
- Runtime marketplace
- GAS 登入
- 授權 / 加密簽章
- API credits
- 真正 Capability Pack 派送

### 8.3 保留

- Capability Pack 設計文件
- Capability Pack schema
- Roadmap 裡的 Runtime 演進方向

---

## 9. 實作策略

下一步若動 `index.html`，應優先改 Prompt 主功能，而不是 Capability Pack。

建議順序：

1. 強化 Prompt Card 顯示欄位。
2. 顯示 Workflow Step 與所屬流程。
3. 讓搜尋涵蓋 tags、status、workflow、expectedOutput、humanReviewPoints。
4. 改善變數代入與一鍵複製。
5. 補 README / docs 教學說法。
6. Capability Pack 維持在 docs / schema / roadmap，不接 UI。

---

## 10. 一句話收斂

> 先把 Prompt 產品打磨到能教、能用、能分享，再往 Runtime 與 Capability Marketplace 演進。
