import { useState } from "react";
import { OrdersContext } from "./OrdersContext";
import PropTypes from "prop-types";

export const OrdersProvider = ({children}) => {
  const [orders, setOrders] = useState([{ id: 6, devuelto:false }, { id: 7, devuelto:false }, { id: 8, devuelto:false }, { id: 9, devuelto:false }]);
  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};


OrdersProvider.propTypes = {
    children: PropTypes.node.isRequired
}
