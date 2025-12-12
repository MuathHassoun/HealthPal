// src/routes/donations.js
import express from 'express';
import {
    createDonation,
    getDonations,
    getDonationById,
    deleteDonation
} from '../controllers/donationController.js';

const router = express.Router();

router.post('/', createDonation);
router.get('/', getDonations);
router.get('/:id', getDonationById);
router.delete('/:id', deleteDonation);

export default router;
