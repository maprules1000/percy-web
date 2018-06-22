import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {hash} from 'rsvp';
import {inject as service} from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  dialogs: service(),
  model() {
    const project = this.modelFor('organization.project');
    const organization = this.modelFor('organization');
    const projects = this.store.query('project', {organization: organization});
    const browserFamilies = this.get('store').findAll('browserFamily');

    return hash({organization, project, projects, browserFamilies});
  },

  actions: {
    projectUpdated(project) {
      // If project slug changed, redirect to new URL slug:
      let projectSlug = project.get('slug');
      let organizationSlug = project.get('organization.slug');
      this.transitionTo('organization.project.index', organizationSlug, projectSlug);
    },

    removeProjectBrowserTargetForFamily(familyToRemove, project) {
      this.get('dialogs').confirm({
        message: `
          <h2 class="text-xl font-semibold mb-sm">Removing Browsers</h2>
          <p class="text-gray-400">Removing a browser from your project will reduce your snapshot usage.
          If you would like to add the browser back at some point in the future,
          the browser will be updated to our newest version of that browser,
          and the subsequent build will create a new baseline for that browser.</p>
        `,
        actionOk: () => {
          const projectBrowserTargetForFamily = project
            .get('projectBrowserTargets')
            .find(function(pbt) {
              return pbt.get('browserTarget.browserFamily.id') === familyToRemove.get('id');
            });
          projectBrowserTargetForFamily.destroyRecord();
        },
        actionCancel: () => {
          return;
        },
      });
    },

    addProjectBrowserTargetForFamily(familyToAdd, project) {
      this.get('dialogs').confirm({
        message: `
          <h2 class="text-xl font-semibold mb-sm">Project Browsers</h2>
          <p class="text-gray-400">Keep in mind: Adding a browser to your project will increase your snapshot usage.</p>
        `,
        actionOk: () => {
          const newProjectBrowserTarget = this.get('store').createRecord('projectBrowserTarget', {
            project,
            browserFamily: familyToAdd,
          });
          newProjectBrowserTarget.save();
        },
        actionCancel: () => {
          return;
        },
      });
    },
  },
});
