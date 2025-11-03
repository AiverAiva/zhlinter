/**
 * 基於簡單配對邏輯修復引號
 * 規則：如果前面是『，下一個閉引號應該是』；如果前面是「，下一個閉引號應該是」
 */
export function fixQuotePairs(text: string): string {
    const chars = text.split('');

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        if (char === '」' || char === '』') {
            // 找到對應的開引號
            const openQuoteIndex = findMatchingOpenQuote(chars, i);

            if (openQuoteIndex !== -1) {
                const openQuote = chars[openQuoteIndex];
                const expectedCloseQuote = openQuote === '「' ? '」' : '』';

                // 如果當前閉引號不匹配，進行修正
                if (char !== expectedCloseQuote) {
                    chars[i] = expectedCloseQuote;
                }
            }
        }
    }

    return chars.join('');
}

/**
 * 找到對應的開引號
 */
function findMatchingOpenQuote(chars: string[], closeIndex: number): number {
    const closeQuote = chars[closeIndex];
    let stack = 0;

    // 從閉引號位置向前搜索
    for (let i = closeIndex - 1; i >= 0; i--) {
        const char = chars[i];

        if (char === '」' || char === '』') {
            stack++; // 遇到其他閉引號，增加堆棧
        } else if (char === '「' || char === '『') {
            if (stack === 0) {
                // 找到對應的開引號
                return i;
            } else {
                stack--; // 遇到開引號，減少堆棧
            }
        }
    }

    return -1; // 沒有找到對應的開引號
}

/**
 * 更簡單的版本：基於最近開引號類型決定閉引號類型
 */
export function fixQuotePairsSimple(text: string): string {
    const chars = text.split('');
    let lastOpenQuote: string | null = null;

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];

        // 記錄最近的開引號
        if (char === '「' || char === '『') {
            lastOpenQuote = char;
        }
        // 修復閉引號
        else if ((char === '」' || char === '』') && lastOpenQuote) {
            const expectedCloseQuote = lastOpenQuote === '「' ? '」' : '』';
            if (char !== expectedCloseQuote) {
                chars[i] = expectedCloseQuote;
            }
            lastOpenQuote = null; // 重置
        }
    }

    return chars.join('');
}

/**
 * 標準化引號使用
 */
export function normalizeQuotes(text: string): string {
    return text
        // 英文引號轉中文引號
        .replace(/"([^"]+)"/g, "「$1」")
        .replace(/'([^']+)'/g, "『$1』")
        // 簡單的引號配對修復
        .replace(/「([^」]*)』/g, '「$1」')
        .replace(/『([^』]*)」/g, '『$1』');
} 