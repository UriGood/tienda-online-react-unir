import { useState, useEffect } from "react";

export default function useProductSearch(query, mode = "search") {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;
    const endpoint = mode === "autocomplete"
      ? `http://localhost:8080/items/autocomplete?q=${query}`
      : `http://localhost:8080/items/search-full-text?q=${query}`;

    const delayDebounce = setTimeout(() => {
      // fetch(`https://dummyjson.com/products/search?q=${query}`, { signal })
      fetch(endpoint, { signal })
        .then((resp) => resp.json())
        .then((data) => { setResults(data || []) })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }, 0);
    return () => {
      clearTimeout(delayDebounce);  
      controller.abort();  
    };
  }, [query, mode]);

  return { results, loading };
}
