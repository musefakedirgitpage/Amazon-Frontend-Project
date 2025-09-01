import { DataContext } from '../../Components/DataProvider/Dataprovider'
import classes from "./Cart.module.css"
import LayOut from '../../Components/LayOut/LayOut'
import{useContext} from 'react'
import ProductCard from '../../Components/Product/ProductCard'
import CurrencyFormater from '../../Components/CurencyFormater/CurrencyFormater'
import { Link } from 'react-router-dom'
import { Type } from '../../Utility/action.type'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


const Cart = () => {
  const [{basket,user},dispatch]=useContext(DataContext)
  const total=basket.reduce((amount,item)=>{
    return item.price * item.amount+amount
  },0)
  const increament=(item)=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item
    })
  }
  const decreament = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    });
  };
  return (
    <LayOut>
     <section className={classes.container}>
      <div className={classes.cart__container}>
        <h2>Hello</h2>
        <h3>Your shopping basket</h3>
        <hr />
        {
          basket?.length===0?(<p>Opps ! No item in your Cart</p>):(basket?.map((item,i)=>{
            return (
              <section className={classes.cart__product}>
                <ProductCard
                  key={i}
                  product={item}
                  renderDescription={true}
                  flex={true}
                  renderAdd={false}
                />
                <div className={classes.btn__container}>
                  <button
                    className={classes.btn}
                    onClick={() => increament(item)}
                  >
                    <IoIosArrowUp size={20} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decreament(item.id)}
                  >
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
              </section>
            );
           
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
