import Event = gapi.client.calendar.Event;
import * as SearchActions from '../actions/event-search-actions';

export interface State {
  query: string;
  pageToken: string,
  events: Event[],
}

const initialState: State = {
  query: '',
  pageToken: '',
  events: [],
};

export function reducer(state = initialState, action: SearchActions.All): State {
  switch (action.type) {
    case SearchActions.MORE: {
      return {
        ...state,
      };
    }

    case SearchActions.MORE_SUCCESS: {
      return {
        ...state,
        events: state.events.concat(action.payload.events),
        pageToken: action.payload.pageToken
      };
    }

    case SearchActions.SEARCH: {
      return {
        ...state,
        query: action.payload.query
      };
    }

    case SearchActions.SEARCH_SUCCESS: {
      return {
        ...state,
        events: action.payload.events,
        pageToken: action.payload.pageToken
      };
    }

    default: {
      return state;
    }
  }
}
