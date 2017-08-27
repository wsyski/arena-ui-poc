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

export function selectTerms(state: State) {
    return state.search.searchTerms;
}
