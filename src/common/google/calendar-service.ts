import {Observable} from 'rxjs/Rx';
import {Injectable, NgZone} from '@angular/core';
import {GoogleApiClientService} from './client-service';
import {Observer} from 'rxjs/Observer';
import {AppConfigService} from '../../core/app-config-service';
import Event = gapi.client.calendar.Event;
import Events = gapi.client.calendar.Events;
import EventsListParameters = gapi.client.calendar.EventsListParameters;
import EventsGetParameters = gapi.client.calendar.EventsGetParameters;

@Injectable()
export class GoogleApiCalendarService {

  constructor(private googleApiClientService: GoogleApiClientService, private ngZone: NgZone, private appConfigService: AppConfigService) {
  }

  private eventsList(eventsListParameters: EventsListParameters): Observable<Events> {
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

  private eventsGet(eventsGetParameters: EventsGetParameters): Observable<Event> {
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

  searchEvents(query: string, pageToken: string): Observable<Event[]> {
    let calendarId: string = this.appConfigService.getCalendarId();
    let pageSize: number = this.appConfigService.getPageSize();
    let timeMin: string = (new Date()).toISOString();
    let eventsListParameters: EventsListParameters = {
      'q': query,
      'calendarId': calendarId,
      'maxResults': pageSize,
      'pageToken': pageToken,
      'timeMin': timeMin,
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime'
    };
    let calendarEventListResponse$: Observable<Events> = this.eventsList(eventsListParameters);
    return calendarEventListResponse$.map((calendarEventListResponse: Events) => calendarEventListResponse.items);
  }

  getEvent(id: string): Observable<Event> {
    let calendarId: string = this.appConfigService.getCalendarId();
    let eventsGetParameters: EventsGetParameters = {
      'eventId': id,
      'calendarId': calendarId
    };
    return this.eventsGet(eventsGetParameters);
  }
}
