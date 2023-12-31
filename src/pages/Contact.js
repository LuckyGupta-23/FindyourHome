import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
import Layout from '../components/Layout'

const Contact = () => {
    const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Unble to fatch data");
      }
    };
    getLandlord();
}, [params.landlordId]);


  return (
    <Layout>
      <div className=" container">
        <h3>Contact Details</h3>
        <div>
          {landlord !== "" && (
            <main>
              <h3>Name : {landlord?.name}</h3>

              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  value={message}
                  id="message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <label htmlFor="floatingTextarea"> your message</label>
              </div>
              <a
                href={`mailto:${landlord.email}?Subject=${searchParams.get(
                  "listingName"
                )}&body=${message}`}
              >
                <button className="contact-button">Send Message</button>
              </a>
            </main>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Contact
