import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ReservationList from './Components/ReservationList/ReservationList';
import AddReservationForm from './Components/AddReservationForm/AddReservationForm';
import ReservationDetails from './Components/ReservationDetails/ReservationDetails';
import SearchReservation from './Components/SearchReservation/SearchReservation';
import Home from './Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{
          padding: '12px 20px',
          backgroundColor: '#f0f0f0',
          marginBottom: '20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <Link to="list" style={{ marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>
            🗂 Lista rezerwacji
          </Link>
          <Link to="/add" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
            ➕ Dodaj rezerwację
          </Link>
          <Link to="/search" style={{ marginLeft: '20px', textDecoration: 'none', fontWeight: 'bold' }}>
            🔍 Sprawdź rezerwację
          </Link>
          <Link to="/" style={{ marginLeft: '20px', textDecoration: 'none', fontWeight: 'bold' }}>
          🏠 Strona główna
          </Link>
          
        </nav>

        <div style={{ padding: '20px' }}>
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
