import express from 'express';
import {
    createConsultation,
    getAllConsultations,
    getConsultationById,
    updateConsultation,
    deleteConsultation
} from '../controllers/consultation.js';
import auth from '../middleware/auth.js';
import checkRole from '../middleware/role.js';

const router = express.Router();

router.post('/', auth, checkRole(['patient']), createConsultation);
router.get('/', auth, checkRole(['doctor', 'admin']), getAllConsultations);
router.get('/:id', auth, checkRole(['doctor', 'patient', 'admin']), getConsultationById);
router.put('/:id', auth, checkRole(['doctor', 'admin']), updateConsultation);
router.delete('/:id', auth, checkRole(['admin']), deleteConsultation);

export default router;
