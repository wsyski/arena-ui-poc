import { Component } from '@angular/core';

import { AppConfig } from '../app.config';

@Component( {
    selector: 'app-heroes',
    template: `
    <h1>{{title}}</h1>
    <div class="header-bar"></div>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    styleUrls: ['app-heroes.component.css']
})
export class AppHeroesComponent {
    title: string;
    portletNamespace: string;

    constructor(appConfig: AppConfig) {
        this.title = 'Tour of Heroes';
        this.portletNamespace = appConfig.portletNamespace;
    }
}
