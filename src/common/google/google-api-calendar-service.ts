import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {GoogleApiClientService} from './google-api-client-service';

@Injectable()
export class GoogleApiCalendarService {

    constructor(private googleApiClientService: GoogleApiClientService) {
    }


    private listEvents(): Observable<any> {
        return this.googleApiClientService.getGapiClient().flatMap((gapiClient: any) => {
            return gapiClient.calendar.events.list({'calendarId': 'primary'});
        })

    }
}
