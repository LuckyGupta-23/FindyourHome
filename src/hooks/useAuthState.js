
import {useState,useEffect} from 'react'
import { getAuth,onAuthStateChanged } from 'firebase/auth'



const useAuthState = () => {
    const [loggedIn,setLoggedIn] = useState(true);
   
    useEffect(() => {
        const auth= getAuth();
        onAuthStateChanged(auth,(user)=>{
            if(user){
            setLoggedIn(false);
            }
        });
    });
  return {loggedIn};
};

export default useAuthState
