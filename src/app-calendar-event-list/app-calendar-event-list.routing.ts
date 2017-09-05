import {Routes} from '@angular/router';
import {EventDetailComponent} from './events/components/event-detail.component';
import {EventSearchComponent} from './events/components/event-search.component';
import {AlwaysDenyGuard} from '../common/always-deny.guard';
import {NotFoundComponent} from '../common/not-found.component';
import {AppConfigGuard} from '../common/app-config.guard';
import {AppCalendarEventListComponent} from './app-calendar-event-list.component';

export const rootRouterConfig: Routes = [
  {
    path: '', component: AppCalendarEventListComponent, canActivate: [AppConfigGuard],
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

