import Inventory from '../models/inventory.js';
import { Op } from 'sequelize';
import logger from '../config/logger.js';
import {
    calculateLocationScore,
    calculateQuantityScore,
    calculateNameSimilarity,
    calculateMatchScore
} from '../utils/matchingHelper.js';

class MedicationService {

    async getAllItems(type, status, location) {
        try {
            const whereClause = {};
            if (type) whereClause.type = type;
            if (status) whereClause.status = status;
            if (location) whereClause.location = { [Op.like]: `%${location}%` };

            const items = await Inventory.findAll({
                where: whereClause,
                order: [['added_at', 'DESC']]
            });

            logger.info(`Retrieved ${items.length} items with filters`, { type, status, location });
            return items;
        } catch (error) {
            logger.error('Error retrieving items', { error: error.message });
            throw error;
        }
    }

    async getItemById(id) {
        try {
            const item = await Inventory.findByPk(id);
            if (!item) {
                logger.warn(`Item not found`, { id });
                return null;
            }
            logger.info(`Retrieved item`, { id, name: item.name });
            return item;
        } catch (error) {
            logger.error('Error retrieving item by ID', { id, error: error.message });
            throw error;
        }
    }

    async createItem(itemData, userId) {
        try {
            const newItem = await Inventory.create({
                ...itemData,
                added_by: userId,
                added_at: new Date()
            });

            logger.info('New item created', {
                id: newItem.id,
                name: newItem.name,
                type: newItem.type,
                added_by: userId
            });
            return newItem;
        } catch (error) {
            logger.error('Error creating item', { itemData, error: error.message });
            throw error;
        }
    }

    async updateItem(id, updateData) {
        try {
            const item = await Inventory.findByPk(id);
            if (!item) {
                logger.warn(`Item not found for update`, { id });
                return null;
            }

            const oldData = { ...item.dataValues };
            await item.update(updateData);

            logger.info('Item updated', {
                id,
                oldData: oldData,
                newData: item.dataValues
            });
            return item;
        } catch (error) {
            logger.error('Error updating item', { id, updateData, error: error.message });
            throw error;
        }
    }

    async deleteItem(id) {
        try {
            const item = await Inventory.findByPk(id);
            if (!item) {
                logger.warn(`Item not found for deletion`, { id });
                return false;
            }

            await item.destroy();
            logger.info('Item deleted', { id, name: item.name });
            return true;
        } catch (error) {
            logger.error('Error deleting item', { id, error: error.message });
            throw error;
        }
    }

    async getAvailableItems(type) {
        try {
            const items = await Inventory.findAll({
                where: {
                    type,
                    status: 'available',
                    quantity: { [Op.gt]: 0 }
                },
                order: [['quantity', 'DESC']]
            });

            logger.info(`Retrieved available items`, { type, count: items.length });
            return items;
        } catch (error) {
            logger.error('Error retrieving available items', { type, error: error.message });
            throw error;
        }
    }

    async updateQuantity(id, quantityChange) {
        try {
            const item = await Inventory.findByPk(id);
            if (!item) {
                logger.warn(`Item not found for quantity update`, { id });
                return null;
            }

            const oldQuantity = item.quantity;
            const newQuantity = oldQuantity + quantityChange;

            if (newQuantity < 0) {
                logger.warn('Insufficient quantity', {
                    id,
                    oldQuantity,
                    requested: quantityChange
                });
                throw new Error('Insufficient quantity');
            }

            await item.update({
                quantity: newQuantity,
                status: newQuantity === 0 ? 'reserved' : 'available'
            });

            logger.info('Quantity updated', {
                id,
                oldQuantity,
                newQuantity,
                change: quantityChange
            });
            return item;
        } catch (error) {
            logger.error('Error updating quantity', { id, quantityChange, error: error.message });
            throw error;
        }
    }


    async findMatches(itemType, itemName, requestedQuantity, patientLocation) {
        try {
            logger.info('Starting matching process', {
                itemType,
                itemName,
                requestedQuantity,
                patientLocation
            });

            const matches = await Inventory.findAll({
                where: {
                    type: itemType,
                    name: { [Op.like]: `%${itemName}%` },
                    status: 'available',
                    quantity: { [Op.gte]: requestedQuantity }
                },
                order: [
                    ['location', 'ASC'],
                    ['quantity', 'DESC']
                ]
            });


            const request = {
                itemName: itemName,
                quantity: requestedQuantity,
                location: patientLocation
            };


            const scoredMatches = matches.map(match => {

                const matchScore = calculateMatchScore(match.dataValues, request);

                // Get individual scores for detailed breakdown
                const locationScore = calculateLocationScore(match.location, patientLocation);
                const quantityScore = calculateQuantityScore(match.quantity, requestedQuantity);
                const nameScore = calculateNameSimilarity(match.name, itemName);

                logger.debug('Match scoring details', {
                    itemId: match.id,
                    itemName: match.name,
                    locationScore,
                    quantityScore,
                    nameScore,
                    finalScore: matchScore
                });

                return {
                    ...match.dataValues,
                    matchScore,
                    scoreBreakdown: {
                        location: locationScore,
                        quantity: quantityScore,
                        name: nameScore
                    }
                };
            });


            scoredMatches.sort((a, b) => b.matchScore - a.matchScore);

            logger.info('Matching completed', {
                totalMatches: scoredMatches.length,
                bestMatch: scoredMatches[0] ? {
                    id: scoredMatches[0].id,
                    name: scoredMatches[0].name,
                    score: scoredMatches[0].matchScore
                } : null
            });

            return scoredMatches;
        } catch (error) {
            logger.error('Error in matching algorithm', {
                itemType,
                itemName,
                error: error.message
            });
            throw error;
        }
    }

    async reserveItem(id, quantity) {
        try {
            const item = await Inventory.findByPk(id);
            if (!item) {
                logger.warn(`Item not found for reservation`, { id });
                return null;
            }

            if (item.quantity < quantity) {
                logger.warn('Insufficient quantity for reservation', {
                    id,
                    available: item.quantity,
                    requested: quantity
                });
                throw new Error('Insufficient quantity for reservation');
            }

            await item.update({
                quantity: item.quantity - quantity,
                status: item.quantity - quantity === 0 ? 'reserved' : 'available'
            });

            logger.info('Item reserved', {
                id,
                reservedQuantity: quantity,
                remainingQuantity: item.quantity
            });
            return item;
        } catch (error) {
            logger.error('Error reserving item', { id, quantity, error: error.message });
            throw error;
        }
    }

    async getInventoryStats() {
        try {
            const totalMedicines = await Inventory.count({ where: { type: 'medicine' } });
            const totalEquipment = await Inventory.count({ where: { type: 'equipment' } });

            const totalMedicineQuantity = await Inventory.sum('quantity', { where: { type: 'medicine' } }) || 0;
            const totalEquipmentQuantity = await Inventory.sum('quantity', { where: { type: 'equipment' } }) || 0;

            const stats = {
                medicines: {
                    totalItems: totalMedicines,
                    totalQuantity: totalMedicineQuantity
                },
                equipment: {
                    totalItems: totalEquipment,
                    totalQuantity: totalEquipmentQuantity
                }
            };

            logger.info('Inventory statistics retrieved', { stats });
            return stats;
        } catch (error) {
            logger.error('Error retrieving inventory stats', { error: error.message });
            throw error;
        }
    }
}

export default new MedicationService();