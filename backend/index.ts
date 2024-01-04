const express = require('express')
const userRoutes = require('./routes/users')
const cors = require("cors")
const cookierParser = require("cookie-parser")
const app = express();


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


