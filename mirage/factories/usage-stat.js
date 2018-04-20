import {Factory} from 'ember-cli-mirage';

export default Factory.extend({
  total: 25123,
  dayStats: [
    ['2020-01-15', 20000],
    ['2020-01-16', 5000],
    ['2020-01-17', 123],
    ['2020-01-18', 0],
    ['2020-01-19', 0],
    ['2020-01-20', 0],
    ['2020-01-21', 0],
  ],
});
