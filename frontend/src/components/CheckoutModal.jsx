export default function CheckoutModal({ cart, onClose }) {
  const handleCheckout = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      cartItems: cart.items,
    };

    const res = await fetch("http://localhost:4000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.success) {
      alert(
        `✅ Checkout complete!\n\nReceipt ID: ${data.receipt.id}\nName: ${data.receipt.name}\nEmail: ${data.receipt.email}\nTotal: $${data.receipt.total}\nDate: ${data.receipt.date}`
      );
      onClose(); // Close modal
    } else {
      alert("❌ Checkout failed!");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleCheckout}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h2>Checkout</h2>
        <label>Name:</label>
        <input name="name" required style={{ width: "100%", marginBottom: "10px" }} />
        <label>Email:</label>
        <input
          name="email"
          type="email"
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            background: "#222",
            color: "white",
            padding: "8px",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          Confirm Purchase (${cart.total.toFixed(2)})
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: "10px",
            width: "100%",
            border: "1px solid #999",
            padding: "6px",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
