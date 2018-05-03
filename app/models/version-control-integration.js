import {equal} from '@ember/object/computed';
import DS from 'ember-data';

const GITHUB_ENTERPRISE_INTEGRATION_TYPE = 'github_enterprise';
const GITHUB_INTEGRATION_TYPE = 'github';
const GITLAB_INTEGRATION_TYPE = 'gitlab';

export default DS.Model.extend({
  organization: DS.belongsTo('organization'),
  gitLabBotUser: DS.belongsTo('user'),
  githubInstallationId: DS.attr(),
  githubAccountAvatarUrl: DS.attr(),
  githubHtmlUrl: DS.attr(),
  integrationType: DS.attr(),
  githubEnterpriseHost: DS.attr(),
  githubEnterpriseInstallationId: DS.attr(),
  githubEnterpriseIntegrationId: DS.attr(),
  gitlabIntegrationId: DS.attr(),
  gitlabBotUserId: DS.attr(),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  isGithubIntegration: equal('integrationType', GITHUB_INTEGRATION_TYPE),
  isGithubEnterpriseIntegration: equal('integrationType', GITHUB_ENTERPRISE_INTEGRATION_TYPE),
  isGitlabIntegration: equal('integrationType', GITLAB_INTEGRATION_TYPE),
});
