# zhlinter 

一個用於**中文文字標準化與排版修正**的工具套件，  
依據 [《中文文案排版指北》](https://github.com/sparanoid/chinese-copywriting-guidelines)、[《重訂標點符號手冊》修訂版](/reference/Revised_Handbook_of_Punctuation.pdf) 規範自動清理、調整中英文間距、標點與符號。
## 標點符號規範表

| 符號名稱 | 正確符號 | Unicode | 錯誤示例 | 用途說明 |
|---------|---------|---------|---------|----------|
| **雙引號（開）** | `「` | U+300C | `"` `『` | 主要引述、對話開始 |
| **雙引號（閉）** | `」` | U+300D | `"` `』` | 主要引述、對話結束 |
| **單引號（開）** | `『` | U+300E | `'` `「` | 嵌套引述開始 |
| **單引號（閉）** | `』` | U+300F | `'` `」` | 嵌套引述結束 |
| **破折號** | `──` | U+2500 U+2500 | `--` `—` `-` | 語氣轉折、延長 |
| **連接號** | `—` | U+2014 | `-` `–` | 時間、數字範圍 |
| **刪節號** | `⋯⋯` | U+22EF U+22EF | `...` `......` `…` | 省略、語意未盡 |
| **間隔號** | `．` | U+FF0E | `•` `·` | 外國人名、書名間隔 |
| **逗號** | `，` | U+FF0C | `,` | 句子停頓 |
| **句號** | `。` | U+3002 | `.` | 句子結束 |
| **分號** | `；` | U+FF1B | `;` | 並列分句 |
| **冒號** | `：` | U+FF1A | `:` | 提示、說明 |
| **問號** | `？` | U+FF1F | `?` | 疑問句結束 |
| **驚嘆號** | `！` | U+FF01 | `!` | 感嘆句結束 |
| **百分號** | `%` | U+0025 | `％` | 百分比（與數字無空格） |
| **度數符號** | `°` | U+00B0 | `度` `o` | 角度、溫度（與數字無空格） |
| **與符號** | `&` | U+0026 | `＆` `and` | 並列連接（前後加空格） |

## 引號嵌套規則

| 嵌套層級 | 正確格式 | 錯誤格式 | 說明 |
|---------|---------|---------|------|
| **第一層** | `「...」` | `『...』` | 外層使用雙引號 |
| **第二層** | `「...『...』...」` | `「...「...」...」` | 內層使用單引號 |
| **第三層** | `「...『...「...」...』...」` | `「...『...『...』...』...」` | 交替使用引號類型 |

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


歡迎任何形式的貢獻！  
請參考 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解詳細說明。

---

## 📄 授權

本專案採用 [MIT License](LICENSE)。

---

## 🧑‍💻 作者

由 [@AiverAiva](https://github.com/AiverAiva) 維護開發
靈感來源：[sparanoid/chinese-copywriting-guidelines](https://github.com/sparanoid/chinese-copywriting-guidelines)

---