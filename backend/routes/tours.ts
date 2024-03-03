import express from "express";
import multer from "multer";
import verifyToken from "../middlewares/auth";
import { body } from "express-validator";
import { confirmBooking, deleteTour, editTour, fetchParticularTour, getTourList, myTourList, paymentTour } from "../controller/tourConctroller";
import Stripe from 'stripe'
import { sentimentRating } from "../controller/sentimentController";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string)
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

router.get('/addtour',getTourList)

router.get('/addtour/:id', verifyToken , fetchParticularTour)


router.put("/addtour/:tourId", verifyToken , upload.array("imageFiles"), editTour)
router.delete("/addtour/:tourId", verifyToken , deleteTour)

router.post('/:tourId/bookings/payment-intent',verifyToken, paymentTour)

router.post('/:tourId/bookings',verifyToken, confirmBooking )

router.post('/:tourId/ratings', verifyToken, sentimentRating);


module.exports = router
