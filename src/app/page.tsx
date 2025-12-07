import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { venues, events, reviews } from '@/lib/data';
import { ArrowRight, Calendar, MapPin, Music } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-club');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative h-screen w-full">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Where World-Class Dining Meets Nightlife
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-300 md:text-xl">
              Premier Nightclub Experience Since 2000
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/reservations">Book a Table</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link href="/menu">View Menu</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="prose prose-invert max-w-none text-foreground/80">
                <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
                  Bhopal's Premier Hotspot
                </h2>
                <p className="text-lg">
                  Since 2000, Sheesha Restaurant SkyClub & Lounge has been the
                  heart of Bhopal's nightlife. We blend world-class dining with
                  an electrifying nightclub experience, creating unforgettable
                  nights.
                </p>
                <p>
                  Located in the bustling Aashima Mall, our venue transforms
                  from a fine-dining restaurant to a high-energy sky club as
                  the night unfolds. It's an escape, a celebration, a new story
                  written every evening.
                </p>
                <Button asChild variant="link" className="p-0 text-accent h-auto">
                  <Link href="/about">
                    Discover Our Story <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div>
                <Card className="overflow-hidden bg-card/50 backdrop-blur-sm">
                  <Image
                    src="https://picsum.photos/seed/restaurant-interior/600/400"
                    alt="Elegant restaurant interior"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                    data-ai-hint="restaurant interior"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="venues" className="bg-primary/20 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Explore Our Venues
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
                Three unique experiences, one destination. Find your perfect
                vibe.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {venues.map((venue) => {
                const venueImage = PlaceHolderImages.find(
                  (p) => p.id === venue.imageId
                );
                return (
                  <Card
                    key={venue.name}
                    className="transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 bg-card/50 backdrop-blur-sm"
                  >
                    {venueImage && (
                       <Image
                        src={venueImage.imageUrl}
                        alt={venueImage.description}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={venueImage.imageHint}
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl text-accent">
                        {venue.name}
                      </CardTitle>
                      <CardDescription>{venue.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="events" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Upcoming Events
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
                The pulse of Bhopal's nightlife. Don't miss out on our next big
                night.
              </p>
            </div>
            <div className="mt-12 space-y-8">
              {events.slice(0, 3).map((event) => (
                <Card
                  key={event.title}
                  className="grid grid-cols-1 items-center gap-4 p-4 md:grid-cols-4 bg-card/50 backdrop-blur-sm"
                >
                  <div className="md:col-span-1">
                     <p className="text-4xl font-bold text-accent">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="text-sm text-foreground/80">
                      {new Date(event.date).toLocaleString('default', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-headline text-xl font-bold">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-foreground/80 mt-1">
                      <span className="flex items-center gap-1"><Music size={14}/> {event.type}</span>
                      <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</span>
                    </div>
                  </div>
                  <div className="md:col-span-1 md:text-right">
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                       <Link href="/events">View Details</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link href="/events">See All Events</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-primary/20 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                What Our Guests Say
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
                Real stories from the heart of the party.
              </p>
            </div>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="mt-12 w-full"
            >
              <CarouselContent>
                {reviews.map((review, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="flex h-full flex-col justify-between bg-card/50 backdrop-blur-sm">
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
                            <AvatarImage
                              src={`https://i.pravatar.cc/40?u=${review.author}`}
                            />
                            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base font-medium">{review.author}</CardTitle>
                          </div>
                        </CardHeader>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>
      </main>
    </div>
  );
}
