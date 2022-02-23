import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the serverExtensionTest extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'serverExtensionTest:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension serverExtensionTest is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('serverExtensionTest settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for serverExtensionTest.', reason);
        });
    }

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The serverExtensionTest server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
