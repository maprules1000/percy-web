import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {hash} from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
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

    updateProjectBrowserTargets(targetFamily) {
      const project = this.modelFor(this.routeName).project;
      const existingBrowserTargets = project.get('browserTargets');
      const browserTargetsByFamilyId = {}

      // TODO why doesn't this relationship work?
      const allProjectBrowserTargets = this.get('store').peekAll('projectBrowserTarget');
      const projectBrowserTargetsForProject = allProjectBrowserTargets.filterBy('project.id', project.get('id'))

      existingBrowserTargets.forEach((browserTarget) => {
        browserTargetsByFamilyId[browserTarget.get('browserFamily.id')] = browserTarget;
      });

      console.log(browserTargetsByFamilyId)
      if (targetFamily.get('id') in browserTargetsByFamilyId) {
        console.log('remove it')
        if (existingBrowserTargets.get('length') === 1) {
          console.log('cant have no browsers')
          return;
        }

        const projectBrowserTargetForFamily = projectBrowserTargetsForProject.find(function(pbt) {
          return pbt.get('browserTarget.browserFamily.id') === targetFamily.get('id');
        });

        projectBrowserTargetForFamily.destroyRecord();
        // remove it
      } else {
        console.log('add it')
        const newProjectBrowserTarget = this.get('store').createRecord('projectBrowserTarget', {
          project,
          _browserFamily: targetFamily,
        });

        newProjectBrowserTarget.save();
      }
      // if project has browser target in family already, remove it
      // If project does not have it already, add it
    }
  },
});
