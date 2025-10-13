# Heading Decorator Component

A visual enhancement component for headings that adds stylistic decorations like gradients, highlights, underlines, glows, and outlines. Perfect for creating visually striking titles and hero sections.

## Basic Usage

```blade
<h1>
    <x-keys::heading-decorator>
        Welcome to Our Platform
    </x-keys::heading-decorator>
</h1>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'gradient'` | Decoration style: `gradient`, `highlight`, `underline`, `glow`, `outline` |
| `color` | `string` | `'brand'` | Color scheme: `brand`, `success`, `warning`, `danger`, `neutral`, `blue`, `red`, `green`, `yellow`, `purple`, `pink`, `indigo` |
| `animation` | `string\|null` | auto | Animation effect (varies by variant) |

## Variants

### Gradient
Applies a gradient color effect to the text.

```blade
<h1 class="text-4xl font-bold">
    <x-keys::heading-decorator variant="gradient" color="brand">
        Gradient Heading
    </x-keys::heading-decorator>
</h1>
```

### Highlight
Adds a background highlight behind the text.

```blade
<h1 class="text-4xl font-bold">
    <x-keys::heading-decorator variant="highlight" color="success">
        Highlighted Text
    </x-keys::heading-decorator>
</h1>
```

### Underline
Draws a decorative underline beneath the text.

```blade
<h1 class="text-4xl font-bold">
    <x-keys::heading-decorator variant="underline" color="danger">
        Underlined Heading
    </x-keys::heading-decorator>
</h1>
```

### Glow
Applies a glowing shadow effect around the text.

```blade
<h1 class="text-4xl font-bold">
    <x-keys::heading-decorator variant="glow" color="purple">
        Glowing Text
    </x-keys::heading-decorator>
</h1>
```

### Outline
Creates an outlined text effect.

```blade
<h1 class="text-4xl font-bold">
    <x-keys::heading-decorator variant="outline" color="blue">
        Outlined Text
    </x-keys::heading-decorator>
</h1>
```

## Colors

The component supports multiple color schemes:

```blade
<!-- Brand color -->
<x-keys::heading-decorator color="brand">Brand</x-keys::heading-decorator>

<!-- Success -->
<x-keys::heading-decorator color="success">Success</x-keys::heading-decorator>

<!-- Warning -->
<x-keys::heading-decorator color="warning">Warning</x-keys::heading-decorator>

<!-- Danger -->
<x-keys::heading-decorator color="danger">Danger</x-keys::heading-decorator>

<!-- Neutral -->
<x-keys::heading-decorator color="neutral">Neutral</x-keys::heading-decorator>

<!-- Standard colors -->
<x-keys::heading-decorator color="blue">Blue</x-keys::heading-decorator>
<x-keys::heading-decorator color="red">Red</x-keys::heading-decorator>
<x-keys::heading-decorator color="green">Green</x-keys::heading-decorator>
<x-keys::heading-decorator color="yellow">Yellow</x-keys::heading-decorator>
<x-keys::heading-decorator color="purple">Purple</x-keys::heading-decorator>
<x-keys::heading-decorator color="pink">Pink</x-keys::heading-decorator>
<x-keys::heading-decorator color="indigo">Indigo</x-keys::heading-decorator>
```

## Animations

The component automatically applies appropriate animations based on the variant. You can also specify custom animations:

### Underline Animations

```blade
<!-- Draw animation (default for underline) -->
<x-keys::heading-decorator variant="underline" animation="draw">
    Animated Underline
</x-keys::heading-decorator>

<!-- Grow animation -->
<x-keys::heading-decorator variant="underline" animation="grow">
    Growing Underline
</x-keys::heading-decorator>

<!-- Slide animation -->
<x-keys::heading-decorator variant="underline" animation="slide">
    Sliding Underline
</x-keys::heading-decorator>
```

### Highlight Animations

```blade
<!-- Fade animation (default for highlight) -->
<x-keys::heading-decorator variant="highlight" animation="fade">
    Fading Highlight
</x-keys::heading-decorator>

<!-- Slide animation -->
<x-keys::heading-decorator variant="highlight" animation="slide">
    Sliding Highlight
</x-keys::heading-decorator>
```

### No Animation

```blade
<x-keys::heading-decorator variant="gradient" animation="none">
    Static Decoration
</x-keys::heading-decorator>
```

## Use Cases

### Hero Section

```blade
<section class="py-20 text-center">
    <h1 class="text-6xl font-bold mb-4">
        <x-keys::heading-decorator variant="gradient" color="brand">
            Build Amazing Products
        </x-keys::heading-decorator>
    </h1>
    <p class="text-xl text-gray-600">
        The tools you need to succeed
    </p>
</section>
```

### Section Titles

```blade
<section>
    <h2 class="text-3xl font-bold mb-8">
        Our
        <x-keys::heading-decorator variant="highlight" color="success">
            Features
        </x-keys::heading-decorator>
    </h2>
    <!-- section content -->
</section>
```

### Emphasized Words

```blade
<h1 class="text-4xl font-bold">
    The
    <x-keys::heading-decorator variant="underline" color="danger">
        Ultimate
    </x-keys::heading-decorator>
    Solution
</h1>
```

### Call-to-Action Headers

```blade
<div class="text-center">
    <h2 class="text-5xl font-bold mb-6">
        <x-keys::heading-decorator variant="glow" color="purple">
            Join 10,000+ Users
        </x-keys::heading-decorator>
    </h2>
    <x-keys::button color="primary" size="lg">
        Get Started Free
    </x-keys::button>
</div>
```

### Feature Highlights

```blade
<div class="grid grid-cols-3 gap-8">
    <div class="text-center">
        <h3 class="text-2xl font-bold mb-2">
            <x-keys::heading-decorator variant="gradient" color="blue">
                Fast
            </x-keys::heading-decorator>
        </h3>
        <p>Lightning-fast performance</p>
    </div>

    <div class="text-center">
        <h3 class="text-2xl font-bold mb-2">
            <x-keys::heading-decorator variant="gradient" color="green">
                Secure
            </x-keys::heading-decorator>
        </h3>
        <p>Enterprise-grade security</p>
    </div>

    <div class="text-center">
        <h3 class="text-2xl font-bold mb-2">
            <x-keys::heading-decorator variant="gradient" color="purple">
                Scalable
            </x-keys::heading-decorator>
        </h3>
        <p>Grows with your needs</p>
    </div>
</div>
```

## Accessibility

The Heading Decorator component:

- Is purely decorative and doesn't affect semantic structure
- Preserves heading hierarchy
- Works with screen readers
- Maintains text readability
- Supports high contrast mode

Always wrap decorators in proper heading tags:

```blade
<!-- Good -->
<h1>
    <x-keys::heading-decorator>Title</x-keys::heading-decorator>
</h1>

<!-- Avoid -->
<x-keys::heading-decorator>
    <h1>Title</h1>
</x-keys::heading-decorator>
```

## Data Attributes

The component generates data attributes for CSS targeting and JavaScript:

- `data-keys-heading-decorator="true"` - Component identifier
- `data-variant="gradient"` - Decoration variant
- `data-color="brand"` - Color scheme
- `data-animation="draw"` - Animation name (if applicable)
- `data-animation-name="keys-underline-draw"` - CSS animation name

## Styling

The heading decorator uses:

- CSS custom properties for colors
- CSS animations for effects
- Tailwind CSS v4 utilities
- Responsive design support
- Dark mode compatible colors

## Best Practices

1. **Use sparingly**: Decorations are most effective when used selectively on key headings

2. **Match brand colors**: Use the brand color for consistency with your design system

3. **Consider readability**: Ensure decorated text remains legible on all backgrounds

4. **Combine thoughtfully**: Don't over-decorate; one decoration per heading is usually enough

5. **Test animations**: Ensure animations don't distract from content

6. **Respect motion preferences**: Animations respect user's reduced motion preferences

7. **Maintain hierarchy**: Use decorators on h1-h3 tags primarily

## Component Structure

The Heading Decorator component consists of:

1. **PHP Class** (`HeadingDecorator.php`)
   - Variant validation
   - Color scheme handling
   - Animation management
   - Data attributes generation

2. **Blade Template** (`heading-decorator.blade.php`)
   - Span wrapper for decoration
   - Variant-specific classes
   - Animation classes
   - Color application

3. **CSS Styles**
   - Gradient definitions
   - Highlight backgrounds
   - Underline animations
   - Glow effects
   - Outline strokes
