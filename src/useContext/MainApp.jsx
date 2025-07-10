import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage }  from "./HomePage"
import { CartPage }  from "./CartPage"
import { ProductDetailPage }  from "./ProductDetailPage"
import Header from "../components/Header"
import Footer from "../components/Footer"
export const MainApp = () => {
  return (
    <>
        <Header/>
        
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="cart" element={<CartPage/>}/>
          <Route path="product-detail" element={<ProductDetailPage/>}/>
          <Route path="/*" element={<Navigate to="/"/>}/>
        </Routes>
        <Footer/>
    </>
  )
}
