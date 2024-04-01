import React from "react";
import styled from "@emotion/styled";
import backgroundImg from "../../../images/interior-old-room-with-spotlight.jpg";
import ClipLoader from "react-spinners/ClipLoader";

const Wrapper = styled.div`
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkeletonLoader = () => {
  return (
    <Wrapper>
      <ClipLoader size={60} color="#864d4b" />
    </Wrapper>
  );
};

export default SkeletonLoader;
