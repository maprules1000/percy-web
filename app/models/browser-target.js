import DS from 'ember-data';

export default DS.Model.extend({
  browserFamily: DS.belongsTo('browserFamily', {async: false, inverse: null}),
  // operatingSystemId: DS.attr(),
  versionTarget: DS.attr(),
});
