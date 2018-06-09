import DS from 'ember-data';

export default DS.Model.extend({
  browserTarget: DS.belongsTo('browserTarget', {async: false, inverse: null}),
  project: DS.belongsTo('project', {async: false, inverse: null}),
  _browserFamily: DS.belongsTo('browserFamily', {async: false}),
});
