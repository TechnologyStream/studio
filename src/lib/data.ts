import { MenuItem, Venue, Event, Review } from './types';

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Paneer Tikka',
    description: 'Cubes of paneer marinated in spices and grilled in a tandoor.',
    price: 350,
    category: 'Starters',
    tags: ['vegetarian', 'spicy', 'chef-special'],
    imageId: 'menu-starter',
  },
  {
    id: 2,
    name: 'Butter Chicken',
    description: 'Grilled chicken cooked in a smooth buttery & creamy tomato based gravy.',
    price: 550,
    category: 'Main Course',
    tags: ['non-vegetarian', 'chef-special'],
    imageId: 'menu-main',
  },
  {
    id: 3,
    name: 'Classic Mojito',
    description: 'A refreshing mix of white rum, sugar, lime juice, soda water, and mint.',
    price: 400,
    category: 'Bar Menu',
    tags: [],
    imageId: 'menu-drink',
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    description: 'A decadent chocolate cake with a gooey, molten center.',
    price: 300,
    category: 'Desserts',
    tags: ['vegetarian'],
    imageId: 'menu-dessert',
  },
   {
    id: 5,
    name: 'Chilli Mushroom',
    description: 'Crispy fried mushrooms tossed in a spicy and tangy chili sauce.',
    price: 320,
    category: 'Starters',
    tags: ['vegetarian', 'spicy'],
    imageId: 'menu-starter',
  },
  {
    id: 6,
    name: 'Dal Makhani',
    description: 'Black lentils and kidney beans cooked in a rich, creamy gravy.',
    price: 450,
    category: 'Main Course',
    tags: ['vegetarian', 'chef-special'],
    imageId: 'menu-main',
  },
  {
    id: 7,
    name: 'Long Island Iced Tea',
    description: 'A potent cocktail with vodka, tequila, rum, gin, and a splash of cola.',
    price: 500,
    category: 'Bar Menu',
    tags: [],
    imageId: 'menu-drink',
  },
  {
    id: 8,
    name: 'Gulab Jamun',
    description: 'Soft, spongy balls made of milk solids, soaked in rose-flavored sugar syrup.',
    price: 200,
    category: 'Desserts',
    tags: ['vegetarian'],
    imageId: 'menu-dessert',
  },
];

export const venues: Venue[] = [
  {
    name: 'Restaurant Area',
    description: 'Experience fine dining with elegant table settings and a sophisticated ambiance.',
    imageId: 'venue-restaurant',
  },
  {
    name: 'SkyClub',
    description: 'The heart of the party with a high-energy dance floor and state-of-the-art sound.',
    imageId: 'venue-skyclub',
  },
  {
    name: 'Lounge Area',
    description: 'Relax and unwind with comfortable seating and our signature cocktails.',
    imageId: 'venue-lounge',
  },
];

export const events: Event[] = [
  {
    title: 'Saturday Night ft. DJ Ravish',
    date: '2024-08-10T21:00:00',
    type: 'DJ Night',
    description: 'Get ready to dance the night away with the electrifying beats of DJ Ravish.',
  },
  {
    title: 'Bollywood Retro Night',
    date: '2024-08-17T21:00:00',
    type: 'Theme Party',
    description: 'Travel back in time with classic Bollywood hits all night long.',
  },
  {
    title: 'Live Unplugged with Aakash',
    date: '2024-08-24T20:00:00',
    type: 'Live Music',
    description: 'Enjoy a soulful evening with the acoustic melodies of Aakash.',
  },
];

export const reviews: Review[] = [
  {
    author: 'Rohan Sharma',
    comment: 'The best nightclub experience in Bhopal! The music and ambiance are just incredible. A must-visit for party lovers.',
    rating: 5,
  },
  {
    author: 'Priya Singh',
    comment: 'Had dinner with my family. The food was exquisite, and the service was top-notch. The place transforms beautifully into a club later.',
    rating: 5,
  },
  {
    author: 'Amit Patel',
    comment: 'Amazing place to hang out with friends. The lounge area is super chill. Cocktails are a bit pricey but worth it.',
    rating: 4,
  },
  {
    author: 'Sneha Verma',
    comment: 'Attended the Saturday DJ night, and it was insane! The energy was off the charts. Great crowd and fantastic music.',
    rating: 5,
  },
];
