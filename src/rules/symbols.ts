/**
 * 符號正規化（引號、書名號、特殊符號）
 */
export function normalizeSymbols(text: string): string {
    return text
        // 英文引號轉中文引號
        .replace(/"([^"]+)"/g, "「$1」")
        // 半形括號轉全形（針對中文環境）
        .replace(/\(([^)]+)\)/g, (match, inner) => {
            // 如果括號內主要是英文/數字，保持半形，否則轉全形
            if (/^[A-Za-z0-9\s]+$/.test(inner)) {
                return match;
            }
            return `（${inner}）`;
        })
        // 處理英文書名號：移除書名號並修正符號，同時確保適當的空格
        .replace(/《([^》]+)》/g, (match, inner) => {
            // 先修正符號
            let processed = inner
                .replace(/＆/g, " & ")
                .replace(/：/g, ": ")
                .replace(/\s+/g, " ")
                .trim();

            // 確保英文標點前後有適當空格
            processed = processed
                .replace(/\s*&\s*/g, " & ")
                .replace(/\s*:\s*/g, ": ")
                .replace(/\s+/g, " ")
                .trim();

            return ` ${processed} `;
        })
        // 修正其他全形符號
        .replace(/＆/g, " & ")
        .replace(/：/g, ": ")
        // 特別處理 % 符號：確保數字與 % 之間沒有空格
        .replace(/(\d)\s*%/g, '$1%')
        // 清理可能因上述處理產生的多餘空格
        .replace(/\s+/g, " ")
        .trim();
}