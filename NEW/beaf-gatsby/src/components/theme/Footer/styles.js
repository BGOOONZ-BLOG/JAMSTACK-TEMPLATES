import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 680px) {
    justify-content: center;
    align-items: center;
  }
`;

export const FullContainer = styled.div`
  width: 100%;
  padding: 3rem 0;
  color: #fff;
  background: #1f224a;
`;

export const List = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 28%;

  &:last-child {
    max-width: 38%;

    p {
      color: #fff;
    }
  }

  @media (max-width: 960px) {
    max-width: 100%;
    margin-bottom: 2rem;
    text-align: center;

    &:last-child {
      max-width: 70%;
      margin: 0 auto;
      margin-bottom: unset;

      p {
        margin-bottom: unset;
      }
    }
  }

  @media (max-width: 680px) {
    margin-bottom: 2rem;

    &:last-child {
      max-width: 100%;
    }
  }

  a {
    color: #fff;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
`;

export const Social = styled.a`
  color: #fff;
  align-self: flex-start;

  @media (max-width: 960px) {
    align-self: center;
  }

  img {
    margin-bottom: 0;
  }

  ${({ last }) =>
    last &&
    `
		margin-right: unset;
	`}
`;
