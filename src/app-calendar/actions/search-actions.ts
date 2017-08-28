import {Action} from '@ngrx/store';
import Event = gapi.client.calendar.Event;

export const SEARCH = '[Events] Search';
export const SEARCH_SUCCESS = '[Events] Search Success';
export const MORE = '[Events] More';
export const MORE_SUCCESS = '[Events] More Success';

export interface SearchPayload {
  query: string;
}

export interface SearchSuccessPayload {
  events: Event[];
  pageToken: string
}

export class More implements Action {
  readonly type = MORE;

  constructor() {
  }
}

export class MoreSuccess implements Action {
  readonly type = MORE_SUCCESS;

  constructor(public payload: SearchSuccessPayload) {
  }
}

export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: SearchPayload) {
  }
}

export class SearchSuccess implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: SearchSuccessPayload) {
  }
}

export type All =  More | MoreSuccess | Search | SearchSuccess;
