import { normalizeText } from '../index.js';

/**
 * 段落處理選項
 */
export interface ParagraphOptions {
    preserveEmptyLines?: boolean;      // 是否保留空行
    preserveLineBreaks?: boolean;      // 是否保留段落內部的換行
    trimLines?: boolean;               // 是否修剪每行前後空格
    maxLineLength?: number;            // 最大行長度（用於自動換行）
}

/**
 * 默認段落處理選項
 */
const defaultOptions: ParagraphOptions = {
    preserveEmptyLines: true,
    preserveLineBreaks: true,
    trimLines: true,
    maxLineLength: 0, // 0 表示不限制
};

/**
 * 處理多段落文本，保持段落結構
 */
export function normalizeParagraphs(text: string, options: ParagraphOptions = {}): string {
    const mergedOptions = { ...defaultOptions, ...options };

    // 按換行符分割文本
    const lines = text.split(/\r?\n/);
    const processedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        let currentLine = lines[i];

        if (mergedOptions.trimLines) {
            currentLine = currentLine.trim();
        }

        // 處理空行
        if (currentLine === '') {
            if (mergedOptions.preserveEmptyLines) {
                processedLines.push('');
            }
            continue;
        }

        // 處理非空行
        if (mergedOptions.preserveLineBreaks) {
            // 保留原始換行：每行獨立處理
            processedLines.push(normalizeText(currentLine));
        } else {
            // 合併連續的非空行為段落
            let paragraph = currentLine;
            while (i + 1 < lines.length && lines[i + 1].trim() !== '') {
                i++;
                const nextLine = mergedOptions.trimLines ? lines[i].trim() : lines[i];
                paragraph += ' ' + nextLine;
            }
            processedLines.push(normalizeText(paragraph));
        }
    }

    return processedLines.join('\n');
}

/**
 * 處理單個段落（兼容舊接口）
 */
export function normalizeSingleParagraph(text: string): string {
    return normalizeText(text);
}