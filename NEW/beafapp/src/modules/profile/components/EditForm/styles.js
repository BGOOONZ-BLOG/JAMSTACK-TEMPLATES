import styled from 'styled-components'

export const Item = styled.div`
  text-align: center;

  @media (max-width: 680px) {
    &:first-child {
      margin-bottom: 1rem;
    }
  }

  input[type='file'] {
    display: none;
  }

  img {
    width: 120px;
    height: 120px;
    border: 1px solid #eee;
    object-fit: contain;
    border-radius: 50%;
  }
`

export const Label = styled.label`
  cursor: pointer;
  background: none;
  color: #6e7074;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  transition: 0.3s;
  border: 1px solid #1a194d;
  display: flex;
  justify-content: center;
  margin: 0 auto;

  &:before {
    content: 'Edit avatar';
    line-height: 40px;
  }
`

export const Center = styled.div`
  text-align: center;
`

export const Card = styled.div`
  padding: 2rem;
  box-shadow: 3px 0px 20px 0 rgba(0, 0, 0, 0.1);
  align-self: center;
  background: #fff;

  ${({ register }) =>
    register &&
    `
			width: 60%;
	`}
`
