import { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firbas";
import { DataContext } from "../../Components/DataProvider/Dataprovider";
import classes from "./Order.module.css";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import ProductCard from "../../Components/Product/ProductCard"

const Order = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
   if (user) {
     const ordersRef = collection(
       doc(collection(db, "users"), user.uid),
       "orders"
     );
     const q = query(ordersRef, orderBy("created", "desc"));

     onSnapshot(q, (snapshot) => {
       setOrders(
         snapshot.docs.map((doc, i) => ({
           key: doc.id, // ✅ use unique Firestore ID as React key
           id: doc.id,
           data: doc.data(),
         }))
       );
     });
   } else {
     setOrders([]);
   }
  }, []);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order__container}>
          <h2>Your orders</h2>
          {orders?.length==0&& <p style={{padding:"10px"}}>You don't have an order yet!</p>

          }
          <div>
            {orders?.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order Id: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard flex={true} product={order} key={order.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Order;
