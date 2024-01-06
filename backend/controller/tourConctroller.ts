// import multer from "multer";

// const storage = multer.memoryStorage()
// const upload = multer({
//   storage: storage,
//   limits:{
//     fileSize:5*1024*1024  //MB
//   }
// })

import cloudinary from 'cloudinary'
export const myTourList = async (req, res) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newPackage = req.body;

    // upload the image to clodinary then if upload was successful, add the URLS to the new package and the save the new hotel to our database and return the 200 status
  const uploadPromises = imageFiles.map(async(image)=>{
    const b64 = Buffer.from(image.buffer).toString('base64') //Encode the image as b64 
    let dataURI = 'data:' + image.mimetype + ';base64' + b64   //image type like .jpg .png or others

    const res = await cloudinary.v2.uploader.upload(dataURI)
    return res.url
  })

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Error occur couldn't post a tour",
    });
  }
};
