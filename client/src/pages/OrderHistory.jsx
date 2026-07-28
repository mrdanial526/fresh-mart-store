import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../apiConfig';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user._id) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/orders/user/${user._id}`);
          const contentType = res.headers.get("content-type");

          if (res.ok && contentType && contentType.includes("application/json")) {
            const data = await res.json();
            setOrders(data);
          } else {
            console.error('Server did not return JSON for order history.');
          }
        } catch (err) {
          console.error('Error fetching orders:', err);
        }
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>Your Order History</h1>
      
      {orders.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>You haven't placed any orders yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => (
            <div key={order._id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Order ID: </span>
                  <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{order._id}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Status: </span>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{order.status}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Tracking: </span>
                  <span style={{ color: 'var(--text-main)' }}>{order.trackingNumber}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                {order.orderItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div>
                        <p style={{ color: 'var(--text-main)', margin: 0, fontWeight: '500' }}>{item.name}</p>
                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.85rem' }}>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'right', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount: </span>
                <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontWeight: 'bold' }}>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}