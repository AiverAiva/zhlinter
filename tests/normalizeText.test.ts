import { normalizeText } from "../src/index";

describe("zhlint 中文文案排版規範", () => {
    test("中英文之間需要增加空格", () => {
        const input = "在LeanCloud上，數據儲存是圍繞`AVObject`進行的。";
        const expected = "在 LeanCloud 上，數據儲存是圍繞 `AVObject` 進行的。";
        expect(normalizeText(input)).toBe(expected);
    });

    test("中文與數字之間需要增加空格", () => {
        const input = "今天出去買菜花了5000元。";
        const expected = "今天出去買菜花了 5000 元。";
        expect(normalizeText(input)).toBe(expected);
    });

    test("數字與單位之間需要增加空格", () => {
        const input = "我家的光纖入屋寬頻有10Gbps，SSD一共有20TB。";
        const expected = "我家的光纖入屋寬頻有 10 Gbps，SSD 一共有 20 TB。";
        expect(normalizeText(input)).toBe(expected);
    });

    test("°與%例外不加空格", () => {
        const input = "角度為90°的角，新MacBook Pro有15%的CPU性能提升。";
        const expected = "角度為 90° 的角，新 MacBook Pro 有 15% 的 CPU 性能提升。";
        expect(normalizeText(input)).toBe(expected);
    });

    test("全形標點與其他字符之間不加空格", () => {
        const input = "剛剛買了一部 iPhone ，好開心！";
        const expected = "剛剛買了一部 iPhone，好開心！";
        expect(normalizeText(input)).toBe(expected);
    });

    test("不重複使用標點符號", () => {
        const input = "德國隊竟然戰勝了巴西隊！！她竟然對你說「喵」？？！！";
        const expected = "德國隊竟然戰勝了巴西隊！她竟然對你說「喵」？！";
        expect(normalizeText(input)).toBe(expected);
    });

    test("使用全形中文標點", () => {
        const input = '嗨! 你知道嘛? 今天前台的小妹跟我說 "喵" 了哎!';
        const expected = "嗨！你知道嘛？今天前台的小妹跟我說「喵」了哎！";
        expect(normalizeText(input)).toBe(expected);
    });

    test("括號與全形標點正確使用", () => {
        const input = "核磁共振成像(NMRI)是什麼原理都不知道?JFGI!";
        const expected = "核磁共振成像（NMRI）是什麼原理都不知道？JFGI！";
        expect(normalizeText(input)).toBe(expected);
    });

    test("數字使用半形字符", () => {
        const input = "這件蛋糕只賣１０００元。";
        const expected = "這件蛋糕只賣 1000 元。";
        expect(normalizeText(input)).toBe(expected);
    });

    test("英文整句使用半形標點", () => {
        const input = "賈伯斯那句話是怎麼說的？「Stay hungry，stay foolish。」";
        const expected = "賈伯斯那句話是怎麼說的？「Stay hungry, stay foolish.」";
        expect(normalizeText(input)).toBe(expected);
    });

    test("英文書名與標點處理", () => {
        const input = "推薦你閱讀《Hackers＆Painters：Big Ideas from the Computer Age》，非常的有趣。";
        const expected = "推薦你閱讀 Hackers & Painters: Big Ideas from the Computer Age，非常地有趣。";
        expect(normalizeText(input)).toBe(expected);
    });

    test("專有名詞使用正確的大小寫", () => {
        const input = "使用 github 登錄，我們的客戶有 github、foursquare、microsoft corporation、google、facebook, inc.。";
        const expected = "使用 GitHub 登錄，我們的客戶有 GitHub、Foursquare、Microsoft Corporation、Google、Facebook, Inc.。";
        expect(normalizeText(input)).toBe(expected);
    });

    test("不要使用不道地的縮寫", () => {
        const input = "我們需要一位熟悉 Ts、h5，至少理解一種框架（如 RJS、nextjs）的 FED。";
        const expected = "我們需要一位熟悉 TypeScript、HTML5，至少理解一種框架（如 React、Next.js）的前端開發者。";
        expect(normalizeText(input)).toBe(expected);
    });
});
