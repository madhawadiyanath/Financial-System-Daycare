const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const { generateInvoice } = require('../services/invoiceService');

// Generate invoice
router.post('/', async (req, res) => {
  try {
    const invoice = await generateInvoice(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all invoices for parent
router.get('/parent/:parentId', async (req, res) => {
  try {
    const invoices = await Invoice.find({ parentId: req.params.parentId });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update invoice status
router.patch('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;