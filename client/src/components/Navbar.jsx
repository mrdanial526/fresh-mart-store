import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getCartKey = () => {
    try {
      const currentUser = user || JSON.parse(localStorage.getItem('user') || localStorage.getItem('userInfo') || 'null');
      const userId = currentUser ? (currentUser._id || currentUser.email || currentUser.id) : 'guest';
      return `cart_${userId}`;
    } catch {
      return 'cart_guest';
    }
  };

  const updateCartCount = () => {
    const cartKey = getCartKey();
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define navigation links with visibility rules
  const navLinks = [
    { name: 'Home', path: '/', public: true },
    { name: 'Products', path: '/products', public: true },
    { name: 'About', path: '/about', public: true },
    { name: 'Checkout', path: '/checkout', public: false },
    ...(user?.role === 'admin' ? [{ name: 'Admin Dashboard', path: '/admin', public: false }] : []),
  ];

  return (
    <nav
      style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Brand Logo */}
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div
          style={{
            background: 'var(--accent-gold)',
            color: 'var(--bg-primary)',
            padding: '0.4rem 0.6rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '0.9rem',
          }}
        >
          SS
        </div>

        <div>
          <span
            style={{
              color: 'var(--text-main)',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              letterSpacing: '1px',
              display: 'block',
            }}
          >
            SOVEREIGN STORE
          </span>

          <span
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.65rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Premium Essentials
          </span>
        </div>
      </Link>

      {/* Navigation Links (Public links show always; Checkout/Admin show only when logged in) */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        {navLinks
          .filter((link) => link.public || user)
          .map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-main)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 'bold' : 'normal',
                  position: 'relative',
                  paddingBottom: '4px',
                  display: 'inline-block',
                }}
              >
                {link.name}

                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--accent-gold)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'bottom left',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
              </Link>
            );
          })}
      </div>

      {/* Right Actions (Cart button is hidden unless logged in) */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {user && (
          <button
            onClick={() => navigate('/cart')}
            style={{
              background: location.pathname === '/cart' ? 'var(--accent-gold)' : 'transparent',
              color: location.pathname === '/cart' ? 'var(--bg-primary)' : 'var(--text-main)',
              border: '1px solid var(--border-color)',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            Cart ({cartCount})
          </button>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              color: '#ff4d4d',
              border: '1px solid #ff4d4d',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'var(--accent-gold)',
              color: 'var(--bg-primary)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}