import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

const verifyToken = (req,res,next) =>{
  const token = req.cookies["auth_token"]
  if(!token){
    return res.status(401).json({
      msg:"unauthorized"
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    req.userId = (decoded as JwtPayload).userId
    next()
  } catch (error) {
    console.log(error.message);
    
    return res.status(401).json({
      msg:"unauthorized"
    });
  }
}

export default verifyToken

