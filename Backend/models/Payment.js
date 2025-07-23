const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'Bank', 'Cash'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  transactionId: {
    type: String
  },
  receiptUrl: {
    type: String
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);