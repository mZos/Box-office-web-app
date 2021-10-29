import React, { useState } from 'react';
import ActorGrid from '../component/actor/ActorGrid';
import MainPageLayout from '../component/MainPageLayout';
import ShowGrid from '../component/show/ShowGrid';
import { apiGetResults } from '../misc/config';

const Home = () => {
  const [input, setinput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onInputChange = event => {
    setinput(event.target.value);
  };

  const onSearch = () => {
    apiGetResults(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = event => {
    if (event.keyCode === 13) {
      /* here 13 is equals to Enter key */
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results found</div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  const onRadioBtnChange = event => {
    setSearchOption(event.target.value);
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioBtnChange}
          />
        </label>

        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioBtnChange}
          />
        </label>
      </div>

      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
