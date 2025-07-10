import PropTypes from "prop-types"

export const SearchProductItem = ({product}) => {
  return (
    <div className="searchProducts__card">
        <div>{product.title}</div>

    </div>

  )
}
 

SearchProductItem.propTypes = {
    product: PropTypes.object.isRequired,
}
 