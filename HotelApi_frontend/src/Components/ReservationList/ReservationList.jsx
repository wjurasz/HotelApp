import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReservationList.css';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = () => {
    axios.get('/reservations')
      .then(res => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Błąd pobierania rezerwacji:', err);
        setLoading(false);
      });
  };

  const confirmReservation = (id) => {
    axios.patch(`/reservations/${id}/confirm`)
      .then(() => {
        alert(`Rezerwacja ${id} potwierdzona.`);
        fetchReservations();
      })
      .catch(err => {
        console.error('Błąd potwierdzenia:', err);
        alert('Nie udało się potwierdzić.');
      });
  };

  const cancelReservation = (id) => {
    axios.patch(`/reservations/${id}/cancel`)
      .then(() => {
        alert(`Rezerwacja ${id} anulowana.`);
        fetchReservations();
      })
      .catch(err => {
        console.error('Błąd anulowania:', err);
        alert('Nie udało się anulować.');
      });
  };

  useEffect(() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 10000); // co 10 sek.
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Ładowanie danych...</p>;

  return (
    <div className="reservation-list">
      <h1>Lista Rezerwacji</h1>
      {reservations.length === 0 ? (
        <p>Brak rezerwacji.</p>
      ) : (
        <ul>
          {reservations.map(r => (
            <li key={r.id}>
              <div className="card">
                <p><strong>ID:</strong> {r.id}</p>
                <p><strong>Klient:</strong> {r.clientId}</p>
                <p><strong>Od:</strong> {new Date(r.startDate).toLocaleString()}</p>
                <p><strong>Do:</strong> {new Date(r.endDate).toLocaleString()}</p>
                <p><strong>Status:</strong> {translateStatus(r.status)}</p>
                <p><strong>Promocja:</strong> {r.promotionCode || 'brak'} ({r.discountPercentage || 0}%)</p>
                
                <div className="buttons">
                  <button className="confirm-button" onClick={() => confirmReservation(r.id)}>Potwierdź</button>
                  <button className="cancel-button" onClick={() => cancelReservation(r.id)}>Anuluj</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const translateStatus = (status) => {
  switch (status) {
    case '0':
    case 0:
      return 'Oczekująca';
    case '1':
    case 1:
      return 'Potwierdzona';
    case '2':
    case 2:
      return 'Anulowana';
    default:
      return status;
  }
};

export default ReservationList;
