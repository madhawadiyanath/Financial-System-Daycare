// services/paymentService.js
const Payment = require('../models/Payment');
const Invoice = require('../models/Invoice');
const { generateReceipt } = require('./receiptService');

async function processPayment(data) {
  const { invoiceId, parentId, childId, amount, paymentMethod } = data;
  
  // Validate invoice exists and amount matches
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) throw new Error('Invoice not found');
  if (invoice.totalAmount !== amount) throw new Error('Amount does not match invoice total');
  
  // In a real implementation, this would integrate with a payment gateway
  // For demo purposes, we'll simulate a successful payment
  
  const payment = new Payment({
    invoiceId,
    parentId,
    childId,
    amount,
    paymentMethod,
    status: 'Completed',
    transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`
  });
  
  // Generate receipt (would be a URL to a stored PDF in production)
  payment.receiptUrl = await generateReceipt(payment);
  
  await payment.save();
  
  // Update invoice status
  invoice.status = 'Paid';
  await invoice.save();
  
  return payment;
}

module.exports = { processPayment };