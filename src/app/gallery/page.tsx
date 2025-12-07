import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

export default function GalleryPage() {
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));
  
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Gallery</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            A glimpse into the energy and elegance of Sheesha SkyHub.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mt-16">
          {galleryImages.map(image => (
            <div key={image.id} className="break-inside-avoid">
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
