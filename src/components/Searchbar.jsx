import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputSearch: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputSearch);
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    // name odnosi się do name="inputSearch", a value do value={this.state.inputSearch} w <input /> poniżej
    // Mozna podobnie wchodzić do innych property obiektu
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css['SearchForm-button']}>
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={css['SearchForm-input']}
            type="text"
            name="inputSearch"
            value={this.state.inputSearch}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
