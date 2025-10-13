# Text Component

A flexible typography component for displaying text with extensive styling options including sizes, colors, weights, alignment, line height, text transformations, and line clamping. Supports multiple HTML elements while maintaining consistent styling.

## Basic Usage

```blade
<x-keys::text>This is a paragraph of text.</x-keys::text>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `element` | `string` | `'p'` | HTML element: `p`, `span`, `div`, `label`, `small`, `strong`, `em` |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg`, `xl`, `2xl` |
| `color` | `string` | `'text'` | Color: `heading`, `text`, `muted`, `brand`, `success`, `warning`, `danger`, `info` |
| `weight` | `string` | `'normal'` | Weight: `light`, `normal`, `medium`, `semibold`, `bold` |
| `align` | `string` | `''` | Alignment: `left`, `center`, `right`, `justify` |
| `leading` | `string` | `'normal'` | Line height: `tight`, `normal`, `relaxed`, `loose` |
| `lineClamp` | `string` | `'none'` | Truncate lines: `none`, `1`, `2`, `3`, `4`, `5`, `6` |
| `italic` | `bool` | `false` | Italic text |
| `underline` | `bool` | `false` | Underline text |
| `uppercase` | `bool` | `false` | Transform to uppercase |
| `lowercase` | `bool` | `false` | Transform to lowercase |
| `capitalize` | `bool` | `false` | Capitalize first letter of each word |

## HTML Elements

```blade
<x-keys::text element="p">Paragraph text</x-keys::text>
<x-keys::text element="span">Inline span</x-keys::text>
<x-keys::text element="div">Block div</x-keys::text>
<x-keys::text element="label">Label text</x-keys::text>
<x-keys::text element="small">Small text</x-keys::text>
<x-keys::text element="strong">Strong text</x-keys::text>
<x-keys::text element="em">Emphasized text</x-keys::text>
```

## Sizes

```blade
<x-keys::text size="xs">Extra small text (0.75rem / 12px)</x-keys::text>
<x-keys::text size="sm">Small text (0.875rem / 14px)</x-keys::text>
<x-keys::text size="md">Medium text (1rem / 16px)</x-keys::text>
<x-keys::text size="lg">Large text (1.125rem / 18px)</x-keys::text>
<x-keys::text size="xl">Extra large text (1.25rem / 20px)</x-keys::text>
<x-keys::text size="2xl">2XL text (1.5rem / 24px)</x-keys::text>
```

## Colors

```blade
<x-keys::text color="heading">Heading color (darkest)</x-keys::text>
<x-keys::text color="text">Default text color</x-keys::text>
<x-keys::text color="muted">Muted text color</x-keys::text>
<x-keys::text color="brand">Brand color</x-keys::text>
<x-keys::text color="success">Success green</x-keys::text>
<x-keys::text color="warning">Warning yellow</x-keys::text>
<x-keys::text color="danger">Danger red</x-keys::text>
<x-keys::text color="info">Info blue</x-keys::text>
```

## Font Weights

```blade
<x-keys::text weight="light">Light weight (300)</x-keys::text>
<x-keys::text weight="normal">Normal weight (400)</x-keys::text>
<x-keys::text weight="medium">Medium weight (500)</x-keys::text>
<x-keys::text weight="semibold">Semibold weight (600)</x-keys::text>
<x-keys::text weight="bold">Bold weight (700)</x-keys::text>
```

## Text Alignment

```blade
<x-keys::text align="left">Left aligned text</x-keys::text>
<x-keys::text align="center">Center aligned text</x-keys::text>
<x-keys::text align="right">Right aligned text</x-keys::text>
<x-keys::text align="justify">Justified text with equal spacing</x-keys::text>
```

## Line Height (Leading)

```blade
<x-keys::text leading="tight">
    Tight line height for compact text. Perfect for dense layouts.
</x-keys::text>

<x-keys::text leading="normal">
    Normal line height for standard readability. Default setting.
</x-keys::text>

<x-keys::text leading="relaxed">
    Relaxed line height for better breathing room in paragraphs.
</x-keys::text>

<x-keys::text leading="loose">
    Loose line height for maximum readability and accessibility.
</x-keys::text>
```

## Line Clamping

Truncate text to a specific number of lines:

```blade
<x-keys::text lineClamp="1">
    This text will be truncated to one line with an ellipsis if it's too long to fit.
</x-keys::text>

<x-keys::text lineClamp="2">
    This text will be truncated to two lines. If the content exceeds two lines,
    it will show an ellipsis at the end of the second line.
</x-keys::text>

<x-keys::text lineClamp="3">
    This text will be truncated to three lines. Perfect for preview text,
    descriptions, or summaries where you want to limit the vertical space
    while still showing meaningful content to the user.
</x-keys::text>
```

## Text Transformations

### Uppercase

```blade
<x-keys::text :uppercase="true">
    this text will be transformed to uppercase
</x-keys::text>
```

### Lowercase

```blade
<x-keys::text :lowercase="true">
    THIS TEXT WILL BE TRANSFORMED TO LOWERCASE
</x-keys::text>
```

### Capitalize

```blade
<x-keys::text :capitalize="true">
    capitalize first letter of each word
</x-keys::text>
```

## Style Modifiers

### Italic

```blade
<x-keys::text :italic="true">
    This text is italicized for emphasis
</x-keys::text>
```

### Underline

```blade
<x-keys::text :underline="true">
    This text has an underline
</x-keys::text>
```

## Use Cases

### Paragraph Text

```blade
<x-keys::text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
</x-keys::text>
```

### Labels and Helper Text

```blade
<x-keys::input wire:model="email" label="Email Address">
    <x-slot:hint>
        <x-keys::text size="sm" color="muted">
            We'll never share your email with anyone else.
        </x-keys::text>
    </x-slot:hint>
</x-keys::input>
```

### Status Messages

```blade
<div class="flex items-center gap-2">
    <x-keys::icon name="heroicon-o-check-circle" size="sm" class="text-success" />
    <x-keys::text color="success" weight="medium">
        Payment successful
    </x-keys::text>
</div>

<div class="flex items-center gap-2">
    <x-keys::icon name="heroicon-o-x-circle" size="sm" class="text-danger" />
    <x-keys::text color="danger" weight="medium">
        Payment failed
    </x-keys::text>
</div>
```

### Card Descriptions

```blade
<x-keys::card>
    <x-keys::heading size="lg">Premium Plan</x-keys::heading>
    <x-keys::text color="muted" size="sm" class="mt-2" lineClamp="2">
        Get access to all premium features including advanced analytics, priority support,
        custom integrations, and unlimited team members. Perfect for growing businesses.
    </x-keys::text>
    <x-keys::text size="2xl" weight="bold" class="mt-4">
        $99<x-keys::text element="span" size="md" color="muted">/month</x-keys::text>
    </x-keys::text>
</x-keys::card>
```

### User Profile

```blade
<div class="flex items-center gap-4">
    <x-keys::avatar
        src="{{ $user->avatar_url }}"
        name="{{ $user->name }}"
        size="lg"
    />
    <div>
        <x-keys::text size="lg" weight="semibold">{{ $user->name }}</x-keys::text>
        <x-keys::text size="sm" color="muted">{{ $user->email }}</x-keys::text>
        <x-keys::text size="xs" color="muted" :capitalize="true">
            Member since {{ $user->created_at->format('F Y') }}
        </x-keys::text>
    </div>
</div>
```

### Blog Post Excerpt

```blade
@foreach($posts as $post)
    <x-keys::card>
        <x-keys::heading level="h3" size="xl">{{ $post->title }}</x-keys::heading>

        <x-keys::text color="muted" size="sm" class="mt-1">
            By {{ $post->author->name }} • {{ $post->published_at->format('M d, Y') }}
        </x-keys::text>

        <x-keys::text class="mt-4" lineClamp="3" leading="relaxed">
            {{ $post->excerpt }}
        </x-keys::text>

        <x-keys::button href="{{ route('posts.show', $post) }}" class="mt-4">
            Read More
        </x-keys::button>
    </x-keys::card>
@endforeach
```

### Table Cell Content

```blade
<x-keys::table>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>Product</x-keys::table.header>
            <x-keys::table.header>Price</x-keys::table.header>
            <x-keys::table.header>Status</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @foreach($products as $product)
            <x-keys::table.row>
                <x-keys::table.cell>
                    <x-keys::text weight="medium">{{ $product->name }}</x-keys::text>
                    <x-keys::text size="sm" color="muted" lineClamp="1">
                        {{ $product->description }}
                    </x-keys::text>
                </x-keys::table.cell>
                <x-keys::table.cell>
                    <x-keys::text weight="semibold">${{ $product->price }}</x-keys::text>
                </x-keys::table.cell>
                <x-keys::table.cell>
                    <x-keys::badge :color="$product->is_active ? 'success' : 'neutral'">
                        {{ $product->is_active ? 'Active' : 'Inactive' }}
                    </x-keys::badge>
                </x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>
```

### Alert Messages

```blade
<x-keys::alert variant="warning">
    <x-keys::text weight="semibold">Warning</x-keys::text>
    <x-keys::text size="sm" class="mt-1">
        Your subscription will expire in 3 days. Please renew to avoid service interruption.
    </x-keys::text>
</x-keys::alert>
```

### Empty States

```blade
<div class="text-center py-12">
    <x-keys::icon name="heroicon-o-inbox" size="xl" class="text-text-muted mx-auto mb-4" />
    <x-keys::text size="lg" weight="semibold">No messages yet</x-keys::text>
    <x-keys::text color="muted" class="mt-2">
        When you receive messages, they'll appear here.
    </x-keys::text>
    <x-keys::button color="primary" class="mt-6">
        Compose Message
    </x-keys::button>
</div>
```

### Metadata Display

```blade
<div class="flex flex-wrap items-center gap-4">
    <x-keys::text size="sm" color="muted" class="flex items-center gap-1">
        <x-keys::icon name="heroicon-o-clock" size="xs" />
        5 min read
    </x-keys::text>

    <x-keys::text size="sm" color="muted" class="flex items-center gap-1">
        <x-keys::icon name="heroicon-o-eye" size="xs" />
        1.2k views
    </x-keys::text>

    <x-keys::text size="sm" color="muted" class="flex items-center gap-1">
        <x-keys::icon name="heroicon-o-heart" size="xs" />
        234 likes
    </x-keys::text>
</div>
```

### Inline Emphasis

```blade
<x-keys::text>
    This is a paragraph with
    <x-keys::text element="strong" color="brand">important information</x-keys::text>
    and
    <x-keys::text element="em">emphasized content</x-keys::text>
    inline.
</x-keys::text>
```

### List Items

```blade
<ul class="space-y-2">
    <li class="flex items-start gap-2">
        <x-keys::icon name="heroicon-o-check" size="sm" class="text-success mt-0.5" />
        <x-keys::text>Advanced analytics dashboard</x-keys::text>
    </li>
    <li class="flex items-start gap-2">
        <x-keys::icon name="heroicon-o-check" size="sm" class="text-success mt-0.5" />
        <x-keys::text>Priority customer support</x-keys::text>
    </li>
    <li class="flex items-start gap-2">
        <x-keys::icon name="heroicon-o-check" size="sm" class="text-success mt-0.5" />
        <x-keys::text>Unlimited team members</x-keys::text>
    </li>
</ul>
```

### Tooltip Content

```blade
<x-keys::tooltip>
    <x-slot:trigger>
        <x-keys::button>Hover me</x-keys::button>
    </x-slot:trigger>

    <x-keys::text size="sm">
        This is helpful information displayed in a tooltip
    </x-keys::text>
</x-keys::tooltip>
```

### Form Validation Messages

```blade
<x-keys::input wire:model="email" label="Email" />

@error('email')
    <x-keys::text size="sm" color="danger" class="mt-1">
        {{ $message }}
    </x-keys::text>
@enderror
```

### Stats Display

```blade
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <x-keys::card>
        <x-keys::text size="sm" color="muted" weight="medium" :uppercase="true">
            Total Revenue
        </x-keys::text>
        <x-keys::text size="3xl" weight="bold" class="mt-2">
            $45,231
        </x-keys::text>
        <x-keys::text size="sm" color="success" class="mt-1">
            +20.1% from last month
        </x-keys::text>
    </x-keys::card>

    <!-- More stats... -->
</div>
```

### Truncated File Names

```blade
<div class="flex items-center gap-3">
    <x-keys::icon name="heroicon-o-document" size="md" class="text-text-muted" />
    <div class="flex-1 min-w-0">
        <x-keys::text weight="medium" lineClamp="1">
            very-long-filename-that-should-be-truncated.pdf
        </x-keys::text>
        <x-keys::text size="xs" color="muted">
            2.4 MB • Modified 2 hours ago
        </x-keys::text>
    </div>
</div>
```

### Quote Display

```blade
<blockquote class="border-l-4 border-brand pl-4 py-2">
    <x-keys::text :italic="true" size="lg" leading="relaxed">
        "The best way to predict the future is to invent it."
    </x-keys::text>
    <x-keys::text size="sm" color="muted" class="mt-2">
        — Alan Kay
    </x-keys::text>
</blockquote>
```

### Notification Messages

```blade
<div class="space-y-3">
    @foreach($notifications as $notification)
        <div class="flex gap-3 p-4 rounded-lg bg-hover">
            <x-keys::avatar
                src="{{ $notification->sender->avatar_url }}"
                name="{{ $notification->sender->name }}"
                size="sm"
            />
            <div class="flex-1 min-w-0">
                <x-keys::text size="sm" lineClamp="2">
                    <x-keys::text element="span" weight="semibold">
                        {{ $notification->sender->name }}
                    </x-keys::text>
                    {{ $notification->message }}
                </x-keys::text>
                <x-keys::text size="xs" color="muted" class="mt-1">
                    {{ $notification->created_at->diffForHumans() }}
                </x-keys::text>
            </div>
        </div>
    @endforeach
</div>
```

## Accessibility

The Text component maintains semantic HTML:

- Uses appropriate HTML elements (`<p>`, `<span>`, etc.)
- Maintains proper text hierarchy
- Ensures sufficient color contrast
- Supports screen readers
- Line clamping maintains accessible content

```blade
{{-- Use span for inline text --}}
<x-keys::text element="span">Inline text</x-keys::text>

{{-- Use label for form labels --}}
<x-keys::text element="label" for="email">Email Address</x-keys::text>

{{-- Use strong for semantic emphasis --}}
<x-keys::text element="strong">Important notice</x-keys::text>
```

## Component Structure

The Text component consists of:

1. **PHP Class** (`Text.php`)
   - Props validation
   - Element and typography validation
   - Data attributes generation

2. **Blade Template** (`text.blade.php`)
   - Dynamic element rendering
   - Responsive typography
   - Text transformation support
   - Line clamping

## Data Attributes

The component generates data attributes:

- `data-keys-text="true"` - Component identifier
- `data-element="p"` - HTML element type
- `data-size="md"` - Text size
- `data-color="text"` - Text color
- `data-weight="normal"` - Font weight
- `data-line-clamp="3"` - Line clamp value
- `data-italic="true"` - Italic style applied
- `data-underline="true"` - Underline applied

## Best Practices

1. **Use appropriate elements**: Choose the right HTML element for semantics

2. **Consider readability**: Use `leading="relaxed"` for long paragraphs

3. **Limit line clamping**: Don't hide too much important content

4. **Match color to context**: Use semantic colors (danger for errors, success for confirmations)

5. **Use muted for secondary info**: Keep visual hierarchy clear

6. **Avoid excessive transformations**: Don't combine multiple text transforms

7. **Test line clamping**: Ensure truncated text makes sense

8. **Maintain contrast**: Ensure text colors meet WCAG standards

9. **Use appropriate sizes**: Match text size to importance and context

10. **Combine with icons thoughtfully**: Align icons properly with text baseline

## Typography Scale

| Size | Rem | Pixels | Use Case |
|------|-----|--------|----------|
| `xs` | 0.75rem | 12px | Captions, labels |
| `sm` | 0.875rem | 14px | Secondary text, metadata |
| `md` | 1rem | 16px | Body text (default) |
| `lg` | 1.125rem | 18px | Emphasized paragraphs |
| `xl` | 1.25rem | 20px | Large body text |
| `2xl` | 1.5rem | 24px | Prominent text |

## Known Limitations

- Line clamping requires `-webkit-line-clamp` browser support
- Cannot mix multiple text transformations (uppercase + capitalize)
- Underline style is fixed (no customization)
- Element prop limited to predefined HTML elements
- Line clamp maximum is 6 lines

## Performance Tips

- Text components are lightweight with minimal overhead
- Line clamping is CSS-based (no JavaScript)
- Color classes use design tokens for consistency
- No runtime JavaScript required
- Efficiently renders in loops

## Styling Tips

### Responsive Text

```blade
<x-keys::text
    size="md"
    class="md:text-lg lg:text-xl"
>
    Responsive text size
</x-keys::text>
```

### Custom Colors

```blade
<x-keys::text class="text-purple-600 dark:text-purple-400">
    Custom color outside predefined options
</x-keys::text>
```

### Truncation with Title

```blade
<x-keys::text lineClamp="1" title="{{ $fullText }}">
    {{ $fullText }}
</x-keys::text>
```

### Mixed Inline Styles

```blade
<x-keys::text>
    This has <x-keys::text element="span" weight="bold" color="brand">bold brand</x-keys::text>
    and <x-keys::text element="span" :italic="true">italic</x-keys::text> text.
</x-keys::text>
```
