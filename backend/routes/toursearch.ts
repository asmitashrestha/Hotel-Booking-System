import express from 'express'
import { searchTour } from '../controller/tourConctroller'


const router = express.Router()


router.get('/searchs', searchTour)

module.exports = router