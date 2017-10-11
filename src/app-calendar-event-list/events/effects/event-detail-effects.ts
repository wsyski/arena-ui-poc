import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import * as DetailActions from '../actions/event-detail-actions';
import {GoogleApiCalendarService} from '../../../common/google/calendar-service';
import * as fromRoot from '../reducers/event-reducers';
import {Attendee} from '../../../common/google/attendee';
import {of} from 'rxjs/observable/of';
import Event = gapi.client.calendar.Event;

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
    .switchMap((request: [Attendee, Event]) => {
      const disposableStream$ = of(request);
      return disposableStream$
        .switchMap(args => this.googleApiCalendarService.addAttendee(args[0], args[1]))
        .catch(error => {
          return of(error);
        })
    })
    .map(result => {
      if (result instanceof Error) {
        return new DetailActions.AddAttendeeError(result);
      } else {
        return new DetailActions.SelectSuccess(result);
      }
    });

  constructor(private actions$: Actions, private store$: Store<fromRoot.State>, private googleApiCalendarService: GoogleApiCalendarService) {
  }
}
