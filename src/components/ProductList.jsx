import { useProducts } from "../customHooks/useProducts";
import { ProductItem } from "./ProductItem";
// import { useContext } from "react";
// import { CartContext } from "../useContext/context/CartContext";

export default function ProductList() {

  // const { cart, setCart } = useContext(CartContext);
  // console.log(cart);

  const { products, loading, error } = useProducts();
  
  if (error) return <p>Error: {error}</p>
  
  return (
    <div className="productList">
       { loading && <p>Cargando productos...</p> }
        {/* <button onClick={()=> setCart([{id:2, count: 5  }, {id: 5, count:8}])}>agregar algo al carrito</button> */}
        {products.map(product => (
            <ProductItem product={ product } key={product.id} />
        ))}
    </div>
  );
}
