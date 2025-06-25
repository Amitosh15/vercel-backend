const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  console.log(name, email, message);

  // Configure your transporter (use your real email and password or environment variables)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL, // replace with your email
      pass: process.env.PASSWORD, // replace with your email password or app password
    },
  });

  const mailOptions = {
    from: email, // must match the authenticated account
    to: process.env.EMAIL,
    replyTo: email, // allows you to reply directly to the sender
    subject: `Portfolio Contact from ${name}`,
    text: `Sender Email: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server running at 8800");
});
