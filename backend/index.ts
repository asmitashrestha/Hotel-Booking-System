const express = require('express')
const app = express();

require('dotenv').config()
require('./config/db')
const PORT = process.env.PORT || 5001
app.use(express.json());

app.get('/api', (req, res) => {
  res.send({
    msg: "Home Page"
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
