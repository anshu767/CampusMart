import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [postedItems, setPostedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAuth = localStorage.getItem('campusmart_auth') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('campusUser') || 'null');

  useEffect(() => {
    fetchOrders();
    setPostedItems(JSON.parse(localStorage.getItem('campusPostedItems') || '[]'));
  }, []);

  // ✅ FIXED: Load orders from localStorage
  const fetchOrders = () => {
    const saved = JSON.parse(localStorage.getItem('campusOrders') || '[]');
    const userId = currentUser?._id || currentUser?.id;
    const myOrders = userId ? saved.filter(o => o.userId === userId) : saved;
    setOrders(myOrders);
    setLoading(false);
  };

  // ✅ FIXED: Delete order from localStorage
  const handleDeleteOrder = (orderId) => {
    const saved = JSON.parse(localStorage.getItem('campusOrders') || '[]');
    const updated = saved.filter(o => o._id !== orderId);
    localStorage.setItem('campusOrders', JSON.stringify(updated));
    setOrders(orders.filter(o => o._id !== orderId));
  };

  const handleQtyChange = (orderId, delta) => {
    const order = orders.find(o => o._id === orderId);
    if (!order) return;
    const newQty = Math.max(1, (order.qty || 1) + delta);
    const updatedOrders = orders.map(o => o._id === orderId ? { ...o, qty: newQty } : o);
    setOrders(updatedOrders);
    // Also persist qty change to localStorage
    const saved = JSON.parse(localStorage.getItem('campusOrders') || '[]');
    const updatedSaved = saved.map(o => o._id === orderId ? { ...o, qty: newQty } : o);
    localStorage.setItem('campusOrders', JSON.stringify(updatedSaved));
  };

  const handleLogout = () => {
    localStorage.removeItem('campusmart_auth');
    localStorage.removeItem('campusUser');
    localStorage.removeItem('campusToken');
    navigate('/login');
  };

  const handleDeletePosted = (itemId) => {
    const updated = postedItems.filter(p => p.id !== itemId);
    localStorage.setItem('campusPostedItems', JSON.stringify(updated));
    setPostedItems(updated);
  };

  if (!isAuth || !currentUser) {
    return (
      <main className="page-shell" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div style={{ fontSize: '60px', marginBottom: '16px' }}>🔐</div>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Please Login First</h2>
        <button onClick={() => navigate('/login')} style={{
          background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white',
          border: 'none', padding: '14px 28px', borderRadius: '10px',
          fontWeight: '700', fontSize: '16px', cursor: 'pointer'
        }}>← Go to Login</button>
      </main>
    );
  }

  const displayName = currentUser.username || currentUser.name || currentUser.email?.split('@')[0] || 'Student';
  const initial = displayName.charAt(0).toUpperCase();
  const totalAmount = orders.reduce((sum, o) => sum + (o.price * (o.qty || 1)), 0);

  return (
    <main className="page-shell" style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 20px' }}>

      {/* Profile Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
        borderRadius: '24px', padding: '36px', marginBottom: '32px', color: 'white',
        boxShadow: '0 20px 60px rgba(13,148,136,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)', border: '3px solid rgba(255,255,255,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px', fontWeight: '900'
            }}>{initial}</div>
            <div>
              <p style={{ fontSize: '13px', opacity: 0.8, margin: '0 0 4px', letterSpacing: '1px', textTransform: 'uppercase' }}>Welcome back 👋</p>
              <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 6px' }}>{displayName}</h2>
              <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>✉️ {currentUser.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <StatBox label="Orders" value={orders.length} />
            <StatBox label="Listings" value={postedItems.length} />
            <button onClick={handleLogout} style={{
              background: 'rgba(255,255,255,0.15)', color: 'white',
              border: '2px solid rgba(255,255,255,0.4)', padding: '12px 20px',
              borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '14px'
            }}>🚪 Logout</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
          <Link to="/" style={{
            background: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none',
            padding: '10px 20px', borderRadius: '10px', fontWeight: '700', fontSize: '14px',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>🛍️ Browse Items</Link>
          <Link to="/add-product" style={{
            background: 'white', color: '#ec4899', textDecoration: 'none',
            padding: '10px 20px', borderRadius: '10px', fontWeight: '800', fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>+ Post New Item</Link>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: '#f1f5f9', padding: '6px', borderRadius: '14px' }}>
        {[
          { key: 'orders', label: '📦 My Orders', count: orders.length },
          { key: 'posted', label: '🏷️ My Listings', count: postedItems.length },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            flex: 1, padding: '13px', border: 'none', borderRadius: '10px',
            cursor: 'pointer', fontWeight: '700', fontSize: '15px',
            background: activeTab === tab.key ? 'linear-gradient(135deg, #0d9488, #0f766e)' : 'transparent',
            color: activeTab === tab.key ? 'white' : '#64748b',
            boxShadow: activeTab === tab.key ? '0 4px 14px rgba(13,148,136,0.35)' : 'none'
          }}>
            {tab.label}
            {tab.count > 0 && (
              <span style={{
                marginLeft: '8px', background: activeTab === tab.key ? 'rgba(255,255,255,0.3)' : '#ec4899',
                color: 'white', borderRadius: '20px', padding: '2px 8px', fontSize: '12px'
              }}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>⏳ Orders load ho rahe hain...</div>
          ) : orders.length === 0 ? (
            <EmptyState icon="🛒" title="No orders yet" subtitle="Browse items and place your first order!" btnText="Browse Items" btnLink="/" />
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {orders.map(order => (
                  <div key={order._id} style={{
                    background: 'white', borderRadius: '16px', padding: '20px',
                    boxShadow: '0 4px 20px rgba(15,23,42,0.07)',
                    display: 'flex', gap: '16px', alignItems: 'center',
                    flexWrap: 'wrap', border: '1px solid #f1f5f9'
                  }}>
                    <div style={{
                      width: '76px', height: '76px', borderRadius: '12px', flexShrink: 0,
                      backgroundImage: `url(${order.image || 'https://via.placeholder.com/76'})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }} />
                    <div style={{ flex: 1, minWidth: '160px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 5px' }}>{order.title}</h4>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 3px' }}>🏪 Seller: <strong>{order.seller}</strong></p>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 3px' }}>📞 {order.sellerContact}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>📅 {order.orderedAt}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{
                        fontSize: '24px', fontWeight: '900', margin: '0 0 8px',
                        background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                        backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                      }}>₹{(order.price * (order.qty || 1)).toLocaleString('en-IN')}</p>
                      <span style={{
                        background: '#d1fae5', color: '#065f46', padding: '5px 14px',
                        borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                        display: 'inline-block', marginBottom: '10px'
                      }}>✅ Confirmed</span>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button onClick={() => handleQtyChange(order._id, -1)} style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          border: '1.5px solid #e2e8f0', background: '#f8fafc',
                          color: '#e8396a', fontSize: '18px', fontWeight: '700', cursor: 'pointer'
                        }}>−</button>
                        <span style={{ minWidth: '28px', textAlign: 'center', fontSize: '15px', fontWeight: '700' }}>{order.qty || 1}</span>
                        <button onClick={() => handleQtyChange(order._id, 1)} style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          border: '1.5px solid #e2e8f0', background: '#f0fdf4',
                          color: '#0d9488', fontSize: '18px', fontWeight: '700', cursor: 'pointer'
                        }}>+</button>
                        <button onClick={() => handleDeleteOrder(order._id)} style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          border: '1.5px solid #fecaca', background: '#fef2f2',
                          color: '#dc2626', fontSize: '14px', cursor: 'pointer'
                        }}>🗑</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Bar */}
              <div style={{
                marginTop: '20px', background: 'white', borderRadius: '16px',
                padding: '18px 24px', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', boxShadow: '0 4px 20px rgba(15,23,42,0.07)',
                border: '1px solid #f1f5f9'
              }}>
                <div>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 4px' }}>{orders.length} item{orders.length > 1 ? 's' : ''} · Order Total</p>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>All confirmed orders</p>
                </div>
                <p style={{
                  fontSize: '28px', fontWeight: '900', margin: 0,
                  background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                  backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Posted Listings Tab */}
      {activeTab === 'posted' && (
        <div>
          {postedItems.length === 0 ? (
            <EmptyState icon="🏷️" title="No listings yet" subtitle="Post your first item!" btnText="+ Post Item" btnLink="/add-product" />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {postedItems.map(item => (
                <div key={item.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(15,23,42,0.07)', border: '1px solid #f1f5f9' }}>
                  <div style={{ height: '150px', backgroundImage: `url(${item.image || 'https://via.placeholder.com/300'})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>{item.category}</span>
                    <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>🟢 Live</span>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px' }}>{item.title}</h4>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 4px' }}>📦 {item.condition}</p>
                    <p style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 14px', background: 'linear-gradient(135deg, #ec4899, #f43f5e)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₹{item.price}</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/product/${item.id}`} style={{ flex: 1, background: '#f1f5f9', color: '#0f172a', padding: '9px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '13px', textAlign: 'center' }}>👁 View</Link>
                      <button onClick={() => handleDeletePosted(item.id)} style={{ flex: 1, background: '#fef2f2', color: '#dc2626', border: 'none', padding: '9px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>🗑 Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

const StatBox = ({ label, value }) => (
  <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '14px', padding: '16px 24px', textAlign: 'center', minWidth: '80px' }}>
    <p style={{ fontSize: '30px', fontWeight: '900', margin: 0 }}>{value}</p>
    <p style={{ fontSize: '12px', opacity: 0.85, margin: 0 }}>{label}</p>
  </div>
);

const EmptyState = ({ icon, title, subtitle, btnText, btnLink }) => (
  <div style={{ textAlign: 'center', padding: '70px 20px', background: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
    <div style={{ fontSize: '64px', marginBottom: '16px' }}>{icon}</div>
    <h3 style={{ color: '#0f172a', fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>{title}</h3>
    <p style={{ color: '#64748b', marginBottom: '28px', fontSize: '15px' }}>{subtitle}</p>
    <Link to={btnLink} style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white', padding: '13px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: '800', fontSize: '15px' }}>{btnText}</Link>
  </div>
);

export default Dashboard;