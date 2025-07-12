// import { useState } from "react";
import "../styles/components/Contador.css";
import PropTypes from "prop-types";
export const Contador = ({value, onChange  }) => {
  // const [contadorValue, setContadorValue] = useState(1);

  const updatecontador = (amount) => {
    if (amount < 1 && value == 1) return;
    const newValue = value + amount;

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
        value={value}
      />
      <button className="contador__more" onClick={() => updatecontador(+1)}>
        +
      </button>
    </div>
  );
};


Contador.propTypes = {
  onChange: PropTypes.func.isRequired, 
  value: PropTypes.number.isRequired
}