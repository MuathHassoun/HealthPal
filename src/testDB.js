import { sequelize } from './config/db.js';
import User from './models/User.js';
import Patient from './models/Patient.js';
import Doctor from './models/Doctor.js';
import Consultation from './models/Consultation.js';
import SupportSession from './models/SupportSession.js';

const runTest = async () => {
    try {
        // 1️⃣ Confirm the connection
        await sequelize.authenticate();
        console.log('✅ Connected to the database');

        // 2️⃣ Sync all models (without altering existing tables)
        await sequelize.sync({ alter: false });
        console.log('🧩 Models synced');

        // -------------------
        // 3️⃣ Create a new user
        const [newUser, createdUser] = await User.findOrCreate({
            where: { email: 'original@example.com' },
            defaults: {
                full_name: 'Original User',
                password_hash: 'hashed_password_example',
                role: 'doctor',
                phone: '+970599123456'
            }
        });
        console.log('➕ User created:', newUser.toJSON());

        // -------------------
        // 4️⃣ Update user's name
        newUser.full_name = 'Updated User';
        await newUser.save();
        console.log('✏️ User updated:', newUser.toJSON());

        // -------------------
        // 5️⃣ Create a linked Doctor
        const [newDoctor, createdDoctor] = await Doctor.findOrCreate({
            where: { user_id: newUser.id },
            defaults: {
                specialty: 'Cardiology',
                bio: 'Experienced cardiologist',
                license_no: 'DOC12345'
            }
        });
        console.log('➕ Doctor created:', newDoctor.toJSON());

        // -------------------
        // 6️⃣ Create a new user for the patient
        const [patientUser] = await User.findOrCreate({
            where: { email: 'patient@example.com' },
            defaults: {
                full_name: 'Patient User',
                password_hash: 'hashed_password_example',
                role: 'patient',
                phone: '+970599987654'
            }
        });

        // 7️⃣ Create Patient linked to the new user
        const [newPatient] = await Patient.findOrCreate({
            where: { user_id: patientUser.id },
            defaults: {
                date_of_birth: '1990-05-15',
                gender: 'male',
                medical_history: 'No chronic illnesses'
            }
        });
        console.log('➕ Patient created:', newPatient.toJSON());


        // -------------------
        // 8️⃣ Create a Support Session
        const newSupport = await SupportSession.create({
            patient_id: newPatient.id,
            counselor_id: newDoctor.id,
            type: 'chat',
            date: new Date(),
            status: 'scheduled'
        });
        console.log('💬 Support session created:', newSupport.toJSON());

        // -------------------
        // ✅ All tests done
        console.log('🎉 All test entries created successfully');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await sequelize.close();
        console.log('🔌 Connection closed');
    }
};

runTest().then();
