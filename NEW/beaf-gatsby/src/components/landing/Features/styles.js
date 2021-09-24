import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  padding: 4rem 0;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  text-align: center;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Item = styled.div`
  width: 100%;
  max-width: 30%;

  @media (max-width: 960px) {
    max-width: 100%;
  }

  img {
    align-self: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  h4 {
    font-weight: lighter;
  }
`;
