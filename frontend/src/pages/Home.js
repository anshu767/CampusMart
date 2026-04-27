import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/productsData';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80';

const categories = [
  { name: 'All', icon: '🎯' },
  { name: 'Books', icon: '📚' },
  { name: 'Notes', icon: '📝' },
  { name: 'Gadgets', icon: '⚙️' },
  { name: 'Electronics', icon: '🔌' },
  { name: 'Laptops', icon: '💻' },
  { name: 'Phones', icon: '📱' },
  { name: 'Accessories', icon: '🎧' },
  { name: 'Stationery', icon: '✏️' },
  { name: 'Bags', icon: '🎒' },
  { name: 'Calculators', icon: '🧮' },
  { name: 'Lab Equipment', icon: '🔬' },
  { name: 'Sports', icon: '⚽' },
  { name: 'Fashion', icon: '👕' },
  { name: 'Hostel Items', icon: '🛏️' },
  { name: 'Furniture', icon: '🪑' },
  { name: 'Cycles', icon: '🚴' },
  { name: 'Projects', icon: '🛠️' },
  { name: 'Coding Resources', icon: '💾' },
  { name: 'Tuition', icon: '👨‍🏫' },
  { name: 'Services', icon: '🤝' },
  { name: 'Others', icon: '🎁' }
];

const Home = ({ wishlist = [], onAddToWishlist, onRemoveFromWishlist }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(false);
  const [failedImages, setFailedImages] = useState(new Set());
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Merge static data + user posted items
  const postedItems = JSON.parse(localStorage.getItem('campusPostedItems') || '[]');
  const allProducts = [...productsData, ...postedItems];

  const handleImageError = (productId) => {
    setFailedImages((prev) => new Set([...prev, productId]));
  };

  const getImageUrl = (product) => {
    if (failedImages.has(product.id) || !product.image) return FALLBACK_IMAGE;
    return product.image;
  };

  const isWishlisted = (productId) => wishlist.some((p) => p.id === productId);

  const toggleFavorite = (product) => {
    if (isWishlisted(product.id)) {
      onRemoveFromWishlist(product.id);
    } else {
      onAddToWishlist(product);
    }
  };

  // ✅ UPDATED: Search across title, description, category, brand, author
  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = allProducts.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        !q ||
        (product.title || '').toLowerCase().startsWith(q) ||
        (product.category || '').toLowerCase().startsWith(q) ||
        (product.brand || '').toLowerCase().startsWith(q) ||
        (product.author || '').toLowerCase().startsWith(q) ||
        (product.badge || '').toLowerCase().startsWith(q);
      return matchesCategory && matchesSearch;
    });
    if (sortBy === 'price-low') result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    else if (sortBy === 'price-high') result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    return result;
  }, [activeCategory, search, sortBy, postedItems.length]);

  // ✅ NEW: Live suggestions while typing
  useEffect(() => {
    const q = search.toLowerCase().trim();
    if (!q) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const matched = allProducts
      .filter((p) =>
        (p.title || '').toLowerCase().startsWith(q) ||
        (p.category || '').toLowerCase().startsWith(q) ||
        (p.brand || '').toLowerCase().startsWith(q) ||
        (p.author || '').toLowerCase().startsWith(q)
      )
      .slice(0, 6); // max 6 suggestions
    setSuggestions(matched);
    setShowSuggestions(matched.length > 0);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeCategory, search]);

  const handleSuggestionClick = (title) => {
    setSearch(title);
    setShowSuggestions(false);
  };

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-panel">
        <div className="hero-trust-badge">🎓 Trusted by 10,000+ Students</div>
        <h1>Your Campus, Your Marketplace</h1>
        <p className="hero-sub">Buy and sell textbooks, tech, furniture & more from students nearby</p>

        {/* ✅ Search bar with suggestions dropdown */}
        <div className="hero-search-bar" style={{ position: 'relative' }}>
          <span>🔍</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Search for anything... textbooks, laptops, furniture"
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              right: 0,
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(15,23,42,0.15)',
              zIndex: 999,
              overflow: 'hidden',
              border: '1px solid #e2e8f0'
            }}>
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  onMouseDown={() => handleSuggestionClick(product.title)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 16px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}
                >
                  <img
                    src={product.image || FALLBACK_IMAGE}
                    alt={product.title}
                    style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                    onError={e => e.target.src = FALLBACK_IMAGE}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {product.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {product.category} · ₹{product.price}
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#0d9488', fontWeight: '600' }}>→</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="page-shell">

        {/* ===== CATEGORIES ===== */}
        <section className="categories-section">
          <div className="categories-scroll-container">
            <div className="categories-row">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  className={`category-chip ${activeCategory === cat.name ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.name)}
                  type="button"
                  title={cat.name}
                >
                  <span className="category-icon">{cat.icon}</span>
                  <span className="category-label">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TOOLBAR ===== */}
        <section className="marketplace-toolbar">
          <div className="toolbar-left">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          <span style={{ color: '#0f766e', fontWeight: '600', fontSize: '14px' }}>
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </section>

        {/* ===== SKELETON ===== */}
        {loading && (
          <section className="products-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-body">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-price"></div>
                  <div className="skeleton-category"></div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ===== PRODUCTS GRID ===== */}
        {!loading && filteredProducts.length > 0 ? (
          <section className="products-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="card-image">
                  <img
                    src={getImageUrl(product)}
                    alt={product.title}
                    className="product-image"
                    onError={() => handleImageError(product.id)}
                    loading="lazy"
                  />
                  <span className="badge">{product.badge}</span>
                  <button
                    className="bookmark-icon"
                    type="button"
                    onClick={() => toggleFavorite(product)}
                    style={{
                      background: isWishlisted(product.id)
                        ? 'linear-gradient(135deg, #ec4899, #f43f5e)'
                        : 'rgba(255,255,255,0.9)',
                      transform: isWishlisted(product.id) ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isWishlisted(product.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="card-body">
                  <h3>{product.title}</h3>
                  <p className="card-price">₹{product.price}</p>
                  <div className="card-meta">
                    <span className="card-category">{product.category}</span>
                    <Link to={`/product/${product.id}`} className="card-link">View</Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : !loading ? (
          <section className="empty-state">
            <div className="empty-state-icon">📦</div>
            <h2 className="empty-state-title">No products found</h2>
            <p className="empty-state-description">
              {search
                ? `No results for "${search}". Try adjusting your search.`
                : activeCategory !== 'All'
                ? `No products in ${activeCategory}. Try another category!`
                : 'No products available right now. Be the first to post one!'}
            </p>
            {search || activeCategory !== 'All' ? (
              <button type="button" className="empty-state-action"
                onClick={() => { setSearch(''); setActiveCategory('All'); }}>
                ← Clear filters
              </button>
            ) : (
              <Link to="/sell" className="empty-state-action">➕ Post first item</Link>
            )}
          </section>
        ) : null}

      </main>
    </>
  );
};

export default Home;