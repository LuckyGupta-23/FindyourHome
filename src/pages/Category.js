import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import Items from "../components/Items";

const Category = () => {
  const [listing, setListing] = useState("");
  const [lastFetchListing,setLastFetchListing]=useState(null);
  const params = useParams();

  //fetch listing

  useEffect(() => {
    const fetchListing = async () => {
      try {
        //refrence
        const listingsRef = collection(db, "listings");
        //query
        const q = query(
          listingsRef,
          where("type", "==", params.CategoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        //execute query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length-1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(listings);
      } catch (error) {
        console.log(error);
        toast.error("Unable to fatch data");
      }
    };
    //func call
    fetchListing();
  }, [params.CategoryName]);

  //loadmore pagination function

  const fetchLoadMoreLisitng = async () => {
    try {
      //refrence
      const listingsRef = collection(db, "listings");
      //query
      const q = query(
        listingsRef,
        where("type", "==", params.CategoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(10)
      );
      //execute query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length-1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing(prevState => [...prevState, ...listings]);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fatch data");
    }
  };
  return (
    <Layout>
      <h1>
        {params.CategoryName === "rent" ? "Places for rent" : "Places for sale"}
      </h1>
      {listing && listing.length > 0 ? (
        <>
          <div>
            {listing.map((list) => (
              <Items listing={list.data} id={list.id} key={list.id}/>
            ))}
          </div>
        </>
      ) : (
        <p>No listing for {params.CategoryName}</p>
      )}
      <div>
        {lastFetchListing && (
          <button className="load-more" onClick={fetchLoadMoreLisitng}>
            Load More
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Category;
