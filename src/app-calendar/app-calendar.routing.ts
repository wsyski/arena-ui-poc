import {Routes} from '@angular/router';
import {CalendarEventDetailComponent} from './calendar-event-detail.component';
import {AppCalendarComponent} from './app-calendar.component';
import {AppEventListComponent} from './app-event-list.component';

export const rootRouterConfig: Routes = [
  {
    path: '', component: AppCalendarComponent,
    children: [
      {
        path: '', component: AppEventListComponent,
        children: [
          {path: 'detail/:id', component: CalendarEventDetailComponent}
        ]
      }
    ]
  }
];

