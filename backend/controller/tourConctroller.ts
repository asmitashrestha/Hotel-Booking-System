import cloudinary from "cloudinary";
import Tour, { TourType } from "../model/TourModel";

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
