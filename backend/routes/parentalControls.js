const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get parental control settings
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.parentalControls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update parental controls
router.put('/:id', async (req, res) => {
  try {
    const { enabled, ageLimit } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { parentalControls: { enabled, ageLimit } },
      { new: true }
    );
    res.json(updatedUser.parentalControls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
