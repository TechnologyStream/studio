'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCollection, useUser, useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { createReview } from './actions';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reviewsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'restaurants/main-restaurant/customerReviews'),
      orderBy('reviewDateTime', 'desc')
    );
  }, [firestore]);

  const { data: reviews, isLoading } = useCollection<any>(reviewsQuery);

  const handleSignIn = () => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('You must be signed in to leave a review.');
      handleSignIn();
      return;
    }
    if (rating === 0 || feedback.trim() === '') {
      alert('Please provide a rating and feedback.');
      return;
    }
    setIsSubmitting(true);
    await createReview({ name, email, rating, feedback }, user.uid);
    setRating(0);
    setFeedback('');
    setName('');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Guest Reviews</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            Real stories and authentic feedback from our valued guests.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && <p>Loading reviews...</p>}
          {reviews && reviews.map((review: any) => (
            <Card key={review.id} className="flex h-full flex-col justify-between bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-accent fill-accent' : 'text-gray-500'}`} />
                  ))}
                </div>
                <p className="mt-4 text-foreground/80">"{review.feedback}"</p>
              </CardContent>
              <CardHeader className="flex flex-row items-center gap-4 pt-0">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/40?u=${review.userId}`} />
                  <AvatarFallback>{review.customerName ? review.customerName.charAt(0) : 'A'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-medium">{review.customerName || 'Anonymous'}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-24 max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <h2 className="font-headline text-3xl font-bold text-center">Leave a Review</h2>
              <p className="text-center text-foreground/80">Share your experience with us.</p>
            </CardHeader>
            <CardContent>
              {user ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-sm text-foreground/80">Your Rating:</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer ${rating >= star ? 'text-accent fill-accent' : 'text-gray-500'}`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <Textarea placeholder="Your review..." className="min-h-[120px]" value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              ) : (
                <div className="text-center">
                  <p className="mb-4">Please sign in to leave a review.</p>
                  <Button onClick={handleSignIn} disabled={isUserLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    {isUserLoading ? 'Loading...' : 'Sign In Anonymously'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
