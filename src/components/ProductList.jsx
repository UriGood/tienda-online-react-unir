import { useProducts } from "../customHooks/useProducts";
import { ProductItem } from "./ProductItem";

export default function ProductList() {

  const { products, loading, error } = useProducts();
  
  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="productList">

        {products.map(product => (
            <ProductItem product={ product } key={product.id}/>
        ))}
    </div>
  );
}
