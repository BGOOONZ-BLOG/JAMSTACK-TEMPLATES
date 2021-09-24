import Head from "next/head";
import { useIntl } from "react-intl";
import { BASE_URL } from "config";
import Thumbnail from "assets/thumbnail.jpg";

export default ({
	title,
	description,
	localizedTitle,
	localizedDescription,
	location = "",
	cover,
	seoDetails
}) => {
	const { formatMessage } = useIntl();

	return (
		<Head>
			{seoDetails?.lookAndFeel?.seo?.favicon && (
				<link
					rel="shortcut icon"
					type="image/x-icon"
					href={`https://res.cloudinary.com/helloiamelliot/${seoDetails.lookAndFeel.seo.favicon}`}
				/>
			)}
			<meta
				name="title"
				content={
					title
						? localizedTitle
							? formatMessage({ id: localizedTitle })
							: title
						: "Elliot Headless Pacakge"
				}
			/>
			<meta
				name="description"
				content={
					description
						? localizedDescription
							? formatMessage({ id: localizedDescription })
							: description
						: "Elliot - Serverless eCommerce Storefront. 100% headless & serverless. Built with Next js & one-click deployable to ZEIT NOW."
				}
			/>
			<meta
				name="image"
				content={cover ? `${BASE_URL}/${cover}` : `${BASE_URL}/${Thumbnail}`}
			/>

			<meta property="og:url" content={`${BASE_URL}/${location}`} />
			<meta property="og:type" content="website" />
			<meta
				property="og:title"
				content={
					title
						? localizedTitle
							? formatMessage({ id: localizedTitle })
							: title
						: "Elliot Headless Package"
				}
			/>
			<meta
				property="og:description"
				content={
					description
						? localizedDescription
							? formatMessage({ id: localizedDescription })
							: description
						: "Elliot - Serverless eCommerce Storefront. 100% headless & serverless. Built with Next js & one-click deployable to ZEIT NOW."
				}
			/>
			<meta property="og:image" content={cover || `${BASE_URL}/${Thumbnail}`} />
			{/* <meta property="fb:app_id" content={social.facebook} /> */}

			<meta name="twitter:card" content="summary" />
			{seoDetails?.lookAndFeel?.seo?.twitter_tittle && (
				<>
					<meta
						name="twitter:creator"
						content={seoDetails.lookAndFeel.seo.twitter_account_id}
					/>
					<meta
						name="twitter:site"
						content={seoDetails.lookAndFeel.seo.twitter_tittle}
					/>
				</>
			)}
			<meta
				name="twitter:title"
				content={
					title
						? localizedTitle
							? formatMessage({ id: localizedTitle })
							: title
						: seoDetails?.lookAndFeel?.seo?.twitter_tittle
						? seoDetails.lookAndFeel.seo.twitter_tittle
						: "Elliot Headless Pacakge"
				}
			/>
			<meta
				name="twitter:description"
				content={
					description
						? localizedDescription
							? formatMessage({ id: localizedDescription })
							: description
						: "Elliot - Serverless eCommerce Storefront. 100% headless & serverless. Built with Next js & one-click deployable to ZEIT NOW."
				}
			/>
			<meta
				name="twitter:image:src"
				content={cover || `${BASE_URL}/${Thumbnail}`}
			/>
			{/* <link rel="publisher" href={socialLinks.google} /> */}
			<title>
				{title
					? localizedTitle
						? formatMessage({ id: localizedTitle })
						: title
					: "Elliot Headless Pacakge"}
			</title>
		</Head>
	);
};
