import React from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [inputSearch, setInputSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputSearch);
  };

  const handleChange = e => {
    const { value } = e.target;
    setInputSearch(value);
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={css['SearchForm-input']}
          type="text"
          name="inputSearch"
          value={inputSearch}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
