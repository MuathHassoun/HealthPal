import { sequelize } from './config/db.js';
import User from './models/User.js';
import Doctor from './models/Doctor.js';

const runTest = async () => {
    try {
        // 1️⃣ Confirm the connection
        await sequelize.authenticate();
        console.log('✅ Connected to the database');

        // 2️⃣ Sync models without altering tables
        await sequelize.sync({ alter: false });
        console.log('🧩 Models synced');

        // -------------------
        // 3️⃣ Add a new user
        const newUser = await User.create({
            full_name: 'Original User',
            email: 'original@example.com',
            password_hash: 'hashed_password_example',
            role: 'doctor',
            phone: '+970599123456'
        });
        console.log('➕ User created:', newUser.toJSON());

        // -------------------
        // 4️⃣ Update the user's name
        newUser.full_name = 'Updated User';
        await newUser.save();
        console.log('✏️ User updated:', newUser.toJSON());

        // -------------------
        // 5️⃣ Add a new row in the Doctor table linked to the user
        const newDoctor = await Doctor.create({
            user_id: newUser.id,
            specialty: 'Cardiology',
            bio: 'Experienced cardiologist',
            license_no: 'DOC12345'
        });
        console.log('➕ Doctor created:', newDoctor.toJSON());

        // -------------------
        // 6️⃣ Delete the user (the linked doctor will also be deleted if FK ON DELETE CASCADE is set)
        // await newUser.destroy();
        // console.log('🗑️ User deleted');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await sequelize.close();
        console.log('🔌 Connection closed');
    }
};

runTest();
