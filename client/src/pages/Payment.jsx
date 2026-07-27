import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css';

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate secure payment gateway mock processing
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem('cart'); // Clear the cart after successful payment
      setSuccessMessage('Payment Successful! Redirecting to dashboard...');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2500);
    }, 1500);
  };

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2.5rem', borderRadius: '12px' }}>
        <h2 style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>Complete Payment</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Secure payment integration gateway mockup.</p>

        {successMessage ? (
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', padding: '1rem', borderRadius: '6px', fontWeight: '500' }}>
            {successMessage}
          </div>
        ) : (
          <form onSubmit={handlePayment}>
            <button 
              type="submit" 
              disabled={loading} 
              className={styles.goldButton} 
              style={{ width: '100%', padding: '0.85rem', fontWeight: 'bold' }}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}