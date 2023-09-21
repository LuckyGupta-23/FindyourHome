import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./pages/Homepage";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";

import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Category from "./pages/Category";
import Items from "./components/Items";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Offers" element={<Offers />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Category/:CategoryName" element={<Category />} />
        <Route path="/Profile" element={<Profile />} /> 

        <Route path="/Profile" element={<PrivateRoute/>}/>
        
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Items" element={<Items />} />
        <Route path="/CreateListing" element={<CreateListing />} />
        <Route path="/Listing" element={<Listing />} />
        <Route path="/Contact/:landlordId" element={<Contact />} />
        <Route path="/EditListing" element={<EditListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
