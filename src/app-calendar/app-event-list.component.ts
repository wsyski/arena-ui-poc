import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GoogleApiCalendarService} from '../common/google/calendar-service';
import {Observable} from 'rxjs/Observable';
import Event = gapi.client.calendar.Event;
import Events = gapi.client.calendar.Events;
import EventsListParameters = gapi.client.calendar.EventsListParameters;

@Component({
    selector: 'app-event-list',
    styleUrls: ['./app-event-list.component.css'],
    templateUrl: './app-event-list.component.html'
})
export class AppEventListComponent implements OnInit {
    selectedCalendarEvent: Event;
    calendarEventListResponse$: Observable<Events>;

    constructor(private googleApiCalendarService: GoogleApiCalendarService, private router: Router) {
    }

    ngOnInit() {
        let eventsListParameters: EventsListParameters = {
            'calendarId': 'axiell.arenaevents@gmail.com',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        };
        this.calendarEventListResponse$ = this.googleApiCalendarService.eventsList(eventsListParameters);
    }

    onSelect(calendarEvent: Event): void {
        this.selectedCalendarEvent = calendarEvent;
        this.router.navigate(['/detail', calendarEvent.id]);
    }
}
