/*eslint sort-keys: 0*/
/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of talks & videos */

const videoTypes = {
  YOUTUBE: 'youtube',
  IFRAME: 'iframe',
};

const videos = [
  {
    title: 'Rogelio Guzman - Jest Snapshots and Beyond - React Conf 2017',
    type: videoTypes.YOUTUBE,
    url: 'https://www.youtube.com/embed/HAuXJVI_bUs',
    description:
      '[Rogelio](https://twitter.com/rogeliog) shows how Jest might help you overcome the inertia to write & maintain tests with the help of a simple React Application.',
  },
  {
    title: 'Snapshot testing - Anna Doubkova, React London 2017',
    type: videoTypes.YOUTUBE,
    url: 'https://www.youtube.com/embed/sCbGfi40IWk',
    description:
      'In this talk, [Anna Doubkova](https://twitter.com/lithinn) explains Snapshot Testing in brief while also highlighting testing pitfalls.',
  },
  {
    title: 'Test React applications using Enzyme & Jest',
    type: videoTypes.YOUTUBE,
    url: 'https://www.youtube.com/embed/8Ww2QBVIw0I',
    description:
      'This talk by [Ryan Walsh](https://twitter.com/_rtwalsh) gives an introduction to testing [React](https://facebook.github.io/react/) components using [Enzyme](http://airbnb.io/enzyme/) and Jest.',
  },
];

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'Facebook',
    image: '/jest/img/logos/facebook.png',
    infoLink: 'https://code.facebook.com',
    pinned: true,
  },
  {
    caption: 'Oculus',
    image: '/jest/img/logos/oculus.png',
    infoLink: 'https://www.oculus.com/',
    pinned: true,
  },
  {
    caption: 'Instagram',
    image: '/jest/img/logos/instagram.png',
    infoLink: 'https://www.instagram.com/',
    pinned: true,
  },
  {
    caption: 'Twitter',
    image: '/jest/img/logos/twitter.png',
    infoLink: 'https://www.twitter.com',
    pinned: true,
  },
  {
    caption: 'Pinterest',
    image: '/jest/img/logos/pinterest.png',
    infoLink: 'https://www.pinterest.com',
    pinned: true,
  },
  {
    caption: 'The New York Times',
    image: '/jest/img/logos/nyt.png',
    infoLink: 'http://www.nytimes.com/',
    pinned: true,
  },
  {
    caption: 'Airbnb',
    image: '/jest/img/logos/airbnb.svg',
    infoLink: 'https://www.airbnb.com/',
  },
  {
    caption: 'IBM',
    image: '/jest/img/logos/ibm.png',
    infoLink: 'http://www.ibm.com/',
  },
  {
    caption: 'ebay',
    image: '/jest/img/logos/ebay.png',
    infoLink: 'http://www.ebay.com/',
  },
  {
    caption: 'PayPal',
    image: '/jest/img/logos/paypal.png',
    infoLink: 'https://www.paypal.com',
  },
  {
    caption: 'Spotify',
    image: '/jest/img/logos/spotify.png',
    infoLink: 'https://www.spotify.com',
  },
  {
    caption: 'Target',
    image: '/jest/img/logos/target.png',
    infoLink: 'http://www.target.com',
  },
  {
    caption: 'Intuit',
    image: '/jest/img/logos/intuit.png',
    infoLink: 'https://www.intuit.com/',
  },
  {
    caption: 'Cisco',
    image: '/jest/img/logos/cisco.png',
    infoLink: 'http://www.cisco.com/',
  },
  {
    caption: 'Algolia',
    image: '/jest/img/logos/algolia.svg',
    infoLink: 'https://algolia.com',
  },
  {
    caption: 'Artsy',
    image: '/jest/img/logos/artsy.png',
    infoLink: 'https://www.artsy.net/',
  },
  {
    caption: 'Audiense',
    image: '/jest/img/logos/audiense.png',
    infoLink: 'https://audiense.com/',
  },
  {
    caption: 'Automattic',
    image: '/jest/img/logos/automattic.png',
    infoLink: 'https://automattic.com/',
  },
  {
    caption: 'Coinbase',
    image: '/jest/img/logos/coinbase.png',
    infoLink: 'https://www.coinbase.com/',
  },
  {
    caption: 'Coursera',
    image: '/jest/img/logos/coursera.png',
    infoLink: 'https://coursera.org/',
  },
  {
    caption: 'Deezer',
    image: '/jest/img/logos/deezer.png',
    infoLink: 'https://www.deezer.com/',
  },
  {
    caption: 'Discord',
    image: '/jest/img/logos/discord.png',
    infoLink: 'https://discordapp.com/',
  },
  {
    caption: 'Egghead',
    image: '/jest/img/logos/egghead.png',
    infoLink: 'https://egghead.io/',
  },
  {
    caption: 'Elastic',
    image: '/jest/img/logos/elastic.png',
    infoLink: 'https://www.elastic.co/',
  },
  {
    caption: 'Formidable',
    image: '/jest/img/logos/formidablelabs.png',
    infoLink: 'http://formidable.com/',
  },
  {
    caption: 'Giant Machines',
    image: '/jest/img/logos/giantmachines.png',
    infoLink: 'https://www.giantmachines.com',
  },
  {
    caption: 'Globo',
    image: '/jest/img/logos/globo.png',
    infoLink: 'http://www.globo.com/',
  },
  {
    caption: 'Hearsay Systems',
    image: '/jest/img/logos/hearsaysystems.png',
    infoLink: 'https://hearsaysystems.com/company/careers/',
  },
  {
    caption: 'Help.com',
    image: '/jest/img/logos/Help-Clean.png',
    infoLink: 'https://help.com',
  },
  {
    caption: 'Hudl',
    image: '/jest/img/logos/hudl.png',
    infoLink: 'https://www.hudl.com/',
  },
  {
    caption: 'Intercom',
    image: '/jest/img/logos/intercom.png',
    infoLink: 'https://www.intercom.com/',
  },
  {
    caption: 'Jane',
    image: '/jest/img/logos/jane.svg',
    infoLink: 'https://jane.com',
  },
  {
    caption: 'Kickstarter',
    image: '/jest/img/logos/kickstarter.png',
    infoLink: 'https://www.kickstarter.com',
  },
  {
    caption: 'KLM Royal Dutch Airlines',
    image: '/jest/img/logos/klm.png',
    infoLink: 'https://www.klm.com/',
  },
  {
    caption: 'NHL',
    image: '/jest/img/logos/nhl.png',
    infoLink: 'https://www.nhl.com/',
  },
  {
    caption: 'Quiqup',
    image: '/jest/img/logos/quiqup.png',
    infoLink: 'https://www.quiqup.com/',
  },
  {
    caption: 'Reddit',
    image: '/jest/img/logos/reddit.png',
    infoLink: 'https://www.reddit.com/',
  },
  {
    caption: 'SeatGeek',
    image: '/jest/img/logos/seatgeek.png',
    infoLink: 'https://seatgeek.com/',
  },
  {
    caption: 'Shopify',
    image: '/jest/img/logos/shopify.svg',
    infoLink: 'https://www.shopify.com/',
  },
  {
    caption: 'SoundCloud',
    image: '/jest/img/logos/soundcloud.png',
    infoLink: 'https://soundcloud.com/',
  },
  {
    caption: 'Sprout Social',
    image: '/jest/img/logos/sproutsocial.png',
    infoLink: 'https://sproutsocial.com/',
  },
  {
    caption: 'Squarespace',
    image: '/jest/img/logos/squarespace.png',
    infoLink: 'https://squarespace.com/',
  },
  {
    caption: 'Trivago',
    image: '/jest/img/logos/trivago.png',
    infoLink: 'http://www.trivago.com/',
  },
  {
    caption: 'Truffls',
    image: '/jest/img/logos/truffls.png',
    infoLink: 'https://truffls.com/',
  },
  {
    caption: 'WOW air',
    image: '/jest/img/logos/wowair.png',
    infoLink: 'https://wowair.com/',
  },
  {
    caption: 'Xing',
    image: '/jest/img/logos/xing.png',
    infoLink: 'https://www.xing.com/',
  },
];

const repoUrl = 'https://github.com/facebook/jest';

const siteConfig = {
  title: 'Jest',
  tagline: '🃏 Delightful JavaScript Testing',
  url: 'https://facebook.github.io',
  baseUrl: '/jest/',
  projectName: 'jest',
  repo: 'facebook/jest',
  users,
  videos,
  videoTypes,
  editUrl: repoUrl + '/edit/master/docs/',
  headerLinks: [
    {doc: 'getting-started', label: 'Docs'},
    {doc: 'api', label: 'API'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
    {languages: true},
    {search: true},
    {href: repoUrl, label: 'GitHub'},
  ],
  headerIcon: 'img/jest.svg',
  footerIcon: 'img/jest-outline.svg',
  favicon: 'img/favicon/favicon.ico',
  ogImage: 'img/opengraph.png',
  recruitingLink: 'https://crowdin.com/project/jest',
  algolia: {
    apiKey: process.env.ALGOLIA_JEST_API_KEY,
    indexName: 'jest',
  },
  gaTrackingId: 'UA-44373548-17',
  colors: {
    primaryColor: '#99424f',
    secondaryColor: '#7f2c39',
    prismColor: 'rgba(153, 66, 79, 0.03)',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  repoUrl,
  siteConfigUrl:
    'https://github.com/facebook/jest/edit/master/website/siteConfig.js',
};

module.exports = siteConfig;
