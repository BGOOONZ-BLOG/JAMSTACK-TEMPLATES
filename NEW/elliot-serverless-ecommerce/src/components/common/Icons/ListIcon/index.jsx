import StyledIcon from "components/common/StyledIcon";

const ListIcon = ({ width = 24, height = 24, color = "#222" }) => (
	<StyledIcon
		width={width}
		height={height}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 24.0545C0 12.9787 8.9787 4 20.0545 4H491.945C503.021 4 512 12.9787 512 24.0545V211.346C512 222.422 503.021 231.401 491.945 231.401H20.0545C8.9787 231.401 0 222.422 0 211.346V24.0545ZM40.109 44.109V191.292H471.891V44.109H40.109Z"
			fill={color}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 299.262C0 288.071 9.07139 279 20.2615 279H491.738C502.929 279 512 288.071 512 299.262V488.487C512 499.677 502.929 508.748 491.738 508.748H20.2615C9.07139 508.748 0 499.677 0 488.487V299.262ZM40.5231 319.523V468.225H471.477V319.523H40.5231Z"
			fill={color}
		/>
	</StyledIcon>
);

export { ListIcon };
