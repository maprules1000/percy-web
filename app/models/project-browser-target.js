import DS from 'ember-data';

export default DS.Model.extend({
  browserTarget: DS.belongsTo('browserTarget', {async: false}),
  project: DS.belongsTo('project', {async: false}),
  _browserFamily: DS.belongsTo('browserFamily', {async: false, inverse: null}),
});
