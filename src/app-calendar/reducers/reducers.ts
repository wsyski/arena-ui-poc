import * as fromSearch from './search-reducer';
import * as fromDetail from './detail-reducer';
import {routerReducer} from '@ngrx/router-store';

export interface State {
  detail: fromDetail.State;
  search: fromSearch.State;
}

export const reducers = {
  detail: fromDetail.reducer,
  router: routerReducer,
  search: fromSearch.reducer
};

export function isShowMore(state: State) {
  return !!state.search.pageToken;
}

export function selectResults(state: State) {
  return state.search.events;
}

export function selectCount(state: State) {
  return state.search.events.length;
}

export function selectQuery(state: State) {
  return state.search.query;
}

export function selectedEventId(state: State) {
  return state.detail.selectedEventId;
}

export function selectedEvent(state: State) {
  return state.detail.selectedEvent;
}
