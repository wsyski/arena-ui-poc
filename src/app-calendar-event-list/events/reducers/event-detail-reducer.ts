import Event = gapi.client.calendar.Event;
import * as DetailActions from '../actions/event-detail-actions';
import {Attendee} from '../../../common/google/attendee';

export interface State {
  selectedEventId: string,
  selectedEvent: Event,
  attendee: Attendee,
  error: Error
}

const initialState: State = {
  selectedEventId: null,
  selectedEvent: null,
  attendee: null,
  error: null
};

export function reducer(state = initialState, action: DetailActions.All): State {
  switch (action.type) {
    case DetailActions.ADD_ATTENDEE: {
      return {
        ...state,
        'error': null,
        'attendee': action.payload
      };
    }

    case DetailActions.ADD_ATTENDEE_ERROR: {
      return {
        ...state,
        'error': action.payload,
        'attendee': null
      };
    }

    case DetailActions.SELECT: {
      return {
        ...state,
        'error': null,
        'selectedEventId': action.payload
      };
    }

    case DetailActions.SELECT_SUCCESS: {
      return {
        ...state,
        'error': null,
        'selectedEvent': action.payload
      };
    }
    default: {
      return state;
    }
  }
}
