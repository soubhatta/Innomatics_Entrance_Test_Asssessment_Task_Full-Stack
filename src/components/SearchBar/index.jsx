import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import data from "../../data/countries.json"; // Importing the data
import "./SearchBar.css";

/**
 * @param {object} item
 * @return {string}
 */
const parseItem = (item) => {
  return `${item.country}, ${item.capital}`;
};

const SearchBar = () => {
  /**
   * @type {[string, (value: string) => void]}
   */
  const [searchText, setSearchText] = useState("");
  /**
   * @type {[string[], (value: string[]) => void]}
   */
  const [suggestions, setSuggestions] = useState(new Array());

  // Fuse.js setup
  const fuse = new Fuse(data, {
    keys: ["capital", "country", "currency"], // Fields to search in
    threshold: 0.3, // Adjust this for sensitivity
  });

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchText(input);

    if (input.length > 0) {
      // Perform Fuse.js search
      const results = fuse.search(input, { limit: 10 });
      setSuggestions(results.map((result) => parseItem(result.item)));
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchText}`);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search city or country..."
          value={searchText}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => {
                setSearchText(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
