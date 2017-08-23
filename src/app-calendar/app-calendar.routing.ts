import {Routes} from '@angular/router';

import {NotFoundComponent} from '../common/not-found.component';
import {AlwaysDenyGuard} from '../common/always-deny.guard';
import {CalendarEventDetailComponent} from './calendar-event-detail.component';

export const rootRouterConfig: Routes = [
    {path: 'detail/:id', component: CalendarEventDetailComponent},
    {path: '**', component: NotFoundComponent, canActivate: [AlwaysDenyGuard]}
];

