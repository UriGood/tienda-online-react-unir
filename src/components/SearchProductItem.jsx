import PropTypes from "prop-types";
import { Contador } from "./Contador";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../useContext/context/CartContext";
export const SearchProductItem = ({ product }) => {
  const [contador, setContador] = useState(1);
  const { cart, setCart } = useContext(CartContext);
  const updateContador = (value) => {
    setContador(value);
  };

  const addCart = (id) => {
    console.log("id: ", id);
    
    const existProduct = cart.find(prod => prod.id == id);
    if(existProduct){
      setCart(cart.map(prod => (
        prod.item == id ? { ...prod, count: prod.count + contador } : prod
      ) 
      ));
    }else {
      setCart([...cart, {id, count: contador} ]);
    }
    alert("Producto agregado al carrito");
  };

  return (
    <div className="searchProducts__card">
      <div className="searchProducts__section">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="searchProducts__imagen"
        />
      </div>
      <div className="">
        <div>{product.title}</div>
        <div id="searchProducts__price">${product.price}</div>
        <div id="searchProducts__description">{product.description}</div>
        <div id="searchProducts__stock">En stock: {product.stock}</div>
        <Contador value={contador} onChange={updateContador} />
        <br />
        <button onClick={() => addCart(product.id)} id="searchProducts__button">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

SearchProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};
