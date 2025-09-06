import Rating from "@mui/material/Rating";
import CurrencyFormater from "../CurencyFormater/CurrencyFormater";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/Dataprovider";
import { Type } from "../../Utility/reducer";
const ProductCard = ({ product, flex, renderDescription, renderAdd }) => {
  const { imageURL, id, title, price, rating, ratingCount, description } =
    product;
  const [state, dispatch] = useContext(DataContext);
  const addtocart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { imageURL, id, title, price, rating, ratingCount, description },
    });
  };
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
        {renderDescription && (
          <div style={{ maxWidth: "750px" }}>{description}</div>
        )}
        <div className={classes.rating}>
          <Rating value={rating} precision={0.1} readOnly />
          <small>{ratingCount}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormater amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addtocart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
