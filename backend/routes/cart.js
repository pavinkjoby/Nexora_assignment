import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/product.js";

const router = Router();

// Temporary in-memory cart
let cart = [];

// ✅ GET: Fetch cart items + total
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    const cartItems = cart
      .map((item) => {
        // define product correctly inside map()
        const product = products.find(
          (p) => p._id.toString() === item.productId
        );
        if (!product) return null; // if product not found, skip
        return {
          ...item,
          name: product.name,
          price: product.price,
          image: product.image,
        };
      })
      .filter(Boolean); // remove nulls

    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    res.json({ items: cartItems, total });
  } catch (err) {
    console.error("❌ Error fetching cart:", err.message);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// ✅ POST: Add or update item in cart
router.post("/", (req, res) => {
  const { productId, qty } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid productId" });
  }

  const existing = cart.find((i) => i.productId === productId);
  if (existing) {
    existing.qty += qty;
    if (existing.qty <= 0) {
      cart = cart.filter((i) => i.productId !== productId);
    }
  } else if (qty > 0) {
    cart.push({ productId, qty });
  }

  res.json({ success: true, cart });
});

// ✅ DELETE: Remove item
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  cart = cart.filter((i) => i.productId !== id);
  res.json({ success: true, cart });
});

export default router;
