import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = () => {
    setError('');
    if (!form.email || !form.password) { setError('Please fill all required fields.'); return; }
    if (mode === 'register') {
      if (!form.name) { setError('Name is required.'); return; }
      if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
      if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const userData = {
        name: mode === 'register' ? form.name : form.email.split('@')[0],
        email: form.email,
        joinedDate: new Date().toLocaleDateString('en-IN'),
      };
      localStorage.setItem('campusUser', JSON.stringify(userData));
      if (!localStorage.getItem('campusOrders')) {
        localStorage.setItem('campusOrders', JSON.stringify([]));
      }
      onSuccess(userData);
      onClose();
    }, 1200);
  };

  const overlay = {
    position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.75)',
    backdropFilter: 'blur(6px)', zIndex: 9999,
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
  };
  const inputStyle = {
    width: '100%', padding: '13px 16px', border: '2px solid #e2e8f0',
    borderRadius: '10px', fontSize: '15px', outline: 'none',
    boxSizing: 'border-box', marginBottom: '12px', fontFamily: 'inherit'
  };

  return (
    <div style={overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{
        background: 'white', borderRadius: '20px', padding: '40px', width: '100%',
        maxWidth: '420px', boxShadow: '0 32px 80px rgba(15,23,42,0.3)',
        position: 'relative', animation: 'slideUp 0.3s ease'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px', background: '#f1f5f9',
          border: 'none', width: '36px', height: '36px', borderRadius: '50%',
          fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>×</button>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🎓</div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px' }}>
            {mode === 'login' ? 'Welcome Back!' : 'Join Campus Mart'}
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            {mode === 'login' ? 'Login to continue' : 'Create your free account'}
          </p>
        </div>

        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '10px', padding: '4px', marginBottom: '24px' }}>
          {['login', 'register'].map((m) => (
            <button key={m} onClick={() => { setMode(m); setError(''); setForm({ name: '', email: '', password: '', confirm: '' }); }}
              style={{
                flex: 1, padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontWeight: '700', fontSize: '14px', transition: 'all 0.2s',
                background: mode === m ? 'linear-gradient(135deg, #ec4899, #f43f5e)' : 'transparent',
                color: mode === m ? 'white' : '#64748b'
              }}>
              {m === 'login' ? '🔑 Login' : '✨ Register'}
            </button>
          ))}
        </div>

        {mode === 'register' && (
          <input style={inputStyle} name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} />
        )}
        <input style={inputStyle} type="email" name="email" placeholder="College Email *" value={form.email} onChange={handleChange} />
        <input style={inputStyle} type="password" name="password" placeholder="Password *" value={form.password} onChange={handleChange} />
        {mode === 'register' && (
          <input style={inputStyle} type="password" name="confirm" placeholder="Confirm Password *" value={form.confirm} onChange={handleChange} />
        )}

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '12px' }}>
            ⚠️ {error}
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', padding: '14px', background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
          color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px',
          fontWeight: '700', cursor: 'pointer', marginTop: '8px',
          boxShadow: '0 4px 14px rgba(236,72,153,0.4)'
        }}>
          {loading ? '⏳ Please wait...' : mode === 'login' ? '🔓 Login & Continue' : '🚀 Create Account'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '20px' }}>
          Your data is safe & used only within Campus Mart 🔒
        </p>
      </div>
    </div>
  );
};

export default AuthModal;