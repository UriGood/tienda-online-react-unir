import { useProducts } from "../customHooks/useProducts";
import { ProductItem } from "./ProductItem";
import '../styles/components/ProductList.css'
export default function ProductList() {

  const { products, loading, error } = useProducts('http://localhost:8080/items');
  
  if (error) return <p>Error: {error}</p>
  
  return (
    <div className="productList">
       { loading && <p>Cargando productos...</p> }
        {products.map(product => (
            <ProductItem product={ product } key={product.id} />
        ))}
    </div>
  );
}
