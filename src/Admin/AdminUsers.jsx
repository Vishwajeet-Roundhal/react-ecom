import React, { useEffect, useState } from "react";
import { useProvider } from "../context/provideContext";
import { Link } from "react-router-dom";

function AdminUsers() {
  const { isAuthenticated } = useProvider();
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const data = await fetch("http://localhost:3005/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: isAuthenticated,
        },
      });
      const res = await data.json();
      setUsers(res);
    } catch (error) {
      return console.log("error getting users", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:3005/api/admin/delete/${id}`,{
        method: "DELETE",
        headers: {
          Authorization : isAuthenticated,
        }
      });

      const data = await res.json();
      console.log("user deleted:",data);
      if (res.ok){
        getAllUsers()
      }
    } catch (error) {
      console.log(error,"error in deletion");
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return( <>
  <section className="admin-users-section">
        <div className="container">
          <h1>Users Data </h1>
        </div>
        <div className="container  admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td><Link to={`/admin/update/${curUser._id}`}>Edit</Link></td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteUser(curUser._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
  </>);
}

export default AdminUsers;
