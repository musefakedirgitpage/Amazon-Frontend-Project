import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Landing from "./pages/Landing/Landing"
import Payment from "./pages/Payment/Payment"
import Order from "./pages/Order/Order"
import Cart from "./pages/Cart/Cart"
import Result from "./pages/Result/Result"
import ProductDetails from "./pages/ProductDetails/ProductDetails"

import Auth from "./pages/Auth/Auth"

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default Routing
