import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import * as SearchActions from '../actions/search-actions';
import {GoogleApiCalendarService} from '../../common/google/calendar-service';

@Injectable()
export class SearchEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.ofType(SearchActions.SEARCH)
    .map((action: SearchActions.Search) => action.payload)
    .switchMap(payload => this.googleApiCalendarService.searchEvents(payload.query, payload.pageToken))
    .map(results => new SearchActions.SearchSuccess({'events': results.items, 'pageToken': results.nextPageToken}));

  constructor(private actions$: Actions, private googleApiCalendarService: GoogleApiCalendarService) {
  }
}
