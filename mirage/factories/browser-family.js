import {Factory, trait} from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return `${i}`;
  },
  name: 'Firefox',
  slug: 'firefox',

  chrome: trait({
    name: 'Chrome',
    slug: 'chrome',
  }),

  firefox: trait({
    name: 'Firefox',
    slug: 'firefox',
  }),
});
