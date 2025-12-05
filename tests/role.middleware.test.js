import roleMiddleware from "../src/middleware/role.js";

describe("Role Middleware", () => {
    test("should block if role not allowed", () => {
        const req = { user: { role: "patient" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        const middleware = roleMiddleware(["admin"]);
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
    });
});
