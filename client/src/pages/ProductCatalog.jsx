import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [cartModalProduct, setCartModalProduct] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = (product) => {
    if (cartModalProduct) return; // Prevent adding if popup is active

    if (!user) {
      navigate('/login');
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = existingCart.findIndex((item) => item._id === product._id);

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
    setCartModalProduct(product);
  };

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.description.toLowerCase().includes(searchQuery.toLowerCase());
  }).sort((a, b) => {
    if (sortOrder === 'low-high') return a.price - b.price;
    if (sortOrder === 'high-low') return b.price - a.price;
    return 0;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-primary)', color: 'var(--text-main)' }}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>Curated Collection</h1>

        {/* Filter Toolbar */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '8px', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search products across all categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={cartModalProduct !== null}
            style={{ padding: '0.65rem 1rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', flex: '1 1 300px', opacity: cartModalProduct ? 0.6 : 1 }}
          />

          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            disabled={cartModalProduct !== null}
            style={{ padding: '0.65rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', cursor: cartModalProduct ? 'not-allowed' : 'pointer', flex: '1 1 180px', opacity: cartModalProduct ? 0.6 : 1 }}
          >
            <option value="default">Sort by: Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Unified Single Product Grid (No Category Sub-sections) */}
        {filteredProducts.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem' }}>No products found.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {filteredProducts.map((product) => (
              <div key={product._id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {product.image ? (
                  <img 
                    src={product.image.startsWith('http') ? product.image : `/${product.image}`} 
                    alt={product.name} 
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '220px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    No Image
                  </div>
                )}

                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>
                      {product.category}
                    </span>
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{product.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.4' }}>{product.description}</p>
                  </div>
                  <div>
                    <p style={{ color: 'var(--accent-gold)', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>${product.price}</p>
                    <button 
                      onClick={() => handleAddToCart(product)} 
                      disabled={cartModalProduct !== null}
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        background: cartModalProduct ? 'var(--border-color)' : 'var(--accent-gold)', 
                        color: cartModalProduct ? 'var(--text-muted)' : 'var(--bg-primary)', 
                        border: 'none', 
                        borderRadius: '4px', 
                        fontWeight: 'bold', 
                        cursor: cartModalProduct ? 'not-allowed' : 'pointer',
                        opacity: cartModalProduct ? 0.7 : 1
                      }}
                    >
                      {cartModalProduct ? 'Action Required' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: '2rem', marginTop: '4rem', color: 'var(--text-muted)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h4 style={{ color: 'var(--accent-gold)', margin: '0 0 0.5rem 0' }}>E-Commerce Store</h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Your premier destination for curated collections and luxury goods.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
            <a href="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Terms of Service</a>
            <a href="/feedback" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Contact Us</a>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '1.5rem auto 0 auto', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.
        </div>
      </footer>

      {/* FLOATING CORNER TOAST */}
      {cartModalProduct && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--bg-card)',
          border: '2px solid var(--accent-gold)',
          padding: '1.25rem',
          borderRadius: '10px',
          maxWidth: '360px',
          width: '90%',
          boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
          zIndex: 99999
        }}>
          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Added to Cart!</h4>
          <p style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: '1.4' }}>
            Successfully added <strong style={{ color: 'var(--accent-gold)' }}>{cartModalProduct.name}</strong> to your cart.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => setCartModalProduct(null)}
              style={{
                padding: '0.5rem 0.75rem',
                background: 'transparent',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.85rem',
                flex: 1
              }}
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => navigate('/cart')}
              style={{
                padding: '0.5rem 0.75rem',
                background: 'var(--accent-gold)',
                color: 'var(--bg-primary)',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.85rem',
                flex: 1
              }}
            >
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}