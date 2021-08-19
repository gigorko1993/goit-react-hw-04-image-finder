import React, { Component } from 'react';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() !== '') {
      this.props.setValue(this.state.value);
      this.setState({ value: '' });
    }
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.onSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            onChange={this.onChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}
