import React, { useState } from 'react';
import MainPageLayout from '../component/MainPageLayout';

const Home = () => {
  const [input, setinput] = useState('');

  const onInputChange = event => {
    setinput(event.target.value);
  };

  const onKeyDown = event => {
    if (event.keyCode === 13) {
      onSearch();
    }
  };

  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
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
