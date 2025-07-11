import { useProducts } from "../customHooks/useProducts";
import { ProductItem } from "./ProductItem";
import { useContext } from "react";
import { CartContext } from "../useContext/context/CartContext";

export default function ProductList() {

  const { cart } = useContext(CartContext);
  // console.log(cart);

  const { products, loading, error } = useProducts();
  
  if (error) return <p>Error: {error}</p>
  
  const consutarCarrito = ()=>{
    console.log(cart);
  }

  return (
    <div className="productList">
       { loading && <p>Cargando productos...</p> }
        <button onClick={()=> consutarCarrito()}>CONSULTAR carrito</button>
        {products.map(product => (
            <ProductItem product={ product } key={product.id} />
        ))}
    </div>
  );
}
