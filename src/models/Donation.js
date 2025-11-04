import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Donation = sequelize.define('Donation', {
    sponsorship_id: { type: DataTypes.INTEGER, allowNull: false },
    donor_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'donations',
    timestamps: false,
});

export default Donation;
