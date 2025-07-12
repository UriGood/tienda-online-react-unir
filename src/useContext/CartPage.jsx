import { Contador } from "../components/Contador";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../useContext/context/CartContext";
import '../styles/pages/CartPage.css'

export const CartPage = () => {

  const { cart, setCart } = useContext(CartContext);
  const [dataCart, setDataCart] = useState([]);
  const [total, setTotal] = useState(0)

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
      setDataCart([]); 
    }
    
  }, [cart ]);

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

  const deleteProduct = (id) => {
      setCart((prevDataCart) =>
        prevDataCart.filter((p) => {
          if (p.id !== id) {
            return p
          }
        })
      );
  }

  useEffect(() =>{
    let saveTotals = 0;
    dataCart.map((product) => {
      return saveTotals +=  product.cantidad * product.price;
    })
    setTotal(saveTotals.toFixed(2));
  },[dataCart])

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
                  <small>{product.description}</small><br/>
                  <p className="cart-container__deleteProduct" onClick={()=>deleteProduct(product.id)}>Borrar producto</p>
                </div>
                <div className="col col-button">
                  <Contador
                    value={product.cantidad}
                    onChange={(value) => updateCart(product.id, value)}
                  />
                </div>
                <div className="col cart-container__price">
                  <small className="cart-container___small">Precio Unitario: <br/>
                    <span className="cart-container___small--precio-unitario">${ product.price }</span>
                  </small>
                    <br/>
                  <small className="cart-container___small">Subtotal: <br/> 
                    <span className="cart-container___small--subtotal">${ (product.price * product.cantidad).toFixed(2) }</span>
                  </small>
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
              <p>$ {total}</p>
            </div>

            <div className="row">
              <p>Envío</p>
              <p>Gratis</p>
            </div>

            <p className="cart-container__a"> Ingresar código de cupón </p>

            <div className="row">
              <p>Total</p>
              <p>$ {total}</p>
            </div>
          </div>
          <button>Continuar con la compra</button>
          <button onClick={consultarCartGlobal}>cart global</button>

        </div>
      </div>
    </>
  );
};
