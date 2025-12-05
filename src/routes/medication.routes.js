import express from 'express';
import medicationController from '../controllers/medication.controller.js';

//import authMiddleware from '../middleware/auth.middleware.js';

//import roleMiddleware from '../middleware/role.middleware.js';


const router = express.Router();

// ============ MEDICINES ROUTES ============


router.get('/medicines', medicationController.getAllMedicines);


router.get('/medicines/available', medicationController.getAvailableMedicines);


router.get('/medicines/:id', medicationController.getMedicineById);


router.post(
    '/medicines',
   // authMiddleware,
   // roleMiddleware(['admin', 'ngo', 'donor']),HContinuevalidateMedicine,
    medicationController.createMedicine
);

router.put(
    '/medicines/:id',
  //  authMiddleware,
   // roleMiddleware(['admin', 'ngo']),
    medicationController.updateMedicine
);

router.delete(
    '/medicines/:id',
 //   authMiddleware,
  //  roleMiddleware(['admin']),
    medicationController.deleteMedicine
);


router.get('/equipment', medicationController.getAllEquipment);
router.get('/equipment/available', medicationController.getAvailableEquipment);
router.get('/equipment/:id', medicationController.getEquipmentById);

router.post(
    '/equipment',
   // authMiddleware,
   // roleMiddleware(['admin', 'ngo', 'donor']),
    medicationController.createEquipment
);

router.put(
    '/equipment/:id',
   // authMiddleware,
   // roleMiddleware(['admin', 'ngo']),
    medicationController.updateEquipment
);

router.delete(
    '/equipment/:id',
    //authMiddleware,
   // roleMiddleware(['admin']),
    medicationController.deleteEquipment
);
// ============ MATCHING ROUTES ============
// Find matches for patient needs
router.post(
    '/matching',
  //  authMiddleware,

    medicationController.findMatches
);

router.post(
    '/matching/reserve',
   // authMiddleware,
  //  roleMiddleware(['patient', 'doctor', 'ngo', 'admin']),
    medicationController.reserveItem
);

router.get(
    '/inventory/stats',
   // authMiddleware,
   // roleMiddleware(['admin', 'ngo']),
    medicationController.getInventoryStats
);

router.patch(
    '/inventory/:id/quantity',
  //  authMiddleware,
   // roleMiddleware(['admin', 'ngo']),
    medicationController.updateQuantity
);
export default router;