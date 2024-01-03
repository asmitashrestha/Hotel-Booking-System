import { validationResult } from 'express-validator'
import User from '../model/UserModel'
import jwt from 'jsonwebtoken'

 
// logic responsible for signup or registration
export default async function createNewUser(req,res){
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      msg:errors.array()
    })
  }
  try {
    let user =await User.findOne({
      email:req.body.email
    })
    if(user){
      return res.status(400).json({
        msg:"User already exist"
      })
    }
    user = new User(req.body)
    await user.save()
    const token = jwt.sign({userId: user.id}, 
      process.env.JWT_SECRET_KEY as string, {
        expiresIn:"1d"
      })
      res.cookie("auth_token", token , {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      })
      return res.sendStatus(200).json({
        msg:"User Registered Successfully"
      })
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message.data)
  }
}

