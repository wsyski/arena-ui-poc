import {ApplicationRef, ComponentFactoryResolver, NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppTodoComponent} from "./app-todo.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {TaskComponent} from "./todo/components/task.component";
import {StaffListComponent} from "./staff/components/staff-list.component";

import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppConfig} from "../common/app-config";
import {AppTodoRoutingModule} from "./app-todo.routes";
import {NotFoundComponent} from "../common/not-found.component";
import {AlwaysDenyGuard} from "../common/always-deny-guard";

export const getAppTodoModule = (portletName: string, portletNamespace: string, translationsUrl: string, preferencesUrl: string) => {
    @NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            AppTodoRoutingModule
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
            {
                provide: AppConfig,
                useValue: new AppConfig(portletName, portletNamespace, translationsUrl, preferencesUrl)
            },
            AlwaysDenyGuard],
        entryComponents: [AppTodoComponent]
    })
    class AppTodoModule {
        constructor(private resolver: ComponentFactoryResolver, private appConfig: AppConfig) {}

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppTodoComponent);
            (<any>factory).factory.selector = this.appConfig.appSelector();
            appRef.bootstrap(factory);
        }
    }

    return AppTodoModule;
};