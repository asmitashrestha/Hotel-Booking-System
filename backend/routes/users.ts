import express from "express";
import { check } from "express-validator";
import verifyUserLogin from "../controller/authController";
import verifyToken from "../middlewares/auth";
import { bookingUserDetails, createNewUser, findUsers, forgetPassword, resetPassword, verifyEmail } from "../controller/userController";
// const router = express.Router();
const router = express();

router.get('/me',verifyToken, bookingUserDetails)

router.post(
  "/register",
  [
    check("name", "Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be 6 charatcer").isLength({ min: 6 }),
  ],
  createNewUser
);

router.get('/register',verifyToken,findUsers)
router.post("/forgot-password", forgetPassword);
router.post("/reset-password", resetPassword);



router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be 6 character").isLength({
      min: 6,
    }),
  ],
  verifyUserLogin
);

// router.get("/validate-token", verifyToken, (req, res) => {
//   res.status(200).send({ userId: req.userId });
// });

router.get("/validate-token", verifyToken, (req: any, res) => { // Here, you can use 'any' for req if TypeScript still throws error
  const {user} = req;
  res.status(200).send({ userId: req.userId ,
  user:{
    id:user._id,
    name:user.name,
    email:user.email,
    isVerified:user.isVerified,
    role:user.role,
  }});
});

router.post("/signout", (req, res) => {
  res.cookie("auth_token", " ", {
    expires: new Date(0),
  });
  res.send();
});

router.post("/verify-email", verifyEmail);

module.exports = router;