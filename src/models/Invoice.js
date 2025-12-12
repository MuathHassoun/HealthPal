import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Invoice = sequelize.define('Invoice', {
    sponsorship_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    donation_id: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    },
    amount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    issued_at: { 
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW 
    },
    status: { 
        type: DataTypes.ENUM('pending', 'paid', 'cancelled'), 
        defaultValue: 'pending' 
    },
    document_url: { 
        type: DataTypes.STRING(255), 
        allowNull: true 
    },
}, {
    tableName: 'invoices',
    timestamps: false,
});

export default Invoice;