import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import * as DetailActions from '../actions/event-detail-actions';
import {GoogleApiCalendarService} from '../../../common/google/calendar-service';

@Injectable()
export class EventDetailEffects {
    @Effect()
    select$: Observable<Action> = this.actions$.ofType(DetailActions.SELECT)
        .map((action: DetailActions.Select) => action.payload)
        .switchMap(id => this.googleApiCalendarService.getEvent(id))
        .map(event => new DetailActions.SelectSuccess(event));

    constructor(private actions$: Actions, private googleApiCalendarService: GoogleApiCalendarService) {
    }
}
