// src/controllers/invoiceController.js
import Invoice from '../models/Invoice.js';

export const createInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.create(req.body);
        return res.status(201).json(invoice);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getInvoices = async (req, res) => {
    try {
        const { sponsorshipId, status } = req.query;
        const where = {};
        if (sponsorshipId) where.sponsorship_id = sponsorshipId;
        if (status) where.status = status;

        const invoices = await Invoice.findAll({ where });
        return res.status(200).json(invoices);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
        return res.status(200).json(invoice);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// This is the one with the comment you asked about.
// Usually you call this to update status (pending/paid/cancelled)
// or document_url (link to invoice PDF).
export const updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

        await invoice.update(req.body);
        return res.status(200).json(invoice);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

        await invoice.destroy();
        return res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
