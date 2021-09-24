import Link from "next/link";
import { Flex } from "./styles";

const Repo = ({ item }) => (
  <li>
    <div>
      <Flex>
        <Link as={`/repo/${item.name}`} href="/repo/[name]">
          <a>
            <h1>{item.name}</h1>
          </a>
        </Link>
        <a href={item.url}>Visit on GitHub</a>
      </Flex>
      <p>Stars: {item.stargazers?.totalCount}</p>
      <p>Forks: {item.forks?.totalCount}</p>
    </div>
  </li>
);

export default Repo;
