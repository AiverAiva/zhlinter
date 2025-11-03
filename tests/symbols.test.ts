import { normalizeText } from "../src/index";

describe("中文符號規範處理", () => {
    ////////////////////////////////////
    //                           
    // 規範標點符號測資
    // 參考
    // https://ga.nycu.edu.tw/userfiles/gach/files/20250506110034488.pdf
    // https://language.moe.gov.tw/001/Upload/FILES/SITE_CONTENT/M0001/HAU/haushou.htm#suo
    //
    ////////////////////////////////////

    test("引號 #1", () => {
        const input = "我想問：「你的Windows鍵還好嗎？』";
        const expected = "我想問：「你的 Windows 鍵還好嗎？」";
        expect(normalizeText(input)).toBe(expected);
    });

    test('引號 #2 - 雙層引號嵌套修復', () => {
        const input = "教授問：「你是不是不會用『引號」，怎麼會錯這個』";
        const expected = "教授問：「你是不是不會用『引號』，怎麼會錯這個」";
        expect(normalizeText(input)).toBe(expected);
    });

    test('單層引號修復', () => {
        const input = "他說：「你好』";
        const expected = "他說：「你好」";
        expect(normalizeText(input)).toBe(expected);
    });

    test('嵌套引號修復', () => {
        const input = "「外層『內層」外層』";
        const expected = "「外層『內層』外層」";
        expect(normalizeText(input)).toBe(expected);
    });


    // To be fixed 

    // test('複雜嵌套引號', () => {
    //     const input = "「第一層『第二層「第三層』第二層」第一層』";
    //     const expected = "「第一層『第二層「第三層」第二層』第一層」";
    //     expect(normalizeText(input)).toBe(expected);
    // });

    test('英文引號轉中文後配對', () => {
        const input = '他說："Hello"';
        const expected = "他說：「Hello」";
        expect(normalizeText(input)).toBe(expected);
    });

    test("間隔號", () => {
        const input = "馬克•吐溫";
        const expected = "馬克．吐溫";
        expect(normalizeText(input)).toBe(expected);
    });

    test("分號", () => {
        const input = "知照改為查照;遵辦改為照辦;遵照具報改為辦理見復。";
        const expected = "知照改為查照；遵辦改為照辦；遵照具報改為辦理見復。";
        expect(normalizeText(input)).toBe(expected);
    });

    test("破折號 #1", () => {
        const input = "各級人員一律停止休假--即使已奉准有案的，也一律撤銷。";
        const expected = "各級人員一律停止休假──即使已奉准有案的，也一律撤銷。";
        expect(normalizeText(input)).toBe(expected);
    });

    test("破折號 #1", () => {
        const input = "各級人員一律停止休假-即使已奉准有案的，也一律撤銷。";
        const expected = "各級人員一律停止休假──即使已奉准有案的，也一律撤銷。";
        expect(normalizeText(input)).toBe(expected);
    });

    test("連接號", () => {
        const input = "星期日17:00-21:00";
        const expected = "星期日 17:00—21:00";
        expect(normalizeText(input)).toBe(expected);
    });

    test("刪節號 #1", () => {
        const input = "憲法第58條規定，應將提出立法院的法律案、預算案...提出於行政院會議。";
        const expected = "憲法第 58 條規定，應將提出立法院的法律案、預算案⋯⋯提出於行政院會議。";
        expect(normalizeText(input)).toBe(expected);
    });


    test("刪節號 #2", () => {
        const input = "憲法第58條規定，應將提出立法院的法律案、預算案......提出於行政院會議。";
        const expected = "憲法第 58 條規定，應將提出立法院的法律案、預算案⋯⋯提出於行政院會議。";
        expect(normalizeText(input)).toBe(expected);
    });
});
