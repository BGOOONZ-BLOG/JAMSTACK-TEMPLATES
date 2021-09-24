import styled from "styled-components";

export const Wrapper = styled.div`
	position: relative;

	@media (min-width: 1200px) {
		padding-right: 0.625rem;
	}

	@media (max-width: 960px) {
		padding: 0 0.5rem;
	}

	.ais-Hits {
		position: absolute;
		top: 38px;
		width: 344px;
		z-index: 7;
		background: #fff;
		max-height: 500px;
		overflow-y: scroll;
		box-shadow: 0 7px 10px 0px rgba(0, 0, 0, 0.09);
		border-radius: 2px;
		right: 0;
		padding: 1rem;

		& .ais-Hits-item:not(:last-child) {
			padding-bottom: 1rem;
			margin-bottom: 1.875rem;
			border-bottom: 1px solid
				${({ theme: { colors } }) => colors.lightnessGray};
		}

		@media (max-width: 960px) {
			position: fixed;
			top: 45px;
			left: 0;
			width: 100vw;
		}
	}

	.ais-SearchBox-submitIcon {
		width: 100%;
		max-width: 20px;
		height: 100%;
		max-height: 20px;
	}
	.ais-SearchBox-reset {
		top: 6px;
		position: absolute;
		right: 3rem;
	}

	.ais-SearchBox-submit {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 15px;
		transform: translateY(-50%);
		right: 0;
		border: none;
		background-color: transparent;
		width: 2.5rem;
		height: 2.5rem;
	}

	input {
		outline: none;
		padding: 0 2.5rem 0 0;
		height: 2.5rem;
		border: none;
		font-size: 15px;
		border-bottom: 1px solid transparent;
		width: 100%;
		box-shadow: 0 0 0 transparent;
		background-color: transparent;
		display: block;
		line-height: 1.5;
		color: #495057;
		transition: ${({ theme: { transitions } }) => transitions.default400};

		&::placeholder {
			color: ${({ theme: { colors } }) => colors.lightGray};
			font-size: 15px;
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 ${({ theme: { colors } }) => colors.darkBlack};
			border-color: ${({ theme: { colors } }) => colors.black};
			border-bottom-color: ${({ theme: { colors } }) => colors.lightGray};
		}
	}
`;
