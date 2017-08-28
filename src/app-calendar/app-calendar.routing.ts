import {Routes} from '@angular/router';
import {EventDetailComponent} from './event-detail.component';
import {AppCalendarComponent} from './app-calendar.component';
import {EventSearchComponent} from './event-search.component';
import {AlwaysDenyGuard} from '../common/always-deny.guard';
import {NotFoundComponent} from '../common/not-found.component';

export const rootRouterConfig: Routes = [
  {
    path: '', component: AppCalendarComponent,
    children: [
      {
        path: '', component: EventSearchComponent,
        children: [
          {path: 'detail/:id', component: EventDetailComponent}
        ]
      }
    ]
  },
  {path: '**', component: NotFoundComponent, canActivate: [AlwaysDenyGuard]}
];

