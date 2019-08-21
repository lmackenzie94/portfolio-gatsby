// do logic based on whether this is a production build
const isProduction = process.env.NODE_ENV === `production`;
const analyticsEnabled =
  process.env.GOOGLE_ANALYTICS_ID !== undefined &&
  process.env.GOOGLE_ANALYTICS_ID.length > 0;

const fonts = require('./src/utils/fonts').getFonts(`./static/fonts`).fonts;
const fontsHeaders = fonts.map(
  ({ url, extension }) =>
    `Link: <${url}>; rel=preload; as=font; type=font/${extension}; crossorigin=anonymous`
);

let plugins = [
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-transformer-remark`,
  `gatsby-plugin-catch-links`,
  {
    resolve: `gatsby-plugin-netlify`,
    options: {
      allPageHeaders: [...fontsHeaders],
    },
  },
  `gatsby-plugin-netlify-cache`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Friends & Enemies`,
      short_name: `F & E`,
      start_url: `/`,
      background_color: `#FFFFFF`,
      theme_color: `#222222`,
      display: `browser`,
      crossOrigin: `use-credentials`,
      icon: `static/img/icon.png`,
    },
  },
  `gatsby-plugin-sitemap`,
];

if (analyticsEnabled) {
  plugins.unshift({
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: config.siteUrl,
      env: {
        development: {
          policy: [{ userAgent: '*', disallow: ['/'] }],
        },
        production: {
          policy: [{ userAgent: '*', disallow: ['/'] }],
        },
      },
    },
  });

  plugins.unshift({
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: [process.env.GOOGLE_ANALYTICS_ID],
      pluginConfig: {
        head: false,
        respectDNT: true,
      },
    },
  });
}

module.exports = {
  siteMetadata: {
    title: `CJ Gatsby Boilerplate With Theme UI`,
    siteUrl: `https://cjgatsbyboilerplatethemeui.netlify.com`,
  },
  plugins,
};
