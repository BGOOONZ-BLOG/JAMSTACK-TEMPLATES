import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Unsplash from "unsplash-js";
import styles from "styles/Home.module.scss";
import shimmer, { toBase64 } from "utils/shimmer";

type Collections = {
	collections: {
		id: string;
		title: string;
		cover_photo: {
			urls: { full: string };
			width: number;
			height: number;
			// blur_hash: string;
		};
	}[];
};

const Home = ({ collections }: Collections) => (
	<div className={styles.container}>
		{collections.map(({ id, title, cover_photo }) => (
			<div key={id} className={styles.card}>
				<Link href={`/collection/${id}`}>
					<a className={styles.link}>{title}</a>
				</Link>
				<Link href={`/collection/${id}`}>
					<a>
						<Image
							src={cover_photo.urls.full}
							width={cover_photo.width}
							height={cover_photo.height}
							alt={title}
							placeholder="blur"
							blurDataURL={`data:image/svg+xml;base64,${toBase64(
								shimmer(700, 475)
							)}`}
						/>
					</a>
				</Link>
			</div>
		))}
	</div>
);

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	if (!process.env.APP_ACCESS_KEY) {
		throw new Error("APP_ACCESS_KEY missing");
	}

	const unsplash = new Unsplash({
		accessKey: process.env.APP_ACCESS_KEY,
	});

	const data = await unsplash.users.collections("smakosh");
	const collections = await data.json();

	return {
		props: {
			collections,
		},
		revalidate: 2,
	};
};
