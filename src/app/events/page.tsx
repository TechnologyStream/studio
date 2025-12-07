import { events } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Music, Clock } from 'lucide-react';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Events Calendar</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            The pulse of Bhopal's nightlife. Discover our upcoming DJ nights, live performances, and theme parties.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.title} className="flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-accent">
                   <Calendar className="h-4 w-4" />
                   <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <CardTitle className="font-headline text-2xl pt-2">{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-4 pt-1">
                  <span className="flex items-center gap-1"><Music size={14}/> {event.type}</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/80">{event.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
