import { myTourList } from "../controller/tourConctroller"

const express = require('express')
import multer from 'multer'
const router = express.Router()


const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits:{
    fileSize:5*1024*1024  //MB
  }
})
// api.mytour
router.post("/mytour",upload.array('imageFiles',6), myTourList)

