import request from "supertest";
import app from "../src/app.js";

describe("Consultation Routes", () => {
    test("Get all consultations works", async () => {
        const res = await request(app).get("/api/consultations");
        expect(res.statusCode).toBe(401); // no token yet
    });
});
