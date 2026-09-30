import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// Admin verification middleware
const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        next();
    } catch {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

// ── Public: Submit a new Inquiry / Query ─────────────────────────────────────────
router.post('/', async (req, res) => {
    try {
        const {
            name,
            phone,
            email = '',
            service = 'General Inquiry',
            dates = '',
            guests = '',
            origin = '',
            interests = '',
            message = '',
            source = 'website',
            metadata = {},
        } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: 'Name is required' });
        }
        if ((!phone || !phone.trim()) && (!email || !email.trim())) {
            return res.status(400).json({ success: false, message: 'Either phone number or email is required' });
        }

        if (mongoose.connection.readyState !== 1) {
            console.warn('Database is not connected. Inquiry received but could not be persisted to DB.');
            return res.status(503).json({
                success: false,
                message: 'We could not save your enquiry right now. Please try again shortly.',
            });
        }

        const inquiry = new Inquiry({
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            service: service.trim(),
            dates: dates.trim(),
            guests: guests.trim(),
            origin: origin.trim(),
            interests: typeof interests === 'string' ? interests.trim() : JSON.stringify(interests),
            message: message.trim(),
            source: source.trim(),
            metadata,
            status: 'new',
        });

        await inquiry.save();

        res.status(201).json({
            success: true,
            message: 'Inquiry saved successfully',
            inquiry,
        });
    } catch (err) {
        console.error('Error creating inquiry:', err);
        res.status(500).json({ success: false, message: err.message || 'Server error while saving inquiry' });
    }
});

// ── Admin: Get all inquiries with optional filter & stats ────────────────────────
router.get('/', verifyAdmin, async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({
                success: true,
                inquiries: [],
                stats: { total: 0, newCount: 0, contactedCount: 0, resolvedCount: 0 },
            });
        }

        const { status, search } = req.query;
        const query = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        if (search && search.trim()) {
            const regex = new RegExp(search.trim(), 'i');
            query.$or = [
                { name: regex },
                { phone: regex },
                { email: regex },
                { service: regex },
                { message: regex },
                { origin: regex },
            ];
        }

        const [inquiries, total, newCount, contactedCount, resolvedCount] = await Promise.all([
            Inquiry.find(query).sort({ createdAt: -1 }),
            Inquiry.countDocuments(),
            Inquiry.countDocuments({ status: 'new' }),
            Inquiry.countDocuments({ status: 'contacted' }),
            Inquiry.countDocuments({ status: 'resolved' }),
        ]);

        res.json({
            success: true,
            inquiries,
            stats: {
                total,
                newCount,
                contactedCount,
                resolvedCount,
            },
        });
    } catch (err) {
        console.error('Error fetching inquiries:', err);
        res.status(500).json({ success: false, message: 'Server error while fetching inquiries' });
    }
});

// ── Admin: Update inquiry status or notes ───────────────────────────────────────
router.patch('/:id', verifyAdmin, async (req, res) => {
    try {
        const { status, notes } = req.body;
        const updateData = {};

        if (status) {
            const validStatuses = ['new', 'contacted', 'resolved', 'archived'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ success: false, message: 'Invalid status' });
            }
            updateData.status = status;
        }

        if (typeof notes === 'string') {
            updateData.notes = notes;
        }

        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }

        res.json({
            success: true,
            message: 'Inquiry updated successfully',
            inquiry,
        });
    } catch (err) {
        console.error('Error updating inquiry:', err);
        res.status(500).json({ success: false, message: 'Server error while updating inquiry' });
    }
});

// ── Admin: Delete an inquiry ────────────────────────────────────────────────────
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ success: false, message: 'Inquiry not found' });
        }

        res.json({
            success: true,
            message: 'Inquiry deleted successfully',
        });
    } catch (err) {
        console.error('Error deleting inquiry:', err);
        res.status(500).json({ success: false, message: 'Server error while deleting inquiry' });
    }
});

export default router;
