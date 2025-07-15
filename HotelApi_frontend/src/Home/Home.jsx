import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Witaj w systemie rezerwacji</h1>
      <div className="home-buttons">
        <Link to="/list" className="home-button">📋 Lista rezerwacji</Link>
        <Link to="/add" className="home-button">➕ Dodaj rezerwację</Link>
        <Link to="/search" className="home-button">🔍 Szukaj rezerwacji</Link>
      </div>
    </div>
  );
};

export default Home;
