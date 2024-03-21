import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import CartButton from "./CartButton";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/CartContext";
import { useProvider } from "../context/provideContext";

function AddToCart({ product }) {
  const { _id, colors = []} = product;
  const [color,setColor] = useState(colors[0]);
  const [amount,setAmount] = useState(1)
  const { user } = useProvider()
  const USERID = localStorage.getItem('userId')

  const {addToCart} = useCartContext()

  const setDec = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  }
  const setInc = () => {
    amount < 10 ? setAmount(amount+1) : setAmount(10)
  }

  return (
    <Wrapper>
      <div className="colors">
        <p>
          Colors:
          {colors.map((cur, i) => {
            return (
              <button
                key={i}
                style={{ backgroundColor: cur }}
                className={color === cur ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(cur)}
              >
                {color === cur ? <FaCheck />: null}
              </button>
            );
          })}
        </p>
      </div>
      <CartButton amount={amount}
      setDec={setDec}
      setInc={setInc}
      />
      <NavLink to="/cart" onClick={()=> addToCart(_id,color,amount,product,user,USERID)}>
        <Button>Add to Cart</Button>
      </NavLink>
      
    </Wrapper>
  );
}

const Wrapper = styled.section``;

export default AddToCart;
