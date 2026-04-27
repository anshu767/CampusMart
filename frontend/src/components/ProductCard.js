import { useState, useEffect } from "react";

// ─── Star Rating Component ────────────────────────────────────────────────────
function StarRating({ value, onChange, size = 22, readonly = false }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={() => !readonly && onChange && onChange(i)}
          onMouseEnter={() => !readonly && setHovered(i)}
          onMouseLeave={() => !readonly && setHovered(0)}
          style={{
            fontSize: size,
            cursor: readonly ? "default" : "pointer",
            color: i <= (hovered || value) ? "#f59e0b" : "#d1d5db",
            transition: "color 0.15s",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─── Single Review Item ───────────────────────────────────────────────────────
function ReviewItem({ review }) {
  return (
    <div
      style={{
        background: "#f9fafb",
        borderRadius: 10,
        padding: "10px 14px",
        marginBottom: 8,
        borderLeft: "3px solid #f59e0b",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#fef3c7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 13,
            color: "#b45309",
            flexShrink: 0,
          }}
        >
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 13, margin: 0, color: "#111827" }}>
            {review.name}
          </p>
          <StarRating value={review.stars} readonly size={13} />
        </div>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#9ca3af" }}>
          {review.date}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
        {review.text}
      </p>
    </div>
  );
}

// ─── Main ProductCard Component ───────────────────────────────────────────────
export default function ProductCard({ product }) {
  const storageKey = `reviews_${product.id || product._id}`;

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userRating, setUserRating] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStars, setNewStars] = useState(0);
  const [newText, setNewText] = useState("");
  const [error, setError] = useState("");

  // Reviews save karo localStorage mein
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch (e) {
      console.error("localStorage error:", e);
    }
  }, [reviews, storageKey]);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)
      : null;

  function handleSubmit() {
    if (!newName.trim()) { setError("Naam likhna zaroori hai!"); return; }
    if (newStars === 0)  { setError("Star rating do!"); return; }
    if (!newText.trim()) { setError("Review likhna zaroori hai!"); return; }
    setError("");

    const review = {
      id: Date.now(),
      name: newName.trim(),
      stars: newStars,
      text: newText.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      }),
    };

    setReviews((prev) => [review, ...prev]);
    setNewName("");
    setNewStars(0);
    setNewText("");
    setShowForm(false);
    setShowReviews(true);
  }

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: "16px 20px",
        marginBottom: 14,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Product Info Row */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        {/* Image / Emoji */}
        <div
          style={{
            width: 68, height: 68, borderRadius: 12,
            background: "#f3f4f6", flexShrink: 0,
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 28, overflow: "hidden",
          }}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12 }}
            />
          ) : (
            product.emoji || "📦"
          )}
        </div>

        {/* Details */}
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: "#111827" }}>
            {product.name || product.title}
          </h3>
          {product.seller && (
            <p style={{ margin: "0 0 2px", fontSize: 13, color: "#6b7280" }}>
              🛒 Seller: <strong style={{ color: "#374151" }}>{product.seller}</strong>
            </p>
          )}
          {product.phone && (
            <p style={{ margin: "0 0 2px", fontSize: 13, color: "#6b7280" }}>📞 {product.phone}</p>
          )}
          {product.date && (
            <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>📅 Ordered on {product.date}</p>
          )}
        </div>

        {/* Price & Status */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "#be185d" }}>
            {product.price}
          </p>
          <span
            style={{
              background: "#dcfce7", color: "#15803d",
              fontSize: 12, padding: "4px 10px",
              borderRadius: 20, fontWeight: 500,
            }}
          >
            ✅ Confirmed
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #f3f4f6", margin: "14px 0 10px" }} />

      {/* Rating Row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6b7280" }}>Apni rating do:</p>
          <StarRating value={userRating} onChange={setUserRating} />
        </div>
        {avgRating && (
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#f59e0b" }}>{avgRating}</span>
            <span style={{ fontSize: 12, color: "#6b7280" }}> / 5</span>
            <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
        {reviews.length > 0 && (
          <button
            onClick={() => setShowReviews((v) => !v)}
            style={{
              background: showReviews ? "#fef3c7" : "#f9fafb",
              border: "1px solid #e5e7eb", borderRadius: 8,
              padding: "6px 14px", fontSize: 12,
              cursor: "pointer", color: "#374151", fontWeight: 500,
            }}
          >
            {showReviews ? "▲ Reviews chhupao" : `▼ ${reviews.length} Review${reviews.length > 1 ? "s" : ""} dekho`}
          </button>
        )}
        <button
          onClick={() => setShowForm((v) => !v)}
          style={{
            background: showForm ? "#fef3c7" : "#f59e0b",
            border: "none", borderRadius: 8,
            padding: "6px 14px", fontSize: 12,
            cursor: "pointer",
            color: showForm ? "#374151" : "#ffffff",
            fontWeight: 600,
          }}
        >
          {showForm ? "✕ Cancel" : "✍️ Review likho"}
        </button>
      </div>

      {/* Reviews List */}
      {showReviews && reviews.length > 0 && (
        <div style={{ marginTop: 12 }}>
          {reviews.map((r) => (
            <ReviewItem key={r.id} review={r} />
          ))}
        </div>
      )}

      {/* Add Review Form */}
      {showForm && (
        <div
          style={{
            marginTop: 12,
            background: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: 12,
            padding: "14px 16px",
          }}
        >
          <p style={{ margin: "0 0 10px", fontWeight: 600, fontSize: 14, color: "#92400e" }}>
            Apna review likho
          </p>

          <input
            type="text"
            placeholder="Aapka naam *"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              width: "100%", padding: "8px 12px",
              border: "1px solid #fcd34d", borderRadius: 8,
              fontSize: 13, marginBottom: 8,
              outline: "none", background: "#fff",
              boxSizing: "border-box",
            }}
          />

          <div style={{ marginBottom: 8 }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, color: "#92400e" }}>Rating do *</p>
            <StarRating value={newStars} onChange={setNewStars} size={24} />
          </div>

          <textarea
            placeholder="Apna experience likho..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            rows={3}
            style={{
              width: "100%", padding: "8px 12px",
              border: "1px solid #fcd34d", borderRadius: 8,
              fontSize: 13, marginBottom: 8,
              resize: "vertical", outline: "none",
              background: "#fff", fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <p style={{ margin: "0 0 8px", fontSize: 12, color: "#dc2626", fontWeight: 500 }}>
              ⚠️ {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            style={{
              background: "#f59e0b", color: "#fff",
              border: "none", borderRadius: 8,
              padding: "9px 20px", fontSize: 14,
              fontWeight: 600, cursor: "pointer", width: "100%",
            }}
          >
            Post Review →
          </button>
        </div>
      )}
    </div>
  );
}