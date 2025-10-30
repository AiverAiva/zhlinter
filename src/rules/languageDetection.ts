// rules/languageDetection.ts

/**
 * 檢測文本主要是中文還是英文
 */
export function detectPrimaryLanguage(text: string): 'chinese' | 'english' | 'mixed' {
    // 移除標點和空格進行分析
    const cleanText = text.replace(/[\s\p{P}]/gu, '');
    if (cleanText.length === 0) return 'mixed';

    const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishChars = (cleanText.match(/[a-zA-Z]/g) || []).length;
    const totalChars = cleanText.length;

    if (chineseChars === 0 && englishChars === 0) return 'mixed';
    if (chineseChars > 0 && englishChars === 0) return 'chinese';
    if (englishChars > 0 && chineseChars === 0) return 'english';

    // 對於混合內容，根據比例判斷
    const chineseRatio = chineseChars / totalChars;
    const englishRatio = englishChars / totalChars;

    if (chineseRatio > 0.6) return 'chinese';
    if (englishRatio > 0.6) return 'english';
    return 'mixed';
}

/**
 * 檢測文本片段是否主要是英文內容
 */
export function isMostlyEnglish(text: string): boolean {
    const language = detectPrimaryLanguage(text);
    // 對於書名這類可能較短的文本，使用更寬鬆的判斷
    if (text.length < 30) {
        return language === 'english' || (language === 'mixed' && /^[A-Z]/.test(text.trim()));
    }
    return language === 'english';
}