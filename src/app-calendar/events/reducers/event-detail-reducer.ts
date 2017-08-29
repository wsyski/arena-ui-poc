import Event = gapi.client.calendar.Event;
import * as DetailActions from '../actions/event-detail-actions';

export interface State {
  selectedEventId: string,
  selectedEvent: Event
}

const initialState: State = {
  selectedEventId: null,
  selectedEvent: null
};

export function reducer(state = initialState, action: DetailActions.All): State {
  switch (action.type) {
    case DetailActions.SELECT: {
      return {
        ...state,
        selectedEventId: action.payload
      };
    }

    case DetailActions.SELECT_SUCCESS: {
      return {
        ...state,
        selectedEvent: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
