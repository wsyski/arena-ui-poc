import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {getAppGithubModule} from './app-github/app-github.module';
import {getAppTodoModule} from './app-todo/app-todo.module';
import {getAppCalendarModule} from './app-calendar/app-calendar.module';

const getPortletShortName = (portletName: string) => {
    let lastIndexOfDot = portletName.lastIndexOf('.');
    let lastIndexOfUnderscore = portletName.lastIndexOf('_');
    let startIndex = Math.max(lastIndexOfDot, lastIndexOfUnderscore);
    return portletName.substring(startIndex + 1);
};

export const run = (portletName: string, portletNamespace: string, portletConfigurationUrl: string, translationsUrl: string, gapi: any) => {
    let portletShortName = getPortletShortName(portletName);
    let appModule;
    switch (portletShortName) {
        case 'calendar':
            appModule = getAppCalendarModule(portletName, portletNamespace, portletConfigurationUrl, translationsUrl, gapi);
            break;
        case 'github':
            appModule = getAppGithubModule(portletName, portletNamespace, portletConfigurationUrl, translationsUrl);
            break;
        case 'todo':
            appModule = getAppTodoModule(portletName, portletNamespace, portletConfigurationUrl, translationsUrl);
            break;
        default:
            console.log(`Invalid portlet short name: ${portletShortName}`)

    }
    platformBrowserDynamic()
        .bootstrapModule(appModule)
        .then(success => console.log(`Bootstraped for portlet short name: ${portletShortName}`))
        .catch(err => console.error(err));
};





