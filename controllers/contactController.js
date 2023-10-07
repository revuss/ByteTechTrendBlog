const nodemailer = require("nodemailer");

// Create a reusable transporter using a predefined SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL_USER,
    pass: process.env.SMTP_EMAIL_PASS_APPKEY,
  },
});

module.exports = {
  submit: async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Compose the email message
      const mailOptions = {
        from: email,
        to: process.env.SMTP_EMAIL_RECIVERS,
        subject,
        text: "From Blog App",
        html: `
          <b><h3>Name: </h3></b> <p> ${name} </p> <br /><br />
          <b><h3>Message: </h3></b> <p> ${message}</p><br /><br />
          <b><h3>Mail: </h3></b> <p>${email}</p>
        `,
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);

      console.log("Email sent:", info.response);

      res.redirect("/contact");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
