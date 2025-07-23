import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { parentId } = useParams();

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get(`/api/payments/parent/${parentId}`);
        setReceipts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching receipts:', err);
        setLoading(false);
      }
    };

    fetchReceipts();
  }, [parentId]);

  const generatePDF = (payment) => {
    const doc = new jsPDF();
    
    doc.text(`Payment Receipt - #${payment._id.slice(-6)}`, 20, 20);
    doc.text(`Date: ${new Date(payment.paymentDate).toLocaleDateString()}`, 20, 30);
    doc.text(`Amount: $${payment.amount.toFixed(2)}`, 20, 40);
    doc.text(`Method: ${payment.paymentMethod}`, 20, 50);
    doc.text(`Status: ${payment.status}`, 20, 60);
    
    doc.save(`receipt_${payment._id.slice(-6)}.pdf`);
  };

  if (loading) return <div>Loading receipts...</div>;

  return (
    <div className="receipts-container">
      <h2>Your Receipts</h2>
      {receipts.length === 0 ? (
        <p>No receipts found</p>
      ) : (
        <table className="receipts-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map(receipt => (
              <tr key={receipt._id}>
                <td>{receipt._id.slice(-6)}</td>
                <td>{new Date(receipt.paymentDate).toLocaleDateString()}</td>
                <td>${receipt.amount.toFixed(2)}</td>
                <td>
                  <button onClick={() => generatePDF(receipt)}>
                    Download Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Receipts;