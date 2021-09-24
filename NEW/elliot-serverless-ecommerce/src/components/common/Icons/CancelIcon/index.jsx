import StyledIcon from "components/common/StyledIcon";

const CancelIcon = ({ width = 24, height = 24, color = "#010002" }) => (
	<StyledIcon
		width={width}
		height={height}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12.25 12.75C25.251 -0.25098 46.3297 -0.250978 59.3307 12.75L255.5 208.919L451.669 12.75C464.67 -0.250965 485.749 -0.25098 498.75 12.75C511.751 25.7509 511.751 46.8297 498.75 59.8306L302.581 256L498.75 452.169C511.751 465.17 511.751 486.249 498.75 499.25C485.749 512.251 464.67 512.251 451.669 499.25L255.5 303.081L59.3307 499.25C46.3297 512.251 25.251 512.251 12.25 499.25C-0.75095 486.249 -0.750947 465.17 12.25 452.169L208.419 256L12.25 59.8306C-0.750947 46.8297 -0.75095 25.7509 12.25 12.75Z"
			fill={color}
		/>
	</StyledIcon>
);

export { CancelIcon };
