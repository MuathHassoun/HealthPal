import Alert from '../models/PublicAlert.js';

export const createAlert = async (req, res) => {
    try {
        const alert = await Alert.create(req.body);
        res.status(201).json(alert);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.findAll();
        res.status(200).json(alerts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAlertById = async (req, res) => {
    try {
        const alert = await Alert.findByPk(req.params.id);
        if (!alert) return res.status(404).json({ error: 'Alert not found' });
        res.status(200).json(alert);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateAlert = async (req, res) => {
    try {
        const alert = await Alert.findByPk(req.params.id);
        if (!alert) return res.status(404).json({ error: 'Alert not found' });
        await alert.update(req.body);
        res.status(200).json(alert);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteAlert = async (req, res) => {
    try {
        const alert = await Alert.findByPk(req.params.id);
        if (!alert) return res.status(404).json({ error: 'Alert not found' });
        await alert.destroy();
        res.status(200).json({ message: 'Alert deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
