
export const CartPage = () => {
  return (
    <>
        
        <div className="cart-container">
          <div className="section">
            <div>
              Productos
              <hr />
            </div>
            <div className="details-of-the-products">
              <div className="row">
                <div className="col">
                  <img src="https://http2.mlstatic.com/dell-xps-2-en-1-touch-9315-i7-12va-16gb-ram-1tb-ssd-13-fhd--S_2X_820265-MLM84626130648_052025-Y.jpg" alt="" />
                </div>
                <div className="col">
                  title
                </div>
                <div className="col">
                  contador
                </div>
                <div className="col">
                  total
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <img src="https://http2.mlstatic.com/dell-xps-2-en-1-touch-9315-i7-12va-16gb-ram-1tb-ssd-13-fhd--S_2X_820265-MLM84626130648_052025-Y.jpg" alt="" />
                </div>
                <div className="col">
                  title
                </div>
                <div className="col">
                  contador
                </div>
                <div className="col">
                  total
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <img src="https://http2.mlstatic.com/dell-xps-2-en-1-touch-9315-i7-12va-16gb-ram-1tb-ssd-13-fhd--S_2X_820265-MLM84626130648_052025-Y.jpg" alt="" />
                </div>
                <div className="col">
                  title
                </div>
                <div className="col">
                  contador
                </div>
                <div className="col">
                  total
                </div>
              </div>
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
  )
}
