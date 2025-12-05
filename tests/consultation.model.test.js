import { sequelize } from "../src/config/db.js";
import Consultation from "../src/models/Consultation.js";

describe("Consultation Model", () => {
    afterAll(async () => {
        await sequelize.close();
    });

    test("should create a consultation", async () => {
        const consult = await Consultation.create({
            doctor_id: 1,
            patient_id: 2,
            type: "video",
            date: new Date(),
            notes: "Checkup"
        });
        expect(consult).toHaveProperty("id");
        expect(consult.type).toBe("video");
    });
});
