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

@Injectable()
export class GoogleApiCalendarService {

  constructor(private googleApiClientService: GoogleApiClientService, private ngZone: NgZone, private appCalendarConfig: AppCalendarEventListConfig) {
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

  private eventUpdate(eventsUpdateParameters: EventsUpdateParameters): Observable<Event> {
    return Observable.create((observer: Observer<Event>) => {
      let subscription = this.googleApiClientService.initClient().subscribe(() => {
        this.ngZone.runOutsideAngular(() => {
          gapi.client.calendar.events.update(eventsUpdateParameters).then((response) => {
              this.ngZone.run(() => {
                observer.next(response.result);
                observer.complete();
                subscription.unsubscribe();
              });
            }, function (reason) {
              throw new Error(reason.result.error.message);
            });
        });
      });
    });
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
