import bcrypt from 'bcryptjs';
import User from '../models/User.js';

class UserService {
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async createUser({ full_name, email, password, role, phone }) {
        const password_hash = await bcrypt.hash(password, 10);
        return await User.create({ full_name, email, password_hash, role, phone });
    }

    async validatePassword(user, password) {
        return await bcrypt.compare(password, user.password_hash);
    }

    async getUserProfile(id) {
        return await User.findByPk(id, {
            attributes: ['id', 'full_name', 'email', 'role', 'phone', 'created_at'],
        });
    }

    async updateUserProfile(id, updates) {
        const user = await User.findByPk(id);
        if (!user) return null;

        await user.update(updates);
        return user;
    }

    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
}

export default new UserService();
