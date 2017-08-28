import {Action} from '@ngrx/store';
import Event = gapi.client.calendar.Event;

export const SELECT = '[Detail] Select';
export const SELECT_SUCCESS = '[Detail] Select Success';

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: string) {
    }
}

export class SelectSuccess implements Action {
    readonly type = SELECT_SUCCESS;

    constructor(public payload: Event) {
    }
}

export type All = Select | SelectSuccess;
