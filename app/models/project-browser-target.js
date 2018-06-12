import DS from 'ember-data';

export default DS.Model.extend({
  browserTarget: DS.belongsTo('browserTarget', {async: false}),
  project: DS.belongsTo('project', {async: false}),
  // browserFamily relationship does not exist in the API and is therefore not populated,
  // but is used for creating new project-browser-target objects for a browser family.
  browserFamily: DS.belongsTo('browserFamily', {async: false, inverse: null}),
});
