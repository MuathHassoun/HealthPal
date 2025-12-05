import logger from '../config/logger.js';

export const calculateLocationScore = (location1, location2) => {
    if (!location1 || !location2) return 0;

    const loc1 = location1.toLowerCase().trim();
    const loc2 = location2.toLowerCase().trim();


    if (loc1 === loc2) return 100;


    if (loc1.includes(loc2) || loc2.includes(loc1)) return 75;


    const cities = ['gaza', 'hebron', 'nablus', 'ramallah', 'jenin', 'bethlehem', 'jericho'];
    const city1 = cities.find(city => loc1.includes(city));
    const city2 = cities.find(city => loc2.includes(city));

    if (city1 && city2 && city1 === city2) return 50;

    return 0;
};


export const calculateQuantityScore = (available, requested) => {
    if (available < requested) return 0; // Not enough

    const difference = available - requested;

    // Perfect match
    if (difference === 0) return 100;

    // Close match (within 10%)
    if (difference <= requested * 0.1) return 90;

    // Good match (within 50%)
    if (difference <= requested * 0.5) return 75;

    // Acceptable match
    return Math.max(50 - (difference / requested) * 10, 30);
};


export const calculateNameSimilarity = (name1, name2) => {
    if (!name1 || !name2) return 0;

    const n1 = name1.toLowerCase().trim();
    const n2 = name2.toLowerCase().trim();

    // Exact match
    if (n1 === n2) return 100;

    // Contains match
    if (n1.includes(n2) || n2.includes(n1)) return 80;

    // Word match (any common words)
    const words1 = n1.split(/\s+/);
    const words2 = n2.split(/\s+/);
    const commonWords = words1.filter(word => words2.includes(word));

    if (commonWords.length > 0) {
        return 60 + (commonWords.length / Math.max(words1.length, words2.length)) * 20;
    }

    return 0;
};


export const calculateMatchScore = (item, request) => {
    const locationScore = calculateLocationScore(item.location, request.location);
    const quantityScore = calculateQuantityScore(item.quantity, request.quantity);
    const nameScore = calculateNameSimilarity(item.name, request.itemName);

    //  name (40%), quantity (35%), location (25%)
    const totalScore = (nameScore * 0.4) + (quantityScore * 0.35) + (locationScore * 0.25);

    logger.debug('Match score calculated', {
        itemId: item.id,
        nameScore,
        quantityScore,
        locationScore,
        totalScore
    });

    return Math.round(totalScore);
};


export const prioritizeMatches = (matches, urgency = 'normal') => {
    const urgencyWeights = {
        critical: { quantity: 0.6, location: 0.4 },
        high: { quantity: 0.5, location: 0.5 },
        normal: { quantity: 0.4, location: 0.6 },
        low: { quantity: 0.3, location: 0.7 }
    };

    const weights = urgencyWeights[urgency] || urgencyWeights.normal;

    return matches.map(match => ({
        ...match,
        priorityScore: (match.quantityScore * weights.quantity) +
            (match.locationScore * weights.location)
    })).sort((a, b) => b.priorityScore - a.priorityScore);
};


export const filterMatchesByThreshold = (matches, minScore = 50) => {
    return matches.filter(match => match.matchScore >= minScore);
};


export const groupMatchesByLocation = (matches) => {
    const grouped = {};

    matches.forEach(match => {
        const location = match.location || 'Unknown';
        if (!grouped[location]) {
            grouped[location] = [];
        }
        grouped[location].push(match);
    });

    return grouped;
};


export const getBestMatch = (matches) => {
    if (matches.length === 0) return null;

    return matches.reduce((best, current) =>
        current.matchScore > best.matchScore ? current : best
    );
};


export const validateMatchRequest = (request) => {
    const errors = [];

    if (!request.itemType || !['medicine', 'equipment'].includes(request.itemType)) {
        errors.push('Invalid item type');
    }

    if (!request.itemName || request.itemName.trim().length < 2) {
        errors.push('Item name must be at least 2 characters');
    }

    if (!request.quantity || request.quantity <= 0) {
        errors.push('Quantity must be greater than 0');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export default {
    calculateLocationScore,
    calculateQuantityScore,
    calculateNameSimilarity,
    calculateMatchScore,
    prioritizeMatches,
    filterMatchesByThreshold,
    groupMatchesByLocation,
    getBestMatch,
    validateMatchRequest
};