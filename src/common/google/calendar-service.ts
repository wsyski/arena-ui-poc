import {Observable} from 'rxjs/Rx';
import {Injectable, NgZone} from '@angular/core';
import {GoogleApiClientService} from './client-service';
import {Observer} from 'rxjs/Observer';
import Events = gapi.client.calendar.Events;
import EventsListParameters = gapi.client.calendar.EventsListParameters;

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
}
