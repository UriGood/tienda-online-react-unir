import PropTypes from "prop-types";
import { CartContext } from "./CartContext";
import { useState } from "react";

export const CartProvider = ({ children }) => {

   const [cart, setCart] =  useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart}}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
