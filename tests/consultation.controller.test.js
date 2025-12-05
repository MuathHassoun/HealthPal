import request from "supertest";
import app from "../src/app.js";

describe("Consultation Controller", () => {
    let token;

    beforeAll(async () => {
        const login = await request(app)
            .post("/api/users/login")
            .send({ email: "user2@example.com", password: "123456" });
        // eslint-disable-next-line no-console
        console.log('[test] login response:', login.status, login.body);
        token = login.body.token;
    });

    test("Create consultation", async () => {
        const res = await request(app)
            .post("/api/consultations")
            .set("Authorization", `Bearer ${token}`)
            .send({
                doctor_id: 1,
                patient_id: 2,
                type: "chat",
                date: "2025-11-28T10:00:00",
                notes: "Follow up"
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.consultation).toHaveProperty("id");
    });

    test("Get consultations", async () => {
        const res = await request(app)
            .get("/api/consultations")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
