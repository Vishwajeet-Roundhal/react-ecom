import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { useProvider } from "./context/provideContext";
import PageNavigation from "./components/PageNavigation";
import { Container } from "./styles/Container";
import MyImage from "./components/MyImage";
import FormatPrice from "./Helpers/FormatPrice"
import {TbTruckDelivery,TbReplace} from "react-icons/tb"
import {MdSecurity} from "react-icons/md"
import Star from "./components/Star";
import AddToCart from "./components/AddToCart";

// const API = "https://api.pujakaitem.com/api/products";
const API2 = "http://localhost:3005/api/data/product"

const SingleProduct = () => {
  const { getSingleProd, isSingleLoading, singleProd } = useProvider();
  const { id } = useParams();
  console.log(id);
  // const {
  //   id: alias,
  //   name,
  //   company,
  //   description,
  //   // stars,
  //   price,
  //   // stock,
  //   // reviews,
  //   image,
  // } = singleProd;

  useEffect(() => {
    getSingleProd(`${API2}/${id}`);
  }, [id]);


  if (isSingleLoading || !singleProd || singleProd.length === 0) {
    return <h1>Loading... or Product not found</h1>;
  }

  console.log(singleProd);
  const product = singleProd[0];
  if (!product) {
    return <h1>Error: Product not found</h1>;
  }
  const { id: alias, name, company, description, price, image } = product;

  // console.log(product);
  return (
    <Wrapper>
      <PageNavigation title={name} />
      { singleProd ? (
      <Container classname="container" >
        <div className="grid grid-two-column" key={id}>
          <div className="product-image">
            <MyImage imgs={image}/>
          </div>
          <div className="product-data">
            <h2>{name}</h2>
            {/* <Star stars={stars} reviews={reviews}/> */}

            <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={price + 250000} />
              </del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day : <FormatPrice price={price} />
            </p>
            <p>{description}</p>

            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 days replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Deliver</p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>Secured</p>
              </div>
            </div>
            <div className="product-data-info">
              {/* <p>Available : {stock > 0 ? "In stock" : "not available"}</p> */}
              <p>Brand: {company}</p>
              <p>Name : {name}</p>
            </div>
            <hr/>
            { <AddToCart product={product}/>}
          </div>
        </div>
      </Container>
      ) : (
        <p>loading...</p>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 2rem 0;
  }
  .product-image {
    display:flex;
    align-items:center;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .product-data-warranty {
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 0.5rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 3rem;
          height: 3rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1rem;
          padding-top: 0.4rem;
        }
      }
    }
    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1rem;

      span {
        font-weight: bold;
      }
      p {
        margin-bottom: 0;
      }
    }


    hr {
      margin-top: 1rem;
      max-width: 100%;
      width: 100%;
      // height: 0.2rem; 
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product-data h2 {
    margin-bottom: 0;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
