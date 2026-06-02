# FALO Runtime Capability Pack 藍圖

本文用途：保留 Capability Pack / 功能卡概念，作為未來 FALO Runtime 的藍圖。

重要更新：

> Capability Pack 概念保留，但不主導 FALO Prompt Manager v0.3。

目前 FALO Prompt Manager 屬於 FALO Prompt，也就是 Prompt Asset Layer。v0.3 要先把 Prompt 分類、Prompt Card、Variable、搜尋、Tag、Status、Workflow Step、匯入匯出與教材展示感做好。

Capability Pack 只保留在 docs / schema / roadmap，等 Prompt Manager 成熟後，再往 FALO Runtime 演進。

---

## 1. 一句話

> 殼公開，卡分級；離線先匯入，線上接 GAS。

FALO Prompt Manager 的 GitHub / PWA 公開版不應把所有能力直接公開在前端。公開版應該是一個可安裝、可展示、可教學的 Shell。

真正啟用哪些 Prompt、Workflow、OCR 後處理、Voice 整理、RFP 卡片，應由功能卡包決定。

這句話是 Runtime 階段藍圖，不是 v0.3 實作要求。

---

## 2. 產品定位

未來公開 GitHub / PWA 版可以是：

- 教學展示殼
- PWA Shell
- Prompt Manager 基礎框架
- 功能卡槽展示
- 離線功能包匯入容器
- 未來 GAS 租用服務前端

它不是：

- 完整 SaaS
- 完整授權系統
- OCR 雲端服務
- Prompt marketplace
- 加密授權平台

這個定位可以讓公開版保持乾淨，也保留未來分級教材、內訓包、授權包、GAS 線上包的空間。

但目前 v0.3 不做功能卡包匯入啟用 UI。

---

## 3. 三層架構

```text
Public PWA Shell
  ↓
Offline Capability Pack JSON
  ↓
Future GAS Online Capability Pack
```

### 3.1 Public PWA Shell

公開 Shell 負責：

- 顯示功能槽位
- 顯示鎖定 / 已啟用狀態
- 匯入離線功能卡包
- 匯出本地資料與備份
- 預留 GAS Endpoint / Account / Token 欄位
- 本地儲存已匯入 pack metadata

公開 Shell 不負責：

- 真正帳號驗證
- 付費授權
- 加密簽章驗證
- 遠端租用邏輯
- 大型 marketplace

### 3.2 Offline Capability Pack

離線功能卡包是一個 JSON 檔。

未來可能使用者可匯入：

- `falo_capability_pack_basic.json`
- `falo_capability_pack_ocr.json`
- `falo_capability_pack_voice.json`
- `falo_capability_pack_rfp.json`
- `falo_capability_pack_teaching.json`

匯入後，Shell 才會啟用對應功能。

目前不進 v0.3。

### 3.3 Future GAS Online Capability Pack

未來使用者可在 PWA 輸入：

- GAS Endpoint
- Account
- Password / Token

然後由 FALO GAS Web App 回傳該帳號可用的功能包。

目前只作為 roadmap，不做真正連線。

---

## 4. 功能槽位

Shell 可以公開顯示功能槽位，但預設不一定啟用。

| Slot | Capability | 未啟用時顯示 |
| --- | --- | --- |
| Prompt 管理 | `prompt.basic` | 此功能需要匯入 Basic Pack 或連線 FALO GAS 啟用 |
| OCR 功能卡槽 | `ocr.postprocess` | 此功能需要匯入 OCR Pack 或連線 FALO GAS 啟用 |
| Voice 功能卡槽 | `voice.dictation` | 此功能需要匯入 Voice Pack 或連線 FALO GAS 啟用 |
| JSON Connect | `json.connect` | 此功能需要匯入 Basic Pack 或連線 FALO GAS 啟用 |
| Workflow / RFP | `workflow.rfp` | 此功能需要匯入 RFP Pack 或連線 FALO GAS 啟用 |
| Teaching Demo | `teaching.demo` | 此功能需要匯入 Teaching Pack 或連線 FALO GAS 啟用 |
| GAS 功能包 | `gas.connect` | 此功能尚未連線，僅預留 |

---

## 5. Capability Pack 最小 Schema

最小可用欄位：

```json
{
  "type": "faloCapabilityPack",
  "packId": "falo.capability.basic",
  "packName": "FALO Basic Prompt Pack",
  "version": "0.1.0",
  "provider": "FALO",
  "licenseType": "teaching",
  "enabledCapabilities": ["prompt.basic", "json.connect"],
  "prompts": [],
  "workflows": [],
  "variables": {},
  "uiPanels": [],
  "inputMaterials": [],
  "sampleData": {},
  "expiresAt": null,
  "signature": null,
  "gasEndpoint": null
}
```

### 5.1 必填欄位

| 欄位 | 說明 |
| --- | --- |
| `type` | 固定為 `faloCapabilityPack` |
| `packId` | 功能包 ID |
| `packName` | 功能包名稱 |
| `version` | 功能包版本 |
| `provider` | 提供者 |
| `licenseType` | 授權類型 |
| `enabledCapabilities` | 啟用哪些功能槽 |

### 5.2 選填欄位

| 欄位 | 說明 |
| --- | --- |
| `prompts` | Prompt database categories，可沿用目前範例 JSON 結構 |
| `workflows` | Workflow 定義 |
| `variables` | 預設變數 |
| `uiPanels` | 指定哪些 UI panel 要顯示、鎖定或啟用 |
| `inputMaterials` | OCR / Voice / 外部工具匯入素材 |
| `sampleData` | 教學示範資料 |
| `expiresAt` | 到期時間，先預留 |
| `signature` | 簽章，先預留 |
| `gasEndpoint` | 對應 GAS endpoint，先預留 |

---

## 6. Pack 類型

| Pack | enabledCapabilities | 用途 |
| --- | --- | --- |
| Basic Pack | `prompt.basic`, `json.connect` | 基礎 Prompt 管理與 JSON 匯入匯出 |
| OCR Pack | `ocr.postprocess`, `json.connect` | OCR 後處理 Prompt Cards |
| Voice Pack | `voice.dictation`, `json.connect` | 語音整理 Prompt Cards |
| RFP Pack | `workflow.rfp`, `prompt.basic` | 標案 / RFP Workflow Cards |
| Teaching Pack | `teaching.demo`, `prompt.basic`, `json.connect` | 內訓展示卡片 |

功能包可以部分啟用，不必一次給全部功能。

---

## 7. 匯入後的行為

### 7.1 匯入流程

```text
選擇 JSON
  ↓
判斷 type
  ↓
如果是 faloCapabilityPack
  ↓
驗證最小欄位
  ↓
合併 enabledCapabilities
  ↓
合併 prompts / workflows / variables
  ↓
顯示已啟用功能包清單
  ↓
依 capability 啟用或鎖定 UI panel
```

### 7.2 合併規則

建議先採保守規則：

- `enabledCapabilities`：union 合併
- `prompts`：依 category id 合併，prompt id 相同時以新 pack 覆蓋
- `workflows`：依 workflow id 覆蓋
- `variables`：以 pack 內預設值補空欄，不覆蓋使用者已填值
- `inputMaterials`：append
- `uiPanels`：以最新 pack 指示為準

### 7.3 本地保存

先保存：

- 已匯入 pack metadata
- enabledCapabilities
- prompts / workflows / variables

不要保存：

- API key
- token
- password
- 圖片 bytes
- 未驗證簽章結果

---

## 8. UI 最小改版方案

### 8.1 Topbar

新增：

- 匯入功能卡包
- 已啟用 Pack 數量

保留：

- 匯入 JSON
- 匯出
- 備份
- 還原範例
- 安裝 PWA
- 皮膚切換

### 8.2 Sidebar

新增「功能卡槽」區：

```text
Prompt 管理        已啟用
OCR 功能卡槽       需要 OCR Pack
Voice 功能卡槽     需要 Voice Pack
JSON Connect       已啟用
Workflow / RFP     需要 RFP Pack
GAS 功能包         預留
```

### 8.3 Main

未啟用功能的卡片區顯示鎖定訊息：

```text
此功能需要匯入功能卡包或連線 FALO GAS 啟用。
```

已啟用功能才顯示對應 Prompt Cards。

### 8.4 Inspector

新增「功能包狀態」：

- Pack name
- Version
- Provider
- License type
- Enabled capabilities

新增「GAS 功能包預留」：

- GAS Endpoint
- Account
- Token / Password
- 按鈕：連線測試（disabled / coming soon）

---

## 9. GAS 預留設計

這是 FALO Runtime 階段的設計，不是 FALO Prompt Manager v0.3 的實作項目。

未來資料流：

```text
PWA Shell
  ↓
輸入 GAS Endpoint / Account / Token
  ↓
FALO GAS Web App
  ↓
依帳號回傳 capability packs
  ↓
PWA Shell 啟用對應功能
```

未來 GAS 回傳格式可以沿用 `faloCapabilityPack`，也可以回傳：

```json
{
  "type": "faloCapabilityPackBundle",
  "account": "demo@example.com",
  "packs": []
}
```

目前先不要做：

- 登入驗證
- token 儲存
- pack 租用到期判斷
- 簽章驗證
- 付費狀態

---

## 10. 舊資料相容性

目前已支援：

- Prompt database category array
- 舊版 category object
- v0.3 匯出格式
- Input Material JSON

Runtime 階段可新增：

- `type: "faloCapabilityPack"`
- `type: "faloCapabilityPackBundle"`

匯入器判斷順序建議：

1. `type === "faloCapabilityPack"`
2. `type === "faloCapabilityPackBundle"`
3. `type === "inputMaterial"`
4. `promptCategories + prompts`
5. category array
6. 舊版 category object

---

## 11. Runtime 階段改版方案

### Phase R1：資料契約

目標：先讓未來 Runtime 開發與討論有共同語言。

要做：

- 新增 capability pack schema
- README 或 Runtime 文件寫清楚「殼公開，卡分級」
- docs 寫清楚 GAS 只是預留

不要做：

- 不改 FALO Prompt v0.3 的 `index.html` 行為
- 不做授權
- 不做登入

### Phase R2：離線 Pack 匯入

目標：讓 Shell 可依 pack 啟用功能。

要做：

- `index.html` 增加 capability pack 匯入判斷
- localStorage 保存 `enabledCapabilities`
- 功能槽位依 capability 顯示 enabled / locked
- 已啟用 pack 清單
- prompts 依 pack 匯入

不要做：

- 不連 GAS
- 不驗簽
- 不做加密授權

### Phase R3：GAS 預留 UI

目標：讓使用者看懂未來線上包的位置。

要做：

- GAS Endpoint / Account / Token 欄位
- 連線按鈕 disabled 或 coming soon
- 說明文字：未來從 FALO GAS 讀取授權功能包

不要做：

- 不送出帳密
- 不儲存 token
- 不做真正租用服務

---

## 12. 建議先不要動的事

- 完整權限系統
- 後端
- 真正雲端租用邏輯
- 加密授權
- 複雜 marketplace
- 真正 OCR API
- 真正 GAS 登入
- 使用者帳號資料庫

目前 FALO Prompt Manager 的重點是建立 Prompt Asset Management。功能卡包架構留在 Runtime 藍圖。

---

## 13. 目前是否動 index.html

目前不建議為 Capability Pack 動 `index.html`。

如果近期要動 `index.html`，應優先做 Prompt 主功能：

1. 強化 Prompt Card 顯示欄位。
2. 顯示用途、輸入、輸出、人工檢查點。
3. 顯示 Workflow Step 與所屬流程。
4. 強化搜尋、Tag、Status。
5. 改善變數代入與一鍵複製。
6. 補 README / docs 教學說法。

Capability Pack 相關 UI 先不要做。

未來 Runtime 階段成功標準才會是：

- 匯入 Basic Pack 後，只看到 Basic / JSON Connect 可用。
- 匯入 OCR Pack 後，OCR Prompt Cards 出現。
- 匯入 RFP Pack 後，RFP Workflow Cards 出現。
- 未匯入的功能槽仍可看見，但顯示需要功能卡包。
- 匯出備份時能保留 pack metadata 與 enabledCapabilities。
