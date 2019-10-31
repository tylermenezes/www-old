var proxy = require("http-proxy-middleware");

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        SC_DISABLE_SPEEDY: true
      }),
    ],
  })
}

module.exports = {
  siteMetadata: {
    title: `Tyler Menezes`,
    description: `Tyler Menezes helps inspire students to fall in love with coding.`,
    author: `@gatsbyjs`,
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
            },
          }
        ]
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
