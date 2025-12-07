import MenuDisplay from "@/components/menu/menu-display";
import AiRecommender from "@/components/menu/ai-recommender";
import { Sparkles } from "lucide-react";

export default function MenuPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Menu</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            A culinary journey designed to delight your senses. Discover dishes crafted with passion and the finest ingredients.
          </p>
        </div>

        <div className="mt-16">
          <MenuDisplay />
        </div>

        <div className="mt-24 rounded-lg border border-accent/50 bg-primary/20 p-8">
            <div className="text-center">
                <Sparkles className="mx-auto h-12 w-12 text-accent"/>
                <h2 className="mt-4 font-headline text-3xl font-bold md:text-4xl">Personalized Recommendations</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
                Tell us what you like, and our AI will curate a personalized menu just for you.
                </p>
            </div>
            <div className="mt-8">
                <AiRecommender />
            </div>
        </div>
      </div>
    </div>
  );
}
