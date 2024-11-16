const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User ',  // This references the 'User ' schema, specifically for admin
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: String,
    required: true
  },
  car_type: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  imageUrl: [{
    type: String,
    required: true
  }],
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Car', carSchema);