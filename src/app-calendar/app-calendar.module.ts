import {ApplicationRef, ComponentFactoryResolver, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './app-calendar.routing';
import {AppcalendarComponent} from './app-calendar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {AppConfigService} from '../core/app-config-service';
import {NotFoundComponent} from '../common/not-found.component';
import {AlwaysDenyGuard} from '../common/always-deny.guard';
import {CoreModule} from '../core/core.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PortletTranslateLoader} from '../shared/portlet-translate-loader';
import {SharedModule} from '../shared/shared.module';
import {Http} from '@angular/http';
import {GAPI, GoogleApiClientService} from '../common/google/google-api-client-service';

export const getAppCalendarModule = (portletName: string, portletNamespace: string, portletConfigurationUrl: string, translationsUrl: string, gapi: any) => {
    @NgModule({
        declarations: [
            AppcalendarComponent,
            AboutComponent,
            NotFoundComponent,
            HomeComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            SharedModule,
            CoreModule.forRoot(portletName, portletNamespace, portletConfigurationUrl),
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: (http: Http) => new PortletTranslateLoader(http, translationsUrl),
                    deps: [Http]
                }
            }),
            RouterModule.forRoot(rootRouterConfig, {useHash: true})
        ],
        providers: [
            {provide: GAPI, useValue: gapi},
            GoogleApiClientService,
            AlwaysDenyGuard
        ],
        entryComponents: [AppcalendarComponent]
    })
    class AppCalendarModule {
        constructor(private resolver: ComponentFactoryResolver, private appConfigService: AppConfigService) {
        }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppcalendarComponent);
            (<any>factory).factory.selector = this.appConfigService.getAppSelector();
            appRef.bootstrap(factory);
        }
    }

    return AppCalendarModule;
};
