import express from 'express';
import Career from '../models/Career.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all careers
router.get('/', auth, async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Initialize default careers
router.post('/init', async (req, res) => {
  try {
    const defaultCareers = [
      {
        title: 'Software Development',
        description: 'Build the future of technology',
        icon: 'Code',
        color: 'bg-blue-100 hover:bg-blue-200'
      },
      {
        title: 'Business Analytics',
        description: 'Transform data into insights',
        icon: 'BarChart',
        color: 'bg-blue-50 hover:bg-blue-100'
      },
      {
        title: 'UX Design',
        description: 'Create amazing user experiences',
        icon: 'Palette',
        color: 'bg-blue-100 hover:bg-blue-200'
      },
      {
        title: 'Project Management',
        description: 'Lead teams to success',
        icon: 'Briefcase',
        color: 'bg-blue-50 hover:bg-blue-100'
      },
      {
        title: 'Data Science',
        description: 'Unlock patterns in data',
        icon: 'Microscope',
        color: 'bg-blue-100 hover:bg-blue-200'
      },
      {
        title: 'DevOps',
        description: 'Bridge development and operations',
        icon: 'Server',
        color: 'bg-blue-50 hover:bg-blue-100'
      }
    ];

    await Career.insertMany(defaultCareers);
    res.status(201).json({ message: 'Default careers initialized' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;