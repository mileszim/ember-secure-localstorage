/* eslint-env node */
module.exports = {
  description: require('../../package').description,

  // locals(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall(options) {
    return this.addPackageToProject('secure-ls');
  }
};
