import React from "react";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import Header from "./components/Header";
import Error from "./Error";
import SingleProduct from "./SingleProduct";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import Orders from "./components/Orders";
import Admin from "./Admin/Admin";
import AdminUsers from "./Admin/AdminUsers";
import { GlobalStyle } from "./GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Products from "./components/Products";
import AdminContacts from "./Admin/AdminContacts";
import AdminUpdate from "./Admin/AdminUpdate";
import AdminProducts from "./Admin/AdminProducts";
import EditProduct from "./Admin/EditProduct";
import AdminCart from "./Admin/AdminCart";

const App = () => {
  const theme = {
    colors: {
      bg: "#f6f8fa",
      footer_bg: "0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98,84,243,0.5)",
      hr: "#fffff",
      gradient:
        "linear-gradient(0deg,rgb(132 144 255) 0%, rgb(98 189 152) 100%)",
      shadow:
        "rgba(0,0,0,0.02) 0px 1px 3px 0px, rgba(27,31,35,189,0.15) 0px 0px 0px 1px;",
      shadowSupport: "rgba(0,0,0,0.26) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="/admin/update/:id" element={<AdminUpdate />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />
            <Route path="carts" element={<AdminCart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
