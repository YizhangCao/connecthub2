import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        placeholder="Search contacts by name, company, role, or tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBar;