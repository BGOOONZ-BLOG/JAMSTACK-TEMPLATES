import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 3rem 0;
`

export const Overlay = styled.div`
  align-self: center;
  text-align: center;
  width: 40%;

  @media (max-width: 1200px) {
    width: 70%;
  }

  @media (max-width: 960px) {
    width: 90%;
  }
`

export const Left = styled.div`
  text-align: left;
  margin-bottom: 1rem;

  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      font-size: 12pt;
    }

    img {
      margin-right: 0.5rem;
    }
  }
`
