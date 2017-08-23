import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {GoogleApiClientService} from './client-service';
import {CalendarEventListResponse} from './calendar-event-list-response';
import {Observer} from 'rxjs/Observer';
import {CalendarEvent} from './calendar-event';

@Injectable()
export class GoogleApiCalendarService {

    constructor(private googleApiClientService: GoogleApiClientService) {
    }

    listEvents(): Observable<CalendarEvent[]> {
        return this.googleApiClientService.getGapiClient().flatMap((gapiClient: any) => {
            return Observable.create((observer: Observer<CalendarEventListResponse>) => {
                gapiClient.calendar.events.list({
                    'calendarId': 'axiell.arenaevents@gmail.com',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                }).then((response) => {
                        observer.next(response.result.items);
                    }
                );
            });
        });
    }
}
