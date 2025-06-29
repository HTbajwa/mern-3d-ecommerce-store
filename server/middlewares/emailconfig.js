const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  auth: {
    user: 'hadiabajwa930@gmail.com',
    pass: 'feqk cwzw lvik ujxx'
  },
});

async function sendEmail(to, subject, text, html) {
  try {
    const mailOptions = {
      from: 'hadiatariqbajwa@gmail.com',
      to: to,
      subject: subject,
      text: text,
      html: html
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', to);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, error: error.message };
  }
}

module.exports = sendEmail;