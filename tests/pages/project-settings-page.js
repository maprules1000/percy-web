import {visitable, create} from 'ember-cli-page-object';
import {SettingsNavWrapper} from 'percy-web/tests/pages/components/organizations/settings-nav-wrapper'; // eslint-disable-line
import {ProjectEdit} from 'percy-web/tests/pages/components/forms/project-edit';
import {alias} from 'ember-cli-page-object/macros';
import {BrowserFamilySelector} from 'percy-web/tests/pages/components/projects/browser-family-selector'; // eslint-disable-line
import {dialog} from 'percy-web/tests/pages/components/dialogs';

export const ProjectSettingsPage = {
  visitProjectSettings: visitable('/:orgSlug/:projectSlug/settings'),

  sideNav: SettingsNavWrapper,
  projectLinks: alias('sideNav.projectLinks'),

  projectEditForm: ProjectEdit,

  isAutoApproveBranchesVisible: alias('projectEditForm.isAutoApproveBranchesVisible'),

  browserSelector: BrowserFamilySelector,
  browserToggleConfirmationDialog: dialog,
  browserToggleConfirmationText: alias('browserToggleConfirmationDialog.message.text'),
  clickOkBrowserToggleConfirmation: alias('browserToggleConfirmationDialog.buttonOk.click'),
  clickCancelBrowserToggleConfirmation: alias('browserToggleConfirmationDialog.buttonCancel'),
};

export default create(ProjectSettingsPage);
