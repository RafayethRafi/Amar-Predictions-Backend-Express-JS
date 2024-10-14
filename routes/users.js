const express = require('express');
const router = express.Router();
const supabase = require('../database');
const auth = require('../middleware/auth');

// Register route
router.post('/register', async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      if (authError.message.includes("cannot be used as it is not authorized")) {
        return res.status(403).json({ error: "Email domain not authorized. Please use an authorized email address." });
      }
      throw authError;
    }

    if (!authData.user) {
      return res.status(400).json({ error: "User registration failed" });
    }

    // Insert user data into the users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{ id: authData.user.id, email, name, phone }])
      .select();

    if (userError) throw userError;

    if (!userData || userData.length === 0) {
      return res.status(500).json({ error: "User created but failed to retrieve user data" });
    }

    res.status(201).json(userData[0]);
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Protected route to get current user details
router.get('/me', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Fetch user error:', error.message);
    res.status(400).json({ error: error.message });
  }
});


router.get('/main_background_image', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('main_background_images')
      .select('*')
      .order('id', { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const heroImage = data[0];

      // Log the full Base64 string for debugging purposes
      // console.log('Base64 Image:', heroImage.image);

      res.json({
        id: heroImage.id,
        active: heroImage.active,
        image: heroImage.image,  // Assuming the Base64 string is already stored in the DB
        altText: heroImage.altText,
        created_at: heroImage.created_at,
        updated_at: heroImage.updated_at,
        user: heroImage.user_id
      });
    } else {
      res.status(404).json({ error: 'No active main background image found' });
    }
  } catch (error) {
    console.error('Error fetching main background image:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to get the latest cricket background image
router.get('/cricket_background_image', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cricket_background_images')
      .select('*')
      .order('id', { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const cricketImage = data[0];
      res.json({
        id: cricketImage.id,
        active: cricketImage.active,
        image: cricketImage.image,  // Assuming the Base64 string is already stored in the DB
        altText: cricketImage.altText,
        created_at: cricketImage.created_at,
        updated_at: cricketImage.updated_at,
        user: cricketImage.user_id
      });
    } else {
      res.status(404).json({ error: 'No active cricket background image found' });
    }
  } catch (error) {
    console.error('Error fetching cricket background image:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get the latest football background image
router.get('/football_background_image', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('football_background_images')
      .select('*')
      .order('id', { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      const footballImage = data[0];
      res.json({
        id: footballImage.id,
        active: footballImage.active,
        image: footballImage.image,  // Assuming the Base64 string is already stored in the DB
        altText: footballImage.altText,
        created_at: footballImage.created_at,
        updated_at: footballImage.updated_at,
        user: footballImage.user_id
      });
    } else {
      res.status(404).json({ error: 'No active football background image found' });
    }
  } catch (error) {
    console.error('Error fetching football background image:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;