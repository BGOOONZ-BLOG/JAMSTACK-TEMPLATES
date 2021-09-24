import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

export const Logo = styled.img`
  margin-bottom: unset;
  margin-right: 0.5rem;
`;

export const Brand = styled.a`
  display: flex;
  align-items: center;
  color: #212121;
  text-transform: uppercase;

  span {
    color: #ff6347;
  }
`;
