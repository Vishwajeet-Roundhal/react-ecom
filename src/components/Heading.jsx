import React from "react";
import styled from "styled-components";
import { useProductProvider } from "../context/ProductListing";
import { BsFillGridFill, BsList } from "react-icons/bs";

function Heading() {
  const { filter_products, grid_view, setGridView, setListView , sortt} =
    useProductProvider();

  return (
    <Wrapper className="sort-section">
      <div className="sorting-list--grid">
        <button
          className={grid_view ? " active sort-btn" : "sort-btn"}
          onClick={setGridView}
        >
          <BsFillGridFill className="icon" />
        </button>
        <button
          className={grid_view ? "sort-btn" : "active sort-btn"}
          onClick={setListView}
        >
          <BsList className="icon" />
        </button>
        <div className="product-data">
          {filter_products.length} Products available
        </div>
        <div className="sort-selection">
          <form action="#">
            <label htmlFor="sort"></label>
            <select name="sort" id="sort" className="sort-selection--style" onClick={sortt}>
              <option value="lowest">Lowest Price</option>
              <option value="highest">Highest Price</option>
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
            </select>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;

  .sorting-list--grid {
    display: flex;
    align-items: center;
    gap: 2rem;
    

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;

    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }
`;
export default Heading;
