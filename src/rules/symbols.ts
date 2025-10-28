/**
 * 符號正規化（引號、書名號、特殊符號）
 */
export function normalizeSymbols(text: string): string {
    return text
        // 處理英文書名號：移除書名號並修正符號，同時在書名前後加空格
        .replace(/《([^》]+)》/g, (match, inner) => {
            const processed = inner
                .replace(/＆/g, " & ")
                .replace(/：/g, ": ")
                .replace(/\s+/g, " ")
                .trim();
            return ` ${processed} `;
        })
        // 半形括號轉全形（針對中文環境）
        .replace(/\(([^)]+)\)/g, (match, inner) => {
            // 如果括號內主要是英文/數字，保持半形，否則轉全形
            if (/^[A-Za-z0-9\s]+$/.test(inner)) {
                return match;
            }
            return `（${inner}）`;
        })
        // 修正其他全形符號
        .replace(/＆/g, "&")
        .replace(/：/g, ":");
}