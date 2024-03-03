import { validationResult } from "express-validator";
import User from "../model/UserModel";
import jwt from "jsonwebtoken";
import EmailVerificationToken from "../model/emailVerificationToken";
const asyncHandler = require("express-async-handler");
import nodemailer from "nodemailer"
import {generateOTP} from "../utils/mail"
import { isValidObjectId } from "mongoose";
// const generateToken = require("../config/generateToken")

// logic responsible for signup or registration
export const createNewUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User(req.body);
    await user.save();

    // Generating 6 digit OTP
    const OTP = generateOTP();

    // Storing OTP inside database
    const newEmailVerificationToken = new EmailVerificationToken({
      owner: user._id,
      token: OTP,
    });
    await newEmailVerificationToken.save();

    // Sending OTP to user
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'cfe76195695bed',
        pass: '56b03a7882315e',
      },
    });

    await transporter.sendMail({
      from: 'verification@reviewapp.com',
      to: email,
      subject: 'Email Verification',
      html: `
        <p>Your Verification OTP</p>
        <h1>${OTP}</h1>
      `,
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000,
    });

    res.status(200).json({
      msg: 'User Registered Successfully',
      userId: user._id,
      name: user.name,
      email: user.email,
      img: user.img,
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) {
    return res.json({ error: "Invalid User" });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.json({ error: "User not found" });
  }
  if (user.isVerified) {
    return res.json({ error: "User is already verified" });
  }

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) {
    return res.json({ error: "Token not found" });
  }

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) {
    return res.json({ error: "Please submit a valid OTP" });
  }
  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "cfe76195695bed",
      pass: "56b03a7882315e",
    },
  });

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Welcome Email",
    html: "<h1>Welcome to our App</h1>",
  });

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
      isVerified: user.isVerified,
      role: user.role,
    },
    message: "Your email is verified",
  });
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

