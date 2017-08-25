import {Action} from '@ngrx/store';
import Event = gapi.client.calendar.Event;

export const SEARCH = '[Events] Search';
export const SEARCH_SUCCESS = '[Events] Search Success';

export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {
  }
}

export class SearchSuccess implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: Event[]) {
  }
}

export type All = Search | SearchSuccess;
