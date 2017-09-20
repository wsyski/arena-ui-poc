import Event = gapi.client.calendar.Event;
import * as DetailActions from '../actions/event-detail-actions';
import {Attendee} from '../../../common/google/attendee';

export interface State {
  selectedEventId: string,
  selectedEvent: Event,
  attendee: Attendee
}

const initialState: State = {
  selectedEventId: null,
  selectedEvent: null,
  attendee: null
};

export function reducer(state = initialState, action: DetailActions.All): State {
  switch (action.type) {
    case DetailActions.ADD_ATTENDEE: {
      return {
        ...state,
        'attendee': action.payload
      };
    }

    case DetailActions.SELECT: {
      return {
        ...state,
        'selectedEventId': action.payload
      };
    }

    case DetailActions.SELECT_SUCCESS: {
      return {
        ...state,
        'selectedEvent': action.payload
      };
    }
    default: {
      return state;
    }
  }
}
