import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./dashboard.component";
import {HeroesComponent} from "./heroes.component";
import {HeroDetailComponent} from "./hero-detail.component";
import {AlwaysDenyGuard} from "../common/always-deny-guard";
import {NotFoundComponent} from "../not-found.component";

const routes: Routes = [
    {path: '', pathMatch: 'full',component: DashboardComponent},
    {path: 'detail/:id', component: HeroDetailComponent},
    {path: 'heroes', component: HeroesComponent},
    {path: '**', component: NotFoundComponent, canActivate: [AlwaysDenyGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppHeroesRoutingModule {
}
