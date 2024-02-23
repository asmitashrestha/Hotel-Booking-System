import verifyToken from "../middlewares/auth"
const express = require('express')
const { sendMessage, allMessage } = require('../controller/messageController')

const router = express.Router()

router.route("/").post(verifyToken,sendMessage)
router.route('/:chatId').get(verifyToken,allMessage)

module.exports = router