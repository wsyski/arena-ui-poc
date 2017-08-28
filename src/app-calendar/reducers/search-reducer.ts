import Event = gapi.client.calendar.Event;
import * as SearchActions from '../actions/search-actions';

export interface State {
  query: string;
  results: Event[],
}

const initialState: State = {
  query: '',
  results: [],
};

export function reducer(state = initialState, action: SearchActions.All): State {
  switch (action.type) {
    case SearchActions.SEARCH: {
      return {
        ...state,
        query: action.payload
      };
    }

    case SearchActions.SEARCH_SUCCESS: {
      return {
        ...state,
        results: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
