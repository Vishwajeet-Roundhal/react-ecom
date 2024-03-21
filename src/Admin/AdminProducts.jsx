import React, { useEffect, useState } from "react";
import { useProvider } from "../context/provideContext";
import { Link } from "react-router-dom";
import "../styles/admin.css";

function AdminProducts() {
  const { isAuthenticated } = useProvider();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getAllProducts = async () => {
    try {
      const res = await fetch("http://localhost:3005/api/admin/products", {
        method: "GET",
        headers: {
          Authorization: isAuthenticated,
        },
      });
      if (res.ok) {
        const data = await res.json();
        // const productList = data[0];
        console.log(data);
        setProducts(data);
      }
    } catch (error) {
      console.log(error, "error getting products");
    }
  };

  const handleDelete = async (productId) => {
    // Handle delete action
    const confirmation = window.confirm("Are you sure to delete this product?");
    const res = await fetch(
      `http://localhost:3005/api/admin/deleteProduct/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: isAuthenticated,
        },
      }
    );

    const data = await res.json();
    console.log(data, "deleted product");
    if (res.ok) {
      getAllProducts();
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await fetch("http://localhost:3005/api/admin/categories", {
        method: "GET",
        headers: {
          Authorization: isAuthenticated,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setCategories(data);
      }
    } catch (error) {
      console.log(error, "error getting categories");
    }
  };

  const handleCategoryChange = async (event) => {
    const category = event.target.value;
    console.log(category);
    setSelectedCategory(category);
    if (category) {
      try {
        const res = await fetch(
          `http://localhost:3005/api/admin/category/${category}`,
          {
            method: "GET",
            headers: {
              Authorization: isAuthenticated,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setProducts(data);
        }
      } catch (error) {
        console.log(error, "error getting category");
      }
    } else {
      try {
        const res = await fetch("http://localhost:3005/api/admin/products", {
          method: "GET",
          headers: {
            Authorization: isAuthenticated,
          },
        });
        if (res.ok) {
          const data = await res.json();
          // const productList = data[0];
          console.log(data);
          setProducts(data);
        }
      } catch (error) {
        console.log(error, "error getting products");
      }
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);
  return (
    <>
      <p>Category</p>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="product-list">
        {products.map((curProd, index) => (
          <div key={index} className="product-item">
            <div>Product ID: {curProd._id}</div>
            <div>Name: {curProd.name}</div>
            <div>Price: {curProd.price}</div>
            <div>Category: {curProd.category}</div>
            <div>Company: {curProd.company}</div>
            <div>
              Colors:{" "}
              {curProd.colors.map((color, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: color,
                    width: "10px",
                    height: "10px",
                    display: "inline-block",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                ></span>
              ))}
            </div>{" "}
            <div className="button-container">
              <Link to={`/admin/edit/${curProd._id}`}>
                <button>Edit</button>
              </Link>{" "}
              <button onClick={() => handleDelete(curProd._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}

export default AdminProducts;
