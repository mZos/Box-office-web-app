import { useReducer, useEffect } from 'react';

function showsReducer(preState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...preState, action.showId];
    }

    case 'REMOVE': {
      return preState.filter(showId => showId !== action.showId);
    }

    default:
      return preState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}
