import PropTypes from "prop-types";
import "../styles/components/SearchBar.css";
import { useState } from "react";

export function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
  };
  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        className="searchbar__input"
        placeholder="Busquedas sugeridas: watch | smart | iphone | shoes | food "
        type="text"
        value={input}
        onChange={handleChange}
      />
      <button>Buscar</button>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};