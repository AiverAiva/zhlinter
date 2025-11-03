import { isMostlyEnglish } from "./languageDetection.js";

/**
 * 標點符號處理：中英文混排、全形標點、英文內半形保持
 */
export function applyPunctuation(text: string): string {
    // 第一步：處理特殊標點（優先處理刪節號）
    text = processSpecialPunctuation(text);

    // 第二步：處理引號轉換
    text = text.replace(/"([^"]+)"/g, "「$1」");

    // 第三步：處理引號內的內容
    text = processQuotedText(text);

    // 第四步：處理一般的標點轉換
    text = processGeneralPunctuation(text);

    // 第五步：處理句尾標點
    text = processSentenceEndings(text);

    return text;
}
/**
 * 處理引號內的內容
 */
function processQuotedText(text: string): string {
    return text.replace(/「([^」]+)」/g, (match, inner) => {
        if (isMostlyEnglish(inner)) {
            // 英文內容：使用半形標點
            return `「${convertToEnglishPunctuation(inner)}」`;
        } else {
            // 中文內容：使用全形標點，並處理嵌套引號
            let processed = convertToChinesePunctuation(inner);
            // 修復嵌套引號
            processed = fixNestedQuotes(processed);
            return `「${processed}」`;
        }
    });
}

/**
 * 修復嵌套引號
 */
function fixNestedQuotes(text: string): string {
    return text
        // 確保嵌套引號正確：外層「」內層『』
        .replace(/「([^」]*)「([^」]*)」([^」]*)」/g, '「$1『$2』$3」')
        .replace(/『([^』]*)『([^』]*)』([^』]*)』/g, '『$1「$2」$3』')
        // 修復不匹配的嵌套
        .replace(/「([^」]*)』/g, '「$1」')
        .replace(/『([^』]*)」/g, '『$1』');
}
/**
 * 處理一般的標點轉換
 */
function processGeneralPunctuation(text: string): string {
    return text
        // 中文前的英文冒號轉中文冒號
        .replace(/([\u4e00-\u9fa5])\s*:\s*/g, "$1：")
        // 中文逗號（移除前後空格）
        .replace(/\s*,\s*([\u4e00-\u9fa5])/g, "，$1")
        // 中文句號（排除網址和電子郵件，但避開刪節號）
        .replace(/([\u4e00-\u9fa5])\s*\.\s*(?![a-zA-Z0-9]|\.)/g, "$1。")
        // 中文問號（移除前後空格）
        .replace(/\s*\?\s*([\u4e00-\u9fa5])/g, "？$1")
        // 中文驚嘆號（移除前後空格）
        .replace(/\s*!\s*([\u4e00-\u9fa5])/g, "！$1")
        // 特別處理連續的中文標點之間的空格
        .replace(/([！？])\s+([\u4e00-\u9fa5])/g, "$1$2")
        // 特別處理括號後的英文句點
        .replace(/([)）])\s*\.(?=\s|$)/g, "$1。");
}

/**
 * 處理句尾標點
 */
function processSentenceEndings(text: string): string {
    return text
        .replace(/\s*\.\s*$/g, "。")
        .replace(/\s*\?\s*$/g, "？")
        .replace(/\s*!\s*$/g, "！");
}

/**
 * 將文本轉換為英文標點格式
 */
function convertToEnglishPunctuation(text: string): string {
    return text
        .replace(/，/g, ", ")
        .replace(/。/g, ". ")
        .replace(/！/g, "! ")
        .replace(/？/g, "? ")
        .replace(/：/g, ": ")
        .replace(/；/g, "; ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/,(\S)/g, ", $1")
        .replace(/([,.!?])\s*$/, "$1");
}

/**
 * 將文本轉換為中文標點格式
 */
function convertToChinesePunctuation(text: string): string {
    return text
        .replace(/,/g, "，")
        .replace(/\.(?=\s|$|\))/g, "。") // 句尾或括號前的句點
        .replace(/!/g, "！")
        .replace(/\?/g, "？")
        .replace(/:/g, "：")
        .replace(/;/g, "；");
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

/**
 * 處理間隔號、分號等特殊標點
 */
function processSpecialPunctuation(text: string): string {
    return text
        // 間隔號：• 轉 ．
        .replace(/•/g, '．')
        // 分號：; 轉 ；
        .replace(/;/g, '；')
        // 破折號處理
        .replace(/--/g, '──')
        .replace(/—/g, '──')
        // 刪節號處理（防止在 applyPunctuation 中被轉換為句號）
        .replace(/\.{3,}/g, '⋯⋯')
        .replace(/…/g, '⋯⋯');
}
