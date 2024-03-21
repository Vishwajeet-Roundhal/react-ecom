import styled from "styled-components";
import { useCartContext } from "./context/CartContext";
import CartItem from "./components/CartItem";
import { NavLink, Link } from "react-router-dom";
import { Button } from "./styles/Button";
import FormatPrice from "./Helpers/FormatPrice";
import { useProvider } from "./context/provideContext";

const Cart = () => {
  const { isAuthenticated } = useProvider();
  const { cart, clearCarts, total_amount, shipping_fee } = useCartContext();
  if (cart.length === 0) {
    return (
      <Mid>
        <h1 className="mid">its Empty :(</h1>
      </Mid>
    );
  }

  const handleBuy = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/admin/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: isAuthenticated,
        },
        body: JSON.stringify({ cart }),
      });
      if (response.ok) {
        // Purchase successful, clear the cart
        clearCarts();
        alert('Purchase successful! Thank you for shopping with us.');
      } else {
        // Purchase failed, display error message
        alert('Error: Failed to complete purchase. Please try again later.');
      }
    } catch (error) {
      console.error('Error purchasing:', error);
      alert('Error: Failed to complete purchase. Please try again later.');
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="cart_heading grid grid-five-column">
          <p>item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">subtotal</p>
          <p>remove</p>
        </div>
        <hr />
        <div className="cart-item">
          {cart.map((product, index) => {
            return <CartItem key={index} {...product} />;
          })}
        </div>
        <hr />
        <div className="cart-two-button">
          <NavLink to="/products">
            <Button className="cont">Continue</Button>
          </NavLink>
          <Button onClick={clearCarts}>clear</Button>
          <Button onClick={handleBuy} >Buy Now</Button>
        </div>
        <div className="order-total--amount">
          <h2>Your order details</h2>
          <div className="order-total-subdata">
            <div>
              <p>subtotal</p>
              <p>
                <FormatPrice price={total_amount} />
              </p>
            </div>
            <div>
              <p>Shipping fee:</p>
              <p>
                <FormatPrice price={shipping_fee} />
              </p>
            </div>
            <div>
              <p>total amount:</p>
              <p>
                <FormatPrice price={shipping_fee + total_amount} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Mid = styled.section`
  display: grid;
  place-items: center;
  height: 50vh;
`;

const Wrapper = styled.section`
  padding: 9rem 0;


  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    gap: 1.5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;


    .btn-clear {
      background-color: #e74c3c;
    }
  }
  .cart-two-button > button:last-child {
    margin-left: auto; 
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default Cart;
