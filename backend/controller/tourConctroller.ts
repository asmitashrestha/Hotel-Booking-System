import cloudinary from "cloudinary";
import Tour, { TourType } from "../model/PackageModel";

export const myTourList = async (req, res) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newPackage: TourType = req.body;

    // upload the image to clodinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64"); //Encode the image as b64
      let dataURI = "data:" + image.mimetype + ";base64," + b64; //image type like .jpg .png or others
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });

    console.log("before");

    const imageUrls = await Promise.all(uploadPromises);
    console.log("after");
    newPackage.imageUrls = imageUrls;
    newPackage.lastUpdated = new Date();
    newPackage.userId = req.userId;

    const tour = new Tour(newPackage);
    await tour.save();

    return res.status(200).send(tour);
  } catch (error) {
    console.log("hjhhj", error);
    // console.log(error);

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
