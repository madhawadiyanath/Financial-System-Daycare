const mongoose = require('mongoose');

const FeeStructureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['Monthly', 'Hourly', 'LatePickup', 'Activity', 'Meal'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FeeStructure', FeeStructureSchema);