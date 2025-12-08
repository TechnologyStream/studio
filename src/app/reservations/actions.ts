'use server';

import { addDocumentNonBlocking, getSdks } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { ReservationFormValues } from '@/components/reservations/reservation-form';
import { v4 as uuidv4 } from 'uuid';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';

// This is a temporary workaround to initialize the admin app
// on the server. In a real app, you would use the Firebase Admin SDK.
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export async function createReservation(
  data: ReservationFormValues,
  userId: string
) {
  try {
    const { firestore } = getSdks(getApps()[0]);
    const restaurantId = 'main-restaurant'; // In a multi-restaurant app, this would be dynamic

    const reservationData = {
      id: uuidv4(),
      restaurantId: restaurantId,
      userId: userId,
      reservationDateTime: new Date(
        `${data.date.toISOString().split('T')[0]}T${data.time}:00`
      ).toISOString(),
      partySize: parseInt(data.partySize, 10),
      status: 'Confirmed', // Or 'Pending' if confirmation is needed
      customerName: data.name, // Denormalizing for easier display
      customerEmail: data.email, // Denormalizing for easier display
      customerPhone: data.phone, // Denormalizing for easier display
    };

    const reservationsCol = collection(
      firestore,
      'restaurants',
      restaurantId,
      'tableReservations'
    );
    
    addDocumentNonBlocking(reservationsCol, reservationData);

    return { success: true, reservationId: reservationData.id };
  } catch (error) {
    console.error('Error creating reservation:', error);
    // In a real app, you would have more robust error handling
    return { success: false, error: 'Failed to create reservation.' };
  }
}
