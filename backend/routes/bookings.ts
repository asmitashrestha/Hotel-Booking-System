import express, { Request, Response } from 'express';
import { userBooking } from '../controller/bookingController'
import verifyToken from '../middlewares/auth';

const router = express.Router()


// router.get('/user-booking',verifyToken,userBooking)
router.get('/user-booking',verifyToken,userBooking)

module.exports = router