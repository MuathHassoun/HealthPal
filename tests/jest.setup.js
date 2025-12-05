import { sequelize } from '../src/config/db.js';
import { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

// Prevent individual tests from closing the shared test DB connection.
if (!global.__SEQUELIZE_CLOSE_OVERRIDDEN) {
  global.__SEQUELIZE_CLOSE_OVERRIDDEN = true;
  const origClose = sequelize.close.bind(sequelize);
  // override close to a no-op during the test run
  sequelize.close = async () => {};
  // ensure the original close happens once process exits
  process.on('exit', () => {
    try {
      origClose();
    } catch (e) {
      // ignore
    }
  });
}

// Wrap Model.create to surface detailed errors during tests
if (!global.__SEQUELIZE_CREATE_WRAPPED) {
  global.__SEQUELIZE_CREATE_WRAPPED = true;
  const origCreate = Model.create;
  // eslint-disable-next-line no-extend-native
  Model.create = async function (...args) {
    try {
      return await origCreate.apply(this, args);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[SEQUELIZE CREATE ERROR]', err && err.message, err && err.parent && err.parent.message, err && err.sql);
      throw err;
    }
  };
}

// Run global setup once at the start of the test suite
if (!global.__JEST_SETUP_DONE) {
  global.__JEST_SETUP_DONE = true;

  // Use a function to wrap async work since we can't use top-level await in setupFilesAfterEnv
  const setupDatabase = async () => {
    try {
      // When running tests we want associations enabled so relations work
      process.env.SETUP_ASSOCIATIONS = 'true';

      // Import models after we set the env flag so associations are created
      const models = await import('../src/models/index.js');
      const User = (await import('../src/models/User.js')).default;
      const Patient = (await import('../src/models/Patient.js')).default;
      const Doctor = (await import('../src/models/Doctor.js')).default;

      // Ensure SQLite foreign keys are enabled for tests
      try {
        await sequelize.query('PRAGMA foreign_keys = ON');
      } catch (e) {
        // ignore if not supported
      }

      // Force sync schema for a clean slate
      await sequelize.sync({ force: true });

      const passwordHash = await bcrypt.hash('123456', 8);

      // Create User 1 (will become Doctor with id=1)
      const user1 = await User.create({
        full_name: 'Test Doctor',
        email: 'doctor@example.com',
        password_hash: passwordHash,
        role: 'doctor'
      });

      // Create User 2 (will become Patient)
      const user2 = await User.create({
        full_name: 'Test User',
        email: 'user2@example.com',
        password_hash: passwordHash,
        role: 'patient'
      });

      // Create Doctor record with explicit id=1
      const doctor = await Doctor.create(
        {
          id: 1,
          user_id: user1.id,
          specialty: 'General',
          license_no: 'DOC001'
        },
        { validate: false }
      );

      // Create Patient record with explicit id=2
      const patient = await Patient.create(
        {
          id: 2,
          user_id: user2.id,
          medical_history: 'None'
        },
        { validate: false }
      );

      if (process.env.NODE_ENV === 'test') {
        // eslint-disable-next-line no-console
        console.log('[jest.setup] Created Doctor id:', doctor.id, 'user_id:', doctor.user_id);
        // eslint-disable-next-line no-console
        console.log('[jest.setup] Created Patient id:', patient.id, 'user_id:', patient.user_id);
        
        // Verify they were created
        const allDoctors = await Doctor.findAll();
        const allPatients = await Patient.findAll();
        // eslint-disable-next-line no-console
        console.log('[jest.setup] Total Doctors:', allDoctors.length, 'Total Patients:', allPatients.length);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Jest setup failed:', err.message || err);
      throw err;
    }
  };

  // Execute setup and store the promise so it completes before tests run
  global.__JEST_SETUP_PROMISE = setupDatabase();
}

// Wait for setup to complete before tests run
beforeAll(async () => {
  if (global.__JEST_SETUP_PROMISE) {
    await global.__JEST_SETUP_PROMISE;
  }
});
