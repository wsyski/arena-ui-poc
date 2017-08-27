import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import * as SearchActions from '../actions/search-actions';
import {GoogleApiCalendarService} from '../../common/google/calendar-service';

@Injectable()
export class EventEffects {
    @Effect()
    search$: Observable<Action> = this.actions$.ofType(SearchActions.SEARCH)
        .map((action: SearchActions.Search) => action.payload)
        .switchMap(query => this.googleApiCalendarService.searchEvents(query))
        .map(results => new SearchActions.SearchSuccess(results));

    @Effect()
    select$: Observable<Action> = this.actions$.ofType(SearchActions.SELECT)
        .map((action: SearchActions.Select) => action.payload)
        .switchMap(id => this.googleApiCalendarService.getEvent(id))
        .map(event => new SearchActions.SelectSuccess(event));

    constructor(private actions$: Actions, private googleApiCalendarService: GoogleApiCalendarService) {
    }
}
