import { Component }          from '@angular/core';

@Component({
    selector: 'app-com-axiell-arena-ui-poc-heroes',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['./app-heroes.component.css']
})
export class AppHeroesComponent {
    title = 'Tour of Heroes';
}
