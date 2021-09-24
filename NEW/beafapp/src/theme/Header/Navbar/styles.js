import styled from 'styled-components'

export const Brand = styled.div`
  display: flex;
  align-items: center;
  color: #212121;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16pt;

  span {
    color: #ff6347;
  }
`

export const Wrapper = styled.div`
  padding: 0.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ newUser }) =>
    newUser &&
    `
		padding: 1.5rem 0;
	`}
`

export const Banner = styled.div`
  padding: 1rem 0;
  text-align: center;
  background: rgb(63, 70, 173);
  color: #fff;

  span {
    line-height: 1.6;
    margin-right: 1rem;
  }
`

export const FlatBtn = styled.button`
  background: #fff;
  padding: 0.4rem 0.3rem;
  color: black;
  border-radius: 0.2rem;
  border: none;
  font-size: 12pt;
  font-weight: 500;
  cursor: pointer;
`
