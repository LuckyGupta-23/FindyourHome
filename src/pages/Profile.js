import React, { useState,useEffect } from "react";
import Layout from "../components/Layout";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import Items from "../components/Items";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState(null);

    //useeffect for getting data

    useEffect(() => {
      const fetchUserListings = async () => {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("useRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc")
        );
        const querySnap = await getDocs(q);
        console.log(querySnap);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(listings);
        setListings(listings);
        
      };
      fetchUserListings();
    }, [auth.currentUser.uid]);
    
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const logoutHandler = () => {
    auth.signOut();
    toast.success("Successfully Loggedout");
    navigate("/");
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
        toast("user updated!!");
      }
    } catch (error) {
      console.log(error);
      toast("Something Went Wrong");
    }
  };

  //delete handler

  const onDelete = async (listingId) => {
    if (window.confirm("Are You Sure ! want to delete ?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Listing Deleted Successfully");
    }
  };

  return (
    <Layout>
      <form>
        <h4 className="profile-detail">Profile Details</h4>

        <div className="card-header">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            <label htmlFor="name">
              <b>
                <h3>Name</h3>
              </b>
            </label>
            <br />
            <input
              type="name"
              className="inputIn"
              id="password"
              value={name}
              onChange={onChange}
              placeholder="Enter Name"
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
              className="inputIn"
              id="email"
              value={email}
              onChange={onChange}
              disabled={!changeDetails}
              placeholder="Enter Email"
            />
            <br />
          </span>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </form>
      <div>
        <Link to="/CreateListing">Sale or Rent your home</Link>
      </div>
      <div className="container">
        {listings && listings?.length > 0 &&(
          <>
          <h6>your Listings</h6>
          <div>
            {listings.map(listing => (
              < Items key={listing.id}
              listing={listing.data}
              id={listing.id}
              onDelete={()=>onDelete(listing.id)}
              />
            ))}
          </div>
          </>

        )}
      </div>
    </Layout>
  );
};

export default Profile;
