import cloudinary from "cloudinary";
import Tour, { TourType } from "../model/TourModel";
import { TourSearchResponse } from "../shared/types";

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
    const tours = await Tour.find({ userId: req.userId });
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
      userId: req.userId,
    });
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



export const searchTour = async(req,res) =>{
  try {
    const pageSize = 6;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() 
    : "1")
    const skip = (pageNumber - 1) * pageSize

    const tours = await Tour.find().skip(skip).limit(pageSize)
    const total = await Tour.countDocuments()

    const response: TourSearchResponse = {
      data: tours,
      pagination:{
        total,
        page:pageNumber,
        pages: Math.ceil(total/pageSize)
      }
    }
    return res.json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg :"No data found"
    })
  }
}