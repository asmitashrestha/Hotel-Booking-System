import express from "express";
import createNewUser from "../controller/userController";
import { check } from "express-validator";
import verifyUserLogin from "../controller/authController";
const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be 6 charatcer").isLength({ min: 6 }),
  ],
  createNewUser
);

router.post("/signin",[
  check("email","Email is required").isEmail(),
  check("password","Password must be 6 character").isLength({
    min:6
  })
],
verifyUserLogin
)

module.exports = router;
