import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import React from "react";
import reducer from "../reducer/productReducer";

const appContext = createContext();

// const API = "https://api.pujakaitem.com/api/products";
const API = "http://localhost:3005/api/data/products/all";

const initialState = {
  isLoading: "false",
  isError: "false",
  products: [],
  featuredProd: [],
  isSingleLoading: false,
  singleProd: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading,setIsLoading] = useState(true)

  const [user, setUser] = useState("");
  const [ _id1, setId] = useState("")
  const [admin,setAdmin] = useState(false);


  const storeToken = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const isAuthenticated = `Bearer ${token}`;
  console.log(isAuthenticated); // to authenticate user

  const isLoggedIn = !!token;
  console.log("login status",isLoggedIn);

  const clearTokenAndUser = () => {
    setToken(""); // Clear token from state
    localStorage.removeItem("token"); // Clear token from localStorage
    localStorage.removeItem("myCart");
    localStorage.removeItem("userId");
    setUser(""); // Clear user from state
  };

  const userAuthentication = async () => {
    try {
      const res = await fetch("http://localhost:3005/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: isAuthenticated,
        },
      });
      if (res.status === 200) {
        console.log("everything is good");
        const data = await res.json();
        console.log("user data", data);
        setUser(data.username);
        setAdmin(data.isAdmin);
        console.log("admin",data.isAdmin);
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error, "auth error");
    }
  };

  console.log(_id1," username id");

  const getProducts = async (url) => {
    dispatch({ type: "API_LOADING" });
    try {
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({ type: "MY_API_DATA", payload: products });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "ERROR" });
    }
  };

  const getSingleProd = async (url) => {
    dispatch({ type: "SINGLE_API_LOADING" });
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      console.log(singleProduct);
      dispatch({ type: "MY_SINGLE_DATA", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "err" });
    }
  };

  


  useEffect(() => {
    // Fetch initial product data
  getProducts(API);
  userAuthentication();

  // Authenticate user and fetch product data periodically
  const intervalId = setInterval(() => {
    userAuthentication();
    getProducts(API);
  }, 5000000);

  // Clean up on component unmount
  return () => {
    clearInterval(intervalId);
  };
  }, []);

  return (
    <appContext.Provider value={{ ...state, getSingleProd, storeToken, user,setUser , isLoggedIn, clearTokenAndUser , admin , setAdmin,isLoading, isAuthenticated,setId,_id1}}>
      {children}
    </appContext.Provider>
  );
};

const useProvider = () => {
  return useContext(appContext);
};

export { AppProvider, useProvider, appContext };
