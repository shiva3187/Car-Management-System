const Car = require('../Model/car');

const isOwner = async (req, res, next) => {
  const { id } = req.params; // Car ID
  const userId = req.user.userId;

  try {
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ success: false, msg: 'Car not found' });
    }

    if (car.userId.toString() !== userId) {
      return res.status(403).json({ success: false, msg: 'Access denied: You do not own this car' });
    }

    req.car = car; // Attach the car to the request for further use
    next();
  } catch (error) {
    return res.status(500).json({ success: false, msg: 'Server error', error: error.message });
  }
};

module.exports = isOwner;
