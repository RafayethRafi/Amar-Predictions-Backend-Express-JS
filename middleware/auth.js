const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Extract the token from the Authorization header
  const authHeader = req.header('Authorization');
  
  // Log the full authHeader to check if it's being sent correctly
  console.log('Authorization Header:', authHeader);

  // Check if Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided or incorrect format.' });
  }

  // Extract the token part from the Authorization header
  const token = authHeader.split(' ')[1];
  
  // Log the token to check if it was extracted correctly
  console.log('Received Token:', token);

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded Token:', decoded); // Log decoded token for debugging

    // Attach the decoded token payload (e.g., user id) to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message); // Log any verification errors
    res.status(401).json({ error: 'Invalid token.' });
  }
}

module.exports = auth;
