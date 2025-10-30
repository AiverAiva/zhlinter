/**
 * 最終清理和修復，處理前面步驟可能遺漏的問題
 */
export function finalCleanup(text: string): string {
    return text
        // 專門處理括號後的句點問題
        .replace(/([^。！？])(\([^)]+\))\./g, "$1$2。")
        .replace(/([^。！？])(（[^）]+）)\./g, "$1$2。")
        // 處理混合括號情況
        .replace(/([^。！？])(（[^)]+\))\./g, "$1$2。")
        .replace(/([^。！？])(\([^）]+）)\./g, "$1$2。")
        // 確保句尾標點正確
        .replace(/\.$/g, "。")
        .replace(/([^。])\.\s*$/g, "$1。");
}