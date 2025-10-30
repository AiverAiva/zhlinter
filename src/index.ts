import { applySpacing, cleanSpaces } from "./rules/spacing.js";
import { applyPunctuation, removeDuplicatePunctuation } from "./rules/punctuation.js";
import { toFullwidth } from "./rules/fullwidth.js";
import { normalizeSymbols } from "./rules/symbols.js";
import { fixNumbers } from "./rules/numbers.js";
import { applyChineseGrammar } from "./rules/chineseGrammar.js";
import { applyEnglishCorrections } from "./rules/englishCorrections.js";
import { finalCleanup } from "./rules/finalCleanup.js";

export function normalizeText(text: string): string {
    return [
        toFullwidth,                    // 全形轉換
        fixNumbers,                     // 數字處理
        applyPunctuation,               // 標點符號處理
        removeDuplicatePunctuation,     // 重複標點處理
        applySpacing,                   // 間距處理
        normalizeSymbols,               // 符號正規化（包含專門的括號處理）
        applyChineseGrammar,            // 中文語法修正
        applyEnglishCorrections,        // 英文校正
        cleanSpaces,                    // 空格清理
        finalCleanup,                   // 最終清理和修復
    ].reduce((result, fn) => fn(result), text);
}
