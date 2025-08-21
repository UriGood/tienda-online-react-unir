import { Contador } from "../components/Contador";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../useContext/context/CartContext";
import "../styles/pages/CartPage.css";

export const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [dataCart, setDataCart] = useState([]);
  const [total, setTotal] = useState(0);
  console.log("cart del cartcomtext: ", cart);
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const productPromises = cart.map((item) =>
          fetch(`http://localhost:8080/items/${item.id}`)
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
      setDataCart([]);
    }
  }, [cart]);

  const updateCart = (id, value) => {
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

  const deleteProduct = (id) => {
    if (confirm("¿Estás seguro de borrar el producto?")) {
      setCart((prevDataCart) =>
        prevDataCart.filter((p) => {
          if (p.id !== id) {
            return p;
          }
        })
      );
    }
  };

  const completePurchase = async (cart) => {
    try {
      const requests = cart.map((product) => {
        return fetch(`http://localhost:8080/compras`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productoId: product.id,
            cantidad: product.count,
          }),
        }).then((resp) => {
          if (!resp.ok) {
            throw new Error(
              "Error al conectar con el servidor, intentelo mas tarde" +
                resp.status
            );
          }
          return resp.json();
        });
      });
      const results = await Promise.all(requests);
      setCart([])
      console.log("Resultados:", results);
      alert("Compras realizadas con éxito ✅");
    } catch (error) {
      console.error("Error en alguna compra:", error);
      alert("Hubo un problema con las compras ❌");
    }
  };

  useEffect(() => {
    let saveTotals = 0;
    dataCart.map((product) => {
      return (saveTotals += product.cantidad * product.price);
    });
    setTotal(saveTotals.toFixed(2));
  }, [dataCart]);

  return (
    <>
      <div className="cart-container">
        <div className="cart-container__section">
          <div>
            Productos
            <hr />
          </div>
          <div className="details-of-the-products">
            {dataCart.map((product) => (
              <div
                className="cart-container__details-of-the-products--row"
                key={product.id}
              >
                <div className="cart-container__details-of-the-products--col">
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                <div className="cart-container__details-of-the-products--col">
                  <h4>{product.title}</h4>
                  <small>{product.description}</small>
                  <br />
                  <p
                    className="cart-container__deleteProduct"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Borrar producto
                  </p>
                </div>
                <div className="cart-container__details-of-the-products--col cart-container__col-button">
                  <Contador
                    value={product.cantidad}
                    onChange={(value) => updateCart(product.id, value)}
                  />
                </div>
                <div className="cart-container__details-of-the-products--col cart-container__price">
                  <small className="cart-container__small">
                    Precio Unitario: <br />
                    <span className="cart-container__small--precio-unitario">
                      ${product.price}
                    </span>
                  </small>
                  <br />
                  <small className="cart-container__small">
                    Subtotal: <br />
                    <span className="cart-container__small--subtotal">
                      ${(product.price * product.cantidad).toFixed(2)}
                    </span>
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-container__section">
          <div>
            Resumen de la compra
            <hr />
          </div>
          <div className="cart-container__details-of-the-total">
            <div className="cart-container__details-of-the-total--row">
              <p>Producto</p>
              <p>$ {total}</p>
            </div>

            <div className="cart-container__details-of-the-total--row">
              <p>Envío</p>
              <p>Gratis</p>
            </div>

            <p className="cart-container__a"> Ingresar código de cupón </p>

            <div className="cart-container__details-of-the-total--row">
              <p>Total</p>
              <p>$ {total}</p>
            </div>
          </div>
          <button
            disabled={cart.length > 0 ? false : true}
            onClick={() => completePurchase(cart)}
          >
            Continuar con la compra
          </button>
        </div>
      </div>
    </>
  );
};
