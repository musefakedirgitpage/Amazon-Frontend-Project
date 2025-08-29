import Rating from "@mui/material/Rating"
import CurrencyFormater from "../CurencyFormater/CurrencyFormater";
import classes from "./product.module.css"
import { Link } from "react-router-dom";
const ProductCard = ({ product, flex, renderDescription }) => {
  const { imageURL, id, title, price, rating, ratingCount, description } =
    product;
  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={imageURL} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDescription && <div style={{maxWidth:"750px"}}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating} precision={0.1} readOnly />
          <small>{ratingCount}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormater amount={price} />
        </div>
        <button className={classes.button}>add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard
