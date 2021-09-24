import React from "react";
import { Wrapper } from "./styles";

export default ({ stars }) => (
	<Wrapper>
		{[1, 2, 3, 4, 5].map(item => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="13"
				fill="none"
				key={item}
			>
				<path
					fill={item <= stars ? "#f68773" : "#d2d2d2"}
					d="M7.2.7c.1-.2.5-.2.6 0l1.4 3.9.3.1 4.3.1c.3 0 .4.4.1.5l-3.4 2.4c0 .1-.1.2 0 .4l1.2 3.8c0 .3-.2.5-.5.3L7.7 10h-.4l-3.5 2.3c-.3.2-.5 0-.5-.3l1.3-3.8-.1-.4L1 5.3a.3.3 0 0 1 .1-.5h4.3c.2 0 .3-.1.3-.2L7.2.7z"
				/>
			</svg>
		))}
	</Wrapper>
);
