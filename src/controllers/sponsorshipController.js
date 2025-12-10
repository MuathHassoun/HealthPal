
//the other : yazan 

import Sponsorship from '../models/Sponsorship.js';
import Donation from '../models/Donation.js';

// Create new sponsorship (campaign)
export const createSponsorship = async (req, res) => {
    try {
        const sponsorship = await Sponsorship.create(req.body);
        return res.status(201).json(sponsorship);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// List sponsorships (optional filters)
export const getSponsorships = async (req, res) => {
    try {
        const { status, patientId } = req.query;
        const where = {};
        if (status) where.status = status;
        if (patientId) where.patient_id = patientId;

        const sponsorships = await Sponsorship.findAll({ where });
        return res.status(200).json(sponsorships);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Get by id
export const getSponsorshipById = async (req, res) => {
    try {
        const sponsorship = await Sponsorship.findByPk(req.params.id);
        if (!sponsorship) return res.status(404).json({ error: 'Sponsorship not found' });
        return res.status(200).json(sponsorship);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Update
export const updateSponsorship = async (req, res) => {
    try {
        const sponsorship = await Sponsorship.findByPk(req.params.id);
        if (!sponsorship) return res.status(404).json({ error: 'Sponsorship not found' });

        await sponsorship.update(req.body);
        return res.status(200).json(sponsorship);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Delete
export const deleteSponsorship = async (req, res) => {
    try {
        const sponsorship = await Sponsorship.findByPk(req.params.id);
        if (!sponsorship) return res.status(404).json({ error: 'Sponsorship not found' });

        await sponsorship.destroy();
        return res.status(200).json({ message: 'Sponsorship deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Dashboard: sponsorship + donations + metrics
export const getSponsorshipDashboard = async (req, res) => {
    try {
        const sponsorship = await Sponsorship.findByPk(req.params.id);
        if (!sponsorship) return res.status(404).json({ error: 'Sponsorship not found' });

        const donations = await Donation.findAll({
            where: { sponsorship_id: sponsorship.id },
            order: [['date', 'DESC']]
        });

        const totalDonated = await Donation.sum('amount', {
            where: { sponsorship_id: sponsorship.id }
        }) || 0;

        const goal = Number(sponsorship.goal_amount || 0);
        const progress = goal > 0 ? Number(((Number(totalDonated) / goal) * 100).toFixed(2)) : 0;

        return res.status(200).json({
            sponsorship,
            donations,
            metrics: {
                goal_amount: goal,
                total_donated: Number(totalDonated),
                remaining_amount: Number((goal - Number(totalDonated)).toFixed(2)),
                progress_percentage: progress,
                donations_count: donations.length
            }
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
