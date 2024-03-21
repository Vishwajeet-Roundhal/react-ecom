import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProvider } from "../context/provideContext";

function EditProduct() {
  const [prod, setProd] = useState([]);
  const { id } = useParams();
  const { isAuthenticated } = useProvider();
  console.log(id, "this is id");

  const getProd = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/admin/product/${id}`, {
        method: "GET",
        headers: {
          Authorization: isAuthenticated,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        const prodData = data[0];
        setProd(prodData)
      }
    } catch (error) {
      console.log(error, "error getting product");
    }
  };

  const handleChange = (e) => {
    setProd({ ...prod, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`http://localhost:3005/api/admin/updateProduct/${id}`,{
            method: "PATCH",
            headers: {
                Authorization: isAuthenticated,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(prod)

        });
        if(res.ok){
            const data = await res.json();
            console.log("new product",data);
        }
    } catch (error) {
        console.log(error,"update failed");
    }

  };

  useEffect(() => {
    getProd()
  },[])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={prod.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={prod.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={prod.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={prod.company}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditProduct;
