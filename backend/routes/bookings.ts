import express, { Request, Response } from 'express';
import { userBooking } from '../controller/bookingController'
import verifyToken from '../middlewares/auth';
import { getUserDetailsForTour } from '../controller/tourConctroller';

const router = express.Router()


// router.get('/user-booking',verifyToken,userBooking)
router.get('/user-booking',verifyToken,userBooking)

router.get('/tour/user-details', getUserDetailsForTour);

module.exports = router