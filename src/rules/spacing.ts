/**
 * 中英混排間距規則
 */
export function applySpacing(text: string): string {
    return text
        // 中文與英文之間加空格（排除反引號內容）
        .replace(/([\u4e00-\u9fa5])([A-Za-z])/g, "$1 $2")
        .replace(/([A-Za-z])([\u4e00-\u9fa5])/g, "$1 $2")

        // 中文與數字之間加空格
        .replace(/(\d)([\u4e00-\u9fa5])/g, "$1 $2")
        .replace(/([\u4e00-\u9fa5])(\d)/g, "$1 $2")

        // 數字與英文單位之間加空格（排除 % 和 °）
        .replace(/(\d)([A-Za-z]\b)/g, (match, num, unit) => {
            if (unit === '%' || unit === '°') return match;
            return `${num} ${unit}`;
        })

        // 特殊符號 ° 和 % 與中文之間加空格
        .replace(/([°%])([\u4e00-\u9fa5])/g, "$1 $2")
        .replace(/([\u4e00-\u9fa5])([°%])/g, "$1 $2")

        // 反引號內容與中文之間加空格
        .replace(/([\u4e00-\u9fa5])(`[^`]+`)/g, "$1 $2")
        .replace(/(`[^`]+`)([\u4e00-\u9fa5])/g, "$1 $2")

        // 多空格合併
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * 清理多餘空格（特別是全形標點前後）
 */
export function cleanSpaces(text: string): string {
    return text
        // 移除全形標點前面的空格
        .replace(/\s+([，。？！：；」）》])/g, "$1")
        // 移除全形標點後面的空格（當後面是中文時）
        .replace(/([，。？！：；」）》])\s+([\u4e00-\u9fa5])/g, "$1$2")
        // 移除全形標點後面的空格（當在句尾時）
        .replace(/([，。？！：；」）》])\s+$/g, "$1")
        // 移除全形開頭標點後面的空格
        .replace(/([「《（])\s+/g, "$1")

        // 特別處理中文逗號後面的空格
        .replace(/，\s+([\u4e00-\u9fa5])/g, "，$1")

        // 特別處理引號內外的空格
        .replace(/([\u4e00-\u9fa5])\s+「/g, "$1「")
        .replace(/」\s+([\u4e00-\u9fa5])/g, "」$1")

        // 特別處理數字與 % 和 ° 之間的空格（確保沒有空格）
        .replace(/(\d)\s+%/g, "$1%")
        .replace(/(\d)\s+°/g, "$1°")

        // 確保反引號內容與中文之間有空格
        .replace(/([\u4e00-\u9fa5])(`[^`]+`)/g, "$1 $2")
        .replace(/(`[^`]+`)([\u4e00-\u9fa5])/g, "$1 $2")

        // 多空格合併
        .replace(/\s+/g, " ")
        .trim();
}