import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category/Category'
import Productdetails from './pages/Productdetails'
import Cart from './pages/Cart'
import Login from './pages/Login/Login'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import Checkout from './pages/Checkout'
import Pay from './pages/pay'
import Thankyoupage from './pages/Thankyoupage'
import OrderHistoryDetails from './pages/OrderHistoryDetails'
import OrderHistorytwo from './pages/OrderHistorytwo'
import Profile from './pages/profilepage/Profile'
import Contact from './pages/Contact'
import ModelPage from './pages/ModelPage'
import ModelARPage from './pages/ModelARPage'
const App = () => {
  return (
    <Routes>
       <Route path="/login" element={<Login />} />
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/category/:id/:name/:url" element={<Category/>} />
      <Route path="/productdetails/:id" element={<Productdetails/>} />
      <Route path="/3dmodel" element={<ModelPage />} />
      <Route path="/ar-view" element={<ModelARPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist/>} />
      <Route path="/about" element={<About />} />
      <Route path="/order-history-detail" element={<OrderHistoryDetails/>} />
      <Route path="/order-history" element={<OrderHistorytwo/>} />
         <Route path="/checkout/" element={<Checkout/>} />
         <Route path="/pay" element={<Pay />} />
         <Route path="/thankyoupage" element={<Thankyoupage/>} />
    </Routes>
    
  )
}

export default App