import styled from 'styled-components'

export const LoginWrapper = styled.div`
  padding: 4rem 0;

  @media (max-width: 960px) {
    padding: 4rem 0;
  }

  a {
    color: #2b85ff;
    text-decoration: underline;
  }
`

export const Card = styled.div`
  padding: 2rem;
  box-shadow: 3px 0px 20px 0 rgba(0, 0, 0, 0.1);
  align-self: center;
  width: 90%;
  margin: 0 auto;
  background: #fff;

  ${({ register }) =>
    register &&
    `
		width: 60%;
	`}

  ${({ login }) =>
    login &&
    `
			padding: unset;
			display: flex;
			algin-items: flex-start;
			justify-content: space-between;
			flex-wrap: wrap;
			border-radius: 3px;
			overflow: hidden;
	`}

  @media (max-width: 960px) {
    width: 80%;
    box-sizing: border-box;
  }

  @media (max-width: 680px) {
    width: 100%;
    box-sizing: border-box;
  }
`

export const Item = styled.div`
  width: 100%;
  max-width: 50%;

  &:first-child {
    display: flex;
    flex-direction: column;
    align-self: stretch;
  }

  @media (max-width: 960px) {
    max-width: 100%;
  }
`

export const Img = styled.div`
  width: 100%;
  height: 100%;

  @media (max-width: 960px) {
    height: 200px;
  }

  ${({ src }) =>
    src &&
    `
		background-image: url(${src});
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	`}
`

export const FormWrapper = styled.div`
  padding: 2rem;
`

export const Center = styled.div`
  text-align: center;

  a {
    color: #2b85ff;
    text-decoration: underline;
  }
`

export const Wrapper = styled.div`
  padding: 4rem 0;
`

export const Show = styled.span`
  border: none;
  cursor: pointer;
  color: rgb(43, 133, 255);
  position: absolute;
  right: 0;
`

export const ImgWrapper = styled.div`
  width: 200px;
  margin: 0 auto;

  img {
    width: 100%;
  }
`
