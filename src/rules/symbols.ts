import { isMostlyEnglish } from './languageDetection.js';

/**
 * 專門處理括號內的標點問題
 */
function fixBracketPunctuation(text: string): string {
    return text
        // 處理半形括號後的句點
        .replace(/\(([^)]+)\)\./g, (match, inner) => {
            if (isMostlyEnglish(inner)) {
                // 英文內容：保持半形括號，但轉換句點
                return `(${inner})。`;
            }
            return `（${inner}）。`;
        })
        // 處理全形括號後的句點
        .replace(/（([^）]+）)\./g, "（$1。")
        // 處理混合括號情況
        .replace(/（([^)]+)\)\./g, "（$1）。")
        .replace(/\(([^）]+）)\./g, "（$1）。");
}

/**
 * 符號正規化（引號、書名號、特殊符號）
 */
export function normalizeSymbols(text: string): string {
    // 第一步：專門處理括號內的標點問題
    text = fixBracketPunctuation(text);

    // 第二步：處理其他符號
    return text
        // 英文引號轉中文引號
        .replace(/"([^"]+)"/g, "「$1」")

        // 處理書名號：英文書名移除書名號，中文書名保留
        .replace(/《([^》]+)》/g, (match, inner) => {
            if (isMostlyEnglish(inner)) {
                // 英文書名：移除書名號，轉換符號為英文格式
                let processed = convertToEnglishSymbols(inner);
                processed = formatEnglishTitle(processed);
                return ` ${processed} `;
            } else {
                // 中文書名：保留書名號，確保符號正確
                let processed = convertToChineseSymbols(inner);
                return `《${processed}》`;
            }
        })

        // 處理括號：基於內容語言決定括號類型
        .replace(/\(([^)]+)\)/g, (match, inner) => {
            if (isMostlyEnglish(inner)) {
                return `(${inner})`;
            }
            return `（${inner}）`;
        })

        // 清理多餘空格
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * 將文本轉換為英文符號格式
 */
function convertToEnglishSymbols(text: string): string {
    return text
        .replace(/＆/g, " & ")
        .replace(/：/g, ": ")
        .replace(/，/g, ", ")
        .replace(/。/g, ". ")
        .replace(/\s+/g, " ")
        .replace(/([&:,])\s+/g, "$1 ")
        .replace(/\s+([&:,])/g, " $1")
        .trim();
}

/**
 * 格式化英文書名，確保正確的標點和間距
 */
function formatEnglishTitle(title: string): string {
    return title
        .replace(/\s*:\s*/g, ": ")
        .replace(/\s*&\s*/g, " & ")
        .replace(/\s*,\s*/g, ", ")
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * 將文本轉換為中文符號格式
 */
function convertToChineseSymbols(text: string): string {
    return text
        .replace(/&/g, "＆")
        .replace(/:/g, "：")
        .replace(/,/g, "，")
        .replace(/\./g, "。")
        .replace(/\s+/g, "")
        .trim();
}