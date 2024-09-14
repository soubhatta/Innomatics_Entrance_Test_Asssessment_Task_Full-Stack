import React from 'react';
import './App.css';
import SearchBar from '../SearchBar';

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Simple Search Bar</h1>
      <SearchBar />
    </div>
  );
};

export default App;
