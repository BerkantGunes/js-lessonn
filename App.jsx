import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import InvoicePage from "./pages/InvoicePage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element= {<RouteControl>
          <HomePage />
        </RouteControl>} />
        <Route path="/cart" element= {<RouteControl>
          <CartPage />
        </RouteControl>} />
        <Route path="/invoices" element = {<RouteControl>
          <InvoicePage />
        </RouteControl>} />
        <Route path="/customers" element = {<RouteControl>
          <CustomerPage />
        </RouteControl>} />
        <Route path="/statistic" element = {<RouteControl>
          <StatisticPage />
        </RouteControl>} />
        <Route path="/products" element = {<RouteControl>
          <ProductPage />
        </RouteControl>} />
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


export const RouteControl = ({children}) => {
  if(localStorage.getItem("posUser")) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}