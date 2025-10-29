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

    return text;
}

/**
 * 專門處理重複標點符號
 */
export function removeDuplicatePunctuation(text: string): string {
    return text
        // 第一步：處理連續相同的標點（全形和半形分開處理）
        .replace(/([！])\1+/g, "！")  // 連續驚嘆號 → 單一驚嘆號
        .replace(/([？])\1+/g, "？")  // 連續問號 → 單一問號
        .replace(/([!])\1+/g, "!")    // 連續半形驚嘆號 → 單一半形驚嘆號
        .replace(/([?])\1+/g, "?")    // 連續半形問號 → 單一半形問號

        // 第二步：處理混合重複標點（根據原始順序決定輸出順序）
        .replace(/[!?！？]+/g, (match) => {
            // 先將半形轉為全形以便統一處理
            const normalized = match
                .replace(/!/g, '！')
                .replace(/\?/g, '？');

            // 找出第一個出現的標點類型
            let firstType: 'exclamation' | 'question' | null = null;
            for (let i = 0; i < normalized.length; i++) {
                if (normalized[i] === '！') {
                    firstType = 'exclamation';
                    break;
                } else if (normalized[i] === '？') {
                    firstType = 'question';
                    break;
                }
            }

            const hasExclamation = normalized.includes('！');
            const hasQuestion = normalized.includes('？');

            if (hasExclamation && hasQuestion) {
                // 根據第一個出現的標點類型決定順序
                return firstType === 'exclamation' ? '！？' : '？！';
            } else if (hasExclamation) {
                return '！';
            } else if (hasQuestion) {
                return '？';
            } else {
                return match; // 不應該發生，但為了安全
            }
        });
}