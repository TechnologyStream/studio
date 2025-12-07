import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { menuItems } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function MenuDisplay() {
  const categories = ['Starters', 'Main Course', 'Bar Menu', 'Desserts'];

  return (
    <Tabs defaultValue="Starters" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-primary/30">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent key={category} value={category}>
          <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2 lg:grid-cols-3">
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => {
                const itemImage = PlaceHolderImages.find((p) => p.id === item.imageId);
                return (
                  <Card key={item.id} className="flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                     {itemImage && (
                      <Image
                        src={itemImage.imageUrl}
                        alt={itemImage.description}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                        data-ai-hint={itemImage.imageHint}
                      />
                    )}
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant={tag === 'chef-special' ? 'default' : 'secondary'} className={tag === 'chef-special' ? 'bg-accent text-accent-foreground' : ''}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-lg font-bold text-accent">₹{item.price}</p>
                    </CardFooter>
                  </Card>
                )
            })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
