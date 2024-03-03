const express = require('express')
import cors from "cors"
const userRoutes = require('./routes/users')
const tourRoutes = require('./routes/tours')
const searchTourRoutes = require('./routes/toursearch')
const recommendationRoutes=require('./routes/recommendation')
const cookierParser = require("cookie-parser")
import { v2 as cloudinary } from "cloudinary"
import morgan from 'morgan'
const bookingRoutes = require('./routes/bookings')
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
app.use('/api/booking',bookingRoutes)
app.use('/api/recommendation', recommendationRoutes);


const server =app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


const io = require("socket.io")(server, {
  pingTimeout: 50000,
  cors: {
    origin: "http://localhost:5173",
  }
})

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with id= ${socket.id} joined Room`);
  });

  socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
  });
});



