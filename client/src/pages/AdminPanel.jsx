import React, { useState } from 'react';
import styles from '../styles/Auth.module.css';

export default function AdminPanel() {
  const [productData, setProductData] = useState({ name: '', price: '', description: '', image: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      if (!res.ok) throw new Error('Failed to create product');
      setMessage('Product added successfully!');
      setProductData({ name: '', price: '', description: '', image: '' });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleCreateProduct}>
        <h2>Admin Portal: Add Product</h2>
        {message && <p style={{ color: message.includes('success') ? 'var(--success)' : 'var(--error)' }}>{message}</p>}
        <div className={styles.inputGroup}>
          <label>Product Name</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label>Price ($)</label>
          <input type="number" name="price" value={productData.price} onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label>Description</label>
          <textarea name="description" rows="3" value={productData.description} onChange={handleChange} required style={{ background: 'var(--bg-primary)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '0.5rem' }} />
        </div>
        <div className={styles.inputGroup}>
          <label>Image URL</label>
          <input type="text" name="image" value={productData.image} onChange={handleChange} />
        </div>
        <button type="submit" className={styles.goldButton}>Publish Product</button>
      </form>
    </div>
  );
}