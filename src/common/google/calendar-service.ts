import {Observable} from 'rxjs/Rx';
import {Injectable, NgZone} from '@angular/core';
import {GoogleApiClientService} from './client-service';
import {Observer} from 'rxjs/Observer';
import Event = gapi.client.calendar.Event;
import Events = gapi.client.calendar.Events;
import EventsListParameters = gapi.client.calendar.EventsListParameters;
import EventsGetParameters = gapi.client.calendar.EventsGetParameters;

@Injectable()
export class GoogleApiCalendarService {

    constructor(private googleApiClientService: GoogleApiClientService, private ngZone: NgZone) {
    }

    eventsList(eventsListParameters: EventsListParameters): Observable<Events> {
        return Observable.create((observer: Observer<Events>) => {
            let subscription = this.googleApiClientService.initClient().subscribe(() => {
                this.ngZone.runOutsideAngular(() => {
                    gapi.client.calendar.events.list(eventsListParameters).then((response) => {
                            this.ngZone.run(() => {
                                observer.next(response.result);
                                observer.complete();
                                subscription.unsubscribe();
                            });
                        }
                    );
                });
            });
        });
    }

    eventsGet(eventsGetParameters: EventsGetParameters): Observable<Event> {
        return Observable.create((observer: Observer<Event>) => {
            let subscription = this.googleApiClientService.initClient().subscribe(() => {
                this.ngZone.runOutsideAngular(() => {
                    gapi.client.calendar.events.get(eventsGetParameters).then((response) => {
                            this.ngZone.run(() => {
                                observer.next(response.result);
                                observer.complete();
                                subscription.unsubscribe();
                            });
                        }
                    );
                });
            });
        });
    }

    searchEvents(query: string): Observable<Event[]> {
        let eventsListParameters: EventsListParameters = {
            'q': query,
            'calendarId': 'axiell.arenaevents@gmail.com',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        };
        let calendarEventListResponse$: Observable<Events> = this.eventsList(eventsListParameters);
        return calendarEventListResponse$.map((calendarEventListResponse: Events) => calendarEventListResponse.items);
    }

    getEvent(id: string): Observable<Event> {
        let eventsGetParameters: EventsGetParameters = {
            'eventId': id,
            'calendarId': 'axiell.arenaevents@gmail.com'
        };
        return this.eventsGet(eventsGetParameters);
    }
}
