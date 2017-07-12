import {Routes} from "@angular/router";

import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {RepoBrowserComponent} from "./github/repo-browser/repo-browser.component";
import {RepoListComponent} from "./github/repo-list/repo-list.component";
import {RepoDetailComponent} from "./github/repo-detail/repo-detail.component";
import {ContactComponent} from "./contact/contact.component";
import {NotFoundComponent} from "../common/not-found.component";
import {AlwaysDenyGuard} from "../common/always-deny-guard";

export const rootRouterConfig: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {
        path: 'github', component: RepoBrowserComponent,
        children: [
            {path: '', component: RepoListComponent},
            {
                path: ':org', component: RepoListComponent,
                children: [
                    {path: '', component: RepoDetailComponent},
                    {path: ':repo', component: RepoDetailComponent}
                ]
            }]
    },
    {path: 'contact', component: ContactComponent},
    {path: '**', component: NotFoundComponent, canActivate: [AlwaysDenyGuard]}
];

