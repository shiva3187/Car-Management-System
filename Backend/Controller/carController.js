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

    if (!title || !description || !tags || !car_type || !company || !imageUrl || !price) {
      return res.status(400).json({ success: false, msg: 'All fields are required.' });
    }

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
    res.status(201).json({ success: true, message: 'Car added successfully', savedCar });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server error', error: error.message });
  }
};

// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();

    if (!cars || cars.length === 0) {
      return res.status(404).json({ success: false, msg: 'No cars found' });
    }

    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.error('Get all cars error:', error.message);
    res.status(500).json({ success: false, msg: 'Server error', error: error.message });
  }
};


// Update a car
const updateCar = async (req, res) => {
  const { title, description, tags, car_type, company, imageUrl, price } = req.body;

  try {
    const updatedFields = { title, description, tags, car_type, company, imageUrl, price };
    const updatedCar = await Car.findByIdAndUpdate(req.car._id, updatedFields, { new: true });

    res.status(200).json({ success: true, msg: 'Car updated successfully', updatedCar });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server error', error: error.message });
  }
};

// Delete a car
const deleteCar = async (req, res) => {
  try {
    await req.car.deleteOne();
    res.status(200).json({ success: true, msg: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Server error', error: error.message });
  }
};

module.exports = {
  addNewCar,
  getAllCars,
  updateCar,
  deleteCar,
};
