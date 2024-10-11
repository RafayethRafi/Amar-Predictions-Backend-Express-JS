const express = require('express');
const router = express.Router();
const supabase = require('../database');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Admin middleware
async function isAdmin(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('isAdmin')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;

    if (!data.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

router.post('/hero_image_update', auth, isAdmin, upload.single('image'), async (req, res) => {
  const { altText } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    // Convert image buffer to Base64
    const base64Image = imageFile.buffer.toString('base64');

    // Store Base64 string in the database along with altText and user_id
    const { data, error } = await supabase
      .from('main_background_images')
      .insert([{ image: base64Image, altText, user_id: req.user.id }]);

    if (error) {
      throw new Error(error.message);
    }

    // Log the success message
    console.log('Image uploaded successfully and saved in the database');

    // Send minimal response (HTTP 200 OK or 204 No Content)
    res.status(204).send();  // 204 No Content
  } catch (error) {
    console.error("Error occurred during image upload:", error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post('/cricket_image_update', auth, isAdmin, upload.single('image'), async (req, res) => {
  const { altText } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    // Convert image buffer to Base64
    const base64Image = imageFile.buffer.toString('base64');

    // Store Base64 string in the database along with altText and user_id
    const { data, error } = await supabase
      .from('cricket_background_images')
      .insert([{ image: base64Image, altText, user_id: req.user.id }]);

    if (error) {
      throw new Error(error.message);
    }

    // Log the success message
    console.log('Cricket image uploaded successfully and saved in the database');

    // Send minimal response (HTTP 200 OK or 204 No Content)
    res.status(204).send();  // 204 No Content
  } catch (error) {
    console.error("Error occurred during cricket image upload:", error.message);
    res.status(400).json({ error: error.message });
  }
});


router.post('/football_image_update', auth, isAdmin, upload.single('image'), async (req, res) => {
  const { altText } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    // Convert image buffer to Base64
    const base64Image = imageFile.buffer.toString('base64');

    // Store Base64 string in the database along with altText and user_id
    const { data, error } = await supabase
      .from('football_background_images')
      .insert([{ image: base64Image, altText, user_id: req.user.id }]);

    if (error) {
      throw new Error(error.message);
    }

    // Log the success message
    console.log('Football image uploaded successfully and saved in the database');

    // Send minimal response (HTTP 200 OK or 204 No Content)
    res.status(204).send();  // 204 No Content
  } catch (error) {
    console.error("Error occurred during football image upload:", error.message);
    res.status(400).json({ error: error.message });
  }
});



router.post('/post_cricket_review', auth, isAdmin, async (req, res) => {
  const { team1, team2, score1, score2, wicket1, wicket2, content } = req.body;
  const league_id = req.query.league_id;  // Get league_id from query parameter

  if (!league_id) {
    return res.status(400).json({ error: 'League ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('cricket_reviews')
      .insert([{
        team1, team2, score1, score2, wicket1, wicket2, content,
        user_id: req.user.id,
        league_id: league_id  // Use league_id here
      }]);

    if (error) throw error;

    res.status(201).json({ message: 'Review posted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/edit_cricket_review', auth, isAdmin, async (req, res) => {
  const { team1, team2, score1, score2, wicket1, wicket2, content } = req.body;
  const { review_id_to_edit } = req.query;

  try {
    const { data, error } = await supabase
      .from('cricket_reviews')
      .update({ team1, team2, score1, score2, wicket1, wicket2, content })
      .eq('id', review_id_to_edit);

    if (error) throw error;

    res.status(200).json({"message": "Review updated successfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/post_football_review', auth, isAdmin, async (req, res) => {
  const { team1, team2, score1, score2, content } = req.body;
  const league_id = req.query.league_id;  // Get league_id from query parameter

  if (!league_id) {
    return res.status(400).json({ error: 'League ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('football_reviews')
      .insert([{
        team1, team2, score1, score2, content,
        user_id: req.user.id,
        league_id: league_id  // Use league_id here
      }]);

    if (error) throw error;

    res.status(201).json({ message: 'Review posted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/edit_football_review', auth, isAdmin, async (req, res) => {
  const { team1, team2, score1, score2, content } = req.body;
  const { review_id_to_edit } = req.query;

  if (!review_id_to_edit) {
    return res.status(400).json({ error: 'Review ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('football_reviews')
      .update({ team1, team2, score1, score2, content })
      .eq('id', review_id_to_edit);

    if (error) throw error;

    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/users', auth, isAdmin, async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;

  try {
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .range(skip, skip + limit - 1);

    if (error) throw error;

    res.status(200).json({ users: data, total: count });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/cricket_reviews', async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;

  try {
    const { data, error, count } = await supabase
      .from('cricket_reviews')
      .select('*', { count: 'exact' })
      .order('id', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) throw error;

    res.status(200).json({ reviews: data, total: count });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/football_reviews', async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;

  try {
    const { data, error, count } = await supabase
      .from('football_reviews')
      .select('*', { count: 'exact' })
      .order('id', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) throw error;

    res.status(200).json({ reviews: data, total: count });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/create_league', auth, isAdmin, async (req, res) => {
  const { name, sport_type } = req.body;

  try {
    const { data, error } = await supabase
      .from('leagues')
      .insert([{ name, sport_type, user_id: req.user.id }]);

    if (error) throw error;

    res.status(201).json({ message: 'League created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/cricket_leagues', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('leagues')
      .select('*')
      .eq('sport_type', 'cricket');

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: "Leagues not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/football_leagues', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('leagues')
      .select('*')
      .eq('sport_type', 'football');


    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: "Leagues not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/edit_league', auth, isAdmin, async (req, res) => {
  const { name, sport_type } = req.body;
  const { league_id_to_edit } = req.query;

  try {
    const { data, error } = await supabase
      .from('leagues')
      .update({ name, sport_type })
      .eq('id', league_id_to_edit);

    if (error) throw error;

    res.status(200).json({"message": "League updated successfully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete_league', auth, isAdmin, async (req, res) => {
  const { league_id_to_delete } = req.query;

  try {
    const { error } = await supabase
      .from('leagues')
      .delete()
      .eq('id', league_id_to_delete);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/league/:league_id', async (req, res) => {
  const { league_id } = req.params;
  
  try {
    console.log(`Fetching league with ID: ${league_id}`);
    
    const { data, error } = await supabase
      .from('leagues')
      .select('*')
      .eq('id', league_id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data) {
      console.log(`No league found with ID: ${league_id}`);
      return res.status(404).json({ error: "League not found" });
    }

    console.log('League data found:', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in /league/:league_id route:', error);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete_cricket_review', auth, isAdmin, async (req, res) => {
  const { review_id_to_delete } = req.query;

  try {
    const { error } = await supabase
      .from('cricket_reviews')
      .delete()
      .eq('id', review_id_to_delete);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete_football_review', auth, isAdmin, async (req, res) => {
  const { review_id_to_delete } = req.query;

  try {
    const { error } = await supabase
      .from('football_reviews')
      .delete()
      .eq('id', review_id_to_delete);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/cricket_review/:review_id', async (req, res) => {
  const { review_id } = req.params;

  try {
    const { data, error } = await supabase
      .from('cricket_reviews')
      .select('*')
      .eq('id', review_id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/football_review/:review_id', async (req, res) => {
  const { review_id } = req.params;

  try {
    const { data, error } = await supabase
      .from('football_reviews')
      .select('*')
      .eq('id', review_id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;