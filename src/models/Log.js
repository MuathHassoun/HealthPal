import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Log = sequelize.define('Log', {
    user_id: { type: DataTypes.INTEGER },
    action: { type: DataTypes.STRING(255) },
    details: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'logs',
    timestamps: false,
});

export default Log;
