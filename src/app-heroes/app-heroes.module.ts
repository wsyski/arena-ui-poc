import { NgModule, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import {AppHeroesComponent} from './app-heroes.component';
import { AppConfig } from '../app.config';
import { AppHeroesRoutingModule } from './app-heroes-routing.module';
import { HeroService } from './hero.service';
import { HeroSearchComponent } from './hero-search.component';
import {HeroesComponent} from "./heroes.component";
import {HeroDetailComponent} from "./hero-detail.component";
import {DashboardComponent} from "./dashboard.component";

export function createAppHeroesModule( portletNamespace: string ) {
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
            HeroSearchComponent
        ],
        providers: [
            { provide: AppConfig, useFactory: () => new AppConfig( portletNamespace ) },
            HeroService ],
        entryComponents: [AppHeroesComponent]
    })
    class AppHeroesModule {
        constructor(
            private resolver: ComponentFactoryResolver,
            private appConfig: AppConfig
        ) { }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppHeroesComponent);
            (<any>factory).factory.selector = "app-com-axiell-arena-ui-poc-heroes#" + this.appConfig.portletNamespace;
            appRef.bootstrap(factory);
        }
    }

    return AppHeroesModule;
}
