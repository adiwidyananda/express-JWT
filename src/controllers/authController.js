const authService = require('../services/authService');

// Register a new user
const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);  // The response will not contain the password
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user and generate a JWT token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);

    if (result.token) {
      res.json(result);  // This will include token, name, and email in the response
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };