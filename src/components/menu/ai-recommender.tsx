'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getAiRecommendations } from '@/app/menu/actions';
import { Loader2 } from 'lucide-react';

export default function AiRecommender() {
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!preferences.trim()) {
      setError('Please enter your preferences.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setRecommendations(null);

    const result = await getAiRecommendations(preferences);
    
    if (result.success) {
      setRecommendations(result.recommendations);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="e.g., 'I love spicy vegetarian food and refreshing mocktails. Not a fan of mushrooms.'"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          className="min-h-[100px] bg-background/50"
          aria-label="Your food and drink preferences"
        />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Recommendations...
            </>
          ) : (
            'Get Recommendations'
          )}
        </Button>
      </form>
      
      {error && (
        <div className="mt-4 text-center text-destructive">{error}</div>
      )}

      {recommendations && (
        <Card className="mt-8 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="font-headline text-xl font-bold text-accent">Here are your personalized recommendations:</h3>
            <div className="prose prose-invert mt-4 text-foreground/80 whitespace-pre-wrap">
              {recommendations}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
