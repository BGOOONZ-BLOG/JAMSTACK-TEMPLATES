import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 6rem 0;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Item = styled.div`
  width: 100%;
  max-width: 43%;

  &:first-child {
    max-width: 53%;
  }

  @media (max-width: 960px) {
    max-width: 100%;

    &:first-child {
      margin-bottom: 2rem;
      max-width: 100%;
    }
  }
`;

export const Content = styled.div`
  padding-top: 3rem;

  @media (max-width: 960px) {
    text-align: center;

    ul {
      list-style: none;
    }
  }

  p {
    color: #a7a6a6;
    font-size: 14pt;
    font-weight: normal;
  }

  h1 {
    color: #191847;
    font-weight: normal;
    font-size: 36pt;
    line-height: 1.2;

    @media (max-width: 1400px) {
      font-size: 32pt;
    }

    @media (max-width: 1200px) {
      font-size: 28pt;
    }

    @media (max-width: 960px) {
      font-size: 26pt;
    }
  }
`;
