const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const { auth } = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Submit a new task
router.post('/submit',
  auth,
  upload.single('screenshot'),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('taskLink').isURL().withMessage('Please enter a valid URL')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let screenshotUrl = '';
      let screenshotPublicId = '';

      // Upload screenshot to Cloudinary if provided
      if (req.file) {
        const uploadResponse = await cloudinary.uploader.upload_stream({
          resource_type: 'auto',
          folder: 'itclub-tasks'
        }, (error, result) => {
          if (error) {
            return res.status(500).json({ message: 'Error uploading file' });
          }
          screenshotUrl = result.secure_url;
          screenshotPublicId = result.public_id;
        }).end(req.file.buffer);
      }

      const task = new Task({
        title: req.body.title,
        description: req.body.description,
        submittedBy: req.user._id,
        screenshot: {
          url: screenshotUrl,
          publicId: screenshotPublicId
        },
        taskLink: req.body.taskLink
      });

      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get all approved tasks (public)
router.get('/gallery', async (req, res) => {
  try {
    const tasks = await Task.find({ status: 'approved' })
      .populate('submittedBy', 'name')
      .sort({ submittedAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's own tasks
router.get('/my-tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ submittedBy: req.user._id })
      .sort({ submittedAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('submittedBy', 'name')
      .populate('reviewedBy', 'name');
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 