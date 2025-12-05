import UserService from "../src/services/user.service.js";

describe("User Service", () => {
    test("should hash password", async () => {
        const hash = await UserService.hashPassword("123456");
        expect(hash).not.toBe("123456");
    });
});
