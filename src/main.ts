import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {getAppGithubModule} from './app-github/app-github.module';
import {getAppTodoModule} from './app-todo/app-todo.module';
import {getAppCalendarEventListModule} from './app-calendar-event-list/app-calendar-event-list.module';

export const run = (portletName: string, portletNamespace: string, portletConfigurationUrl: string, translationsUrl: string) => {
  let appModule: any;
  switch (portletName) {
    case 'calendar_event_list':
      appModule = getAppCalendarEventListModule(portletName, portletNamespace, portletConfigurationUrl, translationsUrl);
      break;
    case 'github':
      appModule = getAppGithubModule(portletName, portletNamespace, portletConfigurationUrl, translationsUrl);
      break;
    case 'todo':
      appModule = getAppTodoModule(portletName, portletNamespace, portletConfigurationUrl, translationsUrl);
      break;
    default:
      console.log(`Invalid portlet name: ${portletName}`)

  }
  platformBrowserDynamic()
    .bootstrapModule(appModule)
    .then(success => console.log(`Bootstraped for portlet name: ${portletName}`))
    .catch((error: Error) => console.error(error));
};





