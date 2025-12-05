import request from "supertest";
import app from "../src/app.js";

describe("User Controller", () => {
    let token;

    test("Signup user", async () => {
        const res = await request(app)
            .post("/api/users/signup")
            .send({
                full_name: "Test User",
                email: "user2@example.com",
                password: "123456",
                role: "patient"
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("user");
    });

    test("Login user", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({
                email: "user2@example.com",
                password: "123456"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        token = res.body.token;
    });

    test("Get profile", async () => {
        const res = await request(app)
            .get("/api/users/profile")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.user.email).toBe("user2@example.com");
    });
});
