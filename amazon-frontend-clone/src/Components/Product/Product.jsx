import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"
import classes from "./product.module.css";
import Loder from "../Loder/Loder";
const Product = () => {
    const[product,setproduct]=useState([])
    const [isLoding, setisLoding] = useState(false);
    useEffect(()=>{
      setisLoding(true)
      axios.get("https://fakestores.onrender.com/api/products")
        .then((res) => {
          setproduct(res.data);
          setisLoding(false)
        })
        .catch((error) => {
          console.log(error);
          setisLoding(false);
        });
    },[])
  return (
    <>{
      isLoding ? <Loder />:(

      <section className={classes.products__container}>
        {product.map((singleProduct, i) => {
          return <ProductCard product={singleProduct} key={i} />;
        })}
      </section>
      ) }
    </>
  );
}

export default Product
