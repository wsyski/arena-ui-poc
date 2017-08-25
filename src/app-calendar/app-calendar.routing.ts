import {Routes} from '@angular/router';
import {EventDetailComponent} from './event-detail.component';
import {AppCalendarComponent} from './app-calendar.component';
import {EventSearchComponent} from './event-search.component';

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
  }
];

