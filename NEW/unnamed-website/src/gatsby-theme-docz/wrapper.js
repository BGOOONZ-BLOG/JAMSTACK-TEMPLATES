import React from "react";
import { Helmet } from "react-helmet";
import "unnamed";
import "./main.css";
import data from "./data";

export default ({
  children,
  doc: {
    value: { name, route }
  }
}) => {
  const structuredDataOrganization = `{
  	"@context": "http://schema.org",
  	"@type": "Organization",
  	"legalName": "${data.legalName}",
  	"url": "${data.url}",
  	"logo": "${data.logo}",
  	"foundingDate": "${data.foundingDate}",
  	"founders": [{
  		"@type": "Person",
  		"name": "${data.legalName}"
  	}],
  	"contactPoint": [{
  		"@type": "ContactPoint",
  		"email": "${data.contact.email}",
  		"telephone": "${data.contact.phone}",
  		"contactType": "customer service"
  	}],
  	"address": {
  		"@type": "PostalAddress",
  		"addressLocality": "${data.address.city}",
  		"addressRegion": "${data.address.region}",
  		"addressCountry": "${data.address.country}",
  		"postalCode": "${data.address.zipCode}"
  	},
  	"sameAs": [
  		"${data.socialLinks.twitter}",
  		"${data.socialLinks.github}"
  	]
  }`;
  return (
    <>
      <Helmet>
        <html lang="en" dir="ltr" />
        <link rel="shortcut icon" href={data.favicon} />

        <meta name="robots" content="index, follow" />
        <meta name="description" content={data.description} />
        <meta name="image" content={data.cover} />

        <meta property="og:url" content={`${data.url}${route}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={name || data.defaultTitle} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.cover} />
        <meta property="fb:app_id" content={data.social.facebook} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={data.socialLinks.twitter} />
        <meta name="twitter:site" content={data.socialLinks.twitter} />
        <meta name="twitter:title" content={name || data.defaultTitle} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image:src" content={data.cover} />
        <script type="application/ld+json">{structuredDataOrganization}</script>
        <title>{name || data.defaultTitle}</title>
      </Helmet>
      {children}
    </>
  );
};
