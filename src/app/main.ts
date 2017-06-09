import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {createAppModule} from "./app.module";

export function RunApplication(portletNamespace: string) {
    platformBrowserDynamic()
        .bootstrapModule(createAppModule(portletNamespace))
        .then(success => console.log(`Bootstrap success`))
        .catch(err => console.error(err));
}