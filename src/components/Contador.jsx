import { useState } from "react";
import "../styles/components/Contador.css";
import PropTypes from "prop-types";
export const Contador = ({ onChange }) => {
  const [contadorValue, setContadorValue] = useState(1);

  const updatecontador = (value) => {
    if (value < 1 && contadorValue == 1) return;
    const newValue = contadorValue + value;
    // console.log(newValue);
    
    setContadorValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="contador">
      <button className="contador__less" onClick={() => updatecontador(-1)}>
        -
      </button>
      <input
        type="text"
        disabled
        className="contador__input"
        value={contadorValue}
      />
      <button className="contador__more" onClick={() => updatecontador(+1)}>
        +
      </button>
    </div>
  );
};


Contador.propTypes = {
  onChange: PropTypes.func.isRequired
}