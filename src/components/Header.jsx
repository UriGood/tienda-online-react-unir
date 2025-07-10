import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
    <h2>Uriel Martinez - Tienda Online</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="cart">Cart</Link>
      </nav>
    </header>
  );
}
