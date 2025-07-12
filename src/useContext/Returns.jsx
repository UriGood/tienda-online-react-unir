import { useContext, useEffect, useState } from "react";
import "../styles/pages/Returns.css";
import { OrdersContext } from "./context/OrdersContext";
export const Returns = () => {
  const [purchases, setPurchases] = useState([]);
  const { orders } = useContext(OrdersContext);
  const [day] = useState(['10-07-2025','09-07-2025','05-07-2025','28-06-2025','25-06-2025']);
 

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const productPromises = orders
          .filter((p) => p.devuelto == true)
          .map((item) =>
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

 
  return (
    <div className="returnsContainer">
      {purchases.length == 0 ? (
        <div className="returnsContainer__card">
          <div>No se han solicitado devoluciones </div>
        </div>
      ) : (
        purchases.map((product,index) => (
          <div className="returnsContainer__card" key={product.id}>
            <div className="returnsContainer__row--date">
              <div className="returnsContainer__col--date">
                {day[index]}
              </div>
              <hr />
            </div>
            <div className="returnsContainer__row">
              <div className="returnsContainer__image">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <div className="returnsContainer__col">
                <small>En proceso de devolucion</small>
                <b>{product.title}</b>
                <p>{product.description}</p>
              </div>
              <div className="returnsContainer__col--message">
                Enviar mensaje <br />
                al vendedor
              </div>
              <div className="returnsContainer__col ordersContainer__col--dev">
                <button>Gestionar devolución</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
