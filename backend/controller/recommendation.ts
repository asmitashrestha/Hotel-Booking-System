// tourController.js

import Tour from "../model/TourModel";

// Function to retrieve tour data from MongoDB

async function getTourData() {
    try {
        const tours = await Tour.find({});
        return tours;
    } catch (err) {
        console.error("Error fetching tour data:", err);
        throw err;
    }
}

function calculateTourSimilarity(userPreferences, tour, userWeights) {
    let totalWeight = 0;
    let totalSimilarity = 0;

    // Calculate total weight
    userWeights.forEach(pref => {
        totalWeight += pref.weight;
    });

    // Check for perfect matches in all fields
    let perfectMatch = true;
    userWeights.forEach(pref => {
        switch (pref.feature) {
            case 'location':
                if (userPreferences.location.toLowerCase() !== tour.city.toLowerCase()) {
                    perfectMatch = false;
                }
                break;
            case 'type':
                if (userPreferences.type.toLowerCase() !== tour.type.toLowerCase()) {
                    perfectMatch = false;
                }
                break;
            case 'budget':
                if (userPreferences.budget < tour.pricePerPackage) {
                    perfectMatch = false;
                }
                break;
        }
    });

    // If all fields are a perfect match, prioritize it
    if (perfectMatch) {
        return Number.MAX_SAFE_INTEGER;
    }

    // Calculate similarity for each preference and aggregate
    userWeights.forEach(pref => {
        switch (pref.feature) {
            case 'location':
                if (userPreferences.location.toLowerCase() === tour.city.toLowerCase()) {
                    totalSimilarity += (pref.weight / totalWeight); // Adjust weight based on totalWeight
                }
                break;
            case 'type':
                if (userPreferences.type.toLowerCase() === tour.type.toLowerCase()) {
                    totalSimilarity += (pref.weight / totalWeight); // Adjust weight based on totalWeight
                }
                break;
            case 'budget':
                if (userPreferences.budget >= tour.pricePerPackage) {
                    totalSimilarity += (pref.weight / totalWeight); // Adjust weight based on totalWeight
                }
                break;
            case 'starRating':
                totalSimilarity += (tour.starRating * pref.weight); // Weight starRating
                break;
            // Add other preferences as needed
        }
    });

    return totalSimilarity;
}

async function recommendTours(userPreferences, userWeights) {
    try {
        const tours = await getTourData();
        const recommendedTours = [];

        tours.forEach(tour => {
            const similarity = calculateTourSimilarity(userPreferences, tour, userWeights);
            recommendedTours.push({ tour, similarity });
        });

        recommendedTours.sort((a, b) => b.similarity - a.similarity);

        return recommendedTours;
    } catch (err) {
        console.error("Error recommending tours:", err);
        throw err;
    }
}

module.exports = {
    recommendTours
};
