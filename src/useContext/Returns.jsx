// import { useContext, useEffect, useState } from "react";
import { useEffect, useState } from "react";
import "../styles/pages/Returns.css";
// import { OrdersContext } from "./context/OrdersContext";
export const Returns = () => {
  const [purchases, setPurchases] = useState([]);
  const [misDevoluciones, setmisDevoluciones] = useState([]);
  // const { orders } = useContext(OrdersContext);
  const [day] = useState(['10-07-2025','09-07-2025','05-07-2025','28-06-2025','25-06-2025']);
 

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
            const devoluciones = await fetch(`http://localhost:8080/compras/devueltas`);
            if(!devoluciones.ok) throw Error("Error al obtener las devoluciones");
            const results = await devoluciones.json();
            console.log(results);
            
        setmisDevoluciones(results);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      }
    };

    fetchPurchases();
  }, []);

    useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const productPromises = misDevoluciones.map((item) =>
          fetch(`http://localhost:8080/items/${item.productoId}`).then((res) =>
            res.json().then((product) => ({
              ...product, // datos del producto (title, description, etc.)
              fechaCompra: item.fecha, // le añades la fecha de la compra
              cantidad: item.cantidad, // incluso puedes añadir la cantidad
              compraId: item.id,
            }))
          )
        );

        const results = await Promise.all(productPromises);
        setPurchases(results);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      }
    };

    fetchPurchases();
  }, [misDevoluciones]);

  

 
  return (
    <div className="returnsContainer">
      {purchases.length == 0 ? (
        <div className="returnsContainer__card">
          <div>No se han solicitado devoluciones </div>
        </div>
      ) : (
        purchases.map((product,index) => (
          <div className="returnsContainer__card" key={product.id + index}>
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
                <small>En proceso de devolución</small>
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
