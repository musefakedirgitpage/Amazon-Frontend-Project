import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/Dataprovider";
import ProductCard from "../../Components/Product/ProductCard";
import { useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import CurrencyFormater from "../../Components/CurencyFormater/CurrencyFormater";
import { axiosInstance } from "../../Api/axios";
import { SpinnerCircular } from "spinners-react";
import { db } from "../../Utility/firbas";
import { collection, doc, setDoc } from "firebase/firestore";
import { Type } from "../../Utility/reducer";



const Payment = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const stripe = useStripe();
  const elements = useElements();
const navigate = useNavigate();
  const [cardErorr, setcardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const handleChange = (e) => {
    e?.error?.message ? setcardError(e?.error?.message) : setcardError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1. backendor function contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `payment/create?total=${total * 100} `,
      });
      // console.log(response.data);
      const clientSecret = response.data?.client_secret;
      // 2.client side or react side confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
     
      await setDoc(
        doc(
          collection(doc(collection(db, "users"), user.uid), "orders"),
          paymentIntent.id
        ),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );
      // empty basket
      dispatch({type: Type.EMPTY_BASKET})

      // console.log(paymentIntent);
      setProcessing(false);
      navigate("/orders", {state:{msg:"you have new order"}})
    } catch (error) {
      console.error("Payment error:", error);
    }
    setProcessing(false);

    // 3. after the confirmation -->order firebase database save, clear basket
  };
  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment__header}>
        {" "}
        checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Adress</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 react Lan</div>
            <div>chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map((item, i) => {
              return <ProductCard key={i} product={item} flex={true} />;
            })}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardErorr && (
                  <small style={{ color: "red" }}>{cardErorr}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "15px" }}>
                      <p>Total Order|</p>
                      <CurrencyFormater amount={total} />{" "}
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.lodder}>
                        <SpinnerCircular color="#000" size={20} />
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
