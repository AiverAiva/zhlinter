
# :handshake: Contributing to zhlinter

感謝你有意願為 **zhlinter** 做出貢獻！  
這是一個旨在讓中文文字在技術文件中更乾淨、統一、優雅的工具。  

以下是如何開始、測試與提交修改的指引。

---

## :jigsaw: 開發環境設定

1. Fork 並 clone 專案：
   ```bash
   git clone https://github.com/AiverAiva/zhlinter.git
   cd zhlinter
    ```

2. 安裝依賴：

   ```bash
   yarn install
   # 或 npm install
   ```

3. 執行測試：

   ```bash
   yarn test
   ```

   若看到所有測試通過（:white_check_mark: Passed），代表設定正確！

---

## :brain: 可貢獻的方向

你可以幫助改善的地方包括：

* :jigsaw: **調整 Regex 規則**：
  改善空格、標點、單位、符號的處理精度。

* :books: **補充專有名詞表**：
  例如 `GitHub`、`TypeScript`、`Next.js` 等正確拼寫。

* :test_tube: **撰寫測試案例**：
  增加 edge case，例如混合標點、罕見單位、或多語句情境。

* :zap: **效能優化或重構**：
  提高 regex 效率或改善 `normalizeText` 的結構。

* :feather: **撰寫文件**：
  補充 README 範例、增加說明或調整格式。

---

## :compass: 專案結構

```
zhlint/
├── src/
│   ├── index.ts              # 主入口
│   └── rules/                # 各類文字修正規則（spacing, punctuation, etc.）
├── tests/
│   └── normalizeText.test.ts # 單元測試
├── lib/                      # 編譯輸出
├── package.json
└── README.md
```

---

## :test_tube: 新增測試案例

請在 `tests/normalizeText.test.ts` 中新增你的測試，例如：

```ts
test("專有名詞大小寫修正", () => {
  const input = "我們的客戶有 github、foursquare、google。";
  const expected = "我們的客戶有 GitHub、Foursquare、Google。";
  expect(normalizeText(input)).toBe(expected);
});
```

確保：

* 所有測試通過 (`yarn test`)
* 新增的測試能覆蓋你的修改

---

## :bricks: 提交準則

1. **請先建立分支**：

   ```bash
   git checkout -b fix-spacing-rule
   ```

2. **撰寫清楚的 Commit Message**：
   建議使用類似格式：

   ```
   feat: 新增專有名詞大小寫修正規則
   fix: 修正 ° 與 % 之間的空格問題
   docs: 更新 README 範例
   ```

3. **送出 Pull Request**：

   * 清楚描述你修改了什麼
   * 附上前後差異的範例

---

## :jigsaw: 規範參考

本專案遵循以下文案準則：

* [中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)
* [Google Developer Documentation Style Guide](https://developers.google.com/style)

---

## :scroll: 授權

貢獻內容將遵守本專案的 [MIT License](LICENSE)。

---

:bulb: **提示**：
若你只想提供詞彙或規則建議，也可以直接開 Issue，
例如：「建議加入 'Next.js' 的大小寫規則」。

感謝你的幫忙，讓中文排版更優雅 :pray:
