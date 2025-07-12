import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { CartPage } from "./CartPage";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import SearchProducts from "./SearchProducts";
import { CartProvider } from "./context/CartProvider";
import { Orders } from "./Orders";
import { OrdersProvider } from "./context/OrdersProvider";
import { Returns } from "./Returns";
import "@fontsource/nunito";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
export const MainApp = () => {
  return (
    <CartProvider>
      <OrdersProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="search-products" element={<SearchProducts />} />
            <Route path="pucharses" element={<Orders />} />
            <Route path="returns" element={<Returns />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </OrdersProvider>
    </CartProvider>
  );
};
