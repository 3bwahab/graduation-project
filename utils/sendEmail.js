const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //*1-Create Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, //if secure false port 587
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //*2-Define email options
  const mailOpts = {
    from: "ASD App<khaledmanea0077@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //*3-Send Email
  await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;
