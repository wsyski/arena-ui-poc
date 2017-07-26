import {ApplicationRef, ComponentFactoryResolver, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppTodoComponent} from './app-todo.component';
import {TaskListComponent} from './todo/components/task-list.component';
import {AboutComponent} from './about/components/about.component';
import {TaskComponent} from './todo/components/task.component';
import {StaffListComponent} from './staff/components/staff-list.component';

import {FormsModule} from '@angular/forms';
import {AppConfigService} from '../core/app-config-service';
import {AppTodoRoutingModule} from './app-todo.routing';
import {NotFoundComponent} from '../common/not-found.component';
import {AlwaysDenyGuard} from '../common/always-deny.guard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '../core/core.module';
import {PortletTranslateLoader} from '../shared/portlet-translate-loader';
import {SharedModule} from '../shared/shared.module';
import {Http} from '@angular/http';

export const getAppTodoModule = (portletName: string, portletNamespace: string, portletConfigurationUrl: string, translationsUrl: string) => {
    @NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            SharedModule,
            CoreModule.forRoot(portletName, portletNamespace, portletConfigurationUrl),
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: (http: Http) => new PortletTranslateLoader(http, translationsUrl),
                    deps: [Http]
                }
            }),
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
            AlwaysDenyGuard
        ],
        entryComponents: [AppTodoComponent]
    })
    class AppTodoModule {
        constructor(private resolver: ComponentFactoryResolver, private appConfigService: AppConfigService) {
        }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppTodoComponent);
            (<any>factory).factory.selector = this.appConfigService.getAppSelector();
            appRef.bootstrap(factory);
        }
    }

    return AppTodoModule;
}
