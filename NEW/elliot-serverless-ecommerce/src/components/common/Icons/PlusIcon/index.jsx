import StyledIcon from "components/common/StyledIcon";

const PlusIcon = ({ width = 24, height = 24, color = "#010002" }) => (
	<StyledIcon
		width={width}
		height={height}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 42 42"
	>
		<path fill={color} d="M42 20H22V0h-2v20H0v2h20v20h2V22h20z" />{" "}
	</StyledIcon>
);

export { PlusIcon };
