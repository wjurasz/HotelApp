import React, { useState } from 'react';
import axios from 'axios';
import './AddReservationForm.css';

const AddReservationForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    clientId: '',
    startDate: '',
    endDate: '',
    promotionId: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      clientId: parseInt(form.clientId),
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
      promotionId: form.promotionId ? parseInt(form.promotionId) : null
    };

    axios.post('https://localhost:7074/reservations', payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        alert('Rezerwacja dodana!');
        setForm({ clientId: '', startDate: '', endDate: '', promotionId: '' });
        onCreated(); // odśwież listę rezerwacji
      })
      .catch(err => {
        console.error('Błąd przy zapisie:', err.response?.data || err.message);
        alert('Błąd podczas zapisu.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h2>Dodaj Rezerwację</h2>

      <div>
        <label>Client ID:</label>
        <input
          type="number"
          name="clientId"
          value={form.clientId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type="datetime-local"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="datetime-local"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Promotion ID (opcjonalnie):</label>
        <input
          type="number"
          name="promotionId"
          value={form.promotionId}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Zapisz</button>
    </form>
  );
};

export default AddReservationForm;
