import PropTypes from "prop-types";

export function ProductItem({ product }) {
  return (
    <>
      <div className="productItem">
        <div className="img-container">
          <img src={product.image} alt={product.title} />
        </div>
        <p>{product.title}</p>
        <p id="price">${product.price}</p>
        <p>Disponibles: <span id="count">{ product.rating.count }</span> </p>
        <button className="btn-add" href="">Agregar al carrito</button>
      </div>
    </>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    // id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.object,
  }).isRequired,
};
