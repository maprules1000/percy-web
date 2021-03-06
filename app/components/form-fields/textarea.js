import {computed, get} from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  changeset: null,
  title: null,
  property: null,
  autofocus: false,
  classes: null,

  classNames: ['FormFieldsTextarea'],
  classNameBindings: ['classes'],

  fieldErrors: computed('changeset.error', function() {
    return get(this.get('changeset.error'), this.get('property'));
  }),
});
