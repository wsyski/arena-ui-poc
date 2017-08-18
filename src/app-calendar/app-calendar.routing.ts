import {Routes} from '@angular/router';

import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from '../common/not-found.component';
import {AlwaysDenyGuard} from '../common/always-deny.guard';

export const rootRouterConfig: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', component: NotFoundComponent, canActivate: [AlwaysDenyGuard]}
];

