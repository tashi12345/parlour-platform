export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
  icon: string;
  available: boolean;
}

export const SERVICES_DATA: Service[] = [
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    category: 'Bridal',
    price: 50000,
    duration: '3 hours',
    description: 'Complete bridal makeup package with trials, HD makeup, hair styling, and finishing touches for your special day',
    icon: 'Crown',
    available: true
  },
  {
    id: 'party-makeup',
    name: 'Party Makeup',
    category: 'Makeup',
    price: 8000,
    duration: '90 min',
    description: 'Glamorous party makeup with professional styling and finishing to make you stand out',
    icon: 'Sparkles',
    available: true
  },
  {
    id: 'engagement-makeup',
    name: 'Engagement Makeup',
    category: 'Bridal',
    price: 15000,
    duration: '2 hours',
    description: 'Perfect engagement look with elegant makeup and hairstyling for your big announcement',
    icon: 'Heart',
    available: true
  },
  {
    id: 'hair-color',
    name: 'Hair Coloring',
    category: 'Hair',
    price: 12000,
    duration: '2 hours',
    description: 'Professional hair coloring with premium products. Includes highlights, balayage, and full color',
    icon: 'Palette',
    available: true
  },
  {
    id: 'hair-styling',
    name: 'Hair Styling & Blow Dry',
    category: 'Hair',
    price: 3000,
    duration: '60 min',
    description: 'Professional hair styling, blow dry, and setting for any occasion',
    icon: 'Wind',
    available: true
  },
  {
    id: 'facial-treatment',
    name: 'Facial Treatment',
    category: 'Skin Care',
    price: 5000,
    duration: '60 min',
    description: 'Deep cleansing facial with extraction, massage, and mask for glowing, refreshed skin',
    icon: 'Droplet',
    available: true
  },
  {
    id: 'manicure-pedicure',
    name: 'Manicure & Pedicure',
    category: 'Spa',
    price: 4000,
    duration: '90 min',
    description: 'Complete nail care with spa treatment, polish, and hand/foot massage',
    icon: 'Hand',
    available: true
  },
  {
    id: 'body-waxing',
    name: 'Full Body Waxing',
    category: 'Spa',
    price: 6000,
    duration: '90 min',
    description: 'Complete body waxing with premium wax for smooth, hair-free skin',
    icon: 'Feather',
    available: true
  },
  {
    id: 'threading',
    name: 'Threading Service',
    category: 'Grooming',
    price: 500,
    duration: '15 min',
    description: 'Precise eyebrow and facial threading for perfectly shaped brows',
    icon: 'Scissors',
    available: true
  },
  {
    id: 'mehndi',
    name: 'Mehndi/Henna Design',
    category: 'Bridal',
    price: 8000,
    duration: '2 hours',
    description: 'Beautiful bridal and party mehndi designs with intricate patterns',
    icon: 'Flower',
    available: true
  }
];
