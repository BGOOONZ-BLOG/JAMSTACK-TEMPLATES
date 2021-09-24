import styled from "styled-components";

export const Wrapper = styled.div`
	padding: 2rem 0;

	.item__container {
		&--carousel {
			padding-right: 1.875rem;
		}
		&--details {
			padding-left: 6.25rem;
		}
	}

	@media (max-width: 960px) {
		.item__container {
			padding: 0;
		}
	}
`;
