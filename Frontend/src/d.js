// services/invoiceService.js
const Invoice = require('../models/Invoice');
const FeeStructure = require('../models/FeeStructure');
const Child = require('../models/Child');

async function generateInvoice(data) {
  const { parentId, childId, month, year } = data;
  
  // Get child's attendance records (simplified)
  const child = await Child.findById(childId).populate('attendance');
  
  // Get all applicable fees
  const fees = await FeeStructure.find({ isActive: true });
  
  // Calculate total amount
  let totalAmount = 0;
  const descriptionLines = [];
  
  // Base monthly fee
  const monthlyFee = fees.find(f => f.type === 'Monthly');
  if (monthlyFee) {
    totalAmount += monthlyFee.amount;
    descriptionLines.push(`Monthly fee: $${monthlyFee.amount.toFixed(2)}`);
  }
  
  // Additional fees (meals, activities, etc.)
  // This would be more complex in a real implementation
  fees.filter(f => f.type !== 'Monthly').forEach(fee => {
    totalAmount += fee.amount;
    descriptionLines.push(`${fee.name}: $${fee.amount.toFixed(2)}`);
  });
  
  // Late pickup fees would be calculated based on attendance records
  
  // Create the invoice
  const dueDate = new Date(year, month, 15); // 15th of the following month
  const invoice = new Invoice({
    parentId,
    childId,
    dueDate,
    totalAmount,
    description: descriptionLines.join('\n'),
    status: 'Unpaid'
  });
  
  await invoice.save();
  return invoice;
}

module.exports = { generateInvoice };