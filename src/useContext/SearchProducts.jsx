import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Facets } from "../components/Facets";
import useProductSearch from "../customHooks/useProductSearch";
import "../styles/pages/SearchProducts.css";
import { SearchProductItem } from "../components/SearchProductItem";
export default function SearchProducts() {
  const [query, setQuery] = useState("");
  const { results, loading } = useProductSearch(query, "search");
  const [mensaje, setMensaje] = useState(
    "Búsquedas sugeridas: Samsung | iPhone 15 Pro | Samsung Smart TV 55 | Apple |  "
  );
  const [filters, setFilters] = useState([]);

  const filteredResults = results.filter(
    (prod) => filters.length === 0 || filters.includes(prod.category)
  );

  useEffect(() => {
    if (query !== "" && !filteredResults.length && !loading) {
      setMensaje("No se encontraron resultados de este producto");
    }
  }, [query, filteredResults, loading]);
  return (
    <>
      <div className="search-page">
        <SearchBar onSearch={setQuery} />
        <div className="search-layout">
          <Facets onFilter={setFilters} />
          <div className="searchProducts">
            {loading && <div> Buscando los productos </div>}
            {!filteredResults.length && !loading && <div>{mensaje}</div>}
            {filteredResults.map((prod) => (
              <SearchProductItem key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
