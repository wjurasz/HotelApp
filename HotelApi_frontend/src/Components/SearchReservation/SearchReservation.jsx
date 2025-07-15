import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchReservation.css';

const SearchReservation = () => {
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!id || isNaN(id)) {
      setError('Wprowadź poprawne ID.');
      return;
    }

    navigate(`/reservation/${id}`);
  };

  return (
    <div className="search-container">
      <h2>Sprawdź Rezerwację</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Wprowadź ID rezerwacji"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setError('');
          }}
        />
        <button type="submit">Szukaj</button>
      </form>
      {error && <p className="search-error">{error}</p>}
    </div>
  );
};

export default SearchReservation;
