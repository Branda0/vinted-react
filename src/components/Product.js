import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Link className="product-container" to={`/offer/${product._id}`}>
      <div className="product-owner">
        <img className="user-photo" alt="user" src={product.owner.account.avatar?.secure_url} />
        <span className="user-name"> {product.owner.account.username}</span>
      </div>
      <div className="product-image-container">
        <img className="product-image" alt="product" src={product.product_image.secure_url} />
      </div>
      <div className="product-details">
        <span className="product-price">{product.product_price} €</span>
        <span className="product-size">{Object.values(product.product_details[1])[0]}</span>
        <span className="product-brand">{Object.values(product.product_details[0])[0]}</span>
      </div>
    </Link>
  );
};

export default Product;
