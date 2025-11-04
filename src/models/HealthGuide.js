import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const HealthGuide = sequelize.define('HealthGuide', {
    title: { type: DataTypes.STRING(255), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    author_id: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'health_guides',
    timestamps: false,
});

export default HealthGuide;
