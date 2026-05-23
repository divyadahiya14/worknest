const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/userController');

// Prefixed with /api/users in server.js
router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router;
