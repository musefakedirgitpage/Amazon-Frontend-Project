import Rating from "@mui/material/Rating"
import CurrencyFormater from "../CurencyFormater/CurrencyFormater";
import classes from "./product.module.css"
const ProductCard = ({data}) => {
    const { imageURL, title, price, rating, ratingCount } = data;
  return (
    <div className={`${classes.card__container}`}>
      <a href="">
        <img src={imageURL} alt="" />
      </a>
      <div>
        <h3>{title}</h3>
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
}

export default ProductCard
