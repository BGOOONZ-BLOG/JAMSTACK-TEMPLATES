import StyledIcon from "components/common/StyledIcon";

const MenuIcon = ({ width = 24, height = 24, color = "#222" }) => (
	<StyledIcon
		width={width}
		height={height}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 355"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 19.6923C0 8.81655 8.81655 0 19.6923 0H492.308C503.183 0 512 8.81655 512 19.6923C512 30.5681 503.183 39.3846 492.308 39.3846H19.6923C8.81655 39.3846 0 30.5681 0 19.6923Z"
			fill={color}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 177.231C0 166.355 8.81655 157.538 19.6923 157.538H492.308C503.183 157.538 512 166.355 512 177.231C512 188.107 503.183 196.923 492.308 196.923H19.6923C8.81655 196.923 0 188.107 0 177.231Z"
			fill={color}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 334.769C0 323.893 8.81655 315.077 19.6923 315.077H492.308C503.183 315.077 512 323.893 512 334.769C512 345.645 503.183 354.462 492.308 354.462H19.6923C8.81655 354.462 0 345.645 0 334.769Z"
			fill={color}
		/>
	</StyledIcon>
);

export { MenuIcon };
