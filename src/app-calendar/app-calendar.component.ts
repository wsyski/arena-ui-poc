import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CalendarEvent} from '../common/google/calendar-event';
import {Router} from '@angular/router';
import {GoogleApiCalendarService} from '../common/google/calendar-service';
import {CalendarEventListResponse} from '../common/google/calendar-event-list-response';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Component({
  selector: 'app-calendar',
  styleUrls: ['./app-calendar.component.css'],
  templateUrl: './app-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppCalendarComponent implements OnInit {
  selectedCalendarEvent: CalendarEvent;
  calendarEventListResponse: CalendarEventListResponse;

  /*
    calendarEventListResponse: CalendarEventListResponse = {
    kind: 'calendar#events',
    etag: '"p33sfp96qmjgda0g"',
    summary: 'axiell.arenaevents@gmail.com',
    updated: '2017-08-18T08:55:43.163Z',
    timeZone: 'Europe/Stockholm',
    accessRole: 'reader',
    defaultReminders: [],
    items: [
      {id: 'l27cec9q8tgo5l17hg1a1ap121', kind: 'calendar#event', description: 'Event 0'},
      {id: 'l27cec9q8tgo5l17hg1a1ap122', kind: 'calendar#event', description: 'Event 1'},
      {id: 'l27cec9q8tgo5l17hg1a1ap123', kind: 'calendar#event', description: 'Event 2'}
    ]
  };
  */

  constructor(private googleApiCalendarService: GoogleApiCalendarService, private router: Router) {
  }

  ngOnInit() {
    let calendarEventListResponse$ = this.listEvents();
    calendarEventListResponse$.subscribe((calendarEventListResponse) => {
      this.calendarEventListResponse = calendarEventListResponse;
    });
  }

  private listEvents() {
    return this.googleApiCalendarService.listEvents();
    /*
    let calendarEventListResponse: CalendarEventListResponse = {
      kind: 'calendar#events',
      etag: '"p33sfp96qmjgda0g"',
      summary: 'axiell.arenaevents@gmail.com',
      updated: '2017-08-18T08:55:43.163Z',
      timeZone: 'Europe/Stockholm',
      accessRole: 'reader',
      defaultReminders: [],
      items: [
        {id: 'l27cec9q8tgo5l17hg1a1ap121', kind: 'calendar#event', description: 'Event 0'},
        {id: 'l27cec9q8tgo5l17hg1a1ap122', kind: 'calendar#event', description: 'Event 1'},
        {id: 'l27cec9q8tgo5l17hg1a1ap123', kind: 'calendar#event', description: 'Event 2'}
      ]
    };
    return Observable.create((observer: Observer<CalendarEventListResponse>) => {
      setTimeout(() => {
        observer.next(calendarEventListResponse);
        observer.complete();
      }, 2000);
    });
    */
    // return Observable.of(calendarEventListResponse).delay(2000);
  }

  onSelect(calendarEvent: CalendarEvent): void {
    this.selectedCalendarEvent = calendarEvent;
    this.router.navigate(['/detail', calendarEvent.id]);
  }
}
