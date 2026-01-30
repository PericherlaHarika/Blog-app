import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div style={{ padding: 20 }}>
      <h2>Cart</h2>

      {cart.map(item => (
        <div key={item._id}>
          {item.name} - ₹{item.price}
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}

      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
}
