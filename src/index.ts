import { applySpacing, cleanSpaces } from "./rules/spacing.js";
import { applyPunctuation, removeDuplicatePunctuation } from "./rules/punctuation.js";
import { toFullwidth } from "./rules/fullwidth.js";
import { normalizeSymbols } from "./rules/symbols.js";
import { fixNumbers } from "./rules/numbers.js";
import { applyChineseGrammar } from "./rules/chineseGrammar.js";
import { applyEnglishCorrections } from "./rules/englishCorrections.js";

export function normalizeText(text: string): string {
    return [
        toFullwidth,
        fixNumbers,
        applyPunctuation,
        removeDuplicatePunctuation,
        applySpacing,
        normalizeSymbols,
        applyChineseGrammar,
        applyEnglishCorrections,
        cleanSpaces,
    ].reduce((result, fn) => fn(result), text);
}
