import {ApplicationRef, ComponentFactoryResolver, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './app-github.routing';
import {AppGithubComponent} from './app-github.component';
import {GithubService} from './github/shared/github.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {RepoBrowserComponent} from './github/repo-browser/repo-browser.component';
import {RepoListComponent} from './github/repo-list/repo-list.component';
import {RepoDetailComponent} from './github/repo-detail/repo-detail.component';
import {ContactComponent} from './contact/contact.component';
import {AppConfigService} from '../core/app-config-service';
import {NotFoundComponent} from '../common/not-found.component';
import {AlwaysDenyGuard} from '../common/always-deny.guard';
import {CoreModule} from '../core/core.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PortletTranslateLoader} from '../shared/portlet-translate-loader';
import {SharedModule} from '../shared/shared.module';
import {Http} from '@angular/http';

export const getAppGithubModule = (portletName: string, portletNamespace: string, portletConfigurationUrl: string, translationsUrl: string) => {
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
            GithubService,
            AlwaysDenyGuard
        ],
        entryComponents: [AppGithubComponent]
    })
    class AppGithubModule {
        constructor(private resolver: ComponentFactoryResolver, private appConfigService: AppConfigService) {
        }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppGithubComponent);
            (<any>factory).factory.selector = this.appConfigService.getAppSelector();
            appRef.bootstrap(factory);
        }
    }

    return AppGithubModule;
};
