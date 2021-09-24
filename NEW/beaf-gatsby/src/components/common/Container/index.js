import styled from 'styled-components';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 70%;

  @media (max-width: 960px) {
    width: 90%;
  }
`;

export default Container;
