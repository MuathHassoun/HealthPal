import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('patient','doctor','donor','ngo','admin'), defaultValue: 'patient' },
    phone: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'users',
    timestamps: false,
});

export default User;
// Ensure tables exist when running tests (avoid race between imports and sync)
let __user_synced = false;
async function __ensure_user_synced() {
    if (!__user_synced) {
        await sequelize.sync();
        __user_synced = true;
    }
}

User.beforeCreate(async () => { await __ensure_user_synced(); });
User.beforeBulkCreate(async () => { await __ensure_user_synced(); });
User.beforeFind(async () => { await __ensure_user_synced(); });