import { sequelize } from './config/db.js';
import Inventory from './models/inventory.js';
import User from './models/User.js';
import logger from './config/logger.js';
import dotenv from 'dotenv';


dotenv.config();

const runMedicationTest = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('✅ Connected to the database');
        logger.info('Database connection successful');

        // Sync models
        await sequelize.sync({ alter: false });
        console.log('🧩 Models synced');

        // ============ TEST 1: Create a User (NGO) ============
        const [ngoUser, createdNgo] = await User.findOrCreate({
            where: { email: 'ngo@healthpal.org' },
            defaults: {
                full_name: 'Red Crescent NGO',
                password_hash: 'hashed_password_example',
                role: 'ngo',
                phone: '+970599111222'
            }
        });
        console.log('➕ NGO User created:', ngoUser.toJSON());

        // ============ TEST 2: Create Medicines ============
        const medicine1 = await Inventory.create({
            type: 'medicine',
            name: 'Paracetamol 500mg',
            quantity: 100,
            location: 'Nablus Central Pharmacy',
            status: 'available',
            added_by: ngoUser.id,
            added_at: new Date()
        });
        console.log('💊 Medicine 1 created:', medicine1.toJSON());

        const medicine2 = await Inventory.create({
            type: 'medicine',
            name: 'Insulin 100IU',
            quantity: 50,
            location: 'Ramallah Hospital',
            status: 'available',
            added_by: ngoUser.id,
            added_at: new Date()
        });
        console.log('💊 Medicine 2 created:', medicine2.toJSON());

        const medicine3 = await Inventory.create({
            type: 'medicine',
            name: 'Amoxicillin 250mg',
            quantity: 200,
            location: 'Gaza Medical Center',
            status: 'available',
            added_by: ngoUser.id,
            added_at: new Date()
        });
        console.log('💊 Medicine 3 created:', medicine3.toJSON());

        // ============ TEST 3: Create Equipment ============
        const equipment1 = await Inventory.create({
            type: 'equipment',
            name: 'Oxygen Tank',
            quantity: 10,
            location: 'Jenin Hospital',
            status: 'available',
            added_by: ngoUser.id,
            added_at: new Date()
        });
        console.log('🏥 Equipment 1 created:', equipment1.toJSON());

        const equipment2 = await Inventory.create({
            type: 'equipment',
            name: 'Wheelchair',
            quantity: 5,
            location: 'Nablus Rehabilitation Center',
            status: 'available',
            added_by: ngoUser.id,
            added_at: new Date()
        });
        console.log('🏥 Equipment 2 created:', equipment2.toJSON());

        const equipment3 = await Inventory.create({
            type: 'equipment',
            name: 'Blood Pressure Monitor',
            quantity: 15,
            location: 'Hebron Clinic',
            status: 'available',
            added_by: ngoUser.id,
            added_at: new Date()
        });
        console.log('🏥 Equipment 3 created:', equipment3.toJSON());

        // ============ TEST 4: Update Quantity ============
        medicine1.quantity = 120;
        await medicine1.save();
        console.log('✏️ Medicine 1 quantity updated:', medicine1.quantity);

        // ============ TEST 5: Reserve Item ============
        equipment1.quantity = equipment1.quantity - 2;
        equipment1.status = equipment1.quantity === 0 ? 'reserved' : 'available';
        await equipment1.save();
        console.log('🔒 Equipment 1 reserved (2 units), remaining:', equipment1.quantity);

        // ============ TEST 6: Query Available Items ============
        const availableMedicines = await Inventory.findAll({
            where: {
                type: 'medicine',
                status: 'available'
            }
        });
        console.log(`📋 Available medicines count: ${availableMedicines.length}`);

        const availableEquipment = await Inventory.findAll({
            where: {
                type: 'equipment',
                status: 'available'
            }
        });
        console.log(`📋 Available equipment count: ${availableEquipment.length}`);

        // ============ TEST 7: Search by Location ============
        const nabulusItems = await Inventory.findAll({
            where: {
                location: {
                    [sequelize.Sequelize.Op.like]: '%Nablus%'
                }
            }
        });
        console.log(`📍 Items in Nablus: ${nabulusItems.length}`);
        nabulusItems.forEach(item => {
            console.log(`   - ${item.name} (${item.type}): ${item.quantity} units`);
        });

        // ============ TEST 8: Get Statistics ============
        const totalMedicines = await Inventory.count({ where: { type: 'medicine' } });
        const totalEquipment = await Inventory.count({ where: { type: 'equipment' } });
        const totalMedicineQuantity = await Inventory.sum('quantity', { where: { type: 'medicine' } }) || 0;
        const totalEquipmentQuantity = await Inventory.sum('quantity', { where: { type: 'equipment' } }) || 0;

        console.log('\n📊 Inventory Statistics:');
        console.log(`   Medicines: ${totalMedicines} types, ${totalMedicineQuantity} units total`);
        console.log(`   Equipment: ${totalEquipment} types, ${totalEquipmentQuantity} units total`);

        // ============ TEST 9: Delete an Item ============
        const itemToDelete = await Inventory.findOne({ where: { name: 'Amoxicillin 250mg' } });
        if (itemToDelete) {
            await itemToDelete.destroy();
            console.log('🗑️ Item deleted:', itemToDelete.name);
        }

        console.log('\n🎉 All medication tests completed successfully!');
        logger.info('All medication tests passed');

    } catch (err) {
        console.error('❌ Error:', err.message);
        logger.error('Test failed', { error: err.message, stack: err.stack });
    } finally {
        await sequelize.close();
        console.log('🔌 Connection closed');
    }
};

runMedicationTest().then();