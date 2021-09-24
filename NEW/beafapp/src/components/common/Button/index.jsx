import styled from 'styled-components'

export const Button = styled.button`
	text-decoration: none;
	padding: 0.7rem 2rem;
	color: #fff;
	background: #191847;
	border: 1px solid transparent;
	text-transform: uppercase;
	border-radius: 0.3rem;
	cursor: pointer;
	font-size: 12pt;
	transition: .3s;

	&:hover {
		background: transparent;
		border: 1px solid #191847;
		color: #191847;
		transition: .3s;
	}

	${({ confirm }) =>
    confirm &&
    `
			background-color: #2291cc;
	`}

	${({ outlined }) =>
    outlined &&
    `
			background: transparent;
			border: 1px solid #191847;
			color: #191847;

			&:hover {
				color: #fff;
				background: #191847;
				border: 1px solid transparent;
			}
	`}

	${({ cancel }) =>
    cancel &&
    `
			border: none;
			color: gray;
			background: unset;
	`}
`
