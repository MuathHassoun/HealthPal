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
// Ensure tables exist when running tests (avoid race between imports and sync)
let __consultation_synced = false;
async function __ensure_consultation_synced() {
    if (!__consultation_synced) {
        await sequelize.sync();
        __consultation_synced = true;
    }
}

Consultation.beforeCreate(async () => { await __ensure_consultation_synced(); });
Consultation.beforeBulkCreate(async () => { await __ensure_consultation_synced(); });
Consultation.beforeFind(async () => { await __ensure_consultation_synced(); });
// Debug: log sync state in tests when creating
Consultation.beforeCreate(async () => {
    if (process.env.NODE_ENV === 'test') {
        // eslint-disable-next-line no-console
        console.log('[test] Consultation.beforeCreate: ensuring sync');
        try {
            // debug information
            // eslint-disable-next-line no-console
            console.log('[test] sequelize models:', Object.keys(sequelize.models));
            // eslint-disable-next-line no-console
            console.log('[test] Consultation.sequelize === sequelize?', Consultation.sequelize === sequelize);

            await __ensure_consultation_synced();
            // eslint-disable-next-line no-console
            console.log('[test] Consultation.beforeCreate: sync done');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[test] Consultation.beforeCreate: sync error', err && err.message ? err.message : err);
        }
    }
});