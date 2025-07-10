import { useState, useEffect } from "react";

export default function useProductSearch(query) {
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
    const delayDebounce = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${query}`, { signal })
        .then((resp) => resp.json())
        .then((data) => setResults(data.products || []))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }, 500);
    return () => {
      clearTimeout(delayDebounce);  
      controller.abort();  
    };
  }, [query]);

  return { results, loading };
}
