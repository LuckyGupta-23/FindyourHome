import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import image1 from "../images/Background.jpg";
const Homepage = () => {
  const navigate= useNavigate();
  return (
    <Layout>
      <div>
        <img src={image1} alt="" className="header_image"/>
        <p className="home-text">SELL OR RENT YOUR PROPERTY ON FINDyourHOME !</p>
        <button className="rent-button" onClick={()=>navigate('/Category/rent')}><h2>To Rent</h2></button>
        <button className="sale-button" onClick={()=>navigate('/Category/sale')}><h2>To Sale</h2></button>
      </div>
    </Layout>
  );
};

export default Homepage;
