const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middleware/auth');
const isOwner = require('../Middleware/isOwner');
const { addNewCar, updateCar, deleteCar, getAllCars, getUserCars,getCar } = require('../Controller/carController');

// Routes
router.post('/addcar', authenticateToken, addNewCar);
router.put('/updateCar/:id', authenticateToken, isOwner, updateCar);
router.get('/getCar/:id', authenticateToken, getCar);
router.delete('/deleteCar/:id', authenticateToken, isOwner, deleteCar);
router.get('/getAllCars', authenticateToken, getAllCars); // New route for fetching all cars
router.get('/getAllUserCar/:id', authenticateToken, getUserCars); // New route for fetching all cars

module.exports = router;
