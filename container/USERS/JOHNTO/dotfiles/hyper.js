module.exports = {
  config: {
    // default font size for all tabs
    fontSize: 20,

    // font family with optional fallbacks
    fontFamily: '"San Francisco Mono", Menlo, "DejaVu Sans Mono", "Lucida Console", monospace',

    // custom css to embed in the main window
    css: '',

    // custom css to embed inside each terminal
    termCSS: '',

    // some color overrides. see http://bit.ly/29k1iU2 for
    // the full list
    colors: {}
  },

  // a list of plugins to fetch and install from npm
  // format: [@org/]project[#version]
  // examples:
  //   `hypersolar`
  //   `@company/project`
  //   `project#1.0.1`
  plugins: [
    'hyperj',
    'hypercwd',
    'hyper-hide-title'
  ],

  // in development, you can create a directory under
  // `~/.hyperterm_modules/local/` and include it here
  // to load it and avoid it being `npm install`ed
  localPlugins: [
  ]
};
