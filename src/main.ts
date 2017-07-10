import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {createAppTodoModule} from "./app-todo/app-todo.module";
import {createAppHeroesModule} from "./app-heroes/app-heroes.module";

export function RunApp_com_axiell_arena_ui_poc_todo(portletNamespace: string) {
    platformBrowserDynamic()
        .bootstrapModule(createAppTodoModule(portletNamespace))
        .then(success => console.log(`Bootstrap Todo success`))
        .catch(err => console.error(err));
}

export function RunApp_com_axiell_arena_ui_poc_heroes(portletNamespace: string) {
    platformBrowserDynamic()
        .bootstrapModule(createAppHeroesModule(portletNamespace))
        .then(success => console.log(`Bootstrap Todo success`))
        .catch(err => console.error(err));
}