import PropTypes from "prop-types";
import { Contador } from "./Contador";
import '../styles/components/ProductItem.css'
import { useContext, useState } from "react";
import { CartContext } from "../useContext/context/CartContext";
export function ProductItem({ product }) {

  const { cart ,setCart } = useContext(CartContext);
  const [contadorValue, setContadorValue] = useState(1);

  const assembleObject = (value) =>{
    setContadorValue(value);
  }

  const saveProduct = () =>{
    const productLocal = {
      id: product.id,
      count: contadorValue,
    };
    const existingProduct = cart.find((item) => item.id === productLocal.id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
      item.id === productLocal.id
        ? { ...item, count: item.count + productLocal.count }
        : item
      );
      setCart(updatedCart);
    } else{
          setCart([...cart, productLocal]);
    }

    setContadorValue(1)
    alert("Producto agregado correctamente")
  }

  return (
    <>
      <div className="productItem">
        <div className="productItem__img-container">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="productItem__info-container-item">
          <p>{product.title}</p>
          <p className="productItem__price">${product.price}</p>
          <p>Disponibles: <span className="productItem__count">{ product.rating }</span> </p>
          <div className="productItem__contador_container">
            <Contador value={contadorValue} onChange={assembleObject}/> &nbsp;
            <button className="productItem__btn-add" onClick={saveProduct}>Agregar al carrito</button>
          </div>
        </div>
      </div>
    </>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};
