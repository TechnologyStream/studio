import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn('font-headline text-2xl font-bold text-accent', className)}>
      Sheesha SkyHub
    </Link>
  );
}
