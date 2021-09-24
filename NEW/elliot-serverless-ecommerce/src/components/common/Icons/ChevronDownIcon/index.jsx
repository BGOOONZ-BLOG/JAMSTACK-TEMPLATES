import StyledIcon from "components/common/StyledIcon";

const ChevronDownIcon = ({ width = 24, height = 24, color = "#222" }) => (
	<StyledIcon
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		width={width}
		height={height}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.33119 122.331C19.4394 111.223 37.4495 111.223 48.5577 122.331L256 329.773L463.442 122.331C474.551 111.223 492.561 111.223 503.669 122.331C514.777 133.439 514.777 151.449 503.669 162.558L276.113 390.113C265.005 401.222 246.995 401.222 235.887 390.113L8.33119 162.558C-2.77706 151.449 -2.77706 133.439 8.33119 122.331Z"
			fill={color}
		/>
	</StyledIcon>
);

export { ChevronDownIcon };
