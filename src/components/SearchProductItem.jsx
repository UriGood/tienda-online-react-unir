import PropTypes from "prop-types"

export const SearchProductItem = ({product}) => {
  return (
    <div className="searchProducts__card">
        <div className="searchProducts__section">
          <img src={product.thumbnail} alt={product.title} className="searchProducts__imagen"/>
        </div>
        <div className="">
          <div>{product.title}</div>
          <div id="searchProducts__price">${ product.price }</div>
          <div id="searchProducts__description">{product.description}</div>
          <div id="searchProducts__stock">En stock: {product.stock}</div>
          <button id="searchProducts__button">Agregar al carrito</button>
        </div>
    </div>
  )
}
 

SearchProductItem.propTypes = {
    product: PropTypes.object.isRequired,
}
 