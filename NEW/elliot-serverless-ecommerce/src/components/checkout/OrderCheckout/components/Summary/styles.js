import styled from "styled-components";

export const Wrapper = styled.div`
	h2 {
		font-weight: 600;
	}
`;

export const Card = styled.div`
	padding: 1rem 1.5rem;
	border: 2px solid #eaeaea;

	p {
		font-size: 12px;
		text-transform: uppercase;
		color: #585858;
	}

	h5 {
		font-weight: 400;
	}
`;

export const Flex = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;

	${({ border }) =>
		border &&
		`
    border-bottom: 1px solid #eaeaea;
  `}
`;

export const Product = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.5rem 0;

	a {
		display: flex;
		align-items: center;

		p {
			margin: 0 0.3rem 0 0;
			color: #222;
			font-weight: 600;
		}

		span {
			color: #6f6f6f;
		}

		p,
		span {
			font-size: 16px;
		}
	}
`;

export const Item = styled.div`
	border-bottom: 1px solid #eaeaea;
	padding: 1rem 0;

	h3 {
		font-size: 24px;
		margin-bottom: 30px;
		font-weight: 500;
	}

	span {
		font-size: 14px;
		line-height: 1.6em;
		color: #6f6f6f;
	}
`;

export const Price = styled.span`
	font-size: 16px;
`;
