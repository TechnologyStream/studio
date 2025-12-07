import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ContactPage() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'contact-map');

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Get In Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            We're here to answer your questions, take your reservations, and help plan your perfect night out.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-8">
             <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="font-headline text-2xl font-bold text-accent">Contact Details</h2>
                <div className="mt-6 space-y-4 text-foreground/80">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <span>Aashima Mall, 12, Hoshangabad Road, Danish Nagar, Bawaria Kalan, Bhopal, Madhya Pradesh, 462026</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-accent flex-shrink-0" />
                    <a href="tel:6393188763" className="hover:text-accent">+91 6393188763</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-accent flex-shrink-0" />
                    <a href="mailto:administrator@sheeshaskylounge.com" className="hover:text-accent">administrator@sheeshaskylounge.com</a>
                  </div>
                </div>
              </CardContent>
            </Card>
             <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="font-headline text-2xl font-bold text-accent">Operating Hours</h2>
                <div className="mt-6 space-y-4 text-foreground/80">
                  <div className="flex items-center gap-4">
                    <Clock className="h-6 w-6 text-accent flex-shrink-0" />
                    <span>Lunch Service: 12:00 PM - 3:00 PM</span>
                  </div>
                   <div className="flex items-center gap-4">
                    <Clock className="h-6 w-6 text-accent flex-shrink-0" />
                    <span>Lounge Hours: 3:00 PM - 1:00 AM</span>
                  </div>
                   <div className="flex items-center gap-4">
                    <Clock className="h-6 w-6 text-accent flex-shrink-0" />
                    <span>Club Hours: 7:00 PM - 1:00 AM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                 <h2 className="font-headline text-2xl font-bold text-accent">Send Us a Message</h2>
                 <form className="mt-6 space-y-6">
                   <Input placeholder="Your Name" />
                   <Input type="email" placeholder="Your Email" />
                   <Textarea placeholder="Your Message" className="min-h-[120px]" />
                   <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">Send Message</Button>
                 </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          {mapImage && (
             <Link href="https://maps.google.com?q=Sheesha+Restaurant+SkyClub+Lounge+Bhopal" target="_blank" rel="noopener noreferrer">
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                width={1200}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                data-ai-hint={mapImage.imageHint}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
