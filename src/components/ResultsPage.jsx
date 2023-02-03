// ResultsPage.js
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async (searchTerm) => {
      const response = await fetch(`https://api.example.com/search?q=${searchTerm}`);
      const data = await response.json();
      setResults(data.results);
    };

    fetchResults();
  }, []);

  return (
    <>
      <NavBar onSearch={fetchResults} />
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </>
  );
};

export default ResultsPage;
