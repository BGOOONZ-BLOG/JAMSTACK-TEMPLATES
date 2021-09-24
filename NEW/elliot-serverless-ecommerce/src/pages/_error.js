import styled from "styled-components";
import Link from "next/link";
import Button from "components/common/Button";

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	> div {
		align-self: center;
		text-align: center;
	}
`;

const Error = ({ statusCode }) => (
	<Wrapper>
		<div>
			<p>
				{statusCode
					? `An error ${statusCode} - Occurred on server`
					: "An error occurred on client"}
			</p>
			<Link href="/[lang]/" as="/en/">
				<Button as="a" variant="primary">
					Back to Shop
				</Button>
			</Link>
		</div>
	</Wrapper>
);

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
