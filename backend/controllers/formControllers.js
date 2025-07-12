import {FormModel} from '../models/formModel.js';
import nodemailer from 'nodemailer';

const sendMail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Community Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: 'New Community Form Submission',
    html: `
      <h2>New Form Submission</h2>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Phone:</strong> ${data.phoneNumber}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Role:</strong> ${data.role}</p>
      <p><strong>Agreed to Terms:</strong> ${data.agreedToTerms}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const handleFormSubmission = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, role, agreedToTerms } = req.body;

    // Validation
    if (!fullName || !phoneNumber || !email || !role || agreedToTerms !== true) {
      return res.status(400).json({ message: 'All fields are required and terms must be accepted.' });
    }

    const form = new FormModel({ fullName, phoneNumber, email, role, agreedToTerms });
    await form.save();

    await sendMail({ fullName, phoneNumber, email, role, agreedToTerms });

    res.status(200).json({ message: 'Form submitted and email sent successfully.' });
  } catch (error) {
    console.error('Form submission error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
