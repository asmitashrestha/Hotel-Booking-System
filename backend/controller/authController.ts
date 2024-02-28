import { validationResult } from "express-validator";
import User from "../model/UserModel";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// for login/signin
export default async function verifyUserLogin(req,res){
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      msg: errors.array()
    })
  }
  const {email, password} = req.body 
  const user = await User.findOne({email})
  try {
 
    if(!user){
      return res.status(400).json({
        msg:"Invalid Credentials"
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
      return res.status(400).json({
        msg:"Invalid Credentials"
      })
    }

    const {_id, name , email, isVerified,role} = user

    const token = jwt.sign(
      {userId: user.id},
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn:"1d",
      }
    )
    res.cookie("auth_token", token, {
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    })
    console.log(token);
    
    res.status(200).json({
      userId: user._id,
      name:user.name,
      email:user.email,
      img:user.img,
      token:token,
      user:{id:_id,name,email,role,token:token, isVerified},
      msg:"Login sucessfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg:"Something went wrong"
    })
    
  }
}