import medicationService from '../services/medication.service.js';
import { apiResponse } from '../utils/apiResponse.js';
import logger from '../config/logger.js';

class MedicationController {
    async getAllMedicines(req, res) {
        try {
            const { status, location } = req.query;
            const medicines = await medicationService.getAllItems('medicine', status, location);

            return apiResponse.success(res, medicines, 'Medicines retrieved successfully');
        } catch (error) {
            logger.error('Error in getAllMedicines', { error: error.message });
            return apiResponse.error(res, 'Failed to retrieve medicines', 500);
        }
    }

    // GET /api/medicines/:id - Get medicine by ID
    async getMedicineById(req, res) {
        try {
            const { id } = req.params;
            const medicine = await medicationService.getItemById(id);

            if (!medicine || medicine.type !== 'medicine') {
                return apiResponse.notFound(res, 'Medicine not found');
            }

            return apiResponse.success(res, medicine, 'Medicine retrieved successfully');
        } catch (error) {
            logger.error('Error in getMedicineById', { error: error.message });
            return apiResponse.error(res, 'Failed to retrieve medicine', 500);
        }
    }

    // POST /api/medicines - Create new medicine
    async createMedicine(req, res) {
        try {
            const medicineData = { ...req.body, type: 'medicine' };
            const userId = req.user?.id || null;

            const newMedicine = await medicationService.createItem(medicineData, userId);

            return apiResponse.created(res, newMedicine, 'Medicine created successfully');
        } catch (error) {
            logger.error('Error in createMedicine', { error: error.message });
            return apiResponse.error(res, 'Failed to create medicine', 500);
        }
    }

    // PUT /api/medicines/:id - Update medicine
    async updateMedicine(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const updatedMedicine = await medicationService.updateItem(id, updateData);

            if (!updatedMedicine) {
                return apiResponse.notFound(res, 'Medicine not found');
            }

            return apiResponse.success(res, updatedMedicine, 'Medicine updated successfully');
        } catch (error) {
            logger.error('Error in updateMedicine', { error: error.message });
            return apiResponse.error(res, 'Failed to update medicine', 500);
        }
    }

    // DELETE /api/medicines/:id - Delete medicine
    async deleteMedicine(req, res) {
        try {
            const { id } = req.params;
            const deleted = await medicationService.deleteItem(id);

            if (!deleted) {
                return apiResponse.notFound(res, 'Medicine not found');
            }

            return apiResponse.success(res, null, 'Medicine deleted successfully');
        } catch (error) {
            logger.error('Error in deleteMedicine', { error: error.message });
            return apiResponse.error(res, 'Failed to delete medicine', 500);
        }
    }

    // GET /api/medicines/available - Get available medicines
    async getAvailableMedicines(req, res) {
        try {
            const medicines = await medicationService.getAvailableItems('medicine');
            return apiResponse.success(res, medicines, 'Available medicines retrieved successfully');
        } catch (error) {
            logger.error('Error in getAvailableMedicines', { error: error.message });
            return apiResponse.error(res, 'Failed to retrieve available medicines', 500);
        }
    }

    // GET /api/equipment - Get all equipment
    async getAllEquipment(req, res) {
        try {
            const { status, location } = req.query;
            const equipment = await medicationService.getAllItems('equipment', status, location);

            return apiResponse.success(res, equipment, 'Equipment retrieved successfully');
        } catch (error) {
            logger.error('Error in getAllEquipment', { error: error.message });
            return apiResponse.error(res, 'Failed to retrieve equipment', 500);
        }
    }

    // GET /api/equipment/:id - Get equipment by ID
    async getEquipmentById(req, res) {
        try {
            const { id } = req.params;
            const equipment = await medicationService.getItemById(id);

            if (!equipment || equipment.type !== 'equipment') {
                return apiResponse.notFound(res, 'Equipment not found');
            }

            return apiResponse.success(res, equipment, 'Equipment retrieved successfully');
        } catch (error) {
            logger.error('Error in getEquipmentById', { error: error.message });
            return apiResponse.error(res, 'Failed to retrieve equipment', 500);
        }
    }

    // POST /api/equipment - Create new equipment
    async createEquipment(req, res) {
        try {
            const equipmentData = { ...req.body, type: 'equipment' };
            const userId = req.user?.id || null;

            const newEquipment = await medicationService.createItem(equipmentData, userId);

            return apiResponse.created(res, newEquipment, 'Equipment created successfully');
        } catch (error) {
            logger.error('Error in createEquipment', { error: error.message });
            return apiResponse.error(res, 'Failed to create equipment', 500);
        }
    }

    // PUT /api/equipment/:id - Update equipment
    async updateEquipment(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const updatedEquipment = await medicationService.updateItem(id, updateData);

            if (!updatedEquipment) {
                return apiResponse.notFound(res, 'Equipment not found');
            }

            return apiResponse.success(res, updatedEquipment, 'Equipment updated successfully');
        } catch (error) {
            logger.error('Error in updateEquipment', { error: error.message });
            return apiResponse.error(res, 'Failed to update equipment', 500);
        }
    }

    // DELETE /api/equipment/:id - Delete equipment
    async deleteEquipment(req, res) {
        try {
            const { id } = req.params;
            const deleted = await medicationService.deleteItem(id);

            if (!deleted) {
                return apiResponse.notFound(res, 'Equipment not found');
            }

            return apiResponse.success(res, null, 'Equipment deleted successfully');
        } catch (error) {
            logger.error('Error in deleteEquipment', { error: error.message });
            return apiResponse.error(res, 'Failed to delete equipment', 500);
        }
    }

    // GET /api/equipment/available - Get available equipment
    async getAvailableEquipment(req, res) {
        try {
            const equipment = await medicationService.getAvailableItems('equipment');
            return apiResponse.success(res, equipment, 'Available equipment retrieved successfully');
        } catch (error) {
            logger.error('Error in getAvailableEquipment', { error: error.message });
            return apiResponse.error(res, 'Failed to retrieve available equipment', 500);
        }
    }

    // POST /api/matching - Find matches for patient needs
    async findMatches(req, res) {
        try {
            const { itemType, itemName, quantity, location } = req.body;

            // Validation
            if (!itemType || !itemName || !quantity) {
                return apiResponse.badRequest(res, 'Item type, name, and quantity are required');
            }

            if (!['medicine', 'equipment'].includes(itemType)) {
                return apiResponse.badRequest(res, 'Invalid item type. Must be "medicine" or "equipment"');
            }

            const matches = await medicationService.findMatches(
                itemType,
                itemName,
                parseInt(quantity),
                location
            );

            if (matches.length === 0) {
                return apiResponse.success(res, [], 'No matches found for the request');
            }

            return apiResponse.success(res, matches, `Found ${matches.length} match(es)`);
        } catch (error) {
            logger.error('Error in findMatches', { error: error.message });
            return apiResponse.error(res, 'Failed to find matches', 500);
        }
    }

    // POST /api/matching/reserve - Reserve item
    async reserveItem(req, res) {
        try {
            const { itemId, quantity } = req.body;

            if (!itemId || !quantity) {
                return apiResponse.badRequest(res, 'Item ID and quantity are required');
            }

            const reservedItem = await medicationService.reserveItem(itemId, parseInt(quantity));

            if (!reservedItem) {
                return apiResponse.notFound(res, 'Item not found');
            }

            return apiResponse.success(res, reservedItem, 'Item reserved successfully');
        } catch (error) {
            if (error.message.includes('Insufficient quantity')) {
                return apiResponse.badRequest(res, error.message);
            }
            logger.error('Error in reserveItem', { error: error.message });
            return apiResponse.error(res, 'Failed to reserve item', 500);
        }
    }

    // GET /api/inventory/stats - Get inventory statistics
    async getInventoryStats(req, res) {
        try {
            const stats = await medicationService.getInventoryStats();
            return apiResponse.success(res, stats, 'Inventory statistics retrieved successfully');
        } catch (error) {
            logger.error('Error in getInventoryStats', { error: error.message });
            return apiResponse.error(res, 'Failed to retrieve inventory statistics', 500);
        }
    }

    // PATCH /api/inventory/:id/quantity - Update item quantity
    async updateQuantity(req, res) {
        try {
            const { id } = req.params;
            const { quantityChange } = req.body;

            if (quantityChange === undefined) {
                return apiResponse.badRequest(res, 'Quantity change is required');
            }

            const updatedItem = await medicationService.updateQuantity(
                id,
                parseInt(quantityChange)
            );

            if (!updatedItem) {
                return apiResponse.notFound(res, 'Item not found');
            }

            return apiResponse.success(res, updatedItem, 'Quantity updated successfully');
        } catch (error) {
            if (error.message.includes('Insufficient quantity')) {
                return apiResponse.badRequest(res, error.message);
            }
            logger.error('Error in updateQuantity', { error: error.message });
            return apiResponse.error(res, 'Failed to update quantity', 500);
        }
    }
}

export default new MedicationController();