import React, { useState } from 'react';
import s from './Searchbar.module.css';

export default function Searchbar({ onClick }) {
  const [value, setValue] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (value.trim() !== '') {
      onClick(value);
      setValue('');
    }
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={onSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          onChange={onChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
        />
      </form>
    </header>
  );
}
