/**
 * 標點符號處理：中英文混排、全形標點、英文內半形保持
 */
export function applyPunctuation(text: string): string {
    // 先處理引號轉換
    text = text.replace(/"([^"]+)"/g, "「$1」");

    // 將中文句子內的半形標點轉為全形
    text = text
        .replace(/([\u4e00-\u9fa5])!/g, "$1！")
        .replace(/([\u4e00-\u9fa5])\?/g, "$1？")
        .replace(/([\u4e00-\u9fa5]),/g, "$1，")
        .replace(/([\u4e00-\u9fa5])\./g, "$1。")
        // 全局的英文標點轉全形（針對中文環境）
        .replace(/([\u4e00-\u9fa5])\s*!/g, "$1！")
        .replace(/([\u4e00-\u9fa5])\s*\?/g, "$1？")
        // 特別處理句尾的標點
        .replace(/!$/g, "！")
        .replace(/\?$/g, "？")
        // 處理不在中文環境中的標點（如JFGI後面的!）
        .replace(/([A-Za-z0-9])!$/g, "$1！")
        .replace(/([A-Za-z0-9])\?$/g, "$1？");

    // 英文整句使用半形標點（在引號內）
    text = text.replace(/「([^」]+)」/g, (match, inner) => {
        const processed = inner
            .replace(/，/g, ", ")
            .replace(/。/g, ".")
            .replace(/！/g, "!")
            .replace(/？/g, "?")
            .replace(/,(\S)/g, ", $1") // 確保逗號後有空格
            .replace(/\s+/g, " ")
            .trim();
        return `「${processed}」`;
    });

    // 移除重複標點
    text = text.replace(/([！？])\1+/g, "$1");

    return text;
}