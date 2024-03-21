import React, { useEffect, useState } from "react";
import { useProvider } from "../context/provideContext";
import "../styles/admin.css";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import FormatPrice from "../Helpers/FormatPrice";
Chart.register(...registerables);

function AdminCart() {
  const [orders, setOrders] = useState([]);
  const { isAuthenticated } = useProvider();
  const [salesData, setSalesData] = useState([]);
  const [chartType, setChartType] = useState("weekday");
  const [ordersData, setOrdersData] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  const showCart = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/admin/cart`, {
        method: "GET",
        headers: {
          Authorization: isAuthenticated,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data, "this is carts data");
        const formattedOrders = data.map((order) => ({
          ...order,
          createdAt: new Date(order.createdAt).toLocaleString(),
        }));

        setOrders(formattedOrders);


        const sales = formattedOrders.map((order) => order.totalAmount);
        setSalesData(sales);

        const orderAmounts = formattedOrders.map((order) => {
          const amount = parseFloat(order.orderDetails[0].amount);
          return !isNaN(amount) ? amount : 0;
        });
        console.log(orderAmounts);
        setOrdersData(orderAmounts);

        const productsMap = {};
        formattedOrders.map((order) => {
          order.orderDetails.map((item) => {
            if (productsMap[item.id]) {
              productsMap[item.id].amount += item.amount;
            } else {
              productsMap[item.id] = {
                id: item.id,
                name: item.name,
                amount: item.amount,
              };
            }
          });
        });

        // Convert map to array and sort by quantity
        const topSellingProductsArray = Object.values(productsMap).sort(
          (a, b) => b.amount - a.amount
        );

        // Set top selling products state
        setTopSellingProducts(topSellingProductsArray);
      }
    } catch (error) {
      console.log(error, "error in cart");
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    console.log(id, "is the id");
    console.log(newStatus, "this is new status");

    try {
      const res = await fetch(
        `http://localhost:3005/api/admin/updateCart/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: isAuthenticated,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        showCart();
        alert("cart  updated successfully!");
      } else {
        alert("cart not updated");
      }
    } catch (error) {
      console.log(error, "error in status");
    }
  };

  const handleDel = async (id) => {
    console.log(id, "delete this item from admin panel");

    try {
      const res = await fetch(
        `http://localhost:3005/api/admin/delOrderByAdmin/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: isAuthenticated,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data, "deleted order");
        alert("order cancelled");
        showCart();
        // setOrders([...orders.filter((order)=>order.id !== id)]);
      } else {
        alert("order not cancelled");
      }
    } catch (error) {
      console.log(error, "error at deletion ");
    }
  };

  const ordersChartData = {
    labels: Array.from(new Set(orders.map(order => {
      const date = new Date(order.createdAt);
      if (chartType === "month") {
        return date.toLocaleDateString("en-IN", { month: "short" });
      } else if (chartType === "year") {
        return date.toLocaleDateString("en-IN", { year: "numeric" });
      } else {
        return date.toLocaleDateString("en-IN", { weekday: "long" });
      }
    }))),
    datasets: [
      {
        label:
          chartType === "weekday"
            ? "orders per day"
            : chartType === "month"
            ? "sales per month"
            : "sales per day",
        backgroundColor: "blue",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1.5,
        data: orders.map(order => {
          const date = new Date(order.createdAt);
          const formattedDate = date.toLocaleDateString("en-IN", { year: "numeric", month: "2-digit", day: "2-digit" });
          return {
            date: formattedDate,
            count: 1 // Count each order as 1
          };
        }).reduce((acc, curr) => {
          const existingItem = acc.find(item => item.date === curr.date);
          if (existingItem) {
            existingItem.count += curr.count;
          } else {
            acc.push(curr);
          }
          return acc;
        }, []).map(item => item.count)
      },
    ],
  };

  const ordersChartOptions = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          font: {
            size: 16,
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.2)", // Customize the grid line color
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Orders Analytics",
        fontSize: 25,
        font: {
          weight: "bold",
        },
        color: "black",
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          font: {
            size: 14,
          },
          color: "green",
        },
      },
    },
  };

  const salesChartData = {
    labels: Array.from(new Set(orders.map(order => {
      const date = new Date(order.createdAt);
      if (chartType === "month") {
        return date.toLocaleDateString("en-IN", { month: "short" });
      } else if (chartType === "year") {
        return date.toLocaleDateString("en-IN", { year: "numeric" });
      } else {
        return date.toLocaleDateString("en-IN", { weekday: "long" });
      }
    }))),
    datasets: [
      {
        label:
          chartType === "weekday"
            ? "sales per day"
            : chartType === "month"
            ? "sales per month"
            : "sales per day",
        // backgroundColor: "rgba(75,192,192,1)",
        backgroundColor: "blue",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1.5,
        data: orders.map(order => {
          const date = new Date(order.createdAt);
          const formattedDate = date.toLocaleDateString("en-IN", { year: "numeric", month: "2-digit", day: "2-digit" });
          return {
            date: formattedDate,
            amount: parseFloat(order.totalAmount)
          };
        }).reduce((acc, curr) => {
          const existingItem = acc.find(item => item.date === curr.date);
          if (existingItem) {
            existingItem.amount += curr.amount;
          } else {
            acc.push(curr);
          }
          return acc;
        }, []).map(item => item.amount)
      },
    ],
  };
  const chartOptions = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          font: {
            size: 16,
            weight: "bold",
          },
          callback: function (value, index, values) {
            return FormatPrice({ price: value });
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.2)", // Customize the grid line color
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Sales Analytics",
        fontSize: 25,
        font: {
          weight: "bold",
        },
        color: "black",
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          font: {
            size: 14,
          },
          color: "green",
        },
      },
    },
  };

  useEffect(() => {
    showCart();
  }, []);
  return (
    <div>
      <h2 style={{ marginLeft: "30px" }}>Orders</h2>
      <div className="admin-cart-container">
        {/* <h2 className="admin-cart-title">Admin Orders</h2> */}
        {orders.map((order) => (
          <div key={order._id} className="order-container">
            <p>Order ID: {order._id}</p>
            <p>
              Total Amount: <FormatPrice price={order.totalAmount} />
            </p>
            <p>Status: {order.status}</p>
            <p>Date: {order.createdAt}</p>
            <p>Click below to change status</p>
            <select
              value={order.status}
              onChange={(e) => handleChangeStatus(order._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
            <button id="cancel-button" onClick={() => handleDel(order._id)}>
              Cancel Order
            </button>
            <div className="items-container">
              <h4>Details:</h4>
              {order.orderDetails.map((item) => (
                <div key={item._id} className="item">
                  <p>product id:{item.id}</p>
                  <p>Name: {item.name}</p>
                  <p>Amount: {item.amount}</p>
                  <p>
                    Price: <FormatPrice price={item.price} />
                  </p>
                  <p>User: {item.user}</p>
                  <p>User Id: {item.userId}</p>
                  {/* Display other item details as needed */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <h2 style={{ marginBottom: "20px", marginLeft: "30px" }}>
        Sales & orders Analytics
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            marginRight: "10px",
            fontFamily: "Times New Roman",
            fontSize: 32,
          }}
        >
          View
        </h3>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          style={{ marginRight: "20px" }}
        >
          <option value="weekday">Daily</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>
      <div className="grid-two-column">
        <div style={{ height: "400px", width: "50%", marginLeft: 0 }}>
          <Bar data={salesChartData} options={chartOptions} />
        </div>
        <div style={{ height: "400px", width: "50%", marginLeft: 0 }}>
          <Bar data={ordersChartData} options={ordersChartOptions} />
        </div>
      </div>
      <h2
        style={{
          marginLeft: "37%",
          fontFamily: "Times New Roman",
          marginTop: "25px",
        }}
      >
        Top Selling Products
      </h2>
      <div className="top-selling-products-container">
        <div className="product-list-container">
          <ul className="product-list">
            {topSellingProducts.map((product, index) => (
              <li key={product.id} className="product-item">
                <span className="product-number">{index + 1}.</span>
                <span className="product-name">{product.name}</span>
                <span className="product-amount">
                  Quantity Sold : {product.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default AdminCart;
