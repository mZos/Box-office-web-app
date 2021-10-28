import React, { useState } from 'react';
import MainPageLayout from '../component/MainPageLayout';
import { apiGetResults } from '../misc/config';

const Home = () => {
  const [input, setinput] = useState('');
  const [results, setResults] = useState(null);

  const onInputChange = event => {
    setinput(event.target.value);
  };

  const onKeyDown = event => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  const onSearch = () => {
    apiGetResults(`/search/shows?q=${input}`).then(result => {
      setResults(result);
    });
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
    </MainPageLayout>
  );
};

export default Home;
