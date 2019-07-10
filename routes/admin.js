const express = require('express');
const multer = require('multer');
const request = require('request');
const adminRouter = express.Router();
const Contact = require('../models/contact');
const Project = require('../models/project');
const About = require('../models/about');
const upload = require('../configs/multer-storage');
const parseGitHub = require('../services/git-parsing');

adminRouter.post('/address', async (req, res) => {
  const address = req.body.address;
  const userId = req.user._conditions._id;

  if (!address) {
    return res.status(400).json({
      message: 'Adress is required'
    });
  }

  await Contact.findOneAndUpdate({ userId }, { address });

  return res.status(200).json({
    message: 'Address information was updated'
  });
});

adminRouter.post('/telephone', async (req, res) => {
  const telephone = req.body.telephone;
  const userId = req.user._conditions._id;

  if (!telephone) {
    return res.status(400).json({
      message: 'telephone is required'
    });
  }

  await Contact.findOneAndUpdate({ userId }, { telephone });

  return res.status(200).json({
    message: 'telephone was updated'
  });
});

adminRouter.post('/email', async (req, res) => {
  const email = req.body.email;
  const userId = req.user._conditions._id;

  if (!email) {
    return res.status(400).json({
      message: 'email is required'
    });
  }

  await Contact.findOneAndUpdate({ userId }, { email });

  return res.status(200).json({
    message: 'email was updated'
  });
});

adminRouter.post('/contact/visibility', async (req, res) => {
  const userId = req.user._conditions._id;

  await Contact.findOne({ userId }, async (err, data) => {
    if (err) {
      return res.status(400);
    }

    data.isVisible = !data.isVisible;
    await data.save();

    return res.json({
      message: 'Visibility was changed'
    });
  });
});

adminRouter.post('/profile/avatar', async (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        message: err.message
      });
    } else if (err) {
      return res.status(500);
    }

    return res.status(200);
  });
});

adminRouter.post('/about/shorttext', async (req, res) => {
  const shortText = req.body.shorttext;
  const userId = req.user._conditions._id;

  if (!shortText) {
    return res.status(400).json({
      message: 'shorttext is required'
    });
  }

  await About.findOneAndUpdate({ userId }, { shortText });

  return res.status(200).json({
    message: 'shorttext was updated'
  });
});

adminRouter.post('/about/linkedinlink', async (req, res) => {
  const linkedinLink = req.body.linkedinlink;
  const userId = req.user._conditions._id;

  if (!linkedinLink) {
    return res.status(400).json({
      message: 'linkedinlink is required'
    });
  }

  await About.findOneAndUpdate({ userId }, { linkedinLink });

  return res.status(200).json({
    message: 'linkedinlink was updated'
  });
});

adminRouter.post('/about/githublink', async (req, res) => {
  const githubLink = req.body.githublink;
  const userId = req.user._conditions._id;

  if (!githubLink) {
    return res.status(400).json({
      message: 'githublink is required'
    });
  }

  await About.findOneAndUpdate({ userId }, { githubLink });

  return res.status(200).json({
    message: 'githublink was updated'
  });
});

adminRouter.post('/about/text', async (req, res) => {
  const text = req.body.text;
  const userId = req.user._conditions._id;

  if (!text) {
    return res.status(400).json({
      message: 'text is required'
    });
  }

  await About.findOneAndUpdate({ userId }, { text });

  return res.status(200).json({
    message: 'text was updated'
  });
});

adminRouter.post('/projects/git-user', async (req, res) => {
  const username = req.body.username;

  request.get(`https://github.com/${username}`, (err, response, body) => {
    if (err) {
      return res.status(500);
    }

    if (response.statusCode !== 200) {
      return res.status(400).json({
        message: 'wrong github name'
      });
    }
  });

  try {
    await Project.remove({ isEdited: false });
    await parseGitHub(username);

    return res.json({
      message: 'Git link was changed'
    });
  } catch (error) {
    res.status(500);
  }
});

adminRouter.post('/projects/:id/image', async (req, res) => {
  try {
    const projectId = req.params.id;
    const imageLink = req.body.imageLink;

    await Project.findByIdAndUpdate(projectId, {
      image: imageLink,
      isEdited: true
    });

    res.json({
      message: 'project image was edited'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

adminRouter.post('/projects/:id/name', async (req, res) => {
  try {
    const projectId = req.params.id;
    const projectName = req.body.projectName;

    await Project.findByIdAndUpdate(projectId, {
      projectName,
      isEdited: true
    });

    res.json({
      message: 'project name was edited'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

adminRouter.post('/projects/:id/readme', async (req, res) => {
  try {
    const projectId = req.params.id;
    const readme = req.body.readme;

    await Project.findByIdAndUpdate(projectId, {
      readme,
      isEdited: true
    });

    res.json({
      message: 'project readme was edited'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = adminRouter;
