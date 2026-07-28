import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
    instructions: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      navigate('/products');
      return;
    }

    try {
      // Optional: Post order to backend if you have an endpoint set up
      /*
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderItems: cartItems, shippingAddress: formData, totalPrice: grandTotal })
      });
      */

      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
      navigate('/payment'); // Or navigate('/') depending on your flow
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 15.00 : 0;
  const grandTotal = subtotal + shipping;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-primary)', color: 'var(--text-main)' }}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Left Column: Delivery Details & Review Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Delivery Details Card */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '8px' }}>
              <h2 style={{ color: 'var(--text-main)', marginBottom: '0.4rem', fontSize: '1.4rem' }}>Delivery details</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Enter the shipping information for your order below. Required fields are marked with an asterisk.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>First Name *</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    required 
                    value={formData.firstName} 
                    onChange={handleChange}
                    placeholder="Danial"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Last Name *</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    required 
                    value={formData.lastName} 
                    onChange={handleChange}
                    placeholder="Khan"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Street Address *</label>
                <input 
                  type="text" 
                  name="streetAddress" 
                  required 
                  value={formData.streetAddress} 
                  onChange={handleChange}
                  placeholder="1234 Market Street"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Apartment / HomeNo. (Optional)</label>
                <input 
                  type="text" 
                  name="apartment" 
                  value={formData.apartment} 
                  onChange={handleChange}
                  placeholder="Apt 4B"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>City *</label>
                  <input 
                    type="text" 
                    name="city" 
                    required 
                    value={formData.city} 
                    onChange={handleChange}
                    placeholder="Lahore"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>State / Province *</label>
                  <input 
                    type="text" 
                    name="state" 
                    required 
                    value={formData.state} 
                    onChange={handleChange}
                    placeholder="Punjab"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>ZIP / Postal Code *</label>
                  <input 
                    type="text" 
                    name="zipCode" 
                    required 
                    value={formData.zipCode} 
                    onChange={handleChange}
                    placeholder="54000"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Country *</label>
                  <select 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box', cursor: 'pointer' }}
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Delivery Instructions (Optional)</label>
                <textarea 
                  name="instructions" 
                  rows="3" 
                  value={formData.instructions} 
                  onChange={handleChange}
                  placeholder="Leave the package by the front door, ring the bell once, etc."
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>
            </div>

            {/* Review Items Section */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '8px' }}>
              <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Order Details</h4>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Review items</h3>

              {cartItems.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No items in cart.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cartItems.map((item, index) => (
                    <div key={item._id || index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <img 
                          src={item.image?.startsWith('http') ? item.image : `/${item.image}`} 
                          alt={item.name} 
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div>
                          <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>{item.name}</h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>New Arrivals</p>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Qty {item.quantity}</p>
                        </div>
                      </div>
                      <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Sticky Order Summary & Place Order Button */}
          <div style={{ position: 'sticky', top: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px' }}>
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
              <span>Total</span>
              <span style={{ color: 'var(--accent-gold)' }}>${grandTotal.toFixed(2)}</span>
            </div>

            <button 
              type="submit"
              style={{ width: '100%', padding: '0.85rem', background: 'var(--accent-gold)', color: 'var(--bg-primary)', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
            >
              Place Order
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}