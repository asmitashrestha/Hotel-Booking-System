const express = require('express');
const tourController = require('../controller/recommendation');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { location, type, budget } = req.body;

        if (!location || !type || !budget) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        // User preferences with weights
        const userWeights = [
            { feature: 'location', weight: 0.5 },
            { feature: 'type', weight: 0.3 },
            { feature: 'budget', weight: 0.7 },
            { feature: 'starRating', weight: 0.5 } // Add weight for starRating
        ];

        const userPreferences = { location, type, budget: parseFloat(budget) };
        const recommendations = await tourController.recommendTours(userPreferences, userWeights);

        res.json({ success: true, recommendations });
    } catch (err) {
        console.error("Error recommending tours:", err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;
