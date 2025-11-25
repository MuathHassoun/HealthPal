import SupportSession from '../models/SupportSession.js';

export const createSession = async (req, res) => {
    try {
        const session = await SupportSession.create(req.body);
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getSessions = async (req, res) => {
    try {
        const sessions = await SupportSession.findAll();
        res.status(200).json(sessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getSessionById = async (req, res) => {
    try {
        const session = await SupportSession.findByPk(req.params.id);
        if (!session) return res.status(404).json({ error: 'Session not found' });
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateSession = async (req, res) => {
    try {
        const session = await SupportSession.findByPk(req.params.id);
        if (!session) return res.status(404).json({ error: 'Session not found' });
        await session.update(req.body);
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteSession = async (req, res) => {
    try {
        const session = await SupportSession.findByPk(req.params.id);
        if (!session) return res.status(404).json({ error: 'Session not found' });
        await session.destroy();
        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
