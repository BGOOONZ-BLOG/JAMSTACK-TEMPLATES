import React from "react";
import Container from "../Container";
import { Link } from "@reach/router";
import styled from "styled-components";

export default () => (
  <Wrapper as={Container}>
    <Center>
      <h4>404 - Page Not Found</h4>
      <Link to="/">Go Back Home</Link>
    </Center>
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Center = styled.div`
  align-self: center;
  text-align: center;
`;
