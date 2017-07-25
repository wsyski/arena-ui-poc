/* tslint:disable:member-ordering no-unused-variable */
import {APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {CommonModule} from '@angular/common';

import {Http, HttpModule, Response, ResponseContentType} from "@angular/http";

import {AppConfig} from "../common/app-config";
import {TranslateService} from "@ngx-translate/core";
import {PortletSettings} from "../common/portlet-settings";

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

    static forRoot(portletName: string, portletNamespace: string, portletSettingsUrl: string): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                {provide: AppConfig, useValue: new AppConfig(portletName, portletNamespace, portletSettingsUrl)},
                {
                    provide: APP_INITIALIZER,
                    useFactory: onAppInit,
                    deps: [Http, AppConfig],
                    multi: true
                },
                TranslateService
            ]
        };
    }
}

export function onAppInit(http: Http, appConfig: AppConfig): () => Promise<any> {
    appConfig.portletSettings = http.get(appConfig.portletSettingsUrl, {responseType: ResponseContentType.Json})
        .map((response: Response) => response.json());
    return (): Promise<any> => {
        let promise: Promise<any> = new Promise((resolve: any) => {
            appConfig.portletSettings.subscribe((portletSettings: PortletSettings) => {
                console.log(portletSettings);
                resolve();
            });
        });
        return promise;
    }
}
