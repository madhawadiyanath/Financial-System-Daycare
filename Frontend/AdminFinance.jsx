import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, Table } from 'react-bootstrap';

const AdminFinance = () => {
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('invoices');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invoicesRes, paymentsRes] = await Promise.all([
          axios.get('/api/invoices'),
          axios.get('/api/payments')
        ]);
        setInvoices(invoicesRes.data);
        setPayments(paymentsRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const exportToCSV = (data, filename) => {
    // Simple CSV export implementation
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    const csvContent = [headers, ...rows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-finance">
      <h2>Financial Dashboard</h2>
      
      <Tabs activeKey={activeTab} onSelect={k => setActiveTab(k)}>
        <Tab eventKey="invoices" title="Invoices">
          <div className="mb-3">
            <button 
              className="btn btn-secondary"
              onClick={() => exportToCSV(invoices, 'invoices.csv')}
            >
              Export to CSV
            </button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Parent ID</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice._id}>
                  <td>{invoice._id.slice(-6)}</td>
                  <td>{invoice.parentId.slice(-6)}</td>
                  <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                  <td>${invoice.totalAmount.toFixed(2)}</td>
                  <td>{invoice.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        
        <Tab eventKey="payments" title="Payments">
          <div className="mb-3">
            <button 
              className="btn btn-secondary"
              onClick={() => exportToCSV(payments, 'payments.csv')}
            >
              Export to CSV
            </button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment._id}>
                  <td>{payment._id.slice(-6)}</td>
                  <td>{payment.invoiceId.slice(-6)}</td>
                  <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td>${payment.amount.toFixed(2)}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminFinance;