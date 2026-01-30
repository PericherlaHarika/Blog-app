import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 15, background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: 15, color: "#fff" }}>Home</Link>
      <Link to="/cart" style={{ color: "#fff" }}>Cart</Link>
    </nav>
  );
}
