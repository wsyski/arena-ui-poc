import * as fromSearch from './event-search-reducer';
import * as fromDetail from './event-detail-reducer';

export interface State {
  detail: fromDetail.State;
  search: fromSearch.State;
}

export const reducers = {
  detail: fromDetail.reducer,
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

export function detailError(state: State) {
  return state.detail.error;
}

