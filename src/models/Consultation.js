import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Consultation = sequelize.define('Consultation', {
    doctor_id: { type: DataTypes.INTEGER, allowNull: false },
    patient_id: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM('video','audio','chat'), allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    notes: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('pending','completed','cancelled'), defaultValue: 'pending' },
}, {
    tableName: 'consultations',
    timestamps: false,
});

export default Consultation;
