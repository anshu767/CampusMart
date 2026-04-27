import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productsData from '../data/productsData';
import AuthModal from '../components/AuthModal';
import './ProductDetails.css';

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ value, onChange, size = 22, readonly = false }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} onClick={() => !readonly && onChange && onChange(i)}
          onMouseEnter={() => !readonly && setHovered(i)} onMouseLeave={() => !readonly && setHovered(0)}
          style={{ fontSize: size, cursor: readonly ? 'default' : 'pointer', color: i <= (hovered || value) ? '#f59e0b' : '#d1d5db', transition: 'color 0.15s', lineHeight: 1, userSelect: 'none' }}>★</span>
      ))}
    </div>
  );
}

function ReviewItem({ review }) {
  return (
    <div style={{ background: '#f9fafb', borderRadius: 10, padding: '10px 14px', marginBottom: 8, borderLeft: '3px solid #ec4899' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #f43f5e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: 'white', flexShrink: 0 }}>
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 13, margin: 0, color: '#111827' }}>{review.name}</p>
          <StarRating value={review.stars} readonly size={13} />
        </div>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#9ca3af' }}>{review.date}</span>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{review.text}</p>
    </div>
  );
}

function RatingsReviews({ productId }) {
  const storageKey = `reviews_${productId}`;
  const [reviews, setReviews] = useState(() => { try { return JSON.parse(localStorage.getItem(storageKey)) || []; } catch { return []; } });
  const [userRating, setUserRating] = useState(() => { try { return parseInt(localStorage.getItem(`myrating_${productId}`)) || 0; } catch { return 0; } });
  const [showReviews, setShowReviews] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newStars, setNewStars] = useState(0);
  const [newText, setNewText] = useState('');
  const [error, setError] = useState('');

  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1) : null;

  function handleRatingChange(val) { setUserRating(val); localStorage.setItem(`myrating_${productId}`, val); }

  function handleSubmit() {
    if (!newName.trim()) { setError('Name is required!'); return; }
    if (newStars === 0) { setError('Please select a star rating!'); return; }
    if (!newText.trim()) { setError('Review cannot be empty!'); return; }
    setError('');
    const review = { id: Date.now(), name: newName.trim(), stars: newStars, text: newText.trim(), date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) };
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setNewName(''); setNewStars(0); setNewText(''); setShowForm(false); setShowReviews(true);
  }

  return (
    <div style={{ background: 'white', border: '2px solid #fde68a', borderRadius: 16, padding: '24px', marginBottom: 24 }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>⭐ Ratings & Reviews</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
        {avgRating ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#f59e0b', lineHeight: 1 }}>{avgRating}</div>
            <StarRating value={Math.round(parseFloat(avgRating))} readonly size={16} />
            <p style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 0' }}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
          </div>
        ) : <p style={{ fontSize: 13, color: '#9ca3af', fontStyle: 'italic' }}>No reviews yet</p>}
        <div style={{ borderLeft: '1px solid #e5e7eb', paddingLeft: 24 }}>
          <p style={{ margin: '0 0 6px', fontSize: 13, color: '#6b7280' }}>Rate this product:</p>
          <StarRating value={userRating} onChange={handleRatingChange} size={28} />
          {userRating > 0 && <p style={{ fontSize: 12, color: '#f59e0b', margin: '4px 0 0', fontWeight: 600 }}>Your rating: {userRating}/5 ⭐</p>}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
        {reviews.length > 0 && (
          <button onClick={() => setShowReviews(v => !v)} style={{ background: showReviews ? '#fef3c7' : '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', color: '#374151', fontWeight: 500 }}>
            {showReviews ? '▲ Hide Reviews' : `▼ Show ${reviews.length} Review${reviews.length > 1 ? 's' : ''}`}
          </button>
        )}
        <button onClick={() => setShowForm(v => !v)} style={{ background: showForm ? '#fef3c7' : 'linear-gradient(135deg, #ec4899, #f43f5e)', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', color: showForm ? '#374151' : 'white', fontWeight: 600, boxShadow: showForm ? 'none' : '0 4px 12px rgba(236,72,153,0.3)' }}>
          {showForm ? '✕ Cancel' : '✍️ Write a Review'}
        </button>
      </div>
      {showReviews && reviews.length > 0 && <div style={{ marginBottom: 12 }}>{reviews.map(r => <ReviewItem key={r.id} review={r} />)}</div>}
      {showForm && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '16px' }}>
          <p style={{ margin: '0 0 12px', fontWeight: 700, fontSize: 15, color: '#92400e' }}>Write your review</p>
          <input type="text" placeholder="Your name *" value={newName} onChange={e => setNewName(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #fcd34d', borderRadius: 8, fontSize: 13, marginBottom: 10, outline: 'none', background: '#fff', boxSizing: 'border-box' }} />
          <div style={{ marginBottom: 10 }}>
            <p style={{ margin: '0 0 6px', fontSize: 12, color: '#92400e', fontWeight: 500 }}>Select rating *</p>
            <StarRating value={newStars} onChange={setNewStars} size={26} />
          </div>
          <textarea placeholder="Share your experience..." value={newText} onChange={e => setNewText(e.target.value)} rows={3} style={{ width: '100%', padding: '9px 12px', border: '1px solid #fcd34d', borderRadius: 8, fontSize: 13, marginBottom: 10, resize: 'vertical', outline: 'none', background: '#fff', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          {error && <p style={{ margin: '0 0 10px', fontSize: 13, color: '#dc2626', fontWeight: 500 }}>⚠️ {error}</p>}
          <button onClick={handleSubmit} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Post Review →</button>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function saveOrderToLocal(user, product) {
  const newOrder = {
    _id: Date.now().toString(), userId: user._id || user.id, productId: product.id,
    title: product.title, price: product.price, qty: 1, category: product.category,
    image: product.image, seller: product.name, sellerContact: product.contact,
    orderedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
  const existing = JSON.parse(localStorage.getItem('campusOrders') || '[]');
  existing.push(newOrder);
  localStorage.setItem('campusOrders', JSON.stringify(existing));
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('campusCart') || '[]');
  const exists = cart.find(i => i._id === String(product.id));
  if (!exists) {
    cart.push({
      _id: String(product.id), productId: product.id, title: product.title,
      price: product.price, qty: 1, image: product.image,
      seller: product.name, sellerContact: product.contact,
    });
    localStorage.setItem('campusCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authAction, setAuthAction] = useState('cart');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('campusUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [cartAdded, setCartAdded] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);

  const postedItems = JSON.parse(localStorage.getItem('campusPostedItems') || '[]');
  const allProducts = [...productsData, ...postedItems];
  const product = allProducts.find((p) => p.id === parseInt(id));
  const relatedProducts = product ? allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3) : [];

  const handleAddToCart = () => {
    if (currentUser) { addToCart(product); setCartAdded(true); setTimeout(() => setCartAdded(false), 3000); }
    else { setAuthAction('cart'); setShowAuth(true); }
  };

  const handleBuy = () => {
    if (currentUser) { saveOrderToLocal(currentUser, product); setBuySuccess(true); setTimeout(() => setBuySuccess(false), 4000); }
    else { setAuthAction('buy'); setShowAuth(true); }
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    if (authAction === 'cart') { addToCart(product); setCartAdded(true); setTimeout(() => setCartAdded(false), 3000); }
    else { saveOrderToLocal(user, product); setBuySuccess(true); setTimeout(() => setBuySuccess(false), 4000); }
  };

  const handleLogout = () => { localStorage.removeItem('campusUser'); setCurrentUser(null); };

  if (!product) {
    return (
      <main className="page-shell">
        <section style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>Product not found</h2>
          <button onClick={() => navigate('/')} className="gradient-btn" style={{ marginTop: '20px' }}>← Back to Browse</button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell product-details-page">
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />

      <button type="button" onClick={() => navigate(-1)} style={{ background: 'rgba(15,23,42,0.08)', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>← Back</button>

      <section className="product-details-container">
        <div className="product-image-section">
          <div className="product-main-image" style={{ width: '100%', maxWidth: '500px', height: '500px', borderRadius: '16px', boxShadow: '0 20px 60px rgba(15,23,42,0.15)', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #e0fdf4, #ccfbf1)' }}>
            <img src={product.image || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80'} alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80'; }} />
            <button type="button" onClick={() => setIsFavorite(!isFavorite)} style={{ position: 'absolute', top: '16px', right: '16px', width: '48px', height: '48px', borderRadius: '50%', border: 'none', background: isFavorite ? 'linear-gradient(135deg, #ec4899, #f43f5e)' : 'rgba(255,255,255,0.95)', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>{isFavorite ? '❤️' : '🤍'}</button>
            <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>{product.category}</span>
          </div>
        </div>

        <div className="product-details-info">
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '12px', lineHeight: '1.2' }}>{product.title}</h1>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Posted {product.postedDate} • Condition: {product.condition}</p>
            <div style={{ fontSize: '40px', fontWeight: '900', background: 'linear-gradient(135deg, #ec4899, #f43f5e)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₹{product.price}</div>
          </div>

          <div style={{ background: 'rgba(15,23,42,0.04)', padding: '20px', borderRadius: '12px', marginBottom: '24px', borderLeft: '4px solid #ec4899' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Description</h3>
            <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>{product.description}</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Product Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {product.pages && <DetailCard label="Pages" value={product.pages} />}
              {product.author && <DetailCard label="Author" value={product.author} />}
              {product.processor && <DetailCard label="Processor" value={product.processor} />}
              {product.ram && <DetailCard label="RAM" value={product.ram} />}
              {product.storage && <DetailCard label="Storage" value={product.storage} />}
              {product.battery && <DetailCard label="Battery" value={product.battery} />}
              {product.brand && <DetailCard label="Brand" value={product.brand} />}
              {product.warranty && <DetailCard label="Warranty" value={product.warranty} />}
            </div>
          </div>

          {/* Seller Card */}
          <div style={{ background: 'linear-gradient(135deg, #f8f4ff 0%, #fdf2f8 100%)', padding: '24px', borderRadius: '12px', border: '2px solid #ec4899', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Seller Information</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #f43f5e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'white', fontWeight: '700' }}>{product.name?.charAt(0) || 'U'}</div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{product.name}</p>
                <p style={{ fontSize: '13px', color: '#64748b' }}>📍 {product.location}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '16px' }}>
              <a href={`tel:${product.contact}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#ec4899', textDecoration: 'none', fontWeight: '600' }}>📞 {product.contact}</a>
              {product.email && <a href={`mailto:${product.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#0f172a', textDecoration: 'none', fontWeight: '600' }}>✉️ {product.email}</a>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <a href={`tel:${product.contact}`} style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white', padding: '12px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textDecoration: 'none', textAlign: 'center' }}>📞 Call Now</a>
              <a href={`https://wa.me/91${product.contact?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: 'white', padding: '12px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textDecoration: 'none', textAlign: 'center' }}>💬 WhatsApp</a>
            </div>
          </div>

          {/* ── BUY / CART SECTION ── */}
          <div style={{
            background: buySuccess ? 'linear-gradient(135deg, #d1fae5, #a7f3d0)' : 'linear-gradient(135deg, #fff7ed, #fef3c7)',
            padding: '20px', borderRadius: '12px', marginBottom: '24px',
            border: `2px solid ${buySuccess ? '#10b981' : '#f59e0b'}`, textAlign: 'center'
          }}>
            {buySuccess ? (
              <div>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>🎉</div>
                <p style={{ fontWeight: '700', color: '#065f46', fontSize: '16px', margin: '0 0 12px' }}>Order Placed! Seller will contact you soon.</p>
                <button onClick={() => navigate('/dashboard')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>📋 View My Orders</button>
              </div>
            ) : cartAdded ? (
              <div>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>✅</div>
                <p style={{ fontWeight: '700', color: '#065f46', fontSize: '15px', margin: '0 0 12px' }}>Added to Cart!</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => navigate('/cart')} style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>🛒 Go to Cart</button>
                  <button onClick={() => setCartAdded(false)} style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>← Keep Shopping</button>
                </div>
              </div>
            ) : (
              <>
                {currentUser && (
                  <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>👤 Logged in as <strong>{currentUser.name}</strong></span>
                    <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#64748b' }}>Logout</button>
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button onClick={handleAddToCart} style={{ padding: '16px', background: 'white', color: '#0d9488', border: '2px solid #0d9488', borderRadius: '10px', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
                    🛒 Add to Cart
                  </button>
                  <button onClick={handleBuy} style={{ padding: '16px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 6px 20px rgba(245,158,11,0.4)' }}>
                    ⚡ Buy Now
                  </button>
                </div>
                {!currentUser && <p style={{ fontSize: '12px', color: '#92400e', margin: '8px 0 0' }}>🔐 You'll be asked to login / create account</p>}
              </>
            )}
          </div>

          <RatingsReviews productId={product.id} />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '60px', paddingTop: '40px', borderTop: '2px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>Similar Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {relatedProducts.map((rp) => (
              <Link key={rp.id} to={`/product/${rp.id}`} style={{ textDecoration: 'none' }}>
                <article style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(15,23,42,0.08)', transition: 'all 0.3s ease', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 24px rgba(15,23,42,0.15)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(15,23,42,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <img src={rp.image || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80'} alt={rp.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80'; }} />
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>{rp.title}</h3>
                    <p style={{ fontSize: '16px', fontWeight: '800', color: '#ec4899' }}>₹{rp.price}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

const DetailCard = ({ label, value }) => (
  <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '8px' }}>
    <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>{label}</p>
    <p style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{value}</p>
  </div>
);

export default ProductDetails;