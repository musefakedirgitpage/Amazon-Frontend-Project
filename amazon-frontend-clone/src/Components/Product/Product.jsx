import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"
import classes from "./product.module.css";
const Product = () => {
    const[product,setproduct]=useState([])
    useEffect(()=>{
      axios.get("https://fakestores.onrender.com/api/products")
        .then((res) => {
          setproduct(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },[])
  return (
   <section className={classes.products__container}>
    {
        product.map((singleProduct, i)=>{
        return <ProductCard data = {singleProduct} 
        key={i}/>;
        })
    }
   </section>
  )
}

export default Product
