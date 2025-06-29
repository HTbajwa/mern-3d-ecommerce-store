import React from 'react'
import Sidebar from './Sidebar'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Userlist from './pages/User/Listuser/Userlist';
import Edituser from './pages/User/Edituser/Edituser'
import Addagent from './pages/User/Addagent';
import Cartlist from './pages/cart/Listcart/Cartlist';
import Categorylist from './pages/Category/Listcategory/Categorylist';
import EditCategory from './pages/Category/Editcategory/EditCategory';
import Addcategory from './pages/Category/Addcategory/Addcategory';
import Orderlist from './pages/Order/Listorder/Orderlist';
import Editorder from './pages/Order/Editorder/Editorder';
import Productlist from './pages/Product/Listproduct/Productlist';
import EditProduct from './pages/Product/Editproduct/EditProduct';
import Addproduct from './pages/Product/Addproduct/Addproduct';
import Attributelist from './pages/Attributes/Addattributes/Addattribute';
import Editattribute from './pages/Attributes/Editattributes/Editattribute';
import Addattribute from './pages/Attributes/Addattributes/Addattribute';
import AddVariant from './pages/Variant/AddVariant/AddVariant';
import EditVariant from './pages/Variant/EditVariant/EditVariant';
import Bannerlist from './pages/Banner/Listbanner/Bannerlist';
import Editbanner from './pages/Banner/Editbanner/Editbanner';
import Addbanner from './pages/Banner/Addbanner/Addbanner';
import Webinfo from './pages/Website_info/webinfo/Webinfo';
import Contactlist from './pages/Website_info/Listcontact/Contactlist';
import Addprofile from "./pages/Profile/Addprofile";
import Editprofile from "./pages/Profile/Editprofile";
import Profiledetail from "./pages/Profile/Profiledetail";

const App = () => {
  return (
    <div>
<Router>
<Sidebar>
    <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
    <Route path="/userlist/:id" element={<Userlist />} />
    <Route path="/edituser/:id" element={<Edituser />} />
    <Route path='/addremittance' element={<Addagent />} />
    <Route path="/cartlist/:id" element={<Cartlist />} />
    <Route path="/categorylist/:id" element={<Categorylist />} />
    <Route path="/editcategory/:id" element={<EditCategory />} />
    <Route path="/addcategory" element={<Addcategory />} />
    <Route path="/orderlist/:id" element={<Orderlist />} />
    <Route path="/editorder/:id" element={<Editorder />} />
    <Route path="/productlist/:id" element={<Productlist />} />
    <Route path="/editproduct/:id" element={<EditProduct />} />
    <Route path="/addproduct" element={<Addproduct />} />
    <Route path="/addattribute" element={<Addattribute />} />
    <Route path="/editattribute/:id" element={<Editattribute />} />
    <Route path="/attributelist/:id" element={<Attributelist />} />
    <Route path="/addvariant/:id" element={<AddVariant />} />
    <Route path="/editvariant/:id" element={<EditVariant />} />
    <Route path="/bannerlist/:id" element={<Bannerlist />} />
    <Route path="/editbanner/:id" element={<Editbanner />} />
    <Route path="/addbanner" element={<Addbanner />} />
    <Route path="/webinfo" element={<Webinfo/>} />
    <Route path="/contactlist/:id" element={<Contactlist />} />
    <Route path="/addprofile" element={<Addprofile/>} />
          <Route path="/profiledetail" element={<Profiledetail/>} />
          <Route path="/editprofile" element={<Editprofile/>} />
    </Routes>
    </Sidebar>
   </Router>
    </div>
   
  )
}

export default App