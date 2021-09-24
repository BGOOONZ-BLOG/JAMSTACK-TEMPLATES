import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 4rem 0;

  @media (max-width: 960px) {
    padding: 2rem 0;
  }
`

export const Center = styled.div`
  text-align: center;
`

export const ProgressBar = styled.div`
  height: 10px;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  background: #000;
  width: 0%;
  transition: 0.3s all;

  ${({ progress }) =>
    progress &&
    `
			width: ${progress}%;
		`}
`

export const Card = styled.div`
  padding: 2rem;
  box-shadow: 3px 0px 20px 0 rgba(0, 0, 0, 0.1);
  align-self: center;
  background: #fff;
  border-radius: 3px;

  ${({ register }) =>
    register &&
    `
			width: 60%;
	`}
`

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 680px) {
    flex-direction: column;
  }
`

export const Item = styled.div`
  width: 100%;
  max-width: 48%;

  @media (max-width: 680px) {
    max-width: 100%;
    &:first-child {
      margin-bottom: 1rem;
    }
  }

  input[type='file'] {
    display: none;
  }

  img {
    width: 100%;
  }
`

export const Label = styled.label`
  cursor: pointer;
  background: none;
  color: #6E7074;
  width: 100%;
  height: 226px;
  border-radius: 5px;
  transition: .3s;
  border: 1px solid #1a194d;
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: 128px;
  background-position: center;

	&:before {
		content: "Upload picture";
		line-height: 360px;
	}

  @media (max-width: 680px) {
    height: 100px;
    background-size: 64px;

		&:before {
			line-height: 40px;
		}
  }

  ${({ bg }) =>
    bg &&
    `
    background-image: url(${bg});
  `}

	${({ label, preview_1 }) =>
    label === '1' &&
    preview_1 &&
    `
		background: unset;
		content: 'Edit';
		height: 50px;
    width: 200px;
		margin: 0 auto;
		
		&:before {
			content: "Change picture";
			line-height: 3.2;
		}

		@media (max-width: 680px) {
			height: 50px;
		}
	`}

	${({ label, preview_2 }) =>
    label === '2' &&
    preview_2 &&
    `
		background: unset;
		content: 'Edit';
		height: 50px;
    width: 200px;
		margin: 0 auto;
		
		&:before {
			content: "Change picture";
			line-height: 3.2;
		}

		@media (max-width: 680px) {
			height: 50px;
		}
	`}
`

export const CustomSelect = styled.div`
  margin-top: 1rem;
`

export const CustomSwitch = styled.div`
  vertical-align: middle;
  margin-left: 4px;
`

export const MacroWrapper = styled.div`
  margin-top: 1rem;
`

export const Info = styled.a`
  color: #2196f3;
`
