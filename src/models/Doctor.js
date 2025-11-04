import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Doctor = sequelize.define('Doctor', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    specialty: { type: DataTypes.STRING(100) },
    bio: { type: DataTypes.TEXT },
    license_no: { type: DataTypes.STRING(100) },
}, {
    tableName: 'doctors',
    timestamps: false,
});

export default Doctor;
