import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Story</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80">
            More than two decades of unforgettable nights and world-class dining.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <Image
              src="https://picsum.photos/seed/about-us-image/600/700"
              alt="Stylish interior of Sheesha SkyClub"
              width={600}
              height={700}
              className="w-full rounded-lg object-cover shadow-lg shadow-accent/10"
              data-ai-hint="stylish interior"
            />
          </div>
          <div className="prose prose-invert max-w-none text-foreground/80 order-1 md:order-2">
            <h2 className="font-headline text-3xl font-bold text-accent">Since 2000</h2>
            <p className="text-lg">
              Sheesha Restaurant SkyClub & Lounge first opened its doors in 2000 with a vision to redefine Bhopal's social scene. What began as a fine-dining restaurant quickly evolved into one of the city's most talked-about hotspots, a place where culinary excellence meets electrifying entertainment.
            </p>
            <p>
              Our journey has been one of constant innovation. We pioneered the concept of a dual-experience venue in Bhopal, seamlessly transforming a sophisticated restaurant into a high-energy nightclub as the evening progresses. This unique model allows our guests to enjoy a world-class meal and then dance the night away, all under one roof.
            </p>
            <p>
              Nestled in the vibrant Aashima Mall, our location is as dynamic as our ambiance. We've become a landmark, a go-to destination for celebrations, weekends, and every moment in between. Over the years, we've been honored with numerous awards and recognized for our exceptional service, amazing atmosphere, and commitment to quality.
            </p>
            <p>
              But our greatest achievement is the community we've built. Sheesha is more than just a venue; it's where memories are made, friendships are forged, and the spirit of Bhopal comes alive every night.
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">Join Us for an Unforgettable Experience</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            Whether it's a quiet dinner, a relaxed evening with friends, or a night of dancing, your perfect experience awaits.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/reservations">Book a Table</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
