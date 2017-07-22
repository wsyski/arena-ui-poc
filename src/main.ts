import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {getAppGithubModule} from "./app-github/app-github.module";
import {getAppTodoModule} from "./app-todo/app-todo.module";

const getPortletShortName = (portletName: string) => {
    let lastIndexOfDot = portletName.lastIndexOf('.');
    let lastIndexOfUnderscore = portletName.lastIndexOf('_');
    let startIndex = Math.max(lastIndexOfDot, lastIndexOfUnderscore);
    return portletName.substring(startIndex + 1);
};

export const runPortlet = (portletName: string, portletNamespace: string, portletSettingsUrl: string) => {
    let portletShortName = getPortletShortName(portletName);
    let appModule;
    switch (portletShortName) {
        case "github":
            appModule = getAppGithubModule(portletName, portletNamespace, portletSettingsUrl);
            break;
        case "todo":
            appModule = getAppTodoModule(portletName, portletNamespace, portletSettingsUrl);
            break;
        default:
            console.log(`Invalid portlet short name: ${portletShortName}`)

    }
    platformBrowserDynamic()
        .bootstrapModule(appModule)
        .then(success => console.log(`Bootstraped for portlet short name: ${portletShortName}`))
        .catch(err => console.error(err));
};





