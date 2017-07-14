import {ApplicationRef, ComponentFactoryResolver, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app-github.routes";
import {AppGithubComponent} from "./app-github.component";
import {GithubService} from "./github/shared/github.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";

import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {RepoBrowserComponent} from "./github/repo-browser/repo-browser.component";
import {RepoListComponent} from "./github/repo-list/repo-list.component";
import {RepoDetailComponent} from "./github/repo-detail/repo-detail.component";
import {ContactComponent} from "./contact/contact.component";
import {AppConfig} from "../common/app-config";
import {NotFoundComponent} from "../common/not-found.component";
import {AlwaysDenyGuard} from "../common/always-deny-guard";

export const AppGithubModule = (portletNamespace: string) => {
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
            {provide: AppConfig, useFactory: () => new AppConfig(portletNamespace)},
            AlwaysDenyGuard,
            GithubService
        ],
        entryComponents: [AppGithubComponent]
    })
    class AppGithubModule {
        constructor(private resolver: ComponentFactoryResolver,
                    private appConfig: AppConfig) {
        }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppGithubComponent);
            (<any>factory).factory.selector = "app-com-axiell-arena-ui-poc-github#" + this.appConfig.portletNamespace;
            appRef.bootstrap(factory);
        }
    }

    return AppGithubModule;
}
