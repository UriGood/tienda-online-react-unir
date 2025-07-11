import PropTypes from "prop-types";
import { Contador } from "./Contador";
import '../styles/components/ProductItem.css'
import { useContext, useState } from "react";
import { CartContext } from "../useContext/context/CartContext";
export function ProductItem({ product }) {
  const { cart ,setCart } = useContext(CartContext);
  const [productLocal, setProductLocal] = useState({ id: product.id, count: 1 });
  const assembleObject = (value) =>{
    // console.log("assembleObject ", value);
    
    setProductLocal({
      id: product.id,
      count: value,
    })

    console.log("productLocal", productLocal);
    
  }

  const saveProduct = () =>{
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
  }

  return (
    <>
      <div className="productItem">
        <div className="img-container">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="info-container-item">
          <p>{product.title}</p>
          <p id="price">${product.price}</p>
          <p>Disponibles: <span id="count">{ product.rating }</span> </p>
          <div className="contador_container">
            <Contador onChange={assembleObject}/>
            <button className="btn-add" href="" onClick={saveProduct}>Agregar al carrito</button>
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
