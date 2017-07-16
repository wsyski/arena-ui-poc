import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppGithubModule} from "./app-github/app-github.module";
import {AppHeroesModule} from "./app-heroes/app-heroes.module";
import {AppTodoModule} from "./app-todo/app-todo.module";

const getPortletShortName=(portletName: string) => {
    let lastIndexOfDot = portletName.lastIndexOf('.');
    let lastIndexOfUnderscore = portletName.lastIndexOf('_');
    let startIndex = Math.max(lastIndexOfDot,lastIndexOfUnderscore);
    return portletName.substring(startIndex + 1);
};

export const runPortlet = (portletName: string, portletNamespace: string) => {
    let portletShortName = getPortletShortName(portletName);
    let appModule;
    switch (portletShortName) {
        case "github":
            appModule = AppGithubModule(portletNamespace);
            break;
        case "heroes":
            appModule = AppHeroesModule(portletNamespace);
            break;
        case "todo":
            appModule = AppTodoModule(portletNamespace);
            break;
        default:
            console.log(`Invalid portlet short name: ${portletShortName}`)

    }
    platformBrowserDynamic()
        .bootstrapModule(appModule)
        .then(success => console.log(`Bootstraped for portlet short name: ${portletShortName}`))
        .catch(err => console.error(err));
};





