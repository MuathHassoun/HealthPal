import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Patient = sequelize.define('Patient', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    date_of_birth: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.ENUM('male','female','other') },
    medical_history: { type: DataTypes.TEXT },
}, {
    tableName: 'patients',
    timestamps: false,
});

export default Patient;