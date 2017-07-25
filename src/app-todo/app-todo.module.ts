import {APP_INITIALIZER, ApplicationRef, ComponentFactoryResolver, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppTodoComponent} from "./app-todo.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {TaskComponent} from "./todo/components/task.component";
import {StaffListComponent} from "./staff/components/staff-list.component";

import {FormsModule} from "@angular/forms";
import {Http, HttpModule} from "@angular/http";
import {AppConfig} from "../common/app-config";
import {createPortletTranslateLoader, PortletTranslateLoader} from "../common/portlet-translate-loader";
import {AppTodoRoutingModule} from "./app-todo.routes";
import {NotFoundComponent} from "../common/not-found.component";
import {AlwaysDenyGuard} from "../common/always-deny-guard";
import {onAppInit} from "../common/app-init";
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';

export const getAppTodoModule = (portletName: string, portletNamespace: string, portletSettingsUrl: string) => {
    @NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            AppTodoRoutingModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: createPortletTranslateLoader,
                    deps: [AppConfig]
                }
            })
        ],
        declarations: [
            AppTodoComponent,
            TaskComponent,
            TaskListComponent,
            AboutComponent,
            StaffListComponent,
            NotFoundComponent
        ],
        providers: [
            AlwaysDenyGuard,
            TranslateService,
            {provide: AppConfig, useValue: new AppConfig(portletName, portletNamespace, portletSettingsUrl)},
            {
                provide: APP_INITIALIZER,
                useFactory: onAppInit,
                deps: [Http, AppConfig],
                multi: true
            }
        ],
        entryComponents: [AppTodoComponent]
    })
    class AppTodoModule {
        constructor(private resolver: ComponentFactoryResolver, private appConfig: AppConfig) {
        }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppTodoComponent);
            (<any>factory).factory.selector = this.appConfig.appSelector();
            appRef.bootstrap(factory);
        }
    }

    return AppTodoModule;
};