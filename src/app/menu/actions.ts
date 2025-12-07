'use server';

import { getPersonalizedRecommendations } from '@/ai/flows/personalized-menu-recommendations';
import { menuItems } from '@/lib/data';

export async function getAiRecommendations(preferences: string) {
  try {
    // Format the menu for the AI prompt
    const menuString = menuItems.map(item => 
      `- ${item.name} (${item.category}): ${item.description} [${item.tags.join(', ')}]`
    ).join('\n');

    const input = {
      userPreferences: preferences,
      menu: menuString,
    };

    const result = await getPersonalizedRecommendations(input);
    return { success: true, recommendations: result.recommendations };
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    return { success: false, error: 'Failed to get recommendations. Please try again.' };
  }
}
