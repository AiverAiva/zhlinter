import { isMostlyEnglish } from './languageDetection.js';
/**
 * 特殊符號處理：破折號、連接號、刪節號等
 */
export function normalizeSpecialSymbols(text: string): string {
    return text
        // 破折號處理（使用全形破折號 ──）
        .replace(/--/g, '──')      // 兩個半形減號轉全形破折號
        .replace(/——/g, '──')      // 全形連接號轉破折號
        .replace(/([\u4e00-\u9fa5])-([\u4e00-\u9fa5])/g, '$1──$2') // 中文間的單個減號轉破折號

        // 連接號處理（使用全形連接號 —）
        .replace(/(\d+:\d+)-(\d+:\d+)/g, '$1—$2') // 時間範圍使用連接號
        .replace(/(\d+)-(\d+)/g, '$1—$2')         // 數字範圍使用連接號

        // 刪節號處理
        .replace(/\.{3,}/g, '⋯⋯')  // 三個或更多句點轉刪節號
        .replace(/。{2,}/g, '⋯⋯')  // 多個句號轉刪節號
        .replace(/\.\.\./g, '⋯⋯')  // 三個句點轉刪節號
        .replace(/…/g, '⋯⋯')       // 半形刪節號轉全形

        // 其他特殊符號
        .replace(/～/g, '～')       // 波浪號保持不變
        .replace(/〜/g, '～');      // 全角波浪號統一
}

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
    // 第一步：處理特殊符號
    text = normalizeSpecialSymbols(text);

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

        // 特別處理括號後的句點
        .replace(/([)）])\.(?=\s|$)/g, "$1。")

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