import {Routes} from '@angular/router';
import {EventDetailComponent} from './events/components/event-detail.component';
import {AppCalendarComponent} from './app-calendar.component';
import {EventSearchComponent} from './events/components/event-search.component';
import {AlwaysDenyGuard} from '../common/always-deny.guard';
import {NotFoundComponent} from '../common/not-found.component';
import {AppConfigGuard} from '../common/app-config.guard';

export const rootRouterConfig: Routes = [
  {
    path: '', component: AppCalendarComponent, canActivate: [AppConfigGuard],
    children: [
      {
        path: '', component: EventSearchComponent,
        children: [
          {path: 'events/:id', component: EventDetailComponent}
        ]
      }
    ]
  },
  {path: '**', component: NotFoundComponent, canActivate: [AlwaysDenyGuard]}
];

