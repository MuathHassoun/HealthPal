// the other : yazan jamal

import express from 'express';
import {
    createSponsorship,
    getSponsorships,
    getSponsorshipById,
    updateSponsorship,
    deleteSponsorship,
    getSponsorshipDashboard
} from '../controllers/sponsorshipController.js';

const router = express.Router();

router.post('/', createSponsorship);
router.get('/', getSponsorships);
router.get('/:id/dashboard', getSponsorshipDashboard);
router.get('/:id', getSponsorshipById);
router.put('/:id', updateSponsorship);
router.delete('/:id', deleteSponsorship);

export default router;
