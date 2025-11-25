import express from 'express';
import {
    createSession,
    getSessions,
    getSessionById,
    updateSession,
    deleteSession
} from '../controllers/supportSessionController.js';

const router = express.Router();

router.post('/', createSession);
router.get('/', getSessions);
router.get('/:id', getSessionById);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;
