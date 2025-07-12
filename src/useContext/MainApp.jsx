import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { CartPage } from "./CartPage";
// import { ProductDetailPage }  from "./ProductDetailPage"
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import SearchProducts from "./SearchProducts";
import { CartProvider } from "./context/CartProvider";
export const MainApp = () => {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="search-products" element={<SearchProducts />} />
            <Route path="returns" element={<SearchProducts />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};
