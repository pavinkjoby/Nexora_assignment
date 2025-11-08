import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, cartItems } = req.body;

  if (!name || !email || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "Invalid checkout data" });
  }

  // Calculate total
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Mock receipt
  const receipt = {
    id: Math.random().toString(36).substring(2, 10),
    name,
    email,
    total: total.toFixed(2),
    date: new Date().toLocaleString(),
  };

  // Return mock receipt
  res.json({ success: true, receipt });
});

export default router;
