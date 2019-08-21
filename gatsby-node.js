const path = require(`path`);

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        system: path.resolve(__dirname, 'src/system'),
        theme: path.resolve(__dirname, 'src/theme'),
        components: path.resolve(__dirname, 'src/components'),
        blocks: path.resolve(__dirname, 'src/blocks'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        templates: path.resolve(__dirname, 'src/templates'),
        utils: path.resolve(__dirname, 'src/utils'),
        img: path.resolve(__dirname, 'src/img'),
      },
    },
  });
};
