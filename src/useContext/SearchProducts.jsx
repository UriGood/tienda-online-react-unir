import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import useProductSearch from "../customHooks/useProductSearch";
import '../styles/pages/SearchProducts.css'
import { SearchProductItem } from "../components/SearchProductItem";
export default function SearchProducts() {
  const [query, setQuery] = useState("");
  const { results, loading } = useProductSearch(query);
  console.log("obteniedo el resultado en el padre", query);
  console.log("este es el result ", results);

  return (
    <>
      <SearchBar onSearch={setQuery} />
      <div className="searchProducts">
        {loading && <div> Buscando los productos </div>}
        { (!results.length && !loading) && <div> No hay productos de esta busqueda </div> }
        {results.map((prod) => {
          return <SearchProductItem key={prod.id} product={prod}/>;
        })}
      </div>
    </>
  );
}
