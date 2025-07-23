import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ParentPayment = () => {
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { parentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invoicesRes, paymentsRes] = await Promise.all([
          axios.get(`/api/invoices/parent/${parentId}`),
          axios.get(`/api/payments/parent/${parentId}`)
        ]);
        setInvoices(invoicesRes.data);
        setPayments(paymentsRes.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [parentId]);

  const handlePayment = async (invoiceId, amount) => {
    try {
      const response = await axios.post('/api/payments', {
        invoiceId,
        parentId,
        amount,
        paymentMethod: 'Card' // Simplified for example
      });
      alert('Payment processed successfully!');
      setPayments([...payments, response.data]);
    } catch (err) {
      alert('Payment failed: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="parent-payment">
      <h2>Your Invoices</h2>
      <div className="invoice-list">
        {invoices.map(invoice => (
          <div key={invoice._id} className="invoice-card">
            <h3>Invoice #{invoice._id.slice(-6)}</h3>
            <p>Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
            <p>Amount: ${invoice.totalAmount.toFixed(2)}</p>
            <p>Status: {invoice.status}</p>
            {invoice.status === 'Unpaid' && (
              <button onClick={() => handlePayment(invoice._id, invoice.totalAmount)}>
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>

      <h2>Payment History</h2>
      <table className="payment-history">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment._id}>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParentPayment;