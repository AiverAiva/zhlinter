/**
 * 數字修正：全形轉半形 + 數字與單位間空格
 */
export function fixNumbers(text: string): string {
    // 全形轉半形
    text = text.replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0));

    // 數字與單位空格：處理 Gbps、TB 等單位，但不處理 % 和 °
    text = text.replace(/(\d)([A-Za-z]{2,})/g, '$1 $2');

    return text;
}