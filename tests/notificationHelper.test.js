import { sendSMS } from "../src/utils/notificationHelper.js";

describe("Notification Helper", () => {
    test("sendSMS should be callable", async () => {
        const result = await sendSMS("+970599123456", "Test message");
        expect(result).toBeDefined();
    });
});
