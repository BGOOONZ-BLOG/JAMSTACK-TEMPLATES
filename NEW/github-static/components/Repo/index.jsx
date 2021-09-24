import Link from "next/link";
import { useRouter } from "next/router";
import SEO from "../common/SEO";
import { Section, Flex } from "./styles";

const Employee = ({ name, stargazers, forks }) => {
	const router = useRouter();

	if (router.isFallback) return <div>Loading</div>;

	return (
		<Section>
			<SEO title={name} />
			<ul>
				<li>
					<div>
						<Flex>
							<h1>{name}</h1>
						</Flex>
						<p>Stars: {stargazers.totalCount}</p>
						<p>Forks: {forks.totalCount}</p>
					</div>
				</li>
			</ul>
			<Link as="/" href="/">
				<a>Back home</a>
			</Link>
		</Section>
	);
};

export default Employee;
