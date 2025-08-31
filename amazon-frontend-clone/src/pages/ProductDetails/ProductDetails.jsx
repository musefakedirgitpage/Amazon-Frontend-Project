
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../Api/endPoint'
import ProductCard from '../../Components/Product/ProductCard'
import LayOut from '../../Components/LayOut/LayOut'
import Loder from '../../Components/Loder/Loder'
const ProductDetails = () => {
const {productId}=useParams()
const[product,setproduct]=useState({})
 const [isLoding, setisLoding] = useState(false);
useEffect(() => {
  setisLoding(true)
  axios
    .get(`${productUrl}/api/products/${productId}`)
    .then((res) => {
      setproduct(res.data);
      setisLoding(false)
    })
    .catch((err) => {
      console.log(err);
      setisLoding(false);
    });
}, [productId]);
  return (
    <LayOut>
      {isLoding ? (
        <Loder />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDescription={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetails
