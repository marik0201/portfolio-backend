const express = require('express');
const path = require('path');
const profileRouter = express.Router();
const About = require('../models/about');
const Contact = require('../models/contact');
const Project = require('../models/project');

profileRouter.get('/avatar', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/images/avatar.png'));
});

profileRouter.get('/about', async (req, res) => {
  try {
    const about = await About.find({});
    return res.json({
      about
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    return res.json({
      contacts
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    return res.json({
      projects
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.get('/projects/pages', async (req, res) => {
  try {
    const projectsPages = Math.ceil((await Project.countDocuments()) / 4);

    return res.json({
      projectsPages
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.get('/projects/pages/:page', async (req, res) => {
  try {
    const projects = await Project.find({})
      .skip(req.params.page * 4)
      .limit(4);

    return res.json({
      projects
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

profileRouter.post('/email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: 'Please fill all fields'
    });
  }

  const nodemailer = require('nodemailer');
  const transportConfig = require('../configs/smtp');
  const transporter = nodemailer.createTransport(transportConfig);

  const mailData = {
    from: email,
    to: 'marktechart@gmail.com',
    text: `by ${name}; Email: ${email}
    ${message}`
  };

  transporter.sendMail(mailData, err => {
    if (err) {
      return res.status(500).json({ message: 'Server Error' });
    } else {
      return res.json({ message: 'Message sent' });
    }
  });
});

module.exports = profileRouter;
