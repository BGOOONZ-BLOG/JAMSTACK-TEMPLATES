import styled from "styled-components";

export const Wrapper = styled.form`
	label {
		margin-bottom: 10px;
		font-size: 18px;
		font-weight: 600;
		color: #222;
		display: inline-block;
	}
`;

export const CouponWrapper = styled.div`
	position: relative;
	margin-bottom: 1rem;

	button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 20px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		color: #222;
		background: none;
		border: none;
		transition: all 0.4s ease;

		&:hover {
			color: ${({
				theme: {
					colors: { accent }
				}
			}) => accent};
		}
	}
`;
