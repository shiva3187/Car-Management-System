const express = require('express');
const router = express.Router();
// const authenticateToken = require('../Middleware/auth');
const { registerUser , loginUser } = require('../Controller/userAuthController');

router.post('/register', registerUser );

router.post('/login', loginUser);

module.exports = router;