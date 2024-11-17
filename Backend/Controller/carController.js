const Car = require('../Model/car');
const { validationResult } = require('express-validator');

// Add a new car
const addNewCar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }

  try {
    const { title, description, tags, car_type, company, imageUrl, price } = req.body;

    // Ensure required fields are present
    if (!title || !description || !tags || !car_type || !company || !imageUrl || !price) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Create a new car entry
    const newCar = new Car({
      userId: req.user.userId, // Attach userId from the token
      title,
      description,
      tags,
      car_type,
      company,
      imageUrl,
      price,
    });

    const savedCar = await newCar.save();
    res.status(201).json({ success: true, message: 'Car added successfully', car: savedCar });
  } catch (error) {
    console.error('Error adding car:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all cars (public)
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();

    if (!cars || cars.length === 0) {
      return res.status(404).json({ success: false, message: 'No cars found' });
    }

    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.error('Get all cars error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all cars for a specific user
const getUserCars = async (req, res) => {
  try {
    const userId = req.user.userId; // Retrieve the user ID from the token
    const cars = await Car.find({ userId });

    if (!cars || cars.length === 0) {
      return res.status(404).json({ success: false, message: 'No cars found for this user' });
    }

    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.error('Get user cars error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update a car
const updateCar = async (req, res) => {
  const { title, description, tags, car_type, company, imageUrl, price } = req.body;

  try {
    // Collect updated fields
    const updatedFields = { title, description, tags, car_type, company, imageUrl, price };

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id, // Use ID from route params
      updatedFields,
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    res.status(200).json({ success: true, message: 'Car updated successfully', car: updatedCar });
  } catch (error) {
    console.error('Update car error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete a car
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // Check ownership
    if (car.userId.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await car.deleteOne();
    res.status(200).json({ success: true, message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Delete car error:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const getCar = async (req, res) => {
  try {
    const carId = req.params.id;

    if (!carId) {
      return res.status(400).json({ success: false, message: "Car ID is required" });
    }

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.status(200).json({ success: true, car });
  } catch (error) {
    console.error("Get car error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


module.exports = {
  addNewCar,
  getAllCars,
  getUserCars,
  updateCar,
  deleteCar,
  getCar
};
