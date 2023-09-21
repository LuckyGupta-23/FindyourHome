import React,{useState} from 'react'
import Layout from '../components/Layout'
import {Link,useNavigate} from 'react-router-dom';
import { getAuth,sendPasswordResetEmail,setPasswordResetEmail } from 'firebase/auth'; 
import {toast} from "react-toastify";

const ForgotPassword = () => {
  const [email,setEmail] = useState('');
  const navigate = useNavigate()
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const auth = getAuth();
      await sendPasswordResetEmail(auth,email);
      toast.success("Email was sent");
      navigate("/SignIn");
    }
      catch(error){
        toast.error("Something went wrong");
      }
    };
  
  return (
    <Layout>
      <h2>Reset Your Password</h2>
      <form onSubmit={onSubmitHandler}>
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <Link to="/SignIn">Signin</Link>
          <button type="submit">Reset</button>
          </form>
    </Layout>
    
  )
}

export default ForgotPassword
