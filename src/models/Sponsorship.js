import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Sponsorship = sequelize.define('Sponsorship', {
    patient_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING(255), allowNull: false },
    goal_amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('active','completed','cancelled'), defaultValue: 'active' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'sponsorships',
    timestamps: false,
});

export default Sponsorship;
