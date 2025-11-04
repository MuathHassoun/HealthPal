import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const SupportSession = sequelize.define('SupportSession', {
    patient_id: { type: DataTypes.INTEGER, allowNull: false },
    counselor_id: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM('chat','call'), allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM('scheduled','done','cancelled'), defaultValue: 'scheduled' },
}, {
    tableName: 'support_sessions',
    timestamps: false,
});

export default SupportSession;
