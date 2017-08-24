import {Component, OnInit} from '@angular/core';
import {CalendarEvent} from '../common/google/calendar-event';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {GoogleApiCalendarService} from '../common/google/calendar-service';
import {CalendarEventListResponse} from '../common/google/calendar-event-list-response';

@Component({
  selector: 'app-calendar',
  styleUrls: ['./app-calendar.component.css'],
  templateUrl: './app-calendar.component.html',
})
export class AppCalendarComponent implements OnInit {
  selectedCalendarEvent: CalendarEvent;
  calendarEventListResponse$: Observable<CalendarEventListResponse>;

  constructor(private googleApiCalendarService: GoogleApiCalendarService, private router: Router) {
  }

  ngOnInit() {
    this.calendarEventListResponse$ = this.googleApiCalendarService.listEvents();
    console.log('AppCalendarComponent.ngOnInit');
    /*
    this.calendarEventListResponse$.subscribe((result) => {
      console.log(result);
    });
    */
  }

  onSelect(calendarEvent: CalendarEvent): void {
    this.selectedCalendarEvent = calendarEvent;
    this.router.navigate(['/detail', calendarEvent.id]);
  }
}
