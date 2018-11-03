'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {});

  app.import('node_modules/secure-ls/dist/secure-ls.js', {
    using: [{ transformation: 'amd', as: 'secure-ls' }]
  });

  return app.toTree();
};
