import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../apiConfig';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Helper to determine the user-specific cart storage key
  const getCartKey = () => {
    try {
      const currentUser = user || JSON.parse(localStorage.getItem('user') || localStorage.getItem('userInfo') || 'null');
      const userId = currentUser ? (currentUser._id || currentUser.email || currentUser.id) : 'guest';
      return `cart_${userId}`;
    } catch {
      return 'cart_guest';
    }
  };

  const loadCart = () => {
    const cartKey = getCartKey();
    const storedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    setCartItems(storedCart);
  };

  useEffect(() => {
    loadCart();

    window.addEventListener('cartUpdated', loadCart);
    window.addEventListener('storage', loadCart);

    return () => {
      window.removeEventListener('cartUpdated', loadCart);
      window.removeEventListener('storage', loadCart);
    };
  }, [user]);

  const updateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      removeItem(index);
      return;
    }
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
    localStorage.setItem(getCartKey(), JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem(getCartKey(), JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(getCartKey());
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 15.00 : 0;
  const grandTotal = subtotal + shipping;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-primary)', color: 'var(--text-main)' }}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Shopping Cart</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Review your selected items, adjust quantities, or proceed to checkout when you're ready.</p>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Your cart is currently empty.</p>
            <Link to="/products" style={{ padding: '0.75rem 1.5rem', background: 'var(--accent-gold)', color: 'var(--bg-primary)', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
              Explore Products
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item, index) => (
                <div key={item._id || index} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <img 
                    src={item.image?.startsWith('http') ? item.image : `/${item.image}`} 
                    alt={item.name} 
                    style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '6px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>{item.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Price: ${item.price.toFixed(2)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(index, item.quantity - 1)} style={{ padding: '0.25rem 0.75rem', background: 'var(--bg-primary)', color: 'var(--text-main)', border: 'none', cursor: 'pointer' }}>-</button>
                        <span style={{ padding: '0.25rem 1rem', background: 'var(--bg-card)', fontWeight: 'bold' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)} style={{ padding: '0.25rem 0.75rem', background: 'var(--bg-primary)', color: 'var(--text-main)', border: 'none', cursor: 'pointer' }}>+</button>
                      </div>
                      <button onClick={() => removeItem(index)} style={{ background: 'transparent', color: '#ff4d4d', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Box */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px' }}>
              <h3 style={{ color: 'var(--accent-gold)', marginBottom: '1.25rem', fontSize: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--accent-gold)' }}>${grandTotal.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                style={{ width: '100%', padding: '0.85rem', background: 'var(--accent-gold)', color: 'var(--bg-primary)', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '0.75rem', fontSize: '1rem' }}
              >
                Continue to Checkout
              </button>
              
              <button 
                onClick={clearCart}
                style={{ width: '100%', padding: '0.65rem', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}