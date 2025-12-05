import { createConsultation } from "../src/services/consultation.js";

describe("Consultation Service", () => {
    test("create consultation", async () => {
        const date = new Date();
        const result = await createConsultation({
            doctor_id: 1,
            patient_id: 2,
            type: "video",
            date
        });
        expect(result).toHaveProperty("consultationId");
    });
});
