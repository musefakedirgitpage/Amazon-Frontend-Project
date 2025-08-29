import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { productUrl } from "../../Api/endPoint";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Result.module.css"
import LayOut from "../../Components/LayOut/LayOut";
import Loder from "../../Components/Loder/Loder";
const Result = () => {
const {categoryName}=useParams()

const [results, setresults] = useState([]);
const [isLoding, setisLoding] = useState(false);
useEffect(() => {
   setisLoding(true);
  axios.get(`${productUrl}/api/products/category/${categoryName}`)
    .then((res) => {
     
      setresults(res.data);
       setisLoding(false);
    })
    .catch((err) => {
      console.log(err);
       setisLoding(false);
    });
}, [categoryName]);
  return (
    <LayOut>
      {isLoding ? (
        <Loder />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Result</h1>
          <p style={{ padding: "30px" }}>/category/{categoryName}</p>
          <hr />
          <div className={classes.products__container}>
            {results.map((product, i) => {
              return <ProductCard key={i} product={product} />;
            })}
          </div>
        </section>
      )}
    </LayOut>
  );
}

export default Result
