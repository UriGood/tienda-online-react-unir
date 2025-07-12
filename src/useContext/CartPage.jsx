import { Contador } from "../components/Contador";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../useContext/context/CartContext";
export const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [dataCart, setDataCart] = useState([]);
  // const [contadorValue, setContadorValue] = useState(1);
  console.log(dataCart);
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const productPromises = cart.map((item) =>
          fetch(`https://dummyjson.com/products/${item.id}`)
            .then((resp) => resp.json())
            .then((data) => ({ ...data, cantidad: item.count }))
        );

        const fetchedData = await Promise.all(productPromises);

        const uniqueData = Array.from(
          new Map(fetchedData.map((item) => [item.id, item])).values()
        );

        setDataCart(uniqueData);
      } catch (error) {
        console.error(error);
      }
    };

    if (cart.length > 0) {
      fetchCartData();
    } else {
      setDataCart([]); // limpiar si el carrito está vacío
    }
  }, [cart]);

  const updateCart = (id, value) => {
    console.log("id", id);
    console.log("valueid", value);
    setCart((prevDataCart) =>
      prevDataCart.map((p) => {
        if (p.id == id) {
          return { ...p, count: value };
        } else {
          return p;
        }
      })
    );
  };

  const consultarCartGlobal = () => {
    console.log(cart);
  };

  return (
    <>
      <div className="cart-container">
        <div className="section">
          <div>
            Productos
            <hr />
          </div>
          <div className="details-of-the-products">
            {dataCart.map((product) => (
              <div className="row" key={product.id}>
                <div className="col">
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <div className="col">
                  <h4>{product.title}</h4>
                  <small>{product.description}</small>
                </div>
                <div className="col col-button">
                  <Contador
                    value={product.cantidad}
                    onChange={(value) => updateCart(product.id, value)}
                  />
                </div>
                <div className="col">
                  <button onClick={consultarCartGlobal}>cart global</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div>
            Resumen de la compra
            <hr />
          </div>
          <div className="details-of-the-total">
            <div className="row">
              <p>Producto</p>
              <p>$10.00</p>
            </div>

            <div className="row">
              <p>Envío</p>
              <p>Gratis</p>
            </div>

            <p>ingresar código de cupón</p>

            <div className="row">
              <p>Total</p>
              <p>$ 150.00</p>
            </div>
          </div>
          <button>Continuar con la compra</button>
        </div>
      </div>
    </>
  );
};
