import React, { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import reducer from "../reducer/cartReducer";
import { useContext } from "react";
// import { useProvider } from "./provideContext";

const CartContext = createContext();

const getLocalData = () => {
  let newData = localStorage.getItem("myCart");

  if (!newData || newData === "undefined") {
    return [];
  } else {
    return JSON.parse(newData);
  }
};

const initialState = {
  cart: getLocalData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 5000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  const addToCart = (id, color, amount, product,user,userId) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product, user, userId} });
  };

  const removeId = (id) => {
    dispatch({ type: "REMOVE_ID", payload: id });
  };

  const clearCarts = () => {
    dispatch({ type: "CLEAR_CART" });
  }

  const setInc = (id) => {
    dispatch({type:"SET_INCREMENT", payload: id})
  }
  const setDec = (id) => {
    dispatch({type:"SET_DECREMENT",payload: id})
  }

  // const calculateTotalAmount = (cart) => {
  //   return cart.reduce((total, total_item) => total + total_item.amount, 0);
  // };

  useEffect(() => {
    dispatch({type:"CART_TOTAL"});
    // const totalAmount = calculateTotalAmount(state.cart);

    dispatch({type:"TOTAL_AMT"},[state.cart])
    localStorage.setItem("myCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeId, clearCarts ,setDec,setInc}}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};
export { CartProvider, useCartContext };
