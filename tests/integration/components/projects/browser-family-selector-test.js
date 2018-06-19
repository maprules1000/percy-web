import {it, describe, beforeEach} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import setupFactoryGuy from 'percy-web/tests/helpers/setup-factory-guy';
import {make} from 'ember-data-factory-guy';
import sinon from 'sinon';
import BrowserFamilySelector from 'percy-web/tests/pages/components/projects/browser-family-selector'; // eslint-disable-line

describe('Integration: BrowserFamilySelector', function() {
  setupComponentTest('projects/browser-family-selector', {
    integration: true,
  });

  let chromeBrowserTarget;
  let firefoxBrowserTarget;
  let project;

  beforeEach(function() {
    setupFactoryGuy(this.container);
    BrowserFamilySelector.setContext(this);

    const firefoxBrowserFamily = make('browser-family');
    const chromeBrowserFamily = make('browser-family', 'chrome');
    project = make('project');
    chromeBrowserTarget = make('browser-target', {browserFamily: chromeBrowserFamily});
    firefoxBrowserTarget = make('browser-target', {browserFamily: firefoxBrowserFamily});

    const allBrowserFamilies = [chromeBrowserFamily, firefoxBrowserFamily];
    const removeProjectBrowserTargetForFamilyStub = sinon.stub();
    const addProjectBrowserTargetForFamilyStub = sinon.stub();

    this.setProperties({
      project,
      allBrowserFamilies,
      removeProjectBrowserTargetForFamilyStub,
      addProjectBrowserTargetForFamilyStub,
    });
  });

  it('shows chrome as selected when project has chrome browser_target', function() {
    make('project-browser-target', {
      project,
      browserTarget: chromeBrowserTarget,
    });

    this.render(hbs`{{projects/browser-family-selector
      allBrowserFamilies=allBrowserFamilies
      project=project
      removeProjectBrowserTargetForFamily=removeProjectBrowserTargetForFamilyStub
      addProjectBrowserTargetForFamily=addProjectBrowserTargetForFamilyStub
    }}`);

    expect(BrowserFamilySelector.chromeButton.isActive).to.equal(true);
    expect(BrowserFamilySelector.firefoxButton.isActive).to.equal(false);
  });

  it('shows firefox as selected when project has firefox browser target', function() {
    make('project-browser-target', {
      project,
      browserTarget: firefoxBrowserTarget,
    });

    this.render(hbs`{{projects/browser-family-selector
      allBrowserFamilies=allBrowserFamilies
      project=project
      removeProjectBrowserTargetForFamily=removeProjectBrowserTargetForFamilyStub
      addProjectBrowserTargetForFamily=addProjectBrowserTargetForFamilyStub
    }}`);

    expect(BrowserFamilySelector.chromeButton.isActive).to.equal(false);
    expect(BrowserFamilySelector.firefoxButton.isActive).to.equal(true);
  });

  it('shows both browsers as selected when project has both browser targets', function() {
    make('project-browser-target', {
      project,
      browserTarget: chromeBrowserTarget,
    });
    make('project-browser-target', {
      project,
      browserTarget: firefoxBrowserTarget,
    });
    this.render(hbs`{{projects/browser-family-selector
      allBrowserFamilies=allBrowserFamilies
      project=project
      removeProjectBrowserTargetForFamily=removeProjectBrowserTargetForFamilyStub
      addProjectBrowserTargetForFamily=addProjectBrowserTargetForFamilyStub
    }}`);

    expect(BrowserFamilySelector.chromeButton.isActive).to.equal(true);
    expect(BrowserFamilySelector.firefoxButton.isActive).to.equal(true);
  });
});
