var proxy = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    title: `Tyler Menezes`,
    description: `Tyler Menezes helps get kids interested in coding.`,
    author: `@gatsbyjs`,
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        //icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
  ],

    developMiddleware: app => {
      app.use(
        "/.netlify/functions/",
        proxy({
          target: "http://localhost:9000",
          pathRewrite: {
            "/.netlify/functions/": "",
          },
        })
      )
    },
}
