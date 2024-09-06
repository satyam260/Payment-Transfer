import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import '../App.css'
import { axiosInstance } from '../api/index';

const PaymentForm = () => {
  const [transactionId, setTransactionId] = useState('');
  const [userIdFrom, setUserIdFrom] = useState('');
  const [userIdTo, setUserIdTo] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Generate a new UUID for the transaction when the component is mounted
    const savedTransactionId = localStorage.getItem('transactionId');
    if (!savedTransactionId) {
      const newTransactionId = uuidv4();  // Generate a UUID
      setTransactionId(newTransactionId);
      localStorage.setItem('transactionId', newTransactionId);  // Persist it to localStorage
    } else {
      setTransactionId(savedTransactionId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Debiting user...');

    try {
      const response = await axiosInstance.post('/api/payment', {
        transactionId,  // Use the persisted transactionId
        userIdFrom,
        userIdTo,
        amount
      });
      setStatus('Process started. Check logs.');
    } catch (error) {
      setStatus('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Payment Transfer</h2>
      <form onSubmit={handleSubmit}>
        <label>From User ID:</label>
        <input 
          type="text" 
          value={userIdFrom} 
          onChange={(e) => setUserIdFrom(e.target.value)} 
          required 
          placeholder="Enter the sender's user ID"
        />
        <label>To User ID:</label>
        <input 
          type="text" 
          value={userIdTo} 
          onChange={(e) => setUserIdTo(e.target.value)} 
          required 
          placeholder="Enter the recipient's user ID"
        />
        <label>Amount:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
          placeholder="Enter the amount to transfer"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
      {status && <p className="status-message">Status: {status}</p>}
    </div>
  );
};

export default PaymentForm;
