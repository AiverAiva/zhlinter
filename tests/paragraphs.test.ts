import { normalizeParagraphs } from '../src/methods/paragraph.js';

describe('段落處理', () => {
    test('保持段落結構', () => {
        const input = `第一段第一行
第一段第二行

第二段

第三段第一行
第三段第二行`;

        const result = normalizeParagraphs(input, { preserveLineBreaks: false });

        // 檢查段落數量
        const paragraphs = result.split(/\n\s*\n/);
        expect(paragraphs.length).toBe(3);

        // 檢查每段內容
        expect(paragraphs[0]).toContain('第一段第一行 第一段第二行');
        expect(paragraphs[1]).toContain('第二段');
        expect(paragraphs[2]).toContain('第三段第一行 第三段第二行');
    });

    test('處理長段落', () => {
        const input = `富蘭克林說：「在這個世界上，沒有什麼是確定的，除了死亡與繳稅。」
多數人知道可以藉由運動、健康飲食、充足睡眠、維持心靈健康等等來延緩死亡。`;
        const expected = `富蘭克林說：「在這個世界上，沒有什麼是確定的，除了死亡與繳稅。」
多數人知道可以藉由運動、健康飲食、充足睡眠、維持心靈健康等等來延緩死亡。`;
        expect(normalizeParagraphs(input)).toBe(expected);
    });

    test('修剪行空格', () => {
        const input = `  第一段有前導空格  
  第二行也有空格  `;

        const result = normalizeParagraphs(input, { trimLines: true });

        // 檢查空格被修剪
        expect(result).not.toMatch(/^\s+/m);
        expect(result).not.toMatch(/\s+$/m);
    });
});