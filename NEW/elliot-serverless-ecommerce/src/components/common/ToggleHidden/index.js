import styled from "styled-components";

const ToggleHidden = styled.div`
	grid-area: ${({ gridArea }) => gridArea};
	display: ${({ hidden }) => (hidden ? "none" : "")};
`;

export default ToggleHidden;
