import cloudinary from "cloudinary";
import Tour, { TourType } from "../model/TourModel";
import { BookingType, TourSearchResponse } from "../shared/types";
import { validationResult } from "express-validator";
import Stripe from "stripe";
require('dotenv').config()
const stripe= new Stripe(process.env.STRIPE_API_KEY as string);

export const myTourList = async (req, res) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newPackage: TourType = req.body;

    // upload the image to clodinary
    const imageUrls = await uploadImages(imageFiles);
    newPackage.imageUrls = imageUrls;
    newPackage.lastUpdated = new Date();
    newPackage.userId = req.userId;

    const tour = new Tour(newPackage);
    await tour.save();

    return res.status(200).send(tour);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Error occur couldn't post a tour",
    });
  }
};

export const getTourList = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching tours..",
    });
  }
};

export const fetchParticularTour = async (req, res) => {
  const id = req.params.id.toString();
  try {
    const tour = await Tour.findOne({
      _id: id,
    });
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching tour",
    });
  }
};


export const editTour = async (req, res) => {
  try {
    const updateTour: TourType = req.body;
    updateTour.lastUpdated = new Date();
    const tour = await Tour.findOneAndUpdate(
      {
        _id: req.params.tourId,
        userId: req.userId,
      },
      updateTour,
      { new: true }
    );
    if (!tour) {
      res.status(404).json({
        msg: "Tour not found",
      });
    }
    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);
    tour.imageUrls = [...updatedImageUrls, ...(updateTour.imageUrls || [])];
    await tour.save();
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong can't update",
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findOneAndDelete({
      _id: req.params.tourId,
      userId: req.userId,
    });

    if (!tour) {
      res.status(404).json({
        msg: "Tour not found",
      });
      return;
    }

    // You might want to delete associated images from cloud storage here
    // For simplicity, let's assume there is a function called deleteImages
    // that takes an array of image URLs and deletes them from cloud storage.
    await deleteImages(tour.imageUrls);

    res.status(200).json({
      msg: "Tour deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Something went wrong, can't delete the tour",
    });
  }
};

// Function to delete images from cloud storage
async function deleteImages(imageUrls) {
  const deletePromises = imageUrls.map(async (imageUrl) => {
    // Assuming there is a function in cloudinary or another service to delete an image
    await cloudinary.v2.uploader.destroy(imageUrl);
  });

  await Promise.all(deletePromises);
}

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64"); //Encode the image as b64
    let dataURI = "data:" + image.mimetype + ";base64," + b64; //image type like .jpg .png or others
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export const searchTour = async (req, res) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerPackageAsc":
        sortOptions = { pricePerPackage: 1 };
        break;
      case "pricePerPackageDesc":
        sortOptions = { pricePerPackage: -1 };
        break;
    }
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const tours = await Tour.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Tour.countDocuments();

    const response: TourSearchResponse = {
      data: tours,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "No data found",
    });
  }
};

export const viewDetailsById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const id = req.params.id.toString();

  try {
    const tour = await Tour.findById(id);
    res.json(tour);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error occured while fetching the details..",
    });
  }
};

export const paymentTour = async (req, res) => {
  const tourId = req.params.tourId;
  const tour = await Tour.findById(tourId);
  if (!tour) {
    return res.status(400).json({
      msg: "Tour not found",
    });
  }
  const totalCost = tour.pricePerPackage;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost,
    currency: "gbp",
    metadata: {
      tourId,
      userId: req.userId,
    },
  });
  if (!paymentIntent.client_secret) {
    return res.status(500).json({
      msg: "Error creating payment intent",
    });
  }
console.log(paymentIntent);

  const response = {
    paymentIntentId: paymentIntent.id,
    clientsecret: paymentIntent.client_secret.toString(),
    totalCost,
  };
  res.send(response);
};

export const confirmBooking = async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );

    if (!paymentIntent) {
      return res.status(400).json({
        msg: "Payment intent not found",
      });
    }

    // Ensure that the payment intent is associated with the correct tour and user
    if (
      paymentIntent.metadata.tourId !== req.params.tourId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(400).json({
        msg: "Payment intent mismatch",
      });
    }

    // Ensure that the payment intent status is succeeded
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        msg: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    };

    // Find the tour by ID and update its bookings array
    const tour = await Tour.findOneAndUpdate(
      {
        _id: req.params.tourId,
      },
      {
        $push: { bookings: newBooking },
      },
      { new: true } // Return the modified tour document
    );

    // If the tour doesn't exist, return an error
    if (!tour) {
      return res.status(404).json({
        msg: "Tour not found",
      });
    }

    await tour.save(); // Save the updated tour document

    res.status(200).json({
      msg: "Booking confirmed successfully",
    });
  } catch (error) {
    console.error("Error occurred while confirming booking:", error);
    res.status(500).json({
      msg: "Error occurred while confirming booking",
    });
  }
};

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [{ city: new RegExp(queryParams.destination, "i") }];
  }
  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }
  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }
  if (queryParams.stars) {
    const starRating = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);
    // const starRating = parseInt(queryParams.stars.toString());
    constructedQuery.starRating = {
      $eq: starRating,
    };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerPackage = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }
  return constructedQuery;
};


 export const getUserDetailsForTour = async (req, res) => {
   try {
     // Find the booking associated with the specified tour ID using the Booking model
     const foundBooking = await Tour.find({
      //  tourId: req.params.tourId, 
     }) // Populate the userId field to get user details
 
     // If the booking doesn't exist, return an error
     if (!foundBooking) {
       return res.status(404).json({
         msg: "Booking not found for the specified tour",
       });
     }
 
     // Extract user details from the populated userId field
     const userDetails = foundBooking;
     console.log("Hello");
     console.log("Userdetails",userDetails);
     
     
 
     res.status(200).json({
       userDetails: userDetails,
     });
   } catch (error) {
     console.error("Error occurred while getting user details for tour:", error);
     res.status(500).json({
       msg: "Error occurred while getting user details for tour",
     });
   }
 };

