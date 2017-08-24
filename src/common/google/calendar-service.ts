import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {GoogleApiClientService} from './client-service';
import {CalendarEventListResponse} from './calendar-event-list-response';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class GoogleApiCalendarService {

  constructor(private googleApiClientService: GoogleApiClientService) {
  }

  listEvents(): Observable<CalendarEventListResponse> {
    return Observable.create((observer: Observer<CalendarEventListResponse>) => {
      let subscription = this.googleApiClientService.getGapiClient().subscribe((gapiClient: any) => {
        gapi.client.calendar.events.list({
          'calendarId': 'axiell.arenaevents@gmail.com',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then((response) => {
            observer.next(response.result);
            subscription.unsubscribe();
          }
        );
      });
    });
  }
}
