import express from 'express';
import { signup, login, getPatients, getProfile, updateProfile } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/patients', getPatients);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;
