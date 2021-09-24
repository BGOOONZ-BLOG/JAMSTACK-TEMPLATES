const MapPin = ({ width = 24, height = 24 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={width}
		height={height}
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
		<circle cx="12" cy="10" r="3" />
	</svg>
);

export { MapPin };
