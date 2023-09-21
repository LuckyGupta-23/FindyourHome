import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { BsFillEyeFill } from "react-icons/bs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("signup successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <form onSubmit={onSubmitHandler}>
        <div className="Signup">
          <h2>Sign Up</h2>
          <br />
          <label htmlFor="name">
            <b>
              <h3> Name</h3>
            </b>
          </label>
          <br />
          <input
            type="name"
            className="inputUp"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Enter Your Name"
          />
          <br />
          <label htmlFor="email">
            <b>
              <h3>Email Address</h3>
            </b>
          </label>
          <br />
          <input
            type="text"
            className="inputUp"
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
            className="inputUp"
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
          <br />
          <button type="submit">Sign Up</button>
          <div>
            <span>Already have an account?</span>
            <Link to="/SignIn">Login</Link>
            <h4>Google</h4>
            
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default SignUp;
