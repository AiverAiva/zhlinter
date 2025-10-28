# zhlinter 

一個用於**中文文字標準化與排版修正**的工具套件，  
依據 [《中文文案排版指北》](https://github.com/sparanoid/chinese-copywriting-guidelines) 規範自動清理、調整中英文間距、標點與符號。

---

## ✨ 功能特點

- 自動在 **中文與英文/數字** 之間加上適當空格  
- 將 **全形標點** 統一為半形（或可自行客製）  
- 修正 **全形/半形英文字母、數字**  
- 移除多餘的符號、空格、重複標點  
- 支援 TypeScript 型別提示  
- 其餘詳細內容遵照 [《中文文案排版指北》](https://github.com/sparanoid/chinese-copywriting-guidelines) 

---

## 📦 安裝

```bash
yarn add zhlinter
# 或使用 npm
npm install zhlinter
```

---

## 🚀 使用說明

### 🧩 基本使用

```ts
import { normalizeText } from "zhlinter";

const text = "在LeanCloud上，數據儲存是圍繞`AVObject`進行的。";
console.log(normalizeText(text));
// ➜ "在 LeanCloud 上，數據儲存是圍繞 `AVObject` 進行的。"
```

### 🛠 可用規則範例

| 規則說明        | 範例輸入                      | 範例輸出                       |
| ----------- | ------------------------- | -------------------------- |
| 中文與英文間自動加空格 | 在LeanCloud上               | 在 LeanCloud 上              |
| 數字與單位之間加空格  | 有10Gbps寬頻                 | 有 10 Gbps 寬頻               |
| 全形標點轉半形     | "Hello！"                  | “Hello!”                   |
| 括號修正        | (NMRI)                    | （NMRI）                     |
| 英文整句半形標點    | Stay hungry，stay foolish。 | Stay hungry, stay foolish. |
| 不道地縮寫修正     | Ts、h5、RJS                 | TypeScript、HTML5、React     |
| 專有名詞大小寫     | github → GitHub           |                            |

---

## 🤝 貢獻指南

非常歡迎各種形式的貢獻 💪

你可以：

* 🧩 **調整或優化正則規則（Regex）**，改進文本匹配與修正精度
* 📚 **補充或更新專有名詞表**（如常見品牌、技術名詞、縮寫對應等）
* 🔍 **撰寫更多測試案例**（在 `tests/normalizeText.test.ts` 中加入 edge case）
* 🪶 **改善中英文規則邏輯**（例如標點、單位、數字處理）
* 🧱 **改善效能或重構代碼結構**

### 🧭 開發步驟

```bash
git clone https://github.com/AiverAiva/zhlinter.git
cd zhlinter
yarn install
yarn test
```

修改完後請確保所有測試通過：

```bash
yarn test
```

提交 PR 前，請描述：

* 修改的規則與原因
* 相關的測試案例

---

## 📄 授權

本專案採用 [MIT License](LICENSE)。

---

## 🧑‍💻 作者

由 [@AiverAiva](https://github.com/AiverAiva) 維護開發
靈感來源：[sparanoid/chinese-copywriting-guidelines](https://github.com/sparanoid/chinese-copywriting-guidelines)

---