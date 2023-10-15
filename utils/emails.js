const nodemailer = require("nodemailer");
const User = require("../models/user");

const sendVerificationEmail = async (toId, toEmail, token) => {
  const user = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user, pass },
  });

  const html = `
    <h1>verfication email</h1>
    <p>token = ${token}</p>
  `;

  const mailOptions = {
    from: user,
    to: toEmail,
    subject: "Verification email",
    html,
  };

  try {
    console.log(await transporter.sendMail(mailOptions));
  } catch (err) {
    await User.findByIdAndDelete(toId);
    throw new Error(`${toEmail} doesn't exist`);
  }
};

module.exports = { sendVerificationEmail };
