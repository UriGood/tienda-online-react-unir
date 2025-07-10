import PropTypes from "prop-types";

export function ProductItem({ product }) {
  return (
    <>
      <div className="productItem">
        <div className="img-container">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="info-container-item">
          <p>{product.title}</p>
          <p id="price">${product.price}</p>
          <p>Disponibles: <span id="count">{ product.rating }</span> </p>
          <button className="btn-add" href="">Agregar al carrito</button>
        </div>
      </div>
    </>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    // id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};
