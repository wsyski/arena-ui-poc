import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import * as DetailActions from '../actions/event-detail-actions';
import {GoogleApiCalendarService} from '../../../common/google/calendar-service';
import Event = gapi.client.calendar.Event;
import * as fromRoot from '../reducers/event-reducers';
import {Attendee} from '../../../common/google/attendee';

@Injectable()
export class EventDetailEffects {
  @Effect()
  select$: Observable<Action> = this.actions$.ofType(DetailActions.SELECT)
    .map((action: DetailActions.Select) => action.payload)
    .switchMap(selectedEventId => this.googleApiCalendarService.getEventById(selectedEventId))
    .map(event => new DetailActions.SelectSuccess(event));

  @Effect()
  addAttendee$: Observable<Action> = this.actions$.ofType(DetailActions.ADD_ATTENDEE)
    .withLatestFrom(this.store$.select(state => [state.detail.selectedEvent]))
    .map((value: [DetailActions.AddAttendee, [Event]]) => [value[0].payload, value[1][0]])
    .switchMap((request: [Attendee, Event]) => this.googleApiCalendarService.addAttendee(request[0], request[1]))
    .map(event => new DetailActions.SelectSuccess(event));

  constructor(private actions$: Actions, private store$: Store<fromRoot.State>, private googleApiCalendarService: GoogleApiCalendarService) {
  }
}
