import express from 'express'
import { searchTour, viewDetailsById } from '../controller/tourConctroller'
import Tour from '../model/TourModel';
import { param } from 'express-validator';


const router = express.Router()


router.get('/searchs', searchTour)


router.get('/:id',
 [param("id").notEmpty().withMessage("Tour ID is required")], viewDetailsById)


module.exports = router