import {  useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import useProductSearch from "../customHooks/useProductSearch";
import '../styles/pages/SearchProducts.css'
import { SearchProductItem } from "../components/SearchProductItem";
export default function SearchProducts() {
  const [query, setQuery] = useState("");
  const { results, loading } = useProductSearch(query);
  const [ mensaje, setMensaje ] = useState("Busquedas sugeridas: ");
  console.log("obteniedo el resultado en el padre", query);
  console.log("este es el result ", results);
  useEffect(() => {
    if (query !== "" && !results.length && !loading) {
      setMensaje("No se encontraron resultados de este producto");
    }
  }, [query, results, loading]);
  return (
    <>
      <SearchBar onSearch={setQuery} />
      <div className="searchProducts">
        {loading && <div> Buscando los productos </div>}
        { (!results.length && !loading) && <div> {mensaje} </div> }
        {results.map((prod) => {
          return <SearchProductItem key={prod.id} product={prod}/>;
        })}
      </div>
    </>
  );
}
