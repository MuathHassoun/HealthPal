import { Consultation, User, Patient, Doctor } from '../models/index.js';

export const createConsultation = async (req, res) => {
    try {
        const { doctor_id, patient_id, type, date, notes } = req.body;

        const doctor = await Doctor.findByPk(doctor_id);
        const patient = await Patient.findByPk(patient_id);

        if (!doctor || !patient) {
            return res.status(404).json({ message: 'Doctor or patient not found' });
        }

        const newConsultation = await Consultation.create({
            doctor_id,
            patient_id,
            type,
            date,
            notes,
            status: 'pending',
        });
        
        res.status(201).json({
            message: 'Consultation scheduled successfully',
            consultation: newConsultation,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.findAll({
            include: [
                { 
                    model: Doctor, 
                    include: [{ model: User, attributes: ['id', 'full_name', 'email'] }]
                },
                { 
                    model: Patient,
                    include: [{ model: User, attributes: ['id', 'full_name', 'email'] }]
                },
            ],
            order: [['date', 'DESC']],
        });

        res.status(200).json(consultations);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getConsultationById = async (req, res) => {
    try {
        const { id } = req.params;

        const consultation = await Consultation.findByPk(id, {
            include: [
                { 
                    model: Doctor,
                    include: [{ model: User, attributes: ['id', 'full_name', 'email'] }]
                },
                { 
                    model: Patient,
                    include: [{ model: User, attributes: ['id', 'full_name', 'email'] }]
                },
            ],
        });

        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        res.status(200).json(consultation);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateConsultation = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, date, notes, status } = req.body;

        const consultation = await Consultation.findByPk(id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        consultation.type = type || consultation.type;
        consultation.date = date || consultation.date;
        consultation.notes = notes || consultation.notes;
        consultation.status = status || consultation.status;

        await consultation.save();
        res.status(200).json({
            message: 'Consultation updated successfully',
            consultation,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteConsultation = async (req, res) => {
    try {
        const { id } = req.params;

        const consultation = await Consultation.findByPk(id);
        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        await consultation.destroy();
        res.status(200).json({ message: 'Consultation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};