// the other : yazan jamal

import Donation from '../models/Donation.js';
import Sponsorship from '../models/Sponsorship.js';
import Invoice from '../models/Invoice.js';

// Create donation + auto invoice
export const createDonation = async (req, res) => {
    try {
        const { sponsorship_id, donor_id, amount } = req.body;

        const sponsorship = await Sponsorship.findByPk(sponsorship_id);
        if (!sponsorship) return res.status(404).json({ error: 'Sponsorship not found' });

        const donation = await Donation.create({ sponsorship_id, donor_id, amount });

        const invoice = await Invoice.create({
            sponsorship_id,
            donation_id: donation.id,
            amount,
            status: 'paid'
        });

        return res.status(201).json({ donation, invoice });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// List donations
export const getDonations = async (req, res) => {
    try {
        const { sponsorshipId, donorId } = req.query;
        const where = {};
        if (sponsorshipId) where.sponsorship_id = sponsorshipId;
        if (donorId) where.donor_id = donorId;

        const donations = await Donation.findAll({ where });
        return res.status(200).json(donations);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findByPk(req.params.id);
        if (!donation) return res.status(404).json({ error: 'Donation not found' });
        return res.status(200).json(donation);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findByPk(req.params.id);
        if (!donation) return res.status(404).json({ error: 'Donation not found' });

        await donation.destroy();
        return res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
