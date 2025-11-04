import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const PublicAlert = sequelize.define('PublicAlert', {
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    region: { type: DataTypes.STRING(100) },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'public_alerts',
    timestamps: false,
});

export default PublicAlert;
