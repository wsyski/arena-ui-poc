import { NgModule, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppHeroesComponent } from './app-heroes.component';
import { AppConfig } from '../app.config';
import { AppRoutingModule, routedComponents } from './app-heroes-routing.module';
import { HeroService } from './hero.service';
import { HeroSearchComponent } from './hero-search.component';

export function createAppHeroesModule( portletNamespace: string ) {
    @NgModule( {
        imports: [
            BrowserModule,
            FormsModule,
            AppRoutingModule,
            HttpModule,
            InMemoryWebApiModule.forRoot( InMemoryDataService, { delay: 600 })
        ],
        declarations: [
            AppHeroesComponent,
            HeroSearchComponent,
            routedComponents
        ],
        providers: [
            { provide: AppConfig, useFactory: () => new AppConfig( portletNamespace ) },
            HeroService,
            {provide: APP_BASE_HREF, useValue : '/' }
        ],
        entryComponents: [AppHeroesComponent]
    })
    class AppHeroesModule {
        constructor(
            private resolver: ComponentFactoryResolver,
            private appConfig: AppConfig
        ) { }

        ngDoBootstrap(appRef: ApplicationRef) {
            const factory = this.resolver.resolveComponentFactory(AppHeroesComponent);
            (<any>factory).factory.selector = "app-heroes#" + this.appConfig.portletNamespace;
            appRef.bootstrap(factory);
        }
    }

    return AppHeroesModule;
}
