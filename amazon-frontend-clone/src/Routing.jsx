import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Landing from "./pages/Landing/Landing"
import Payment from "./pages/Payment/Payment"
import Order from "./pages/Order/Order"
import Cart from "./pages/Cart/Cart"
import Result from "./pages/Result/Result"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import {Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51S45x5K4qGcy61hYdHgCluBTGFnCUNB4nPH0IlKIVh40ZjDlfhzk35CbH8M7sHpcVsVxZCfaKM66VJb3oNyqFcVt00xQIxFr9V"
);

import Auth from "./pages/Auth/Auth"
import ProtectedRout from "./Components/ProtectedRoute/ProtectedRout"

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <ProtectedRout msg={"you must log in to pay"} redirect={"/payment"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRout>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRout
              msg={"you must log in to accsses your orders"}
              redirect={"/orders"}
            >
              <Order />
            </ProtectedRout>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default Routing
