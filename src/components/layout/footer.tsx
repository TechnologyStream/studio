import Link from 'next/link';
import { Github, Twitter, Instagram, Facebook } from 'lucide-react';
import Logo from '@/components/common/logo';
import { Button } from '../ui/button';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-foreground/60">
              The ultimate nightlife and dining experience in Bhopal.
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-foreground/60 transition-colors hover:text-accent" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-foreground/60 transition-colors hover:text-accent" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-foreground/60 transition-colors hover:text-accent" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-accent">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-foreground/60 hover:text-accent">About Us</Link></li>
              <li><Link href="/menu" className="text-sm text-foreground/60 hover:text-accent">Menu</Link></li>
              <li><Link href="/events" className="text-sm text-foreground/60 hover:text-accent">Events</Link></li>
              <li><Link href="/reservations" className="text-sm text-foreground/60 hover:text-accent">Reservations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-accent">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/60">
              <li>Aashima Mall, Bhopal, MP 462026</li>
              <li>
                <a href="mailto:administrator@sheeshaskylounge.com" className="hover:text-accent">
                  administrator@sheeshaskylounge.com
                </a>
              </li>
              <li>
                <a href="tel:6393188763" className="hover:text-accent">
                  +91 6393188763
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline text-lg font-semibold text-accent">Hours</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/60">
              <li>Lunch: 12:00 PM - 3:00 PM</li>
              <li>Lounge: 3:00 PM - 1:00 AM</li>
              <li>Club: 7:00 PM - 1:00 AM</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Sheesha SkyHub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
