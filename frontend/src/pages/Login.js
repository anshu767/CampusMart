import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // localStorage se registered users lo
    const users = JSON.parse(localStorage.getItem('campusUsers') || '[]');
    const found = users.find(u => u.email === email && u.password === password);

    if (found) {
      localStorage.setItem('campusmart_auth', 'true');
      localStorage.setItem('campusUser', JSON.stringify(found));
      navigate('/');
    } else {
      setError('❌ Email ya password galat hai. Pehle Register karo!');
    }
  };

  return (
    <main className="page-shell" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(15,23,42,0.12)' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>Welcome Back 👋</h2>
        <p style={{ color: '#64748b', marginBottom: '28px' }}>Login to your CampusMart account</p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px' }}>
            ✕ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', display: 'block', marginBottom: '6px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tumhara@email.com"
              required
              style={{ width: '100%', padding: '12px 16px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', display: 'block', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: '100%', padding: '12px 16px', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" style={{
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
            color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: '800', cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(236,72,153,0.4)'
          }}>🔑 Login</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#ec4899', fontWeight: '700', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;