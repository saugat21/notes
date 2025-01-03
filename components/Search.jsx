"use client"
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search-container mt-3">
      <div className="input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Type to search..."
          className="search-input"
        />
        {query && <FaTimes className="clear-icon" onClick={clearSearch} />}
      </div>
    </div>
  );
};

export default SearchBar;
