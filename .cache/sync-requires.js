const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/luke.mackenzie/Documents/personal/portfolio-/.cache/dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/luke.mackenzie/Documents/personal/portfolio-/src/pages/index.js"))),
  "component---src-pages-reference-js": hot(preferDefault(require("/Users/luke.mackenzie/Documents/personal/portfolio-/src/pages/reference.js")))
}

