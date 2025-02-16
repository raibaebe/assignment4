const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Render Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle Register Logic
router.post('/register', authController.registerUser);

// Render Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle Login Logic
router.post('/login', authController.loginUser);

// Temporary Logout Route (just a redirect)
router.get('/logout', (req, res) => {
    // You can clear cookies, tokens, etc. here if you implement session/cookies
    res.redirect('/');
});

module.exports = router;
