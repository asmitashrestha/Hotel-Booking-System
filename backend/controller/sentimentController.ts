import { Request, Response } from "express";
import Tour from "../model/TourModel";
import Sentiment from "sentiment";

export const sentimentRating = async (req: Request, res: Response) => {
  const { tourId } = req.params;
  const { comment } = req.body;

  try {
    // Fetch the tour with populated ratings array
    const tour = await Tour.findById(tourId).populate("ratings");
    if (!tour) {
      return res.status(404).json({ message: "Tour not found." });
    }

    // Perform sentiment analysis on the comment
    const sentiment = new Sentiment();
    const { score } = sentiment.analyze(comment);

    // Normalize the sentiment score to be between -1 and 1
    const normalizedScore = Math.min(Math.max(score / 5, -1), 1);

    // Calculate the adjusted rating based on sentiment score
    let rating = normalizedScore * 4 + 3; // Scale the sentiment score to fit within the range of 1-5

    // Ensure rating is within the range of 1-5
    rating = Math.max(1, Math.min(5, rating));

    // Push the new rating and comment into the ratings array
    tour.ratings.push({ comment, rating });

    // Calculate the average starRating
    const totalRatings = tour.ratings.length;
    const totalRatingSum = tour.ratings.reduce((sum, { rating }) => sum + rating, 0);
    const averageRating = totalRatingSum / totalRatings;

    // Update the tour's starRating
    tour.starRating = averageRating;

    // Save the updated tour
    await tour.save();

    res.status(201).json({ message: "Rating submitted successfully.", tour });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
