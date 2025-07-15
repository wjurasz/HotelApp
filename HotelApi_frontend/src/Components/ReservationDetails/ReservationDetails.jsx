import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReservationDetails.css';

const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`https://localhost:7074/reservations/${id}`)
      .then(res => {
        setReservation(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Błąd pobierania rezerwacji:', err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('pl-PL');
  };

  const translateStatus = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'Potwierdzona';
      case 'cancelled': return 'Anulowana';
      case 'pending': return 'Oczekująca';
      default: return status || 'Nieznany';
    }
  };

  if (loading) return <p>⏳ Ładowanie szczegółów rezerwacji...</p>;
  if (error || !reservation) return <p style={{ color: 'red' }}>❌ Nie znaleziono rezerwacji.</p>;

  return (
    <div className="reservation-details">
      <h2>📄 Szczegóły rezerwacji</h2>
      <p><strong>ID:</strong> {reservation.id}</p>
      <p><strong>Klient:</strong> {reservation.clientFullName} (ID: {reservation.clientId})</p>
      <p><strong>Email:</strong> {reservation.clientEmail}</p>
      <p><strong>Telefon:</strong> {reservation.clientPhoneNumber}</p>
      <p><strong>Od:</strong> {formatDate(reservation.startDate)}</p>
      <p><strong>Do:</strong> {formatDate(reservation.endDate)}</p>
      <p><strong>Status:</strong> {translateStatus(reservation.status)}</p>
      <p><strong>Promocja:</strong> {reservation.promotionCode || 'brak'} ({reservation.discountPercentage ?? 0}%)</p>
    </div>
  );
};

export default ReservationDetails;
