import verifyToken from "../middlewares/auth";

const express = require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controller/chatController');


const router = express.Router()
router.route("/").post(verifyToken, accessChat)
router.route("/").get(verifyToken, fetchChats);
router.route("/group").post(verifyToken, createGroupChat);
router.route("/rename").put(verifyToken, renameGroup);
router.route("/groupremove").put(verifyToken, removeFromGroup);
router.route("/groupadd").put(verifyToken, addToGroup);


module.exports = router