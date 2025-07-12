import { useContext, useEffect, useState } from "react";
import "../styles/pages/Orders.css";
import { OrdersContext } from "./context/OrdersContext";
export const Orders = () => {
  const [purchases, setPurchases] = useState([]);
  const { orders, setOrders } = useContext(OrdersContext);
  const [day] = useState(['10-07-2025','9-07-2025','05-07-2025','28-06-2025','25-06-2025']);
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const productPromises = orders.filter(p => !p.devuelto).map((item) =>
          fetch(`https://dummyjson.com/products/${item.id}`).then((res) =>
            res.json()
          )
        );

        const results = await Promise.all(productPromises);
        setPurchases(results);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      }
    };

    fetchPurchases();
  }, [orders]);

  const requestReturn = (id) => {
    if (confirm("¿Quieres solicitar la devolución del producto?")) {
      setOrders(orders.map((pd) => {
        if (pd.id == id) {
          return { ...pd, devuelto: true };
        }else{
            return pd
        }
      }))
    }
  };
  
  return (
    <div className="ordersContainer">
      {purchases.map((product, index) => (
        <div className="ordersContainer__card" key={product.id}>
          <div className="ordersContainer__row--date">
            <div className="ordersContainer__col--date">{day[index]}</div>
            <hr />
          </div>
          <div className="ordersContainer__row">
            <div className="ordersContainer__image">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="ordersContainer__col">
              <small>Entregado</small>
              <b>{product.title}</b>
              <p>{product.description}</p>
            </div>
            <div className="ordersContainer__col--message">
              Enviar mensaje <br />
              al vendedor
            </div>
            <div className="ordersContainer__col ordersContainer__col--dev">
              <button>Volver a comprar</button>
              <button onClick={() => requestReturn(product.id)}>
                Solicitar devolucion
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
