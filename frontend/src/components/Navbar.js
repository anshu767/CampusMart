import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onSignOut, wishlistCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const navItems = [
    { label: 'Browse', to: '/' },
    { label: 'Post Item', to: '/sell' },
    { label: 'Dashboard', to: '/dashboard' },
  ];

  // Load cart and orders from localStorage
  useEffect(() => {
    const loadData = () => {
      const storedCart = JSON.parse(localStorage.getItem('campusCart') || '[]');
      setCartItems(storedCart);
      const storedOrders = JSON.parse(localStorage.getItem('campusOrders') || '[]');
      setOrders(storedOrders);
    };
    loadData();
    window.addEventListener('storage', loadData);
    window.addEventListener('cartUpdated', loadData);
    window.addEventListener('ordersUpdated', loadData);
    const interval = setInterval(loadData, 1000);
    return () => {
      window.removeEventListener('storage', loadData);
      window.removeEventListener('cartUpdated', loadData);
      window.removeEventListener('ordersUpdated', loadData);
      clearInterval(interval);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || item.quantity || 1),
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || item.quantity || 1), 0);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return { background: '#eaf3de', color: '#3b6d11' };
      case 'Shipped':
        return { background: '#e6f1fb', color: '#185fa5' };
      case 'Cancelled':
        return { background: '#fcebeb', color: '#a32d2d' };
      default:
        return { background: '#faeeda', color: '#854f0b' };
    }
  };

  const itemEmoji = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('laptop') || n.includes('macbook') || n.includes('dell') || n.includes('ultrabook')) return '💻';
    if (n.includes('charger') || n.includes('cable')) return '🔌';
    if (n.includes('phone') || n.includes('mobile')) return '📱';
    if (n.includes('headphone') || n.includes('earphone') || n.includes('airpod')) return '🎧';
    if (n.includes('book') || n.includes('calculus') || n.includes('physics') || n.includes('chemistry')) return '📚';
    if (n.includes('mouse')) return '🖱️';
    if (n.includes('keyboard')) return '⌨️';
    return '🛍️';
  };

  return (
    <header className="site-navbar">
      <div className="nav-inner">
        <Link to="/" className="brand-link">
          <span className="brand-icon">C</span>
          <span className="brand-text">CampusMart</span>
        </Link>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className={`nav-link ${location.pathname === '/wishlist' ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            ❤️ Wishlist
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                color: 'white', borderRadius: '50%',
                width: '18px', height: '18px', fontSize: '11px',
                fontWeight: '800', display: 'grid', placeItems: 'center'
              }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* My Cart Button with Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              type="button"
              className="nav-link"
              onClick={() => setDropdownOpen((prev) => !prev)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px',
                position: 'relative', padding: '6px 10px'
              }}
            >
              🛒 My Cart
              {cartCount > 0 && (
                <span style={{
                  background: '#0d9e75', color: 'white',
                  borderRadius: '99px', fontSize: '10px',
                  fontWeight: '700', padding: '1px 6px',
                  minWidth: '18px', textAlign: 'center', lineHeight: '16px'
                }}>
                  {cartCount}
                </span>
              )}
              <span style={{ fontSize: '10px', color: '#888', marginLeft: '2px' }}>
                {dropdownOpen ? '▲' : '▼'}
              </span>
            </button>

            {/* Dropdown Panel */}
            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                width: '360px', background: 'white',
                border: '0.5px solid #e5e5e5', borderRadius: '14px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
                zIndex: 9999, overflow: 'hidden'
              }}>
                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
                  {['cart', 'orders'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      style={{
                        flex: 1, padding: '12px 8px',
                        fontSize: '13px', fontWeight: '600',
                        border: 'none', background: 'none', cursor: 'pointer',
                        color: activeTab === tab ? '#0d9e75' : '#888',
                        borderBottom: activeTab === tab ? '2px solid #0d9e75' : '2px solid transparent',
                        transition: 'all 0.15s'
                      }}
                    >
                      {tab === 'cart'
                        ? `🛒 My Cart (${cartCount})`
                        : `📦 My Orders (${orders.length})`}
                    </button>
                  ))}
                </div>

                {/* Cart Tab */}
                {activeTab === 'cart' && (
                  <div>
                    {cartItems.length === 0 ? (
                      <div style={{ padding: '32px', textAlign: 'center', color: '#aaa', fontSize: '13px' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🛒</div>
                        Cart is empty
                      </div>
                    ) : (
                      <>
                        <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                          {cartItems.map((item, i) => (
                            <div key={i} style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              padding: '10px 14px',
                              borderBottom: i < cartItems.length - 1 ? '0.5px solid #f5f5f5' : 'none'
                            }}>
                              <div style={{
                                width: '42px', height: '42px', borderRadius: '8px',
                                background: '#f5f5f5', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: '20px', flexShrink: 0
                              }}>
                                {item.image
                                  ? <img src={item.image} alt="" style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                                  : itemEmoji(item.title || item.name)
                                }
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontSize: '13px', fontWeight: '600',
                                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                  color: '#1a1a1a'
                                }}>
                                  {item.title || item.name}
                                </div>
                                <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                                  {item.seller || item.sellerName || ''} · Qty: {item.qty || item.quantity || 1}
                                </div>
                              </div>
                              <div style={{ fontSize: '13px', fontWeight: '700', color: '#e03a3a', flexShrink: 0 }}>
                                ₹{((item.price || 0) * (item.qty || item.quantity || 1)).toLocaleString('en-IN')}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{
                          padding: '12px 14px', borderTop: '1px solid #f0f0f0',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>
                            Total: <span style={{ color: '#e03a3a' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setDropdownOpen(false); navigate('/cart'); }}
                            style={{
                              background: 'linear-gradient(90deg, #f5a623, #e05050)',
                              color: 'white', border: 'none', borderRadius: '8px',
                              padding: '8px 16px', fontSize: '12px', fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            ⚡ Proceed to Buy
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    {orders.length === 0 ? (
                      <div style={{ padding: '32px', textAlign: 'center', color: '#aaa', fontSize: '13px' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>📦</div>
                        No orders yet
                      </div>
                    ) : (
                      <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                        {orders.map((order, i) => (
                          <div key={i} style={{
                            padding: '10px 14px',
                            borderBottom: i < orders.length - 1 ? '0.5px solid #f5f5f5' : 'none'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                              <div style={{
                                width: '42px', height: '42px', borderRadius: '8px',
                                background: '#f5f5f5', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                fontSize: '20px', flexShrink: 0
                              }}>
                                {order.image
                                  ? <img src={order.image} alt="" style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                                  : itemEmoji(order.title || order.name || order.items?.[0]?.title)
                                }
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontSize: '13px', fontWeight: '600', color: '#1a1a1a',
                                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                }}>
                                  {order.title || order.name || (order.items?.[0]?.title) || `Order #${order._id || i + 1}`}
                                </div>
                                <div style={{ fontSize: '11px', color: '#888', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                  <span>📅 {order.orderedAt || order.date || 'N/A'}</span>
                                  <span style={{
                                    ...getStatusStyle(order.status),
                                    borderRadius: '99px', padding: '1px 8px',
                                    fontSize: '10px', fontWeight: '600'
                                  }}>
                                    {order.status || 'Confirmed'}
                                  </span>
                                </div>
                              </div>
                              <div style={{ fontSize: '13px', fontWeight: '700', color: '#e03a3a', flexShrink: 0 }}>
                                ₹{((order.price || order.total || 0) * (order.qty || 1)).toLocaleString('en-IN')}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ padding: '10px 14px', borderTop: '1px solid #f0f0f0', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => { setDropdownOpen(false); navigate('/dashboard'); }}
                        style={{
                          background: '#f0f9f5', color: '#0d9e75',
                          border: '1px solid #0d9e75', borderRadius: '8px',
                          padding: '7px 14px', fontSize: '12px', fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        View All Orders →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Login / Sign Out */}
          {!isAuthenticated ? (
            <Link to="/login" className="nav-cta">Login</Link>
          ) : (
            <button type="button" className="nav-cta nav-cta-small" onClick={onSignOut}>
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;