'use client';

import { use, useEffect, useState } from 'react';
// import { Navigation } from "@/components/layout/navigation"
import { RentalHeader } from '@/components/rental/rental-header';
import { RentalDetails } from '@/components/rental/rental-details';
import { mockRentals } from '@/lib/mock-data/index';
import type { Rental, RentalStatus } from '@/validators/rental.validator';
import api from '@/lib/api';
import { useParams } from 'next/navigation';

export default function RentalDetailPage() {
  const params = useParams<{ id: string }>();
  const rentalId = params.id;

  const [currentRentalIndex, setCurrentRentalIndex] = useState(0);
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    const fetchRental = async () => {
      const rental = await api.rental.getRentalByID("689a35dfb166403780afa5a5");
      setRentals([rental]);
    };
    fetchRental();
  }, [rentalId]);

  const currentRental = rentals[currentRentalIndex];

  const handleStatusChange = (newStatus: RentalStatus, data?: any) => {
    setRentals((prev) =>
      prev.map((rental, index) =>
        index === currentRentalIndex ? { ...rental, status: newStatus } : rental
      )
    );

    // Here you would typically make an API call to update the status
    console.log(`Status changed to: ${newStatus}`, data);
  };

  const handlePrevious = () => {
    setCurrentRentalIndex((prev) => (prev > 0 ? prev - 1 : rentals.length - 1));
  };

  const handleNext = () => {
    setCurrentRentalIndex((prev) => (prev < rentals.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className='min-h-screen bg-gray-50 max-w-7xl mx-auto'>
      <RentalHeader
        rentalID={rentalId}
        status={currentRental.status}
        currentPage={currentRentalIndex + 1}
        totalPages={rentals.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
      <RentalDetails
        rental={currentRental}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
