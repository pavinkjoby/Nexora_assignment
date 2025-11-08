import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const fetchCart = async () => {
    const res = await fetch("http://localhost:4000/api/cart");
    const data = await res.json();
    setCart(data);
  };

  const addToCart = async (productId, qty = 1) => {
    await fetch("http://localhost:4000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, qty }),
    });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await fetch(`http://localhost:4000/api/cart/${productId}`, {
      method: "DELETE",
    });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { cart, addToCart, removeFromCart };
}
