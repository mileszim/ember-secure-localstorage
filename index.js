'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);
    
    app.import('node_modules/secure-ls/dist/secure-ls.js', {
      using: [{ transformation: 'amd', as: 'secure-ls' }]
    });
  }
};
