import { 
  Smartphone, 
  Laptop, 
  Home, 
  Car, 
  Shirt, 
  Sofa,
  Book,
  Dumbbell,
  Baby,
  Wrench,
  LucideIcon
} from 'lucide-react';

const categoryIconMap: Record<string, LucideIcon> = {
  electronics: Smartphone,
  computers: Laptop,
  'real-estate': Home,
  vehicles: Car,
  fashion: Shirt,
  furniture: Sofa,
  books: Book,
  sports: Dumbbell,
  'baby-kids': Baby,
  tools: Wrench,
};

interface CategoryIconProps {
  slug: string;
  className?: string;
}

export function CategoryIcon({ slug, className = "h-5 w-5" }: CategoryIconProps) {
  const Icon = categoryIconMap[slug] || Smartphone;
  return <Icon className={className} />;
}

export function getCategoryIcon(slug: string): LucideIcon {
  return categoryIconMap[slug] || Smartphone;
}
