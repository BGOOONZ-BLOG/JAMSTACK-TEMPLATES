import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding: 1rem;
`

export const Btn = styled.div`
  width: 100%;
  max-width: 48%;
  text-align: left;
  align-self: flex-start;
  text-align: right;
  display: flex;
  align-items: center;
  flex-direction: row;

  .jAfIlk {
    border-radius: 10px;
  }

  p {
    margin: 0 0 0 0.5rem;
  }

  ${({ before }) =>
    before &&
    `
    align-self: flex-end;
    display: flex;
    align-items: center;
    text-align: left;
    flex-direction: row-reverse;

    p {
      margin: 0 .5rem 0 0;
    }
  `}
`

export const Floating = styled.button`
  border: none;
  background: #536DFE;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: .3s;

  ${({ islink }) =>
    islink &&
    `
    display: flex;
    justify-content: center;
  `}

  ${({ voted, before }) =>
    voted &&
    !before &&
    `
    box-shadow: 0 5px 10px 0 #536DFE;
    transform: scale(1.1);
    transition: .3s;
  `}

  ${({ voted, before }) =>
    voted &&
    before &&
    `
    box-shadow: 0 5px 10px 0 #FF6347;
    transform: scale(1.1);
    transition: .3s;
  `}

  @media (max-width: 680px) {
    width: 40px;
    height: 40px;

    img {
      width: 16px;
    }
  }

  &:hover {
    box-shadow: 0 5px 10px 0 #536DFE;
    transform: scale(1.1);
    transition: .3s;

    ${({ before }) =>
      before &&
      `
      box-shadow: 0 5px 10px 0 #FF6347;
    `}
  }

  ${({ before }) =>
    before &&
    `
    background: #FF6347;
  `}
`
