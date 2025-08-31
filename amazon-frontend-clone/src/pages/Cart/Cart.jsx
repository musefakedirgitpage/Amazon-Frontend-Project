import { DataContext } from '../../Components/DataProvider/Dataprovider'
import classes from "./Cart.module.css"
import LayOut from '../../Components/LayOut/LayOut'
import{useContext} from 'react'
import ProductCard from '../../Components/Product/ProductCard'
import CurrencyFormater from '../../Components/CurencyFormater/CurrencyFormater'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [{basket,user},dispatch]=useContext(DataContext)
  const total=basket.reduce((amount,item)=>{
    return item.price+amount
  },0)
  return (
    <LayOut>
     <section className={classes.container}>
      <div className={classes.cart__container}>
        <h2>Hello</h2>
        <h3>Your shopping basket</h3>
        <hr />
        {
          basket?.length===0?(<p>Opps ! No item in your Cart</p>):(basket?.map((item,i)=>{
            return <ProductCard key={i}
            product={item}
            renderDescription={true}
            flex={true}
            renderAdd={false}
            />
          }))
        }
      </div>
      {
        basket?.length!==0&&(
           <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} item)</p>
              <CurrencyFormater amount={total}/>
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to='/payment'>Continue to checkout</Link>
           </div>
        )
      }
     
     </section>
    </LayOut>
  )
}

export default Cart
