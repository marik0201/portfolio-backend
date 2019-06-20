const express = require('express');
const profileRouter = express.Router();
const About = require('../models/about');
const Contact = require('../models/contact');
const Project = require('../models/project');

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
    if (err) {
      return res.status(500).json({ message: 'Server' });
    }
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

module.exports = profileRouter;
