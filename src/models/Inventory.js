import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Inventory = sequelize.define('Inventory', {
    type: { type: DataTypes.ENUM('medicine','equipment'), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    location: { type: DataTypes.STRING(255) },
    status: { type: DataTypes.ENUM('available','reserved','delivered'), defaultValue: 'available' },
    added_by: { type: DataTypes.INTEGER },
    added_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'inventory',
    timestamps: false,
});

export default Inventory;
