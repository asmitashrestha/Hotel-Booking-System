// import jwt, { JwtPayload } from 'jsonwebtoken'
// import User from '../model/UserModel';

// declare global {
//   namespace Express {
//     interface Request {
//       userId: string;
//     }
//   }
// }

// const verifyToken = (req,res,next) =>{
//   const token = req.cookies["auth_token"]
//   if(!token){
//     return res.status(401).json({
//       msg:"unauthorized"
//     });
//   }
//   // console.log("Auth",req.headers.authorization)
//   console.log(token);
//   // console.log("Token",req.headers.authorization.split(' ')[1]);
 
  
  
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
//     req.userId = (decoded as JwtPayload).userId
//     next()
//   } catch (error) {
//     console.log(error.message);
    
//     return res.status(401).json({
//       msg:"unauthorized"
//     });
//   }
// }

// export default verifyToken


import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { UserType } from '../model/UserModel';

declare global {
  namespace Express {
    interface Request {
      userId: string;
      user:UserType;
    }
  }
}

const verifyToken =async (req, res, next) => {
  const token = req.cookies["auth_token"] || (req.headers.authorization &&req.headers.authorization.split(' ')[1]);
  
  if (!token) {
    return res.status(401).json({
      msg: "Unauthorized"
    });
  }
  
  console.log("Token1",token);
  console.log("Token",req.headers.authorization);
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    // console.log(req.userId);
    const user = await User.findById(req.userId)
    if(!user){
      return res.status(401).json({
        msg:"Unauthorized"
      })
    }
    req.user=user
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({
      msg: "Unauthorized "
    });
  }
};

export default verifyToken;
