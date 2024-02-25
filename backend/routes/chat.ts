import verifyToken from "../middlewares/auth";

const express = require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controller/chatController');


const router = express.Router()
router.post("/",verifyToken,accessChat)
router.get("/",verifyToken, fetchChats);
router.post("/group",verifyToken, createGroupChat);
router.put("/rename",verifyToken, renameGroup);
router.put("/groupremove",verifyToken, removeFromGroup);
router.put("/groupadd",verifyToken, addToGroup);


module.exports = router