const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;

// Get all tasks (admin only)
router.get('/tasks', adminAuth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('submittedBy', 'name email')
      .populate('reviewedBy', 'name')
      .sort({ submittedAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task status (approve/reject)
router.patch('/tasks/:id/status',
  adminAuth,
  [
    body('status').isIn(['approved', 'rejected']).withMessage('Invalid status'),
    body('feedback').optional().trim()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      task.status = req.body.status;
      task.feedback = req.body.feedback;
      task.reviewedAt = new Date();
      task.reviewedBy = req.user._id;

      await task.save();
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete task
router.delete('/tasks/:id', adminAuth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Delete screenshot from Cloudinary if exists
    if (task.screenshot.publicId) {
      await cloudinary.uploader.destroy(task.screenshot.publicId);
    }

    await task.remove();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user verification status
router.patch('/users/:id/verify',
  adminAuth,
  [
    body('isVerified').isBoolean().withMessage('Invalid verification status')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.isVerified = req.body.isVerified;
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete all tasks submitted by the user
    await Task.deleteMany({ submittedBy: user._id });
    
    // Delete user
    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 