import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Unsplash from "unsplash-js";
import styles from "styles/Home.module.scss";
import shimmer, { toBase64 } from "utils/shimmer";

type CollectionProps = {
	photos: {
		id: string;
		urls: { full: string };
		width: number;
		height: number;
		// blur_hash: string; I wish if this gets added to the Next js image component as a prop
	}[];
};

const Collection = ({ photos }: CollectionProps) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<Link href="/">
				<a className={styles.link}>Go back</a>
			</Link>
			{photos.map(({ id, urls, width, height }) => (
				<div key={id} className={styles.card}>
					<Image
						src={urls.full}
						width={width}
						height={height}
						alt=""
						blurDataURL={`data:image/svg+xml;base64,${toBase64(
							shimmer(700, 475)
						)}`}
						placeholder="blur"
					/>
				</div>
			))}
		</div>
	);
};

export default Collection;

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: [],
	fallback: "blocking",
});

export const getStaticProps: GetStaticProps = async (ctx) => {
	if (!process.env.APP_ACCESS_KEY) {
		throw new Error("APP_ACCESS_KEY missing");
	}

	if (!ctx.params?.id) {
		throw new Error("id missing");
	}

	const unsplash = new Unsplash({
		accessKey: process.env.APP_ACCESS_KEY,
	});

	const data = await unsplash.collections.getCollectionPhotos(
		Number(ctx.params.id)
	);
	const photos = await data.json();

	return {
		props: {
			photos,
		},
		revalidate: 2,
	};
};
