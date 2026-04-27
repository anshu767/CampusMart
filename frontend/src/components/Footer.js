import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: '#0d1117',
      color: '#c9d1d9',
      padding: '60px 40px 30px',
      marginTop: '80px'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        paddingBottom: '40px',
        borderBottom: '1px solid #21262d'
      }}>

        {/* Column 1 - Brand */}
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
            CampusMart
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#8b949e', maxWidth: '220px' }}>
            The trusted marketplace for college students to buy and sell items.
          </p>
        </div>

        {/* Column 2 - Marketplace */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>
            Marketplace
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '14px' }}>Browse Products</Link>
            <Link to="/sell" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '14px' }}>Sell an Item</Link>
            <Link to="/dashboard" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '14px' }}>My Dashboard</Link>
          </div>
        </div>

        {/* Column 3 - Categories */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>
            Categories
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '14px' }}>Books</Link>
            <Link to="/" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '14px' }}>Gadgets</Link>
            <Link to="/" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '14px' }}>Notes</Link>
          </div>
        </div>

        {/* Column 4 - Support */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>
            Support
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '14px' }}>Help Center</Link>
            <Link to="/" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '14px' }}>Safety Tips</Link>
            <Link to="/" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '14px' }}>Contact Us</Link>
          </div>
        </div>

      </div>

      {/* Bottom copyright */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        paddingTop: '24px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#484f58'
      }}>
        © 2026 CampusMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;