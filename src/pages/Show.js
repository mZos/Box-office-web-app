import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetResults } from '../misc/config';

const reducer = (preState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, Error: null, show: action.show };
    }

    case 'FETCH_FAILED':
      return { ...preState, isLoading: false, error: action.error };

    default:
      return preState;
  }
};

const initialState = {
  show: null,
  error: null,
  isLoading: true,
};

const Show = () => {
  const { id } = useParams();
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    apiGetResults(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log('show', show);

  if (isLoading) {
    return <div>Data is being loaded...</div>;
  }

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return <div>Hello World</div>;
};

export default Show;
