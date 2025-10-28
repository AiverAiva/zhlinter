/**
 * 中文語法修正：形容詞用副詞修飾
 * 將特定的「的」改為「地」來修飾動詞或形容詞
 */
export function correctAdverbUsage(text: string): string {
    const adverbCorrections: [RegExp, string][] = [
        // 程度副詞 + 的 + 形容詞/動詞 → 程度副詞 + 地 + 形容詞/動詞
        [/(非常|極度|特別|十分|相當|極其|格外|異常|無比)的([^的地得]*[動形]詞?)/g, '$1地$2'],
        [/(慢慢|快快|輕輕|重重|早早|晚晚)的([^的地得]*[動形]詞?)/g, '$1地$2'],

        // 特定常見搭配
        [/(非常)的(有趣|認真|努力|小心|仔細|開心)/g, '$1地$2'],
        [/(十分)的(努力|用心|專注|投入)/g, '$1地$2'],
        [/(特別)的(照顧|關注|留意|重視)/g, '$1地$2'],
    ];

    return adverbCorrections.reduce((result, [pattern, replacement]) => {
        return result.replace(pattern, replacement);
    }, text);
}

/**
 * 其他中文語法修正規則可以放在這裡
 */
export function applyChineseGrammar(text: string): string {
    return correctAdverbUsage(text);
}