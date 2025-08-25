import PropTypes from "prop-types";
import "../styles/components/SearchBar.css";
import { useState, useEffect } from "react";

export function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(()=>{
    if(input.length > 1){
      fetch(`http://localhost:8080/items/autocomplete?q=${input}`)
        .then((resp) => resp.json())
        .then((data) => {
        // Evitar que se recarguen sugerencias si ya son iguales al input actual
        if (data.length === 1 && data[0].title === input) {
          setSuggestions([]); // 🔹 cierra automáticamente
        } else {
          setSuggestions(data || []);
        }
      })
        .catch(()=>setSuggestions([]))
    }else{
      setSuggestions([]);
    }
  },[input]);

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setInput(value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
    setSuggestions([]);
  };
  
   return (
    <div className="searchbar-container-main ">
    <div className="searchbar-container">
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        className="searchbar__input"
        placeholder="Búsca productos..."
        type="text"
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        onBlur={()=> setTimeout(()=>setSuggestions([]),100)}
      />
      <button>Buscar</button>
    </form>
    { suggestions.length > 0 && (
      <ul className="suggestions">
        { suggestions.map((s,i)=>{
          return (<li key={i} onClick={()=>{ setTimeout(()=>setSuggestions([]),100); setInput(s.title); onSearch(s.title);}}>
            { s.title } <span className="categoria"> ({ s.category }) </span>
          </li>)
        }) }
      </ul>
    )}
    </div>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};