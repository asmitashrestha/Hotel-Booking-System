const express = require('express')
const userRoutes = require('./routes/users')
import cors from "cors"
const cookierParser = require("cookie-parser")
import {v2 as cloudinary} from "cloudinary"
const app = express();


cloudinary.config({
  cloud_name : process.env.ClOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
})

const PORT = process.env.PORT || 5000
require('dotenv').config()
require('./config/db')

app.use(express.json());
app.use(express.urlencoded({ extended : true}))
app.use(cookierParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))


app.get('/api', (req, res) => {
  res.send({
    msg: "Home Page"
  });
});

app.use('/api/users',userRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


