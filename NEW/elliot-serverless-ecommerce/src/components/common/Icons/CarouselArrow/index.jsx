import StyledIcon from "components/common/StyledIcon";

const CarouselArrow = ({ width = 24, height = 24, color = "#222" }) => (
	<StyledIcon
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		viewBox="0 0 792.033 792.033"
		hover="#fff"
	>
		<path
			fill={color}
			d="M617.858 370.896L221.513 9.705c-13.006-12.94-34.099-12.94-47.105 0-13.006 12.939-13.006 33.934 0 46.874l372.447 339.438-372.414 339.437c-13.006 12.94-13.006 33.935 0 46.874s34.099 12.939 47.104 0l396.346-361.191c6.932-6.898 9.904-16.043 9.441-25.087.431-9.078-2.54-18.222-9.474-25.154z"
		/>
	</StyledIcon>
);

export { CarouselArrow };
