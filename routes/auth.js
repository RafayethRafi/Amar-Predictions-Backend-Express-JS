const express = require('express');
const router = express.Router();
const supabase = require('../database');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Sign in using email and password only
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Create JWT token after successful login
    const token = jwt.sign({ id: data.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Generated Token:', token); // Log the generated token for debugging

    res.json({ token, user: data.user });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
