const express = require('express');
const authenticateJWT = require('../middlewares/authMiddleware');
const Progress = require('../models/Progress');

const router = express.Router();

// Update progress for a user
router.post('/:courseId', authenticateJWT, async (req, res) => {
  const { courseId } = req.params;
  const { completedMaterials } = req.body;

  try {
    let progress = await Progress.findOne({ user: req.user.id, course: courseId });

    if (!progress) {
      progress = new Progress({
        user: req.user.id,
        course: courseId,
        completedMaterials,
      });
    } else {
      progress.completedMaterials = completedMaterials;
    }

    await progress.save();
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error });
  }
});

// Get progress for a user on a specific course
router.get('/:courseId', authenticateJWT, async (req, res) => {
  const { courseId } = req.params;

  try {
    const progress = await Progress.findOne({ user: req.user.id, course: courseId });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching progress', error });
  }
});

module.exports = router;
