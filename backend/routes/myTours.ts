import express, { Request, Response } from "express";
import multer from "multer";
import verifyToken from "../middlewares/auth";
import { body } from "express-validator";
import { getTourList, myTourList } from "../controller/tourConctroller";


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/addtour",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Tour type is required"),
    body("pricePerPackage")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per package is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  myTourList
)

router.get('/addtour', verifyToken,getTourList)

module.exports = router
