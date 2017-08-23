import {ApplicationRef, ComponentFactoryResolver, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './app-calendar.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppConfigService} from '../core/app-config-service';
import {NotFoundComponent} from '../common/not-found.component';
import {AlwaysDenyGuard} from '../common/always-deny.guard';
import {CoreModule} from '../core/core.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PortletTranslateLoader} from '../shared/portlet-translate-loader';
import {SharedModule} from '../shared/shared.module';
import {Http} from '@angular/http';
import {DISCOVERY_DOCS, GoogleApiClientService} from '../common/google/client-service';
import {GoogleApiCalendarService} from '../common/google/calendar-service';
import {AppCalendarComponent} from './app-calendar.component';
import {CalendarEventDetailComponent} from './calendar-event-detail.component';

export const getAppCalendarModule = (portletName: string, portletNamespace: string, portletConfigurationUrl: string, translationsUrl: string) => {
    @NgModule({
        declarations: [
            AppCalendarComponent,
            CalendarEventDetailComponent,
            NotFoundComponent
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
            {provide: DISCOVERY_DOCS, useValue: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']},
            GoogleApiClientService,
            GoogleApiCalendarService,
            AlwaysDenyGuard
        ],
        entryComponents: [AppCalendarComponent]
    })
    class AppCalendarModule {
        constructor(private resolver: ComponentFactoryResolver, private appConfigService: AppConfigService) {
        }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppCalendarComponent);
            (<any>factory).factory.selector = this.appConfigService.getAppSelector();
            appRef.bootstrap(factory);
        }
    }

    return AppCalendarModule;
};
