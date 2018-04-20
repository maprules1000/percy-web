import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('subscription', {
  default: {
    name: f => `Subscription ${f.id}`,
    currentUsageStats: FactoryGuy.belongsTo('usage-stat'),
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
  },
});
