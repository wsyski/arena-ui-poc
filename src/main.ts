import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {createAppTodoModule} from "./app-todo/app-todo.module";
import {createAppHeroesModule} from "./app-heroes/app-heroes.module";

export function RunAppTodo(portletNamespace: string) {
    platformBrowserDynamic()
        .bootstrapModule(createAppTodoModule(portletNamespace))
        .then(success => console.log(`Bootstrap Todo success`))
        .catch(err => console.error(err));
}

export function RunAppHeroes(portletNamespace: string) {
    platformBrowserDynamic()
        .bootstrapModule(createAppHeroesModule(portletNamespace))
        .then(success => console.log(`Bootstrap Todo success`))
        .catch(err => console.error(err));
}