// import { useContext, useEffect, useState } from "react";
import {useContext, useEffect, useState } from "react";
import "../styles/pages/Orders.css";
import { OrdersContext } from "./context/OrdersContext";
export const Orders = () => {
  const [purchases, setPurchases] = useState([]);
  const {orders, setOrders } = useContext(OrdersContext);
  const [ misCompras, setmisCompras ] = useState([]);
  // const [day] = useState(['10-07-2025','9-07-2025','05-07-2025','28-06-2025','25-06-2025']);
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        // const productPromises = orders.filter(p => !p.devuelto).map((item) =>
        //   fetch(`https://dummyjson.com/products/${item.id}`).then((res) =>
        //     res.json()
        //   )
        // );
        const productPromises = misCompras.map((item) =>
          fetch(`http://localhost:8080/items/${item.productoId}`).then((res) =>
            res.json()
            .then((product) => ({
              ...product,         // datos del producto (title, description, etc.)
              fechaCompra: item.fecha, // le añades la fecha de la compra
              cantidad: item.cantidad  // incluso puedes añadir la cantidad
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
  }, [misCompras]);

  useEffect(()=>{
    console.log("Pedir compras");
    
    const pedirCompras = async () => {
      try{
        const resp = await fetch('http://localhost:8080/compras');
        if(!resp.ok) throw Error('Error al obtener las compras');
        const data = await resp.json();
        setmisCompras(data);
      } catch(error){
        console.log("Error al obtener las compras: " + error);
      }
    }
    pedirCompras();
  },[])

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
      { (purchases.length == 0 ) && <div> Aún no has comprado ningún producto </div> }
      {[...purchases]
      .sort((a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra))
      .map((product, index) => (
        <div className="ordersContainer__card" key={`${product.id}-${index}`}>
          <div className="ordersContainer__row--date">
            <div className="ordersContainer__col--date">{product.fechaCompra.split('T')[0]}</div>
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
                Solicitar devolución
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
