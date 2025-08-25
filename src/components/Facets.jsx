import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../styles/components/Facets.css";

export function Facets({ onFilter }) {
  const [facets, setFacets] = useState({});
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/items/facets")
      .then((resp) => resp.json())
      .then((data) => setFacets(data))
      .catch(() => setFacets({}));
  }, []);

  const toggleCategory = (cat) => {
    let newSelected;
    if (selected.includes(cat)) {
      newSelected = selected.filter((c) => c !== cat);
    } else {
      newSelected = [...selected, cat];
    }
    setSelected(newSelected);
    onFilter(newSelected); // 🔹 notificamos al padre
  };

  return (
    <div className="facets">
      <h3>Categorías</h3>
      <ul>
        {Object.entries(facets).map(([cat, count]) => (
          <li key={cat}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat} <span>({count})</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

Facets.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
