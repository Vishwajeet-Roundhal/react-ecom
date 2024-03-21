import React, { useEffect, useState } from "react";
import { useProvider } from "../context/provideContext";
import { useParams } from "react-router-dom";

function AdminUpdate() {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const { isAuthenticated } = useProvider();
  console.log(isAuthenticated);
  const { id } = useParams();
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const getUserById = async () => {
    try {
      const data1 = await fetch(`http://localhost:3005/api/admin/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: isAuthenticated,
        },
      });
      const res = await data1.json();
      console.log(res,"this is res");
      const user = res[0];
      setData(user);
    } catch (error) {
      console.log("error in user", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedData = await fetch(`http://localhost:3005/api/admin/update/${id}`,{
            method: "PATCH",
            headers: {
                Authorization : isAuthenticated,
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data)
        });
        const res = await updatedData.json();
        console.log("updated data",res);

    } catch (error) {
        console.log(error,"error while updating");
    }
  };

  useEffect(() => {
    getUserById();
  }, []);
  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update User Data</h1>
      </div>
      {/* contact page main  */}
      <div className="container grid grid-two-cols">
        {/* contact form content actual  */}
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Mobile</label>
              <input
                type="phone"
                name="phone"
                id="phone"
                autoComplete="off"
                value={data.phone}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
}

export default AdminUpdate;
