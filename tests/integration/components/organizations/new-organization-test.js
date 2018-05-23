import {expect} from 'chai';
import {describe, it} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | organizations/new-organization', function() {
  setupComponentTest('organizations/new-organization', {
    integration: true,
  });

  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#organizations/new-organization}}
    //     template content
    //   {{/organizations/new-organization}}
    // `);

    this.render(hbs`{{organizations/new-organization}}`);
    expect(this.$()).to.have.length(1);
  });
});
