import styled from "styled-components";

const Title = styled.h1`
	color: ${({ theme }) => theme.colors.primary};
`;

export default function A() {
	return (
		<div className="p-4 shadow rounded bg-white">
			<Title className="leading-normal">Next.js</Title>
			<p className="text-gray-500">with Tailwind CSS</p>
			<img src="/images/water.jpg" width="200" height="200" loading="lazy" />
		</div>
	);
}
