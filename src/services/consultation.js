import Consultation from '../models/Consultation.js';
import { translateText } from './translation.js';

async function createConsultation({ doctor_id, patient_id, type, date, notes }) {
    try {
        const result = await Consultation.create({
            doctor_id,
            patient_id,
            type,
            date,
            notes,
            status: 'pending'
        });

        return { success: true, message: 'Consultation scheduled successfully', consultationId: result.id };
    } catch (error) {
        throw new Error('Failed to schedule consultation');
    }
}

async function getAllConsultations() {
    try {
        const rows = await Consultation.findAll();
        return rows;
    } catch (error) {
        throw new Error('Failed to fetch consultations');
    }
}

async function getConsultationById(id) {
    try {
        const row = await Consultation.findByPk(id);
        if (!row) {
            throw new Error('Consultation not found');
        }
        return row;
    } catch (error) {
        throw new Error('Failed to fetch consultation');
    }
}

async function updateConsultation(id, updates) {
    try {
        await Consultation.update(id, updates);
        return { success: true, message: 'Consultation updated successfully' };
    } catch (error) {
        throw new Error('Failed to update consultation');
    }
}

async function deleteConsultation(id) {
    try {
        await Consultation.destroy({ where: { id } });
        return { success: true, message: 'Consultation deleted successfully' };
    } catch (error) {
        throw new Error('Failed to delete consultation');
    }
}

async function translateConsultationNotes(id, targetLang) {
    try {
        const row = await Consultation.findByPk(id);
        if (!row) {
            throw new Error('Consultation not found');
        }

        const originalNotes = row.notes;
        const translatedNotes = await translateText(originalNotes, targetLang);

        await Consultation.update({ notes: translatedNotes }, { where: { id } });
        return { success: true, translatedNotes };
    } catch (error) {
        throw new Error('Failed to translate notes');
    }
}

export {
    createConsultation,
    getAllConsultations,
    getConsultationById,
    updateConsultation,
    deleteConsultation,
    translateConsultationNotes
};
