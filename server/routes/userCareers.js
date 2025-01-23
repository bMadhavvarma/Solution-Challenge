import express from 'express';
import UserCareer from '../models/UserCareer.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user's career paths
router.get('/', auth, async (req, res) => {
  try {
    const userCareers = await UserCareer.find({ userId: req.userId })
      .populate('careerId');
    res.json(userCareers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Select a career path
router.post('/', auth, async (req, res) => {
  try {
    const { careerId } = req.body;
    const userCareer = new UserCareer({
      userId: req.userId,
      careerId
    });
    await userCareer.save();
    res.status(201).json(userCareer);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Career path already selected' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update progress
router.patch('/:id', auth, async (req, res) => {
  try {
    const { progress } = req.body;
    const userCareer = await UserCareer.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { progress },
      { new: true }
    );
    if (!userCareer) {
      return res.status(404).json({ message: 'Career path not found' });
    }
    res.json(userCareer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;