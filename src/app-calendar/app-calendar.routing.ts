import {Routes} from '@angular/router';
import {CalendarEventDetailComponent} from './calendar-event-detail.component';

export const rootRouterConfig: Routes = [
  {path: 'detail/:id', component: CalendarEventDetailComponent}
];

