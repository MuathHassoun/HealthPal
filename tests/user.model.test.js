import { sequelize } from "../src/config/db.js";
import User from "../src/models/User.js";

describe("User Model", () => {
    afterAll(async () => {
        await sequelize.close(); // close DB connection
    });

    test("should create a user in the database", async () => {
        const user = await User.create({
            full_name: "Test User",
            email: "testuser@example.com",
            password_hash: "hashedpassword",
            role: "patient"
        });
        expect(user).toHaveProperty("id");
        expect(user.full_name).toBe("Test User");
    });

    test("should not create a user with duplicate email", async () => {
        await expect(
            User.create({
                full_name: "Test User",
                email: "testuser@example.com",
                password_hash: "hashedpassword",
                role: "patient"
            })
        ).rejects.toThrow();
    });
});
