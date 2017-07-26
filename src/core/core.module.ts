/* tslint:disable:member-ordering no-unused-variable */
import {APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {CommonModule} from '@angular/common';


import {TranslateService} from '@ngx-translate/core';
import {AppConfigService} from './app-config-service';
import {HttpModule} from '@angular/http';

@NgModule({
    imports: [CommonModule, HttpModule],
    providers: []
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the application module only');
        }
    }

    static forRoot(portletName: string, portletNamespace: string, portletConfigurationUrl: string): ModuleWithProviders {

        return {
            ngModule: CoreModule,
            providers: [
                AppConfigService,
                {
                    provide: APP_INITIALIZER,
                    useFactory: (appConfigService: AppConfigService) => () => appConfigService.load(portletName, portletNamespace, portletConfigurationUrl),
                    deps: [AppConfigService],
                    multi: true
                },
                TranslateService
            ]
        };
    }
}



