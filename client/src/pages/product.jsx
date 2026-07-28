import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../apiConfig';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [cartModalProduct, setCartModalProduct] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        const contentType = res.headers.get("content-type");

        if (res.ok && contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (data && Array.isArray(data)) {
            setProducts(data);
          }
        } else {
          console.error('Server did not return JSON for products.');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

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

  const handleAddToCart = (product) => {
    if (cartModalProduct) return; // Prevent adding if popup is active

    if (!user) {
      navigate('/login');
      return;
    }

    const cartKey = getCartKey();
    const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const existingIndex = existingCart.findIndex((item) => item._id === product._id);

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
    setCartModalProduct(product);
  };

  const categories = [...new Set(products.map((p) => p.category || 'General'))];

  const filteredProducts = products.filter((product) => {
    const name = product.name || '';
    const desc = product.description || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           desc.toLowerCase().includes(searchQuery.toLowerCase());
  }).sort((a, b) => {
    if (sortOrder === 'low-high') return a.price - b.price;
    if (sortOrder === 'high-low') return b.price - a.price;
    return 0;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-primary)', color: 'var(--text-main)', paddingBottom: '4rem' }}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>Product Catalog</h1>

        {/* Filter Toolbar */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '8px', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search products..." 
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

        {/* Categories Sections */}
        {products.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem 0' }}>Loading products or no products available...</p>
        ) : (
          categories.map((category) => {
            const categoryProducts = filteredProducts.filter((p) => (p.category || 'General') === category);

            if (categoryProducts.length === 0) return null;

            return (
              <div key={category} style={{ marginBottom: '3.5rem' }}>
                <h2 style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                  {category}
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                  {categoryProducts.map((product) => (
                    <div key={product._id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                      <img 
                        src={product.image?.startsWith('http') ? product.image : `/${product.image}`} 
                        alt={product.name} 
                        style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
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
              </div>
            );
          })
        )}
      </div>

      {/* Cart Toast Modal */}
      {cartModalProduct && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', background: 'var(--bg-card)',
          border: '2px solid var(--accent-gold)', padding: '1.25rem', borderRadius: '10px',
          maxWidth: '360px', width: '90%', boxShadow: '0 8px 24px rgba(0,0,0,0.8)', zIndex: 99999
        }}>
          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Added to Cart!</h4>
          <p style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Successfully added <strong style={{ color: 'var(--accent-gold)' }}>{cartModalProduct.name}</strong> to your cart.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setCartModalProduct(null)} style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', flex: 1 }}>Continue Shopping</button>
            <button onClick={() => navigate('/cart')} style={{ padding: '0.5rem', background: 'var(--accent-gold)', color: 'var(--bg-primary)', border: 'none', borderRadius: '4px', cursor: 'pointer', flex: 1, fontWeight: 'bold' }}>View Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}