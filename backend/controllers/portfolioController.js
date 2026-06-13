const { Stat, Experience, Project, Skill, Education } = require('../models/Portfolio');

// Fetch all portfolio data
exports.getPortfolioData = async (req, res) => {
  try {
    const stats = await Stat.find({});
    const experiences = await Experience.find({});
    const projects = await Project.find({});
    const skills = await Skill.find({});
    const education = await Education.find({});

    res.json({
      stats,
      experiences,
      projects,
      skills,
      education
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const nodemailer = require('nodemailer');

// Handle contact form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Portfolio Contact from ${name}`,
      text: `You have a new message from your portfolio website!

Name: ${name}
Email: ${email}
Message: 
${message}`,
      replyTo: email
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully.');
    
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
