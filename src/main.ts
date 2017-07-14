import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppGithubModule} from "./app-github/app-github.module";
import {AppHeroesModule} from "./app-heroes/app-heroes.module";
import {AppTodoModule} from "./app-todo/app-todo.module";

export function RunApp_com_axiell_arena_ui_poc_github(portletNamespace: string) {
    platformBrowserDynamic()
        .bootstrapModule(AppGithubModule(portletNamespace))
        .then(success => console.log(`Bootstrap Github success`))
        .catch(err => console.error(err));
}

export function RunApp_com_axiell_arena_ui_poc_heroes(portletNamespace: string) {
    platformBrowserDynamic()
        .bootstrapModule(AppHeroesModule(portletNamespace))
        .then(success => console.log(`Bootstrap Heroes success`))
        .catch(err => console.error(err));
}

export function RunApp_com_axiell_arena_ui_poc_todo(portletNamespace: string) {
    platformBrowserDynamic()
        .bootstrapModule(AppTodoModule(portletNamespace))
        .then(success => console.log(`Bootstrap Todo success`))
        .catch(err => console.error(err));
}

