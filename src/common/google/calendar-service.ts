import {Observable} from 'rxjs/Rx';
import {Injectable, NgZone} from '@angular/core';
import {GoogleApiClientService} from './client-service';
import {Observer} from 'rxjs/Observer';
import {AppCalendarEventListConfig} from '../../app-calendar-event-list/app-calendar-event-list-config';
import {Attendee} from './attendee';
import Event = gapi.client.calendar.Event;
import Events = gapi.client.calendar.Events;
import EventsListParameters = gapi.client.calendar.EventsListParameters;
import EventsGetParameters = gapi.client.calendar.EventsGetParameters;
import EventsUpdateParameters = gapi.client.calendar.EventsUpdateParameters;
import HttpRequestFulfilled = gapi.client.HttpRequestFulfilled;
import HttpRequestRejected = gapi.client.HttpRequestRejected;
import HttpRequest = gapi.client.HttpRequest;

@Injectable()
export class GoogleApiCalendarService {

  constructor(private googleApiClientService: GoogleApiClientService, private ngZone: NgZone, private appCalendarConfig: AppCalendarEventListConfig) {
  }

  private callClientCalendarEventApi<P, R>(callName: string, parameters: P): Observable<R> {
    return Observable.create((observer: Observer<R>) => {
      let subscription = this.googleApiClientService.initClient().subscribe(() => {
        this.ngZone.runOutsideAngular(() => {
          let call: (parameters: P) => HttpRequest<R> = gapi.client.calendar.events[callName] as (parameters: P) => HttpRequest<R>;
          call(parameters).then((response: HttpRequestFulfilled<R>) => {
            this.ngZone.run(() => {
              observer.next(response.result);
              observer.complete();
              subscription.unsubscribe();
            });
          }, (reason: HttpRequestRejected) => {
            this.ngZone.run(() => {
              observer.error(new Error(reason.result.error.message));
            });
          });
        });
      });
    });
  }

  private eventsList(eventsListParameters: EventsListParameters): Observable<Events> {
    return this.callClientCalendarEventApi<EventsListParameters, Events>('list', eventsListParameters);
  }

  private eventsGet(eventsGetParameters: EventsGetParameters): Observable<Event> {
    return this.callClientCalendarEventApi<EventsGetParameters, Event>('get', eventsGetParameters);
  }

  private eventUpdate(eventsUpdateParameters: EventsUpdateParameters): Observable<Event> {
    return this.callClientCalendarEventApi<EventsUpdateParameters, Event>('update', eventsUpdateParameters);
  }

  searchEvents(query: string, pageToken: string): Observable<Events> {
    let calendarId: string = this.appCalendarConfig.getCalendarId();
    let pageSize: number = this.appCalendarConfig.getPageSize();
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
    return this.eventsList(eventsListParameters);
  }

  getEventById(id: string): Observable<Event> {
    let calendarId: string = this.appCalendarConfig.getCalendarId();
    let eventsGetParameters: EventsGetParameters = {
      'eventId': id,
      'calendarId': calendarId
    };
    return this.eventsGet(eventsGetParameters);
  }

  addAttendee(attendee: Attendee, event: Event): Observable<Event> {
    let calendarId: string = this.appCalendarConfig.getCalendarId();
    let eventAttendees = [{
      'email': attendee.email,
      'displayName': attendee.familyName + ', ' + attendee.firstName
    }];
    let attendees = event.attendees ? [].concat(event.attendees, eventAttendees) : eventAttendees;
    let eventsUpdateParameters: EventsUpdateParameters = {
      'calendarId': calendarId,
      'eventId': event.id,
      'resource': {
        'attendees': attendees,
        'start': event.start,
        'end': event.end
      }
    };
    return this.eventUpdate(eventsUpdateParameters);
  }
}
