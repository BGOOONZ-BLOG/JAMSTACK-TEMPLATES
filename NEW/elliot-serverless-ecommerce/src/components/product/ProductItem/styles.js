import styled from "styled-components";

export const Products = styled.section`
	display: grid;
	grid-template-columns: ${({ related, products }) =>
		related
			? products > 1
				? `repeat(${products}, 1fr)`
				: "repeat(1, 1fr)"
			: "repeat(4, 1fr)"};
	grid-column-gap: 1.875rem;
	grid-row-gap: 4.0625rem;

	${({ related }) =>
		related &&
		`
		justify-items: center;
	`}

	@media (max-width: 960px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 680px) {
		grid-template-columns: 1fr;
	}

	${({ grid }) =>
		!grid &&
		`
		grid-template-columns: 1fr;
	`}
`;

export const Section = styled.section`
	padding: 2.5rem 0;
	max-width: 90%;
`;

export const SectionTitle = styled.h3`
	text-align: center;
	font-weight: 700;
`;
