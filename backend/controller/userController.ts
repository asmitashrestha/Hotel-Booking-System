import User from '../model/UserModel'
import jwt from 'jsonwebtoken'
async function createNewUser(req,res){
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
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message.data)
  }
}