// routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Generate next invoice number: PRM-YYYY-NNN
async function nextInvoiceNumber() {
  const year = new Date().getFullYear();
  const prefix = `PRM-${year}-`;
  const last = await Invoice.findOne({ invoiceNumber: { $regex: `^${prefix}` } })
    .sort({ createdAt: -1 })
    .lean();
  const next = last ? parseInt(last.invoiceNumber.split('-')[2], 10) + 1 : 1;
  return `${prefix}${String(next).padStart(3, '0')}`;
}

// GET all invoices, sorted by date (newest first)
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ invoiceDate: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET next invoice number for the form
router.get('/next-number', async (req, res) => {
  try {
    const number = await nextInvoiceNumber();
    res.json({ invoiceNumber: number });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one invoice
router.get('/:id', async (req, res) => {
  try {
    const inv = await Invoice.findById(req.params.id);
    if (!inv) return res.status(404).json({ message: 'Not found' });
    res.json(inv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE invoice
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data.invoiceNumber) data.invoiceNumber = await nextInvoiceNumber();
    const invoice = await Invoice.create(data);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
