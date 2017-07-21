import {ApplicationRef, ComponentFactoryResolver, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

import {AppHeroesComponent} from './app-heroes.component';
import {AppConfig} from '../common/app-config';
import {AppHeroesRoutingModule} from './app-heroes.routes';
import {HeroService} from './hero.service';
import {HeroSearchComponent} from './hero-search.component';
import {HeroesComponent} from "./heroes.component";
import {HeroDetailComponent} from "./hero-detail.component";
import {DashboardComponent} from "./dashboard.component";
import {NotFoundComponent} from "../common/not-found.component";
import {AlwaysDenyGuard} from "../common/always-deny-guard";
import {HttpModule} from "@angular/http";

export const getAppHeroesModule = (portletName: string, portletNamespace: string, portletSettingsUrl: string) => {
    @NgModule({
        imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            InMemoryWebApiModule.forRoot(InMemoryDataService),
            AppHeroesRoutingModule
        ],
        declarations: [
            AppHeroesComponent,
            DashboardComponent,
            HeroDetailComponent,
            HeroesComponent,
            HeroSearchComponent,
            NotFoundComponent
        ],
        providers: [
            {
                provide: AppConfig,
                useValue: new AppConfig(portletName, portletNamespace, portletSettingsUrl)
            },
            AlwaysDenyGuard,
            HeroService],
        entryComponents: [AppHeroesComponent]
    })
    class AppHeroesModule {
        constructor(private resolver: ComponentFactoryResolver,
                    private appConfig: AppConfig) {
        }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppHeroesComponent);
            (<any>factory).factory.selector = this.appConfig.appSelector();
            appRef.bootstrap(factory);
        }
    }

    return AppHeroesModule;
};
