const express = require('express')
import cors from "cors"
const userRoutes = require('./routes/users')
const tourRoutes = require('./routes/tours')
const searchTourRoutes = require('./routes/toursearch')
const cookierParser = require("cookie-parser")
import { v2 as cloudinary } from "cloudinary"
import morgan from 'morgan'
const app = express();

require('dotenv').config()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

cloudinary.config({
  cloud_name : process.env.ClOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
})

const PORT = process.env.PORT || 5000

require('./config/db')

app.use(morgan("dev"))
app.use(cookierParser())
app.use(express.json());
app.use(express.urlencoded({ extended : true}))

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
// }))




app.get('/api', (req, res) => {
  res.send({
    msg: "Home Page"
  });
});




app.use('/api/users',userRoutes)
app.use('/api/my-package',tourRoutes)
app.use('/api/search-tour', searchTourRoutes)


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


