import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Auth.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemIndex = existingCart.findIndex((item) => item._id === product._id);

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += Number(quantity);
    } else {
      existingCart.push({ ...product, quantity: Number(quantity) });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    navigate('/cart');
  };

  if (!product) return <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading product...</div>;

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
      <div>
        <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
      </div>
      <div>
        <h1 style={{ color: 'var(--text-main)', marginTop: 0 }}>{product.name}</h1>
        <p style={{ fontSize: '1.75rem', color: 'var(--accent-gold)', fontWeight: '600', marginBottom: '1.5rem' }}>${product.price}</p>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>{product.description}</p>
        
        <div className={styles.inputGroup} style={{ maxWidth: '150px', marginBottom: '1.5rem' }}>
          <label>Quantity</label>
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        
        <button onClick={handleAddToCart} className={styles.goldButton}>Add to Cart</button>
      </div>
    </div>
  );
}