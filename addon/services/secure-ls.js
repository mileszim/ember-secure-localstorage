import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import SecureLS from 'secure-ls';

export default Service.extend({
  secureLS: null,
  localKeyPrefix: 'default-',

  // Options
  encodingType: 'aes', // ['', 'base64', 'aes', 'rc4', 'rabbit'],
  isCompression: false, // [true, false]
  encryptionSecret: null,

  init() {
    this._super(...arguments);

    const defaultOptions = this.getProperties([
      'encodingType',
      'isCompression',
      'encryptionSecret'
    ]);
    this.set('secureLS', new SecureLS(defaultOptions));

    const appName = getOwner(this).lookup('config:environment').modulePrefix;
    this.set('localKeyPrefix', `${appName}-`);
  },

  saveRecord(key, data) {
    return this.get('secureLS').set(_prefixKey(key), data);
  },

  findRecord(key) {
    return this.get('secureLS').get(_prefixKey(key));
  },

  destroy(key) {
    return this.get('secureLS').remove(_prefixKey(key));
  },

  findAllRecordKeys() {
    const { secureLS, localKeyPrefix } = this.getProperties('secureLS', 'localKeyPrefix');
    return secureLS.getAllKeys().map(k => k.replace(localKeyPrefix, ''));
  },

  wipeStorage() {
    return this.get('secureLS').removeAll();
  },

  wipeDomainStorage() {
    return this.get('secureLS').clear();
  },

  _prefixKey(key) {
    return this.get('localKeyPrefix') + key;
  }
});
