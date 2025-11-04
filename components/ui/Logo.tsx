import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export function Logo({ 
  className, 
  iconClassName, 
  textClassName,
  showText = true 
}: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn("flex items-center gap-2 transition-opacity hover:opacity-80", className)}
      aria-label="TradeHub Home"
    >
      <ShoppingBag className={cn("h-6 w-6 text-primary", iconClassName)} />
      {showText && (
        <span className={cn("text-xl font-bold text-primary", textClassName)}>
          TradeHub
        </span>
      )}
    </Link>
  );
}
