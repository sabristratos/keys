# Heading Component

A semantic heading component with automatic size mapping, color variants, font weights, and advanced typography options including gradients and underlines. Provides flexibility while maintaining proper HTML semantics.

## Basic Usage

```blade
<x-keys::heading>Welcome to Keys UI</x-keys::heading>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `string` | `'h2'` | Semantic level: `h1`, `h2`, `h3`, `h4`, `h5`, `h6` |
| `size` | `string\|null` | Auto from level | Visual size: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl` |
| `color` | `string` | `'heading'` | Color: `heading`, `text`, `muted`, `brand`, `success`, `warning`, `danger`, `info` |
| `weight` | `string` | `'semibold'` | Weight: `normal`, `medium`, `semibold`, `bold`, `extrabold` |
| `tracking` | `string` | `'normal'` | Letter spacing: `tighter`, `tight`, `normal`, `wide`, `wider` |
| `underline` | `bool` | `false` | Add underline decoration |
| `gradient` | `bool` | `false` | Apply gradient effect (brand color only) |

## Semantic Levels

The component automatically maps heading levels to appropriate sizes:

```blade
<x-keys::heading level="h1">Page Title</x-keys::heading>      <!-- 4xl -->
<x-keys::heading level="h2">Section Title</x-keys::heading>   <!-- 3xl -->
<x-keys::heading level="h3">Subsection</x-keys::heading>      <!-- 2xl -->
<x-keys::heading level="h4">Minor Heading</x-keys::heading>   <!-- xl -->
<x-keys::heading level="h5">Small Heading</x-keys::heading>   <!-- lg -->
<x-keys::heading level="h6">Tiny Heading</x-keys::heading>    <!-- md -->
```

### Default Size Mapping

| Level | Default Size | Use Case |
|-------|--------------|----------|
| `h1` | `4xl` | Page title, hero section |
| `h2` | `3xl` | Major sections |
| `h3` | `2xl` | Subsections |
| `h4` | `xl` | Minor headings |
| `h5` | `lg` | Small headings |
| `h6` | `md` | Tiny headings |

## Custom Sizes

Override automatic sizing by specifying the `size` prop:

```blade
{{-- H1 with custom smaller size --}}
<x-keys::heading level="h1" size="2xl">
    Compact Page Title
</x-keys::heading>

{{-- H3 with larger size for emphasis --}}
<x-keys::heading level="h3" size="4xl">
    Hero Subsection
</x-keys::heading>
```

## Sizes

All available size options:

```blade
<x-keys::heading size="xs">Extra Small Heading</x-keys::heading>
<x-keys::heading size="sm">Small Heading</x-keys::heading>
<x-keys::heading size="md">Medium Heading</x-keys::heading>
<x-keys::heading size="lg">Large Heading</x-keys::heading>
<x-keys::heading size="xl">Extra Large Heading</x-keys::heading>
<x-keys::heading size="2xl">2XL Heading</x-keys::heading>
<x-keys::heading size="3xl">3XL Heading</x-keys::heading>
<x-keys::heading size="4xl">4XL Heading</x-keys::heading>
```

## Colors

```blade
<x-keys::heading color="heading">Default Heading Color</x-keys::heading>
<x-keys::heading color="text">Text Color</x-keys::heading>
<x-keys::heading color="muted">Muted Heading</x-keys::heading>
<x-keys::heading color="brand">Brand Heading</x-keys::heading>
<x-keys::heading color="success">Success Heading</x-keys::heading>
<x-keys::heading color="warning">Warning Heading</x-keys::heading>
<x-keys::heading color="danger">Danger Heading</x-keys::heading>
<x-keys::heading color="info">Info Heading</x-keys::heading>
```

## Font Weights

```blade
<x-keys::heading weight="normal">Normal Weight</x-keys::heading>
<x-keys::heading weight="medium">Medium Weight</x-keys::heading>
<x-keys::heading weight="semibold">Semibold Weight (Default)</x-keys::heading>
<x-keys::heading weight="bold">Bold Weight</x-keys::heading>
<x-keys::heading weight="extrabold">Extra Bold Weight</x-keys::heading>
```

## Letter Spacing (Tracking)

```blade
<x-keys::heading tracking="tighter">Tighter Tracking</x-keys::heading>
<x-keys::heading tracking="tight">Tight Tracking</x-keys::heading>
<x-keys::heading tracking="normal">Normal Tracking (Default)</x-keys::heading>
<x-keys::heading tracking="wide">Wide Tracking</x-keys::heading>
<x-keys::heading tracking="wider">Wider Tracking</x-keys::heading>
```

## With Underline

```blade
<x-keys::heading :underline="true">
    Underlined Heading
</x-keys::heading>

<x-keys::heading level="h1" size="4xl" color="brand" :underline="true">
    Emphasized Title
</x-keys::heading>
```

## Gradient Effect

Available only with `brand` color:

```blade
<x-keys::heading color="brand" :gradient="true" size="4xl">
    Gradient Heading
</x-keys::heading>

<x-keys::heading
    level="h1"
    color="brand"
    :gradient="true"
    weight="extrabold"
    size="4xl"
>
    Hero Title with Gradient
</x-keys::heading>
```

## Use Cases

### Page Hero

```blade
<div class="text-center py-12">
    <x-keys::heading
        level="h1"
        size="4xl"
        color="brand"
        :gradient="true"
        weight="extrabold"
    >
        Welcome to Keys UI
    </x-keys::heading>

    <x-keys::heading
        level="h2"
        size="xl"
        color="muted"
        weight="normal"
        class="mt-4"
    >
        Build beautiful Laravel applications with modern components
    </x-keys::heading>
</div>
```

### Section Headings

```blade
<section>
    <x-keys::heading level="h2" size="3xl" :underline="true">
        Our Features
    </x-keys::heading>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div>
            <x-keys::heading level="h3" size="xl" color="brand">
                Fast
            </x-keys::heading>
            <x-keys::text class="mt-2">
                Built for performance from the ground up
            </x-keys::text>
        </div>

        <div>
            <x-keys::heading level="h3" size="xl" color="brand">
                Beautiful
            </x-keys::heading>
            <x-keys::text class="mt-2">
                Modern design that looks great everywhere
            </x-keys::text>
        </div>

        <div>
            <x-keys::heading level="h3" size="xl" color="brand">
                Accessible
            </x-keys::heading>
            <x-keys::text class="mt-2">
                WCAG compliant and keyboard friendly
            </x-keys::text>
        </div>
    </div>
</section>
```

### Card Headers

```blade
<x-keys::card>
    <x-slot:header>
        <div class="flex items-center justify-between">
            <x-keys::heading level="h3" size="lg">
                User Profile
            </x-keys::heading>
            <x-keys::badge color="brand">Active</x-keys::badge>
        </div>
    </x-slot:header>

    <div class="space-y-4">
        <div>
            <x-keys::heading level="h4" size="sm" color="muted">
                Personal Information
            </x-keys::heading>
            <div class="mt-2">
                <!-- Content -->
            </div>
        </div>
    </div>
</x-keys::card>
```

### Dashboard Stats

```blade
<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <x-keys::card>
        <x-keys::heading level="h3" size="xs" color="muted" weight="medium">
            Total Revenue
        </x-keys::heading>
        <x-keys::heading level="p" size="3xl" weight="bold" class="mt-2">
            $45,231
        </x-keys::heading>
        <x-keys::text size="sm" color="success" class="mt-1">
            <x-keys::icon name="heroicon-o-arrow-trending-up" size="xs" />
            +20.1% from last month
        </x-keys::text>
    </x-keys::card>

    <!-- More stat cards... -->
</div>
```

### Blog Post

```blade
<article>
    <x-keys::heading level="h1" size="4xl" :underline="true">
        {{ $post->title }}
    </x-keys::heading>

    <div class="flex items-center gap-3 mt-4">
        <x-keys::avatar
            src="{{ $post->author->avatar_url }}"
            name="{{ $post->author->name }}"
            size="sm"
        />
        <div>
            <x-keys::text size="sm" weight="medium">
                {{ $post->author->name }}
            </x-keys::text>
            <x-keys::text size="xs" color="muted">
                {{ $post->published_at->format('M d, Y') }}
            </x-keys::text>
        </div>
    </div>

    <div class="mt-8 prose">
        {!! $post->content !!}
    </div>

    <div class="mt-12">
        <x-keys::heading level="h2" size="2xl">
            Related Articles
        </x-keys::heading>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            @foreach($relatedPosts as $related)
                <x-keys::card>
                    <x-keys::heading level="h3" size="lg">
                        {{ $related->title }}
                    </x-keys::heading>
                    <x-keys::text color="muted" class="mt-2">
                        {{ $related->excerpt }}
                    </x-keys::text>
                </x-keys::card>
            @endforeach
        </div>
    </div>
</article>
```

### Pricing Page

```blade
<div class="text-center mb-12">
    <x-keys::heading level="h1" size="4xl" color="brand" :gradient="true">
        Simple, Transparent Pricing
    </x-keys::heading>
    <x-keys::heading level="h2" size="xl" color="muted" weight="normal" class="mt-4">
        Choose the perfect plan for your needs
    </x-keys::heading>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <x-keys::card>
        <x-keys::heading level="h3" size="lg">
            Basic
        </x-keys::heading>
        <x-keys::heading level="p" size="4xl" color="brand" class="mt-4">
            $9<x-keys::text element="span" size="lg" color="muted">/mo</x-keys::text>
        </x-keys::heading>
        <!-- Features -->
    </x-keys::card>

    <!-- More pricing cards... -->
</div>
```

### Error Pages

```blade
<div class="text-center py-20">
    <x-keys::heading level="h1" size="4xl" color="danger" weight="extrabold">
        404
    </x-keys::heading>

    <x-keys::heading level="h2" size="2xl" class="mt-4">
        Page Not Found
    </x-keys::heading>

    <x-keys::text color="muted" size="lg" class="mt-2">
        Sorry, we couldn't find the page you're looking for.
    </x-keys::text>

    <x-keys::button href="/" color="primary" class="mt-8">
        Go Back Home
    </x-keys::button>
</div>
```

### Form Sections

```blade
<form wire:submit="save">
    <div class="space-y-8">
        <div>
            <x-keys::heading level="h3" size="xl">
                Account Information
            </x-keys::heading>
            <x-keys::text color="muted" size="sm" class="mt-1">
                Update your account details and preferences
            </x-keys::text>

            <div class="space-y-4 mt-6">
                <x-keys::input
                    wire:model="name"
                    label="Full Name"
                    required
                />

                <x-keys::input
                    wire:model="email"
                    type="email"
                    label="Email Address"
                    required
                />
            </div>
        </div>

        <x-keys::separator />

        <div>
            <x-keys::heading level="h3" size="xl">
                Preferences
            </x-keys::heading>
            <x-keys::text color="muted" size="sm" class="mt-1">
                Customize your experience
            </x-keys::text>

            <div class="space-y-4 mt-6">
                <!-- Preference fields -->
            </div>
        </div>
    </div>

    <div class="flex justify-end gap-3 mt-8">
        <x-keys::button variant="ghost">Cancel</x-keys::button>
        <x-keys::button type="submit" color="primary">Save Changes</x-keys::button>
    </div>
</form>
```

### Documentation

```blade
<article class="prose max-w-none">
    <x-keys::heading level="h1" size="4xl" :underline="true">
        Getting Started with Keys UI
    </x-keys::heading>

    <x-keys::text size="lg" color="muted" class="mt-4">
        Learn how to integrate Keys UI into your Laravel application
    </x-keys::text>

    <x-keys::heading level="h2" size="3xl" class="mt-12">
        Installation
    </x-keys::heading>

    <x-keys::text class="mt-4">
        Install the package via Composer...
    </x-keys::text>

    <x-keys::heading level="h3" size="2xl" class="mt-8">
        Requirements
    </x-keys::heading>

    <x-keys::text class="mt-4">
        Before you begin, ensure you have...
    </x-keys::text>

    <x-keys::heading level="h3" size="2xl" class="mt-8">
        Configuration
    </x-keys::heading>

    <x-keys::text class="mt-4">
        Configure the package...
    </x-keys::text>
</article>
```

### Alert Headings

```blade
<x-keys::alert variant="success">
    <x-keys::heading level="h4" size="md" color="success">
        Success!
    </x-keys::heading>
    <x-keys::text class="mt-1">
        Your changes have been saved successfully.
    </x-keys::text>
</x-keys::alert>

<x-keys::alert variant="danger">
    <x-keys::heading level="h4" size="md" color="danger">
        Error Occurred
    </x-keys::heading>
    <x-keys::text class="mt-1">
        Unable to process your request. Please try again.
    </x-keys::text>
</x-keys::alert>
```

### Modal Headers

```blade
<x-keys::modal id="delete-confirmation">
    <x-slot:header>
        <x-keys::heading level="h3" size="xl" color="danger">
            Delete Account
        </x-keys::heading>
    </x-slot:header>

    <x-keys::text>
        Are you sure you want to delete your account? This action cannot be undone.
    </x-keys::text>

    <x-slot:footer>
        <x-keys::button variant="ghost">Cancel</x-keys::button>
        <x-keys::button color="danger">Delete Account</x-keys::button>
    </x-slot:footer>
</x-keys::modal>
```

### Timeline

```blade
<div class="space-y-8">
    @foreach($events as $event)
        <div class="flex gap-4">
            <div class="flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white">
                    <x-keys::icon name="{{ $event->icon }}" size="sm" />
                </div>
            </div>
            <div class="flex-1">
                <x-keys::heading level="h3" size="lg">
                    {{ $event->title }}
                </x-keys::heading>
                <x-keys::text color="muted" size="sm" class="mt-1">
                    {{ $event->date->format('M d, Y g:i A') }}
                </x-keys::text>
                <x-keys::text class="mt-2">
                    {{ $event->description }}
                </x-keys::text>
            </div>
        </div>
    @endforeach
</div>
```

## Accessibility

The Heading component maintains proper HTML semantics:

- Uses correct heading levels (`<h1>` to `<h6>`)
- Visual presentation decoupled from semantic structure
- Proper heading hierarchy for screen readers
- Maintains document outline integrity

```blade
{{-- Correct semantic structure with custom styling --}}
<x-keys::heading level="h1" size="4xl">Page Title</x-keys::heading>
<x-keys::heading level="h2" size="2xl">Section</x-keys::heading>
<x-keys::heading level="h3" size="xl">Subsection</x-keys::heading>

{{-- Visual hierarchy can differ from semantic hierarchy --}}
<x-keys::heading level="h2" size="sm">Small but semantically important</x-keys::heading>
<x-keys::heading level="h3" size="4xl">Large visual impact, still H3</x-keys::heading>
```

## Component Structure

The Heading component consists of:

1. **PHP Class** (`Heading.php`)
   - Props validation
   - Automatic size mapping from level
   - Color and typography validation
   - Data attributes generation

2. **Blade Template** (`heading.blade.php`)
   - Dynamic element rendering (`<h1>` to `<h6>`)
   - Responsive typography
   - Gradient text support
   - Modifier classes (underline)

## Data Attributes

The component generates data attributes:

- `data-keys-heading="true"` - Component identifier
- `data-level="h2"` - Semantic level
- `data-size="3xl"` - Visual size
- `data-color="brand"` - Color variant
- `data-weight="semibold"` - Font weight
- `data-gradient="true"` - Gradient applied
- `data-underline="true"` - Underline applied

## Best Practices

1. **Use proper semantic levels**: Follow heading hierarchy (h1 → h2 → h3)

2. **Don't skip levels**: Don't jump from h1 to h3 without h2

3. **One H1 per page**: Use only one `level="h1"` per page

4. **Decouple visual from semantic**: Use `size` to control appearance independently

5. **Use appropriate colors**: Match color to context (danger for errors, brand for emphasis)

6. **Consider reading flow**: Use tracking and weights to improve readability

7. **Test gradients**: Ensure gradient text remains readable on all backgrounds

8. **Maintain contrast**: Ensure sufficient color contrast for accessibility

9. **Use underlines sparingly**: Reserve for special emphasis

10. **Test responsive sizes**: Ensure headings scale appropriately on mobile

## Typography Scale

| Size | Font Size | Use Case |
|------|-----------|----------|
| `xs` | 0.75rem (12px) | Labels, tiny headings |
| `sm` | 0.875rem (14px) | Small headings, cards |
| `md` | 1rem (16px) | Body emphasis, H6 |
| `lg` | 1.125rem (18px) | Larger body, H5 |
| `xl` | 1.25rem (20px) | Section headers, H4 |
| `2xl` | 1.5rem (24px) | Subsections, H3 |
| `3xl` | 1.875rem (30px) | Major sections, H2 |
| `4xl` | 2.25rem (36px) | Page titles, H1 |

## Gradient Text

Gradients only work with `brand` color:

```blade
{{-- Gradient enabled --}}
<x-keys::heading color="brand" :gradient="true" size="4xl">
    Beautiful Gradient
</x-keys::heading>

{{-- Gradient ignored (not brand color) --}}
<x-keys::heading color="success" :gradient="true">
    No Gradient (Success color)
</x-keys::heading>
```

## Known Limitations

- Gradient only works with `brand` color
- Underline uses fixed decoration thickness (2px)
- Underline offset is fixed (4px)
- Cannot combine multiple color classes
- Tracking applies to entire heading (no per-word control)

## Performance Tips

- Headings are lightweight with minimal overhead
- Gradient rendering is GPU-accelerated
- No JavaScript required
- Data attributes add minimal size
- Component renders efficiently in loops

## Styling Tips

### Responsive Sizes

```blade
<x-keys::heading
    level="h1"
    size="2xl"
    class="md:text-4xl lg:text-5xl"
>
    Responsive Hero Title
</x-keys::heading>
```

### Custom Spacing

```blade
<x-keys::heading level="h2" class="mb-8">
    Section with Custom Bottom Margin
</x-keys::heading>
```

### Mixed Styles

```blade
<x-keys::heading level="h1" size="4xl">
    Regular <span class="text-brand">Highlighted</span> Text
</x-keys::heading>
```

### With Icons

```blade
<x-keys::heading level="h2" size="2xl" class="flex items-center gap-2">
    <x-keys::icon name="heroicon-o-star" size="lg" class="text-brand" />
    Featured Section
</x-keys::heading>
```
