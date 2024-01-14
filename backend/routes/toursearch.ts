import express from 'express'
import { searchTour } from '../controller/tourConctroller'
import Tour from '../model/TourModel';


const router = express.Router()


router.get('/searchs', searchTour)
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find().sort("-lastUpdated");
    res.json(tours);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching tours" });
  }
});



module.exports = router