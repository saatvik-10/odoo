'use client';

import React from 'react';
import api from '@/lib/api';
import { useState, useEffect } from 'react';

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await api.rental.getRentalsForUser();
        setRentals(response);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      }
    };

    fetchRentals();
  }, []);

  return (
    <div>
      <h1>My Rentals</h1>
      {rentals.length === 0 ? (
        <p>No rentals found.</p>
      ) : (
        <ul>
          {rentals.map((rental) => (
            <li >{rental}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRentals;
