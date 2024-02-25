import { validationResult } from "express-validator";
import User from "../model/UserModel";
import jwt from "jsonwebtoken";
const asyncHandler = require("express-async-handler");
// const generateToken = require("../config/generateToken")

// logic responsible for signup or registration
export const createNewUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: errors.array(),
    });
  }
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).json({
        msg: "User already exist",
      });
    }
    user = new User(req.body);
    await user.save();
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).json({
      msg: "User Registered Successfully",
      userId:user._id,
      name:user.name,
      email:user.email,
      img:user.img,
      token:token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message.data);
  }
};

// chat wala ko lagi 
export const findUsers = asyncHandler(async(req,res)=>{
  const keyword = req.query.search ?{
      $or:[
          {name: { $regex: req.query.search, $options: "i"}},
          {email: { $regex: req.query.search, $options: "i"}},
      ]
  }: {};
  const users = await User.find(keyword).find({_id:{$ne:req.userId}})
  res.send(users)
  
})

export const bookingUserDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};