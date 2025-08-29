
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../Api/endPoint'
import ProductCard from '../../Components/Product/ProductCard'
import LayOut from '../../Components/LayOut/LayOut'
const ProductDetails = () => {
const {productId}=useParams()
const[product,setproduct]=useState({})
useEffect(() => {
  axios
    .get(`${productUrl}/api/products/${productId}`)
    .then((res) => {
      setproduct(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [productId]);
  return (
  <LayOut>
    <ProductCard product={product}/>
  </LayOut>)
}

export default ProductDetails
