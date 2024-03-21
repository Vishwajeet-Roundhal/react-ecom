import React, { useEffect, useState } from "react";
import FormatPrice from "../Helpers/FormatPrice";
import { useProvider } from "../context/provideContext";
import { Button } from "../styles/Button"
import styled from "styled-components";
// import { useProvider } from '../context/provideContext'

function Orders() {
  const { isAuthenticated } = useProvider();
  const { _id1 } = useProvider();
  console.log(_id1);
  const id = localStorage.getItem("userId");
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSingleOrder = async () => {
    try {
      const res = await fetch(`http://localhost:3005/api/admin/order/${id}`, {
        method: "GET",
        headers: {
          Authorization: isAuthenticated,
        },
      });
      if (!res.ok) {
        // If response is not ok (e.g., 404, 500), throw an error
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      console.log(data);
      setOrder(data);
    } catch (error) {
      console.log(error, "error in order");
    } finally {
      setLoading(false); // Set loading to false after data is fetched or in case of error
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, []);

  if (orders.length === 0) {
    return <h1>No orders yet</h1>;
  }

  const deleteOrder = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/admin/deleteOrder/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );
      const data = await res.json();
      console.log("deleted order", data);
      if (res.ok) {
        alert("order cancelled");
        getSingleOrder();
      } else {
        alert("order cancellation failed try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Your Orders</h2>
          <StyledGrid>
            {orders.map((order, index) => (
              <StyledOrder key={index}>
                <h2>Order {index + 1}</h2>
                <p>Order ID: {order._id}</p>
                <p>
                  Total Amount: <FormatPrice price={order.totalAmount} />
                </p>
                <p>Order Status: {order.status}</p>
                <p>Ordered Items:</p>
                <StyledItemList>
                  {order.orderDetails.map((item, idx) => (
                    <StyledItem key={idx}>
                      <p>Name: {item.name}</p>
                      <p>
                        Color: <StyledColorBox color={item.color} />
                      </p>
                      <p>Amount: {item.amount}</p>
                    </StyledItem>
                  ))}
                </StyledItemList>
                <Button onClick={() => deleteOrder(order._id)}>Cancel Order</Button>
              </StyledOrder>
            ))}
          </StyledGrid>
        </>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  padding: 20px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const StyledOrder = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;

  h2 {
    margin-bottom: 10px;
  }
`;

const StyledItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StyledItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const StyledColorBox = styled.span`
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export default Orders;
