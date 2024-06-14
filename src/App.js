import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import Home from "./Pages/home/Home";
import SignIn from "./Pages/signin";
import SignUp from "./Pages/signup";
import Profile from "./Pages/profile";
import Header from "./components/header";
import OTPVerification from "./Pages/OTP";
import Property from "./components/properties/property";
import Flat from "./components/properties/flat";
import Homes from "./components/properties/homes1";
import Luxury from "./components/properties/luxury1";

import AddProperty from "./components/admin/addproperties";
import UserList from "./components/admin/fetchuser";
import Viewproperty from "./components/admin/viewproperties";
import Adminedit from "./components/admin/editproperty";
import Adminhome from "./components/admin/adminhome";
import Adminlogin from "./components/admin/adminlogin";
import ViewDetails from "./components/properties/viewdetails";
import SinglePage from "./components/admin/singlepage";
import Search from "./components/search";
import Payment from "./Pages/payment/payment";
import Privateroute from "./components/privateroute";
import Order from "./components/order/order";
import Adminorder from "./components/admin/adminorder";
import Categories from "./components/admin/categories";
import Contact from "./components/contact/contact";
import Footer from "./components/footer/footer";
import About from "./Pages/about";

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      <ToastContainer />
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/properties" element={<Property />} />
        <Route path="/flat" element={<Flat />} />
        <Route path="/homes" element={<Homes />} />
        <Route path="/luxury" element={<Luxury />} />
        <Route element={<Privateroute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        
        <Route path="/viewdetails/:id" element={<ViewDetails />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/search" element={<Search />} />
        <Route path="/order-details/:id" element={<Order />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/admin/home" element={<Adminhome />} />
        <Route path="/admin/properties" element={<AddProperty />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/viewproperty" element={<Viewproperty />} />
        <Route path="/admin/edit/:_id" element={<Adminedit />} />
        <Route path="/admin/singlepage/:id" element={<SinglePage />} />
        <Route path="/admin/adminorder" element={<Adminorder />} />
        <Route path="/admin/categories" element={<Categories />} />
      </Routes>
      {isAdminRoute ? null : <Footer/>}
    </div>
  );
}

export default App;
