import jwt from "jsonwebtoken";
import authMiddleware from "../src/middleware/auth.js";

describe("Auth Middleware", () => {
    test("should throw error if no token", () => {
        const req = { headers: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });
});
