import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CART_KEY = 'campusCart';
const ORDERS_KEY = 'campusOrders';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      setCartItems(cart);
    };
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleQty = (id, delta) => {
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } : item
    );
    setCartItems(updated);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const currentUser = JSON.parse(localStorage.getItem('campusUser') || 'null');
    const existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');

    // Each cart item becomes a separate order (to match Dashboard format)
    const newOrders = cartItems.map(item => ({
      _id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      userId: currentUser?._id || currentUser?.id || null,
      productId: item.productId || item._id,
      title: item.title,
      price: item.price,
      qty: item.qty || 1,
      image: item.image,
      seller: item.seller,
      sellerContact: item.sellerContact || '',
      orderedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      }),
      status: 'Confirmed',
    }));

    localStorage.setItem(ORDERS_KEY, JSON.stringify([...newOrders, ...existingOrders]));

    // Clear cart
    localStorage.setItem(CART_KEY, JSON.stringify([]));
    setCartItems([]);
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new Event('ordersUpdated'));

    navigate('/dashboard');
  };

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 20px' }}>
      <button onClick={() => navigate(-1)} style={{
        background: 'rgba(15,23,42,0.08)', border: 'none', padding: '10px 16px',
        borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
        color: '#0f172a', marginBottom: '24px'
      }}>← Back</button>

      <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>
        🛒 My Cart ({cartItems.length})
      </h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '70px 20px', background: 'white',
          borderRadius: '20px', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
          <h3 style={{ color: '#0f172a', fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>
            Cart is empty!
          </h3>
          <p style={{ color: '#64748b', marginBottom: '28px' }}>
            Add some items first.
          </p>
          <Link to="/" style={{
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white',
            padding: '13px 28px', borderRadius: '12px', textDecoration: 'none',
            fontWeight: '800', fontSize: '15px'
          }}>Browse Items</Link>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {cartItems.map(item => (
              <div key={item._id} style={{
                background: 'white', borderRadius: '16px', padding: '20px',
                boxShadow: '0 4px 20px rgba(15,23,42,0.07)',
                display: 'flex', gap: '16px', alignItems: 'center',
                flexWrap: 'wrap', border: '1px solid #f1f5f9'
              }}>
                <div style={{
                  width: '76px', height: '76px', borderRadius: '12px', flexShrink: 0,
                  backgroundImage: `url(${item.image || 'https://via.placeholder.com/76'})`,
                  backgroundSize: 'cover', backgroundPosition: 'center'
                }} />
                <div style={{ flex: 1, minWidth: '160px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 5px' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                    🏪 {item.seller}
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{
                    fontSize: '22px', fontWeight: '900', margin: '0 0 10px',
                    background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                    backgroundClip: 'text', WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>₹{(item.price * (item.qty || 1)).toLocaleString('en-IN')}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                    <button onClick={() => handleQty(item._id, -1)} style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      border: '1.5px solid #e2e8f0', background: '#f8fafc',
                      color: '#e8396a', fontSize: '18px', cursor: 'pointer'
                    }}>−</button>
                    <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: '700' }}>
                      {item.qty || 1}
                    </span>
                    <button onClick={() => handleQty(item._id, 1)} style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      border: '1.5px solid #e2e8f0', background: '#f0fdf4',
                      color: '#0d9488', fontSize: '18px', cursor: 'pointer'
                    }}>+</button>
                    <button onClick={() => handleRemove(item._id)} style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      border: '1.5px solid #fecaca', background: '#fef2f2',
                      color: '#dc2626', fontSize: '14px', cursor: 'pointer'
                    }}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total + Checkout */}
          <div style={{
            marginTop: '20px', background: 'white', borderRadius: '16px',
            padding: '20px 24px', boxShadow: '0 4px 20px rgba(15,23,42,0.07)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                {cartItems.length} item{cartItems.length > 1 ? 's' : ''} · Cart Total
              </p>
              <p style={{
                fontSize: '28px', fontWeight: '900', margin: 0,
                background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                backgroundClip: 'text', WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>₹{total.toLocaleString('en-IN')}</p>
            </div>
            <button onClick={handlePlaceOrder} style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              color: 'white', border: 'none', borderRadius: '12px',
              fontSize: '16px', fontWeight: '800', cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(245,158,11,0.4)'
            }}>⚡ Proceed to Buy</button>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;