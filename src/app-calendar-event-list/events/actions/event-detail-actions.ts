import {Action} from '@ngrx/store';
import {Attendee} from '../../../common/google/attendee';
import Event = gapi.client.calendar.Event;

export const ADD_ATTENDEE = '[Detail] Add Attendee';
export const ADD_ATTENDEE_ERROR = '[Detail] Add Attendee Error';
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

export class AddAttendee implements Action {
  readonly type = ADD_ATTENDEE;

  constructor(public payload: Attendee) {
  }
}

export class AddAttendeeError implements Action {
  readonly type = ADD_ATTENDEE_ERROR;

  constructor(public payload: Error) {
  }
}

export type All = AddAttendee | AddAttendeeError | Select | SelectSuccess;
