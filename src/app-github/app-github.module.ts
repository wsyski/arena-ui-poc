import {APP_INITIALIZER, ApplicationRef, ComponentFactoryResolver, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app-github.routes";
import {AppGithubComponent} from "./app-github.component";
import {GithubService} from "./github/shared/github.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {Http, HttpModule} from "@angular/http";

import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {RepoBrowserComponent} from "./github/repo-browser/repo-browser.component";
import {RepoListComponent} from "./github/repo-list/repo-list.component";
import {RepoDetailComponent} from "./github/repo-detail/repo-detail.component";
import {ContactComponent} from "./contact/contact.component";
import {AppConfig} from "../common/app-config";
import {NotFoundComponent} from "../common/not-found.component";
import {AlwaysDenyGuard} from "../common/always-deny-guard";
import {onAppInit} from "../common/app-init";

export const getAppGithubModule = (portletName: string, portletNamespace: string, portletSettingsUrl: string) => {
    @NgModule({
        declarations: [
            AppGithubComponent,
            AboutComponent,
            NotFoundComponent,
            RepoBrowserComponent,
            RepoListComponent,
            RepoDetailComponent,
            HomeComponent,
            ContactComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            HttpModule,
            RouterModule.forRoot(rootRouterConfig, {useHash: true})
        ],
        providers: [
            GithubService,
            AlwaysDenyGuard,
            {provide: AppConfig, useValue: new AppConfig(portletName, portletNamespace, portletSettingsUrl)},
            {
                provide: APP_INITIALIZER,
                useFactory: onAppInit,
                deps: [Http, AppConfig],
                multi: true
            }
        ],
        entryComponents: [AppGithubComponent]
    })
    class AppGithubModule {
        constructor(private resolver: ComponentFactoryResolver, private appConfig: AppConfig) {
        }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppGithubComponent);
            (<any>factory).factory.selector = this.appConfig.appSelector();
            appRef.bootstrap(factory);
        }
    }

    return AppGithubModule;
};
