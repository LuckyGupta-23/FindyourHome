import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { BsFillEyeFill } from "react-icons/bs";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";



const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {  email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        toast.success("logedIn");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("invalid email and password");
    }
  };
  return (
    <Layout>
      <form onSubmit={loginHandler}>
        <div className="Signin">
          <h1>Sign In</h1>
          <br />
          <label htmlFor="email">
            <b>
              <h3>Email Address</h3>
            </b>
          </label>
          <br />
          <input
            type="text"
            className="inputIn"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="Enter Email"
          />
          <br />
          <label htmlFor="psw">
            <b>
              <h3>Password</h3>
            </b>
          </label>
          <br />
          <input
            type={showPassword ? "text" : "password"}
            className="inputIn"
            id="password"
            value={password}
            onChange={onChange}
            placeholder="Enter Password"
          />
          <br />
          <span>
            show Password{" "}
            <BsFillEyeFill
              className="icon"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
            />
          </span>
          <Link to="/ForgotPassword">ForgotPassword</Link>
          <br />
         
          <button type="submit">Sign In</button>
          <div>
            <span>New User?</span>
            <Link to="/SignUp">SignUp</Link>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default SignIn;
