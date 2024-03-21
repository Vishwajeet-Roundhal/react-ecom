import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import styled from "styled-components";

function CartButton({ amount, setInc, setDec }) {
  return (
    <Wrapper className="cart-button">
      <div className="amount-toggle">
        <button onClick={setDec}>
          <FaMinus />
        </button>
        <div className="amount-style">{amount}</div>
        <button onClick={setInc}>
          <FaPlus />
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .amount-toggle {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .amount-style {
    width: 2rem;
    height: 2rem;
    text-align: center;
    border: 3px solid #000;
    font-weight: bold;
  }
`;

export default CartButton;
