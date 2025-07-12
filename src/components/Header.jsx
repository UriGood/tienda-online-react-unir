import { Link } from "react-router-dom";
import '../styles/components/Header.css'
export function Header() {
  return (
    <header>
    <h2>Uriel Martinez - Tienda Online</h2>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="cart">Carrito</Link> |
        <Link to="search-products">Buscar Productos</Link>  | 
        <Link to="pucharses">Compras</Link>  | 
        <Link to="returns">Devoluciones</Link>
      </nav>
    </header>
  );
}
