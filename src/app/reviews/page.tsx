import { reviews } from '@/lib/data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ReviewsPage() {
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
          {reviews.map((review, index) => (
            <Card key={index} className="flex h-full flex-col justify-between bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-5 w-5 ${i < review.rating ? 'text-accent' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.175 0l-3.366 2.446c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-foreground/80">"{review.comment}"</p>
              </CardContent>
              <CardHeader className="flex flex-row items-center gap-4 pt-0">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/40?u=${review.author}`} />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-medium">{review.author}</p>
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
              <form className="space-y-6">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <div className="flex items-center justify-center gap-2">
                    <p className="text-sm text-foreground/80">Your Rating:</p>
                    {/* Basic star rating input */}
                </div>
                <Textarea placeholder="Your review..." className="min-h-[120px]" />
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">Submit Review</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
