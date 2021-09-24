import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/b" as="/a">
          <a>a</a>
        </Link>
      </li>
    </ul>
  );
}
