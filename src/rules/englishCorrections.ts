import { properNouns, abbreviations } from '../maps/index.js';

/**
 * 專有名詞大小寫校正
 */
export function correctProperNouns(text: string): string {
    let result = text;

    // 先處理多詞短語（長詞優先）
    const multiWordEntries = Object.entries(properNouns).filter(([key]) => key.includes(' '));
    multiWordEntries.sort(([a], [b]) => b.length - a.length); // 長詞優先

    for (const [wrong, correct] of multiWordEntries) {
        const regex = new RegExp(wrong, 'gi');
        result = result.replace(regex, correct);
    }

    // 再處理單詞
    const singleWordEntries = Object.entries(properNouns).filter(([key]) => !key.includes(' '));
    for (const [wrong, correct] of singleWordEntries) {
        const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
        result = result.replace(regex, correct);
    }

    return result;
}

// (i suck at coding so temporarily disable abbreviation correction)
// /**
//  * 不道地縮寫校正
//  */
// export function correctAbbreviations(text: string): string {
//     let result = text;

//     // 先處理可能與專有名詞衝突的縮寫（長縮寫優先）
//     const sortedAbbreviations = Object.entries(abbreviations).sort(([a], [b]) => b.length - a.length);

//     for (const [abbr, full] of sortedAbbreviations) {
//         // 使用單詞邊界確保只匹配完整的縮寫
//         const regex = new RegExp(`\\b${abbr}\\b`, 'gi');
//         result = result.replace(regex, full);
//     }

//     return result;
// }

/**
 * 英文專有名詞與縮寫綜合校正
 */
export function applyEnglishCorrections(text: string): string {
    // 先校正專有名詞，再校正縮寫
    return correctProperNouns(text)
    // correctAbbreviations();
}