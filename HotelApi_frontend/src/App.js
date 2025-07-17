import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReservationList from './Components/ReservationList/ReservationList';
import AddReservationForm from './Components/AddReservationForm/AddReservationForm';
import ReservationDetails from './Components/ReservationDetails/ReservationDetails';
import SearchReservation from './Components/SearchReservation/SearchReservation';
import Home from './Home/Home';
import './App.css'; // Dodajemy import CSS

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-link">🏠 Strona główna</Link>
          <Link to="/list" className="nav-link">🗂 Lista rezerwacji</Link>
          <Link to="/add" className="nav-link">➕ Dodaj rezerwację</Link>
          <Link to="/search" className="nav-link">🔍 Sprawdź rezerwację</Link>
          
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<ReservationList />} />
            <Route path="/add" element={<AddReservationForm />} />
            <Route path="/reservation/:id" element={<ReservationDetails />} />
            <Route path="/search" element={<SearchReservation />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
