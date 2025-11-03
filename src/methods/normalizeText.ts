import { applyChineseGrammar } from "../rules/chineseGrammar";
import { applyEnglishCorrections } from "../rules/englishCorrections";
import { finalCleanup } from "../rules/finalCleanup";
import { toFullwidth } from "../rules/fullwidth";
import { fixNumbers } from "../rules/numbers";
import { applyPunctuation, removeDuplicatePunctuation } from "../rules/punctuation";
import { normalizeQuotes } from "../rules/quotes";
import { applySpacing, cleanSpaces } from "../rules/spacing";
import { normalizeSpecialSymbols, normalizeSymbols } from "../rules/symbols";

export function normalizeText(text: string): string {
    return [
        toFullwidth,                    // 全形轉換
        fixNumbers,                     // 數字處理
        normalizeQuotes,                // 引號標準化
        applyPunctuation,               // 標點符號處理
        removeDuplicatePunctuation,     // 重複標點處理
        applySpacing,                   // 間距處理
        normalizeSymbols,               // 符號正規化
        normalizeSpecialSymbols,        // 特殊符號處理
        applyChineseGrammar,            // 中文語法修正
        applyEnglishCorrections,        // 英文校正
        cleanSpaces,                    // 空格清理
        finalCleanup,                   // 最終清理和修復
    ].reduce((result, fn) => fn(result), text);
}
