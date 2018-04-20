/* jshint expr:true */
import {setupComponentTest} from 'ember-mocha';
import {beforeEach, it, describe} from 'mocha';
import {percySnapshot} from 'ember-percy';
import hbs from 'htmlbars-inline-precompile';
import {make} from 'ember-data-factory-guy';
import setupFactoryGuy from 'percy-web/tests/helpers/setup-factory-guy';

describe('Integration: OrganizationsBillingUsageGraph', function() {
  setupComponentTest('organizations/billing-usage-graph', {
    integration: true,
  });

  beforeEach(function() {
    setupFactoryGuy(this.container);
    this.set('organization', make('organization'));
  });

  it('renders', function(done) {
    this.render(hbs`{{organizations/billing-usage-graph organization=organization}}`);

    percySnapshot(this.test);
    done();
    // setTimeout(() => done(), 20000);
  });
});
