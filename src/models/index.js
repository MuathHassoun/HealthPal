import { sequelize } from '../config/db.js';
import User from './User.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';
import Consultation from './Consultation.js';
import Donation from './Donation.js';
import Sponsorship from './Sponsorship.js';
import HealthGuide from './HealthGuide.js';
import Inventory from './Inventory.js';
import Log from './Log.js';
import SupportSession from './SupportSession.js';
import PublicAlert from './PublicAlert.js';

User.hasOne(Patient, { foreignKey: 'user_id' });
Patient.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Doctor, { foreignKey: 'user_id' });
Doctor.belongsTo(User, { foreignKey: 'user_id' });

Doctor.hasMany(Consultation, { foreignKey: 'doctor_id' });
Patient.hasMany(Consultation, { foreignKey: 'patient_id' });
Consultation.belongsTo(Doctor, { foreignKey: 'doctor_id' });
Consultation.belongsTo(Patient, { foreignKey: 'patient_id' });

Patient.hasMany(Sponsorship, { foreignKey: 'patient_id' });
Sponsorship.belongsTo(Patient, { foreignKey: 'patient_id' });

Sponsorship.hasMany(Donation, { foreignKey: 'sponsorship_id' });
Donation.belongsTo(Sponsorship, { foreignKey: 'sponsorship_id' });
User.hasMany(Donation, { foreignKey: 'donor_id' });
Donation.belongsTo(User, { foreignKey: 'donor_id' });

User.hasMany(HealthGuide, { foreignKey: 'author_id' });
HealthGuide.belongsTo(User, { foreignKey: 'author_id' });

User.hasMany(Inventory, { foreignKey: 'added_by' });
Inventory.belongsTo(User, { foreignKey: 'added_by' });

User.hasMany(Log, { foreignKey: 'user_id' });
Log.belongsTo(User, { foreignKey: 'user_id' });

Patient.hasMany(SupportSession, { foreignKey: 'patient_id' });
Doctor.hasMany(SupportSession, { foreignKey: 'counselor_id' });
SupportSession.belongsTo(Patient, { foreignKey: 'patient_id' });
SupportSession.belongsTo(Doctor, { foreignKey: 'counselor_id' });

export {
    sequelize,
    User,
    Patient,
    Doctor,
    Consultation,
    Donation,
    Sponsorship,
    HealthGuide,
    Inventory,
    Log,
    SupportSession,
    PublicAlert
};
