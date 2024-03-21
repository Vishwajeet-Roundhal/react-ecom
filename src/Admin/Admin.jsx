import React from "react";
import { useProvider } from "../context/provideContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../styles/admin.css"

function Admin() {
  const { admin, isLoading } = useProvider();
  console.log("admin value", admin);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!admin) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <header className="admin__header">
        <div className="admin_container">
          <nav className="admin__navbar">
            <ul className="admin_ul">
              <li>
                <NavLink to="/admin/users">User</NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">Contacts</NavLink>
              </li>
              <li>
                <NavLink to="/admin/products">Products</NavLink>
              </li>
              <li>
                <NavLink to="/admin/carts">Sales & orders</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Admin;
