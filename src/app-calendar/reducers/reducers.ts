import * as fromSearch from './search-reducer';
import {routerReducer} from '@ngrx/router-store';

export interface State {
    search: fromSearch.State;
}

export const reducers = {
    search: fromSearch.reducer,
    router: routerReducer
};

export function selectResults(state: State) {
    return state.search.results;
}

export function selectCount(state: State) {
    return state.search.results.length;
}

export function selectQuery(state: State) {
    return state.search.query;
}

export function selectedEventId(state: State) {
    return state.search.selectedEventId;
}

export function selectedEvent(state: State) {
    return state.search.selectedEvent;
}
