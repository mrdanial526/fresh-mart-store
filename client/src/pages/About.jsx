import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const managerImage = '/my-photo.jpg'; 
  const storeImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="page-transition" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-primary)', color: 'var(--text-main)', paddingBottom: '4rem' }}>
      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Hero Section */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '2px', color: 'var(--accent-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              About Sovereign Store
            </span>
            <h1 style={{ fontSize: '2.75rem', lineHeight: '1.2', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              We make everyday shopping feel elevated, personal, and delightfully effortless.
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Sovereign Store is a modern lifestyle shop built around beautiful essentials, thoughtful service, and a calm online experience. We believe great purchases should feel inspiring from the first glance to the moment they arrive at your door.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/" style={{ padding: '0.75rem 1.5rem', background: 'var(--accent-gold)', color: 'var(--bg-primary)', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none' }}>
                Explore Products
              </Link>
            </div>
          </div>
          <div>
            <img 
              src={storeImage} 
              alt="Store Interior" 
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border-color)' }} 
            />
          </div>
        </div>

        {/* Feature Cards Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>Crafted for modern living</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>Every product is handpicked to bring effortless style and everyday comfort into your space.</p>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>Fast and thoughtful delivery</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>We bundle orders with care, so your experience feels as polished as the products themselves.</p>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '2rem' }}>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>Support that feels personal</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>Our team is here to answer questions, guide choices, and make shopping feel genuinely easy.</p>
          </div>
        </div>

        {/* Story Section */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <img 
              src={storeImage} 
              alt="Our Story" 
              style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border-color)' }} 
            />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '2px', color: 'var(--accent-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              Our Story
            </span>
            <h2 style={{ fontSize: '2.2rem', lineHeight: '1.3', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              Built by people who love beautiful, useful things.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              What started as a small passion project quickly grew into a destination for shoppers who want thoughtful products without the overwhelm. We mix timeless essentials with fresh discoveries and make sure every detail feels considered.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>12k+</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Happy customers</p>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>98%</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Repeat orders</p>
              </div>
              <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.25rem', marginBottom: '0.25rem' }}>24/7</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>Support help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Manager Section */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '3rem', display: 'grid', gridTemplateColumns: '350px 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <img 
              src={managerImage} 
              alt="Muhammad Danial" 
              onError={(e) => { e.target.src = '/pic.jpeg'; }}
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border-color)' }} 
            />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '2px', color: 'var(--accent-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              Meet the Manager
            </span>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Muhammad Danial
            </h2>
            <p style={{ color: 'var(--accent-gold)', fontWeight: '600', marginBottom: '1.5rem' }}>Manager & Lead Curator</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Muhammad leads the brand with a sharp eye for design, customer experience, and the details that make every visit feel personal and memorable.
            </p>
            <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '8px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, fontStyle: 'italic' }}>
                "He guides the vision behind Sovereign Store, ensuring every experience feels thoughtful, welcoming, and beautifully organized."
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: '2rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h4 style={{ color: 'var(--accent-gold)', margin: '0 0 0.5rem 0' }}>Sovereign Store</h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Your premier destination for curated collections and luxury goods.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
            <a href="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Terms of Service</a>
            <a href="/feedback" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Contact Us</a>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '1.5rem auto 0 auto', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} Sovereign Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}