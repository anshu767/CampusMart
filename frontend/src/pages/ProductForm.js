import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  'Books', 'Notes', 'Gadgets', 'Electronics', 'Laptops', 'Phones',
  'Accessories', 'Stationery', 'Bags', 'Calculators', 'Lab Equipment',
  'Sports', 'Fashion', 'Hostel Items', 'Furniture', 'Cycles',
  'Projects', 'Coding Resources', 'Tuition', 'Services', 'Others'
];

const ProductForm = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('campusUser') || 'null');

  const [form, setForm] = useState({
    title: '', price: '', category: 'Books', description: '',
    condition: 'Good', contact: '', location: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setImageBase64(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageFile(file);
  };

  const handlePublish = () => {
    if (!form.title || !form.price || !form.description) {
      setError('Please fill Title, Price and Description.'); return;
    }
    if (!currentUser) {
      setError('Please login before posting an item.'); return;
    }

    const existing = JSON.parse(localStorage.getItem('campusPostedItems') || '[]');
    const newItem = {
      id: Date.now(),
      title: form.title,
      price: parseFloat(form.price),
      category: form.category,
      description: form.description,
      condition: form.condition,
      image: imageBase64 || `https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop`,
      postedDate: 'Just now',
      name: currentUser.name,
      contact: form.contact || currentUser.email,
      email: currentUser.email,
      location: form.location || 'Campus',
      brand: undefined, warranty: undefined, processor: undefined,
      ram: undefined, storage: undefined, battery: undefined,
      pages: undefined, author: undefined,
    };

    existing.push(newItem);
    localStorage.setItem('campusPostedItems', JSON.stringify(existing));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="page-shell" style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '72px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Item Listed!</h2>
        <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '16px' }}>
          <strong>{form.title}</strong> is now live on Campus Mart and visible to all students.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/browse')} style={{
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)', color: 'white',
            border: 'none', padding: '14px 28px', borderRadius: '10px',
            fontWeight: '700', fontSize: '16px', cursor: 'pointer'
          }}>👀 View in Browse</button>
          <button onClick={() => navigate('/dashboard')} style={{
            background: '#f1f5f9', color: '#0f172a', border: 'none',
            padding: '14px 28px', borderRadius: '10px', fontWeight: '700', fontSize: '16px', cursor: 'pointer'
          }}>📋 My Dashboard</button>
        </div>
      </main>
    );
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', border: '2px solid #e2e8f0',
    borderRadius: '10px', fontSize: '15px', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit', color: '#0f172a'
  };
  const labelStyle = { fontSize: '13px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' };

  return (
    <main className="page-shell" style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 6px' }}>Post Item</p>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px' }}>
          List your item
        </h1>
        <p style={{ color: '#64748b', margin: 0 }}>Upload details and share your listing with the campus community.</p>
      </div>

      {!currentUser && (
        <div style={{
          background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '12px',
          padding: '16px 20px', marginBottom: '24px', fontSize: '14px', color: '#92400e', fontWeight: '600'
        }}>
          ⚠️ Please <strong>login</strong> from the top navigation before posting. Your item won't be saved otherwise.
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 8px 32px rgba(15,23,42,0.08)' }}>

        {/* Image Upload */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Product Image</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('imageInput').click()}
            style={{
              border: `2px dashed ${dragOver ? '#ec4899' : '#cbd5e1'}`,
              borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer',
              background: dragOver ? '#fdf2f8' : '#f8fafc', transition: 'all 0.2s',
              position: 'relative', overflow: 'hidden', minHeight: '140px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="preview" style={{ maxHeight: '180px', borderRadius: '8px', objectFit: 'cover' }} />
            ) : (
              <>
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>📷</div>
                <p style={{ fontWeight: '700', color: '#475569', margin: '0 0 4px' }}>Drag & drop an image</p>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>or click to browse your files</p>
              </>
            )}
            <input id="imageInput" type="file" accept="image/*" style={{ display: 'none' }}
              onChange={(e) => handleImageFile(e.target.files[0])} />
          </div>
        </div>

        {/* Title, Price, Category */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>Title *</label>
            <input style={inputStyle} name="title" placeholder="e.g. Calculus Book" value={form.title} onChange={handleChange} />
          </div>
          <div>
            <label style={labelStyle}>Price (₹) *</label>
            <input style={inputStyle} name="price" type="number" placeholder="e.g. 250" value={form.price} onChange={handleChange} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select style={inputStyle} name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Condition */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Condition</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['New', 'Like New', 'Good', 'Fair'].map((c) => (
              <button key={c} type="button" onClick={() => setForm({ ...form, condition: c })} style={{
                padding: '8px 16px', border: `2px solid ${form.condition === c ? '#ec4899' : '#e2e8f0'}`,
                borderRadius: '8px', background: form.condition === c ? '#fdf2f8' : 'white',
                color: form.condition === c ? '#ec4899' : '#64748b',
                fontWeight: '700', fontSize: '13px', cursor: 'pointer'
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Description *</label>
          <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
            name="description" placeholder="Describe your item — condition, usage, what's included..."
            value={form.description} onChange={handleChange} />
        </div>

        {/* Contact & Location */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={labelStyle}>Contact Number</label>
            <input style={inputStyle} name="contact" placeholder="98XXXXXXXX" value={form.contact} onChange={handleChange} />
          </div>
          <div>
            <label style={labelStyle}>Location</label>
            <input style={inputStyle} name="location" placeholder="e.g. Hostel A, Room 101" value={form.location} onChange={handleChange} />
          </div>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontWeight: '600' }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handlePublish} style={{
            flex: 2, padding: '16px', background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
            color: 'white', border: 'none', borderRadius: '10px', fontWeight: '800',
            fontSize: '16px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(236,72,153,0.3)'
          }}>🚀 Publish Listing</button>
          <button onClick={() => navigate(-1)} style={{
            flex: 1, padding: '16px', background: '#f1f5f9', color: '#475569',
            border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '16px', cursor: 'pointer'
          }}>Cancel</button>
        </div>
      </div>
    </main>
  );
};

export default ProductForm;