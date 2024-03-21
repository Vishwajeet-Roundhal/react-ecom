import React from "react";
import { useState } from "react";
import styled from "styled-components";

function MyImage({ imgs }) {
  const [images, setImages] = useState(imgs[0]);
  console.log(imgs);

  // console.log(imgs);
  // if (!Array.isArray(imgs)) {
    // { imgs = [{ image : "" }] }
  //   console.error("imgs is not an array:", imgs);
  //   return null; // or handle the error in a way appropriate for your application
  // }
  const imagesArray = Array.isArray(imgs) ? imgs : [];

  return (
    <Wrapper>
      {/* <div className="grid grid-four-column">
        {imagesArray.map((cur, i) => {
          return (
            <figure key={i}>
              <img
                src={cur.image}
                id={i}
                className="box-image--style"
                onClick={() => {
                  setImages(cur);
                }}
              />
            </figure>
          );
        })}
      </div>
      <div className="main-screen">
        <img src={images.image} />
      </div> */}
      <StyledImage src={imgs} alt="" height={520} width={580} />
    </Wrapper>
  );
}

const StyledImage = styled.img`
  height: 480px;
  display: block;

  &:hover {
    transform: scale(1.15);
  }
`;



const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    /* order: 2; */

    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default MyImage;
