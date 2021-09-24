module.exports = {
  plugins: [
    "gatsby-theme-docz",
    "gatsby-plugin-react-helmet",
    {
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: 'UA-106122837-1',
			}
		},
  ]
};
