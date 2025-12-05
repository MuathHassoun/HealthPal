import { translateText } from "../src/services/translation.js";

describe("Translation Service", () => {
    test("translate Arabic to English", async () => {
        const translated = await translateText("مرحبا", "en");
        expect(translated.toLowerCase()).toContain("hello");
    });
});
