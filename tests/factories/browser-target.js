import FactoryGuy from 'ember-data-factory-guy';
import faker from 'faker';

FactoryGuy.define('browser-target', {
  default: {
    browserFamily: () => {
      return FactoryGuy.make('browser-family');
    },
    versionTarget: faker.random.number,
  },
});
