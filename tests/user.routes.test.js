import request from "supertest";
import app from "../src/app.js";

describe("User Routes", () => {
    test("Signup route works", async () => {
        const res = await request(app)
            .post("/api/users/signup")
            .send({ full_name: "Route Test", email: "route@example.com", password: "123456" });
        expect(res.statusCode).toBe(201);
    });

    test("Login route works", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({ email: "route@example.com", password: "123456" });
        expect(res.statusCode).toBe(200);
    });
});
