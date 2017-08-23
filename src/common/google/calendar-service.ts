import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {GoogleApiClientService} from './client-service';
import {CalendarEventListResponse} from './calendar-event-list-response';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class GoogleApiCalendarService {

  constructor(private googleApiClientService: GoogleApiClientService) {
  }

  private listEvents(): Observable<CalendarEventListResponse> {
    return this.googleApiClientService.getGapiClient().flatMap((gapiClient: any) => {
      return Observable.create((observer: Observer<CalendarEventListResponse>) => {
        gapiClient.calendar.events.list({'calendarId': 'primary'}).then((response) => {
            observer.next(response.result);
          }
        );
      });
    })

  }
}
