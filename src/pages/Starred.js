import React, { useState, useEffect } from 'react';
import MainPageLayout from '../component/MainPageLayout';
import ShowGrid from '../component/show/ShowGrid';
import { apiGetResults } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promisses = starred.map(showId =>
        apiGetResults(`/shows/${showId}`)
      );

      Promise.all(promisses)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setIsloading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsloading(false);
        });
    } else {
      setIsloading(false);
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <div>Please wait show are still loading...</div>}
      {error && <div>Error occured: {error}</div>}
      {!isLoading && !shows && (
        <div>No show starred, add shows to starred to see here!</div>
      )}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};
export default Starred;
