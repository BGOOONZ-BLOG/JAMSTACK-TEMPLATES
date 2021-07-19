'use strict';

const BroccoliPostCSS = require('broccoli-postcss');

module.exports = {
  name: require('./package').name,
  options: {
    nodeAssets: {
      'weather-icons': {
        vendor: {
          include: ['css/weather-icons.css', 'css/weather-icons-wind.css'],
          processTree(input) {
            return new BroccoliPostCSS(input, {
              plugins: [{
                module: require('postcss-url'),
                options: {
                  url(originalUrl) {
                    return originalUrl.url.replace(/^\.\.\/font/, '../fonts');
                  },
                },
              }],
            });
          },
        },
        public: {
          srcDir: 'font',
          destDir: './fonts',
          include: ['*'],
        },
      },
    },
  },
  included(app) {
    this._super.included(app);
    app.import('vendor/weather-icons/css/weather-icons.css');
    app.import('vendor/weather-icons/css/weather-icons-wind.css');
  }
};
