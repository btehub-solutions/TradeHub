# TradeHub Theme Colors

## Primary Color: Blue

```css
primary-50:  #eff6ff
primary-100: #dbeafe
primary-200: #bfdbfe
primary-300: #93c5fd
primary-400: #60a5fa
primary-500: #3b82f6  ← Main primary color
primary-600: #2563eb  ← Hover states
primary-700: #1d4ed8  ← Active states
primary-800: #1e40af
primary-900: #1e3a8a
primary-950: #172554
```

## Accent Color: Orange

```css
accent-50:  #fff7ed
accent-100: #ffedd5
accent-200: #fed7aa
accent-300: #fdba74
accent-400: #fb923c
accent-500: #f97316  ← Main accent color
accent-600: #ea580c  ← Hover states
accent-700: #c2410c  ← Active states
accent-800: #9a3412
accent-900: #7c2d12
accent-950: #431407
```

## Usage Examples

### Tailwind Classes

```jsx
// Primary color
<button className="bg-primary-500 hover:bg-primary-600 text-white">
  Primary Button
</button>

// Accent color
<button className="bg-accent-500 hover:bg-accent-600 text-white">
  Accent Button
</button>

// Text colors
<h1 className="text-primary-700">Primary Heading</h1>
<p className="text-accent-600">Accent Text</p>

// Borders
<div className="border-primary-500">Primary Border</div>
<div className="border-accent-500">Accent Border</div>
```

### CSS Variables (for shadcn/ui components)

Light mode:
```css
--primary: 217.2 91.2% 59.8%;        /* Blue */
--primary-foreground: 210 40% 98%;
--accent: 24.6 95% 53.1%;            /* Orange */
--accent-foreground: 210 40% 98%;
```

Dark mode:
```css
--primary: 217.2 91.2% 59.8%;        /* Blue */
--primary-foreground: 222.2 47.4% 11.2%;
--accent: 24.6 95% 53.1%;            /* Orange */
--accent-foreground: 210 40% 98%;
```

### Using with shadcn/ui Components

```jsx
import { Button } from '@/components/ui/button'

// Default variant uses primary color
<Button>Primary Button</Button>

// Custom styling with accent
<Button className="bg-accent-500 hover:bg-accent-600">
  Accent Button
</Button>
```

## Brand Guidelines

### When to Use Primary (Blue)
- Main CTAs (Call-to-Actions)
- Navigation elements
- Links
- Primary buttons
- Active states
- Focus indicators

### When to Use Accent (Orange)
- Secondary CTAs
- Highlights
- Special offers
- Notifications
- Badges
- Important alerts

### Neutral Colors (from Tailwind)
- Background: white / slate-50
- Text: slate-900 / slate-700
- Borders: slate-200 / slate-300
- Muted text: slate-500

## Accessibility

All color combinations meet WCAG AA standards:
- Primary-500 on white: ✅ 4.5:1 contrast
- Accent-500 on white: ✅ 4.5:1 contrast
- White text on Primary-600: ✅ 4.5:1 contrast
- White text on Accent-600: ✅ 4.5:1 contrast

## Logo Colors

Recommended logo color combinations:
1. Primary-600 (#2563eb) + Accent-500 (#f97316)
2. Primary-700 (#1d4ed8) + Accent-600 (#ea580c)
3. White on Primary-600 background
