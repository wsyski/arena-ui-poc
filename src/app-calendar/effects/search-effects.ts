import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action, Store} from '@ngrx/store';
import * as SearchActions from '../actions/search-actions';
import {GoogleApiCalendarService} from '../../common/google/calendar-service';
import * as fromRoot from '../reducers/reducers';

@Injectable()
export class SearchEffects {
  @Effect()
  search$: Observable<Action> = this.actions$.ofType(SearchActions.SEARCH)
    .withLatestFrom(this.store$.select(state => [state.search.query, state.search.pageToken]))
    .map((value: [SearchActions.Search, [string, string]]) => {
      let payload = value[0].payload;
      return payload.query ? [payload.query, ''] : value[1];
    })
    .switchMap((request: [string, string]) => this.googleApiCalendarService.searchEvents(request[0], request[1]))
    .map(results => new SearchActions.SearchSuccess({'events': results.items, 'pageToken': results.nextPageToken}));

  constructor(private actions$: Actions, private store$: Store<fromRoot.State>, private googleApiCalendarService: GoogleApiCalendarService) {
  }
}
