import { sequelize } from '../src/config/db.js';
import bcrypt from 'bcryptjs';

export default async function globalSetup() {
  try {
    // When running tests we want associations enabled so relations work
    process.env.SETUP_ASSOCIATIONS = 'true';

    // Import models after we set the env flag so associations are created
    await import('../src/models/index.js');

    // Ensure SQLite foreign keys are enabled for tests
    try {
      await sequelize.query('PRAGMA foreign_keys = ON');
    } catch (e) {
      // ignore if not supported
    }

    // Force sync schema for a clean slate
    await sequelize.sync({ force: true });

    // Create a default test user (patient) with id=1
    const User = (await import('../src/models/User.js')).default;
    const Patient = (await import('../src/models/Patient.js')).default;
    const Doctor = (await import('../src/models/Doctor.js')).default;

    const passwordHash = await bcrypt.hash('123456', 8);
    const testUser1 = await User.findOrCreate({
      where: { email: 'user2@example.com' },
      defaults: {
        full_name: 'Test User',
        email: 'user2@example.com',
        password_hash: passwordHash,
        role: 'patient'
      }
    });

    // Create a doctor user with id=2
    const doctorUser = await User.findOrCreate({
      where: { email: 'doctor@example.com' },
      defaults: {
        full_name: 'Test Doctor',
        email: 'doctor@example.com',
        password_hash: passwordHash,
        role: 'doctor'
      }
    });

    // Create Patient record for user 1
    await Patient.findOrCreate({
      where: { user_id: testUser1[0].id },
      defaults: {
        user_id: testUser1[0].id,
        medical_history: 'None',
        allergies: 'None'
      }
    });

    // Create Doctor record for user 2
    await Doctor.findOrCreate({
      where: { user_id: doctorUser[0].id },
      defaults: {
        user_id: doctorUser[0].id,
        specialty: 'General',
        license_number: 'DOC001'
      }
    });
  } catch (err) {
    // If setup fails, rethrow so Jest reports it clearly
    console.error('Global test setup failed:', err);
    throw err;
  }
}
