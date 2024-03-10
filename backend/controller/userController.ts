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
      service: "gmail",
      auth: {
        user: "travelharbor076@gmail.com",
        pass: "ejojzmlkgqjusbet",
      },
    });

    await transporter.sendMail({
      from: 'travelharbor076@gmail.com',
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
    return res.status(400).json({ error: "Please submit a valid OTP" });
  }
  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "travelharbor076@gmail.com",
      pass: "ejojzmlkgqjusbet",
    },
  });

  transporter.sendMail({
    from: "travelharbor076@gmail.com",
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

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ error: "Email is missing" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });


  const resetPasswordUrl = `http://localhost:5173/reset-password?id=${user._id}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "travelharbor076@gmail.com",
      pass: "ejojzmlkgqjusbet",
    },
  });

  transporter.sendMail({
    from: "travelharbor076@gmail.com",
    to: user.email,
    subject: "Reset Password Link",
    html: `
        <p>Click here to reset password</p>
        <a href='${resetPasswordUrl}'>Change Password</a>
    
      `,
  });
  res.json({ message: "Link sent to your email" });
};

export const resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);
  if (matched)
    return res.status(400).json({
      error: "The new password must be different from the old one",
    });

  user.password = newPassword;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "travelharbor076@gmail.com",
      pass: "ejojzmlkgqjusbet",
    },
  });

  transporter.sendMail({
    from: "travelharbor076@gmail.com",
    to: user.email,
    subject: "Password reset sucessfully",
    html: `
        <h1>Password reset sucessfully</h1>
    
      `,
  });
  res.json({ message: "Password changed sucessfully" });
};

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

