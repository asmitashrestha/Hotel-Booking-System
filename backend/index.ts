const express = require('express')
const userRoutes = require('./routes/users')
const app = express();
const cors = require("cors")

require('dotenv').config()
require('./config/db')
const PORT = process.env.PORT || 5001
app.use(express.json());
app.use(express.urlencoded({ extended : true}))
app.use(cors())
app.get('/api', (req, res) => {
  res.send({
    msg: "Home Page"
  });
});

app.use('/api/users',userRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
