import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Checkout', path: '/checkout' },
    ...(user?.role === 'admin' ? [{ name: 'Admin Dashboard', path: '/admin' }] : []),
  ];

  // Check if current page is Login or Register
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register';

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

      {/* Navigation Links */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        {navLinks
          .filter(
            (link) => !(isAuthPage && link.path === '/checkout')
          )
          .map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive
                    ? 'var(--accent-gold)'
                    : 'var(--text-main)',
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
                    transform: isActive
                      ? 'scaleX(1)'
                      : 'scaleX(0)',
                    transformOrigin: 'bottom left',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
              </Link>
            );
          })}
      </div>

      {/* Right Actions */}
      {!isAuthPage && (
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => navigate('/cart')}
            style={{
              background:
                location.pathname === '/cart'
                  ? 'var(--accent-gold)'
                  : 'transparent',
              color:
                location.pathname === '/cart'
                  ? 'var(--bg-primary)'
                  : 'var(--text-main)',
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
      )}
    </nav>
  );
}