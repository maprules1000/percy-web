import Contentful from 'ember-data-contentful/models/contentful';
import DS from 'ember-data';

export default Contentful.extend({
  contentType: 'customerLogoBlock',

  customerLogos: DS.hasMany('customer-logo'),
});
