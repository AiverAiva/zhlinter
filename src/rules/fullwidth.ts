/**
 * 全形符號與括號轉換
 */
export function toFullwidth(text: string): string {
    return text
        // 中文前後的 () → （）
        .replace(/([\u4e00-\u9fa5])\(/g, "$1（")
        .replace(/\)([\u4e00-\u9fa5])/g, "）$1")
        // 在中文環境中將 ? ! 改為全形
        .replace(/([\u4e00-\u9fa5])[?]/g, "$1？")
        .replace(/([\u4e00-\u9fa5])[!]/g, "$1！")
        // 數字使用半形（防止全形數字）
        .replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0));
}