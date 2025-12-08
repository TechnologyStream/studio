'use server';

import { addDocumentNonBlocking, getSdks } from '@/firebase';
import { collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export type ReviewFormData = {
  name: string;
  email: string;
  rating: number;
  feedback: string;
};

export async function createReview(data: ReviewFormData, userId: string) {
  try {
    const { firestore } = getSdks(getApps()[0]);
    const restaurantId = 'main-restaurant';

    const reviewData = {
      id: uuidv4(),
      restaurantId,
      userId,
      rating: data.rating,
      feedback: data.feedback,
      reviewDateTime: new Date().toISOString(),
      customerName: data.name,
      customerEmail: data.email,
    };

    const reviewsCol = collection(
      firestore,
      'restaurants',
      restaurantId,
      'customerReviews'
    );
    
    addDocumentNonBlocking(reviewsCol, reviewData);

    return { success: true };
  } catch (error) {
    console.error('Error creating review:', error);
    return { success: false, error: 'Failed to create review.' };
  }
}
