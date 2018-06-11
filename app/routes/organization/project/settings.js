import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {hash} from 'rsvp';
import {inject as service} from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  flashMessages: service(),

  model() {
    const project = this.modelFor('organization.project');
    const organization = this.modelFor('organization');
    const projects = this.store.query('project', {organization: organization});
    const browserFamilies = this.get('store').findAll('browserFamily');

    return hash({organization, project, projects, browserFamilies});
  },

  _removeProjectBrowserTargetForFamily(familyToRemove, project) {
    const projectBrowserTargetForFamily = project.get('projectBrowserTargets').find(function(pbt) {
      return pbt.get('browserTarget.browserFamily.id') === familyToRemove.get('id');
    });

    projectBrowserTargetForFamily.destroyRecord();
  },

  _addProjectBrowserTargetForFamily(familyToAdd, project) {
    const newProjectBrowserTarget = this.get('store').createRecord('projectBrowserTarget', {
      project,
      _browserFamily: familyToAdd,
    });

    newProjectBrowserTarget.save();
  },

  actions: {
    projectUpdated(project) {
      // If project slug changed, redirect to new URL slug:
      let projectSlug = project.get('slug');
      let organizationSlug = project.get('organization.slug');
      this.transitionTo('organization.project.index', organizationSlug, projectSlug);
    },

    updateProjectBrowserTargets(targetFamily) {
      const project = this.modelFor(this.routeName).project;
      const projectBrowserTargetsForProject = project.get('projectBrowserTargets');
      const existingBrowserTargets = projectBrowserTargetsForProject.mapBy('browserTarget');

      const existingBrowserTargetsByFamilyId = existingBrowserTargets.reduce(
        (acc, browserTarget) => {
          acc[browserTarget.get('browserFamily.id')] = browserTarget;
          return acc;
        },
        {},
      );

      const projectHasBrowserFamily = targetFamily.get('id') in existingBrowserTargetsByFamilyId;

      if (projectHasBrowserFamily) {
        if (existingBrowserTargets.get('length') === 1) {
          this.get('flashMessages').info('A project must have at least one browser');
          return;
        }
        this._removeProjectBrowserTargetForFamily(targetFamily, project);
      } else {
        this._addProjectBrowserTargetForFamily(targetFamily, project);
      }
    },
  },
});
