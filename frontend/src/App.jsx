import { useEffect, useState } from "react";
import { useCart } from "./hooks/useCart";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🛍 Nexora Store</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "20px",
        }}
      >
        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{ width: "100%", borderRadius: "6px" }}
              />
              <h3>{p.name}</h3>
              <p>₹{p.price.toFixed(2)}</p>
              <button onClick={() => addToCart(p._id, 1)}>Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
          <h2>🛒 Cart</h2>
          {cart.items.length === 0 ? (
            <p>Cart is empty.</p>
          ) : (
            cart.items.map((i) => (
              <div key={i.productId} style={{ marginBottom: "8px" }}>
                <strong>{i.name}</strong> — {i.qty} × ₹{i.price.toFixed(2)}
                <button
                  onClick={() => addToCart(i.productId, -1)}
                  style={{ marginLeft: "8px" }}
                >
                  -
                </button>
                <button
                  onClick={() => addToCart(i.productId, 1)}
                  style={{ marginLeft: "4px" }}
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(i.productId)}
                  style={{ marginLeft: "8px" }}
                >
                  ❌
                </button>
              </div>
            ))
          )}
          <hr />
          <h3>Total: ₹{cart.total.toFixed(2)}</h3>
          {cart.items.length > 0 && (
            <button
              onClick={() => setShowCheckout(true)}
              style={{
                width: "100%",
                background: "black",
                color: "white",
                padding: "8px",
                borderRadius: "5px",
              }}
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal cart={cart} onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}
