// src/routes/user.js
import express from 'express';
import { signup, login, getPatients, createPatient, getProfile, updateProfile } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
    console.log('=== REQUEST DEBUG ===');
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Body:', req.body);
    console.log('Content-Type:', req.get('Content-Type'));
    console.log('Raw Body:', JSON.stringify(req.body));
    console.log('====================');
    next();
});

router.post('/signup', signup);
router.post('/login', login);
router.get('/patients', getPatients);
router.post('/create/patient', createPatient);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;