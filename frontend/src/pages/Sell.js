import React from 'react';
import { Link } from 'react-router-dom';

const Sell = () => {
  return (
    <main className="page-shell sell-page">
      <section className="page-header-block">
        <div>
          <p className="eyebrow">Seller center</p>
          <h1>Launch your campus listing</h1>
          <p className="section-copy">
            Post your item quickly with a polished listing flow, built for busy students and modern sellers.
          </p>
        </div>
        <Link to="/add-product" className="gradient-btn">
          Post Item
        </Link>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Fast listing</h3>
          <p>Upload your item in seconds and share it with the campus marketplace instantly.</p>
        </article>
        <article className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>Buyer chat ready</h3>
          <p>Stay connected with interested students and answer questions directly.</p>
        </article>
        <article className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Insights & trends</h3>
          <p>See which categories are trending and optimize your price for quick sales.</p>
        </article>
      </section>

      <section className="sample-grid">
        <div className="sample-card">
          <p className="eyebrow">Gadget spotlight</p>
          <h2>Top rated items sell faster</h2>
          <p>High-quality photos, clear descriptions, and fast replies increase buyer confidence.</p>
          <Link to="/add-product" className="subtle-link">
            Start listing
          </Link>
        </div>

        <div className="selling-stats-card">
          <div>
            <p className="stat-value">96%</p>
            <p className="stat-label">Listing approval</p>
          </div>
          <div>
            <p className="stat-value">3.8x</p>
            <p className="stat-label">More views</p>
          </div>
        </div>
      </section>

      <section className="seller-guide-card">
        <h2>Smart listing essentials</h2>
        <ul>
          <li>Use crisp product images with natural lighting</li>
          <li>Write a clear title and include the condition</li>
          <li>Choose the right category and price competitively</li>
          <li>Enable quick replies for faster sales</li>
        </ul>
      </section>
    </main>
  );
};

export default Sell;