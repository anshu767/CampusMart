import React from 'react';
import { Link } from 'react-router-dom';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80';

const Wishlist = ({ wishlist, onRemove }) => {
  return (
    <main className="page-shell">

      {/* Header */}
      <section className="page-header-block">
        <div>
          <p className="eyebrow">My Collection</p>
          <h1>❤️ My Wishlist</h1>
          <p className="section-copy">
            {wishlist.length > 0
              ? `${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} saved`
              : 'No items saved yet'}
          </p>
        </div>
        <Link to="/" className="gradient-btn">Browse Items</Link>
      </section>

      {/* Empty State */}
      {wishlist.length === 0 && (
        <section className="empty-state">
          <div className="empty-state-icon">🤍</div>
          <h2 className="empty-state-title">Your wishlist is empty</h2>
          <p className="empty-state-description">
            Tap the heart ❤️ on any product to save it here.
          </p>
          <Link to="/" className="empty-state-action">
            🛍️ Start Browsing
          </Link>
        </section>
      )}

      {/* Wishlist Grid */}
      {wishlist.length > 0 && (
        <section className="products-grid">
          {wishlist.map((product) => (
            <article key={product.id} className="product-card">
              <div className="card-image">
                <img
                  src={product.image || FALLBACK_IMAGE}
                  alt={product.title}
                  className="product-image"
                  onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                  loading="lazy"
                />
                <span className="badge">{product.badge}</span>
                <button
                  className="bookmark-icon"
                  type="button"
                  onClick={() => onRemove(product.id)}
                  style={{
                    background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                    transition: 'all 0.2s ease'
                  }}
                  title="Remove from wishlist"
                >
                  ❤️
                </button>
              </div>
              <div className="card-body">
                <h3>{product.title}</h3>
                <p className="card-price">₹{product.price}</p>
                <div className="card-meta">
                  <span className="card-category">{product.category}</span>
                  <Link to={`/product/${product.id}`} className="card-link">
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

    </main>
  );
};

export default Wishlist;