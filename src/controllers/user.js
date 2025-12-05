import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { sequelize } from '../config/db.js';
import 'dotenv/config.js';

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'your_secret_key_here',
        { expiresIn: '1d' }
    );
};

export const signup = async (req, res) => {
    try {
        if (process.env.NODE_ENV === 'test') await sequelize.sync();
        const { full_name, email, password, role, phone } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            full_name,
            email,
            password_hash,
            role,
            phone,
        });

        const token = generateToken(newUser);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                full_name: newUser.full_name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        // Log errors for diagnostics
        // eslint-disable-next-line no-console
        console.error('user.signup error:', error && error.message ? error.message : error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    try {
        if (process.env.NODE_ENV === 'test') await sequelize.sync();
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        // Log errors for diagnostics
        // eslint-disable-next-line no-console
        console.error('user.login error:', error && error.message ? error.message : error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getPatients = async (req, res) => {
    try {
        if (process.env.NODE_ENV === 'test') await sequelize.sync();
        const patients = await User.findAll({
            where: { role: 'patient' },
            attributes: ['id', 'full_name', 'email', 'phone', 'created_at'],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json(patients);
    } catch (error) {
        // Log errors for diagnostics
        // eslint-disable-next-line no-console
        console.error('user.getPatients error:', error && error.message ? error.message : error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProfile = async (req, res) => {
    try {
        if (process.env.NODE_ENV === 'test') await sequelize.sync();
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'full_name', 'email', 'role', 'phone', 'created_at'],
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user });
    } catch (error) {
        // Log errors for diagnostics
        // eslint-disable-next-line no-console
        console.error('user.getProfile error:', error && error.message ? error.message : error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { full_name, phone } = req.body;

        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.full_name = full_name || user.full_name;
        user.phone = phone || user.phone;
        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        // Log errors for diagnostics
        // eslint-disable-next-line no-console
        console.error('user.updateProfile error:', error && error.message ? error.message : error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
