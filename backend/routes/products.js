import { Router } from "express";
import Product from "../models/product.js"; // ✅ lowercase to match filename

const router = Router();

// Seed mock products if DB is empty
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();

    // Insert mock data if DB is empty
    if (products.length === 0) {
  const mockProducts = [
    { name: "Vibe Tee", price: 799, image: "https://picsum.photos/seed/vibe1/300/200" },
    { name: "Vibe Hoodie", price: 1799, image: "https://picsum.photos/seed/vibe2/300/200" },
    { name: "Vibe Cap", price: 499, image: "https://picsum.photos/seed/vibe3/300/200" },
    { name: "Sticker Pack", price: 199, image: "https://picsum.photos/seed/vibe4/300/200" },
    { name: "Water Bottle", price: 699, image: "https://picsum.photos/seed/vibe5/300/200" }
  ];
  products = await Product.insertMany(mockProducts);
}

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
