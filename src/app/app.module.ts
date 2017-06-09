import {ApplicationRef, ComponentFactoryResolver, NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from "./app.component";
import {TaskListComponent} from "./todo/components/task-list.component";
import {AboutComponent} from "./about/components/about.component";
import {TaskComponent} from "./todo/components/task.component";
import {StaffListComponent} from "./staff/components/staff-list.component";

import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {UIRouterModule} from "@uirouter/angular";
import {uiRouterConfigFn} from "./app.routerconfig";
import {AppConfig} from "./app.config";

let tasksState = { name: 'tasks', url: '/tasks',  component: TaskListComponent }; 
let aboutState = { name: 'about', url: '/about',  component: AboutComponent };
let staffState = { name: 'staff', url: '/staff',  component: StaffListComponent };

export function createAppModule(portletNamespace: string) {
    @NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            UIRouterModule.forRoot({ states: [ tasksState, aboutState, staffState ],
                config: uiRouterConfigFn,
                useHash: true })
        ],
        declarations: [
            AppComponent,
            TaskComponent,
            TaskListComponent,
            AboutComponent,
            StaffListComponent,
        ],
        providers: [{ provide: AppConfig, useFactory: () => new AppConfig(portletNamespace) }],
        entryComponents: [AppComponent]
    })
    class AppModule {
        constructor(
            private resolver: ComponentFactoryResolver,
            private appConfig: AppConfig
        ) { }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppComponent);
            (<any>factory).factory.selector = "app-todo#" + this.appConfig.portletNamespace;
            appRef.bootstrap(factory);
        }
    }

    return AppModule;
}