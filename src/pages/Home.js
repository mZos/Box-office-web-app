import React, { useState } from 'react';
import MainPageLayout from '../component/MainPageLayout';
import { apiGetResults } from '../misc/config';

const Home = () => {
  const [input, setinput] = useState('');
  const [results, setResults] = useState(null);

  const onInputChange = event => {
    setinput(event.target.value);
  };

  const onSearch = () => {
    apiGetResults(`/search/shows?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = event => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results found</div>;
    }

    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
