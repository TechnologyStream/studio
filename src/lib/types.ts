export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Main Course' | 'Bar Menu' | 'Desserts';
  tags: ('vegetarian' | 'non-vegetarian' | 'spicy' | 'chef-special')[];
  imageId: string;
};

export type Venue = {
  name: string;
  description: string;
  imageId: string;
};

export type Event = {
  title: string;
  date: string;
  type: string;
  description: string;
};

export type Review = {
  author: string;
  comment: string;
  rating: number;
};
