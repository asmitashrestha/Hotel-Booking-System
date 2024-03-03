const nodemailer = require("nodemailer");

export const generateOTP = (otp_length = 6) => {
  //generating 6 digit OTP
  let OTP = "";
  for (let i = 1; i <= otp_length; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  return OTP;
};

exports.generateMailTranporter = () => {
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "cfe76195695bed",
      pass: "56b03a7882315e",
    },
  });
};
