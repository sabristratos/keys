# Separator Component

A versatile divider component for creating visual separation between content sections. Supports horizontal and vertical orientations, multiple variants including text and icon dividers, customizable colors, sizes, and spacing.

## Basic Usage

```blade
<x-keys::separator />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'line'` | Variant: `line`, `text`, `icon`, `gradient`, `dashed` |
| `orientation` | `string` | `'horizontal'` | Orientation: `horizontal`, `vertical` |
| `color` | `string` | `'neutral'` | Color: `brand`, `success`, `warning`, `danger`, `neutral`, etc. |
| `size` | `string` | `'sm'` | Line thickness: `xs`, `sm`, `md`, `lg` |
| `spacing` | `string` | `'md'` | Vertical/horizontal spacing: `none`, `xs`, `sm`, `md`, `lg`, `xl` |
| `alignment` | `string` | `'center'` | Alignment (vertical only): `left`, `center`, `right` |
| `icon` | `string\|null` | `null` | Icon name (for icon variant) |

## Variants

### Line (Default)

Simple solid line separator:

```blade
<x-keys::separator />

<x-keys::separator color="brand" />

<x-keys::separator size="md" />
```

### Dashed

Dashed line separator:

```blade
<x-keys::separator variant="dashed" />

<x-keys::separator variant="dashed" color="brand" />
```

### Gradient

Gradient fade separator:

```blade
<x-keys::separator variant="gradient" />

<x-keys::separator variant="gradient" color="brand" />

<x-keys::separator variant="gradient" color="purple" />
```

### Text

Separator with text in the middle:

```blade
<x-keys::separator variant="text">
    OR
</x-keys::separator>

<x-keys::separator variant="text" color="brand">
    Continue Reading
</x-keys::separator>

<x-keys::separator variant="text" size="md">
    End of Section
</x-keys::separator>
```

### Icon

Separator with icon in the middle:

```blade
<x-keys::separator variant="icon" icon="star" />

<x-keys::separator variant="icon" icon="heart" color="danger" />

<x-keys::separator variant="icon" icon="sparkles" color="brand" />
```

## Orientations

### Horizontal (Default)

```blade
<div>
    <x-keys::text>Content above</x-keys::text>
    <x-keys::separator />
    <x-keys::text>Content below</x-keys::text>
</div>
```

### Vertical

```blade
<div class="flex items-center gap-4">
    <span>Left content</span>
    <x-keys::separator orientation="vertical" />
    <span>Right content</span>
</div>
```

## Colors

```blade
<x-keys::separator color="neutral" />    {{-- Default gray --}}
<x-keys::separator color="brand" />      {{-- Brand color --}}
<x-keys::separator color="success" />    {{-- Green --}}
<x-keys::separator color="warning" />    {{-- Yellow --}}
<x-keys::separator color="danger" />     {{-- Red --}}
<x-keys::separator color="blue" />       {{-- Blue --}}
<x-keys::separator color="purple" />     {{-- Purple --}}
<x-keys::separator color="pink" />       {{-- Pink --}}
```

## Sizes

Controls line thickness:

```blade
<x-keys::separator size="xs" />   {{-- 1px --}}
<x-keys::separator size="sm" />   {{-- 2px (default) --}}
<x-keys::separator size="md" />   {{-- 4px --}}
<x-keys::separator size="lg" />   {{-- 8px --}}
```

## Spacing

Controls margin/height around separator:

```blade
<x-keys::separator spacing="none" />  {{-- No spacing --}}
<x-keys::separator spacing="xs" />    {{-- Extra small --}}
<x-keys::separator spacing="sm" />    {{-- Small --}}
<x-keys::separator spacing="md" />    {{-- Medium (default) --}}
<x-keys::separator spacing="lg" />    {{-- Large --}}
<x-keys::separator spacing="xl" />    {{-- Extra large --}}
```

## Use Cases

### Form Sections

```blade
<form wire:submit="save">
    <div class="space-y-4">
        <x-keys::heading size="lg">Personal Information</x-keys::heading>

        <x-keys::input wire:model="name" label="Full Name" required />
        <x-keys::input wire:model="email" type="email" label="Email" required />
    </div>

    <x-keys::separator spacing="lg" />

    <div class="space-y-4">
        <x-keys::heading size="lg">Address</x-keys::heading>

        <x-keys::input wire:model="street" label="Street Address" />
        <x-keys::input wire:model="city" label="City" />
    </div>

    <x-keys::separator spacing="lg" />

    <div class="flex justify-end gap-3">
        <x-keys::button variant="ghost">Cancel</x-keys::button>
        <x-keys::button type="submit" color="primary">Save</x-keys::button>
    </div>
</form>
```

### Card Sections

```blade
<x-keys::card>
    <x-keys::heading size="lg">Account Settings</x-keys::heading>

    <x-keys::separator />

    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <div>
                <x-keys::text weight="medium">Email Notifications</x-keys::text>
                <x-keys::text size="sm" color="muted">Receive notifications via email</x-keys::text>
            </div>
            <x-keys::toggle wire:model="emailNotifications" />
        </div>

        <x-keys::separator spacing="sm" />

        <div class="flex items-center justify-between">
            <div>
                <x-keys::text weight="medium">Push Notifications</x-keys::text>
                <x-keys::text size="sm" color="muted">Receive push notifications</x-keys::text>
            </div>
            <x-keys::toggle wire:model="pushNotifications" />
        </div>
    </div>
</x-keys::card>
```

### Login Form with "OR" Separator

```blade
<x-keys::card size="lg" class="max-w-md mx-auto">
    <x-keys::heading size="xl" align="center">Sign In</x-keys::heading>

    <div class="space-y-4 mt-6">
        <x-keys::button color="primary" class="w-full">
            <x-keys::icon name="custom:google" size="sm" />
            Continue with Google
        </x-keys::button>

        <x-keys::button variant="outlined" class="w-full">
            <x-keys::icon name="custom:github" size="sm" />
            Continue with GitHub
        </x-keys::button>
    </div>

    <x-keys::separator variant="text" spacing="lg">
        OR
    </x-keys::separator>

    <form wire:submit="login">
        <div class="space-y-4">
            <x-keys::input
                wire:model="email"
                type="email"
                label="Email"
                required
            />

            <x-keys::input
                wire:model="password"
                type="password"
                label="Password"
                required
            />

            <x-keys::button type="submit" color="primary" class="w-full">
                Sign In
            </x-keys::button>
        </div>
    </form>
</x-keys::card>
```

### Sidebar Navigation

```blade
<aside class="w-64 border-r border-border">
    <nav class="p-4 space-y-2">
        <a href="/dashboard" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-hover">
            <x-keys::icon name="home" size="sm" />
            <x-keys::text>Dashboard</x-keys::text>
        </a>

        <a href="/projects" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-hover">
            <x-keys::icon name="folder" size="sm" />
            <x-keys::text>Projects</x-keys::text>
        </a>
    </nav>

    <x-keys::separator />

    <nav class="p-4 space-y-2">
        <a href="/settings" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-hover">
            <x-keys::icon name="cog-6-tooth" size="sm" />
            <x-keys::text>Settings</x-keys::text>
        </a>

        <a href="/help" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-hover">
            <x-keys::icon name="question-mark-circle" size="sm" />
            <x-keys::text>Help</x-keys::text>
        </a>
    </nav>
</aside>
```

### Vertical Separator in Toolbar

```blade
<div class="flex items-center gap-3 p-3 border-b border-border">
    <x-keys::button variant="ghost" size="sm">
        <x-keys::icon name="bold" size="sm" />
    </x-keys::button>

    <x-keys::button variant="ghost" size="sm">
        <x-keys::icon name="italic" size="sm" />
    </x-keys::button>

    <x-keys::separator orientation="vertical" spacing="xs" />

    <x-keys::button variant="ghost" size="sm">
        <x-keys::icon name="link" size="sm" />
    </x-keys::button>

    <x-keys::button variant="ghost" size="sm">
        <x-keys::icon name="photo" size="sm" />
    </x-keys::button>

    <x-keys::separator orientation="vertical" spacing="xs" />

    <x-keys::button variant="ghost" size="sm">
        <x-keys::icon name="list-bullet" size="sm" />
    </x-keys::button>
</div>
```

### Article Sections

```blade
<article class="prose max-w-none">
    <x-keys::heading level="h1" size="4xl">Article Title</x-keys::heading>

    <x-keys::text color="muted" class="mt-2">
        By Author Name • Published on January 15, 2025
    </x-keys::text>

    <x-keys::separator spacing="lg" />

    <x-keys::text>First section content...</x-keys::text>

    <x-keys::separator variant="gradient" spacing="xl" />

    <x-keys::text>Second section content...</x-keys::text>

    <x-keys::separator variant="icon" icon="sparkles" color="brand" spacing="xl" />

    <x-keys::text>Special highlighted section...</x-keys::text>

    <x-keys::separator spacing="xl" />

    <div class="bg-accent/10 p-6 rounded-lg">
        <x-keys::heading size="lg">Related Articles</x-keys::heading>
        <!-- Related content -->
    </div>
</article>
```

### Pricing Cards

```blade
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <x-keys::card>
        <x-keys::heading size="xl">Basic</x-keys::heading>
        <x-keys::heading size="4xl" class="mt-4">$9</x-keys::heading>
        <x-keys::text size="sm" color="muted">/month</x-keys::text>

        <x-keys::separator spacing="lg" />

        <ul class="space-y-3">
            <li class="flex items-center gap-2">
                <x-keys::icon name="check" size="sm" class="text-success" />
                <x-keys::text size="sm">Feature 1</x-keys::text>
            </li>
            <li class="flex items-center gap-2">
                <x-keys::icon name="check" size="sm" class="text-success" />
                <x-keys::text size="sm">Feature 2</x-keys::text>
            </li>
        </ul>

        <x-keys::separator spacing="lg" />

        <x-keys::button color="primary" class="w-full">Get Started</x-keys::button>
    </x-keys::card>

    <!-- More pricing cards -->
</div>
```

### Comment Thread

```blade
@foreach($comments as $comment)
    <div class="flex gap-3">
        <x-keys::avatar
            src="{{ $comment->user->avatar_url }}"
            name="{{ $comment->user->name }}"
            size="md"
        />
        <div class="flex-1">
            <div class="flex items-center gap-2">
                <x-keys::text weight="semibold">{{ $comment->user->name }}</x-keys::text>
                <x-keys::text size="sm" color="muted">
                    {{ $comment->created_at->diffForHumans() }}
                </x-keys::text>
            </div>
            <x-keys::text class="mt-1">{{ $comment->content }}</x-keys::text>
        </div>
    </div>

    @if(!$loop->last)
        <x-keys::separator spacing="sm" />
    @endif
@endforeach
```

### Dashboard Stats

```blade
<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <x-keys::card>
        <x-keys::heading size="xs" color="muted" weight="medium" :uppercase="true">
            Revenue
        </x-keys::heading>

        <x-keys::separator spacing="xs" />

        <x-keys::heading size="3xl" weight="bold">$45,231</x-keys::heading>
        <x-keys::text size="sm" color="success" class="mt-1">+20.1%</x-keys::text>
    </x-keys::card>

    <!-- More stat cards -->
</div>
```

### Dropdown Menu Sections

```blade
<x-keys::dropdown>
    <x-slot:trigger>
        <x-keys::button>User Menu</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>
        <x-keys::icon name="user" size="xs" />
        Profile
    </x-keys::dropdown.item>

    <x-keys::dropdown.item>
        <x-keys::icon name="cog-6-tooth" size="xs" />
        Settings
    </x-keys::dropdown.item>

    <x-keys::separator spacing="xs" />

    <x-keys::dropdown.item>
        <x-keys::icon name="question-mark-circle" size="xs" />
        Help & Support
    </x-keys::dropdown.item>

    <x-keys::separator spacing="xs" />

    <x-keys::dropdown.item>
        <x-keys::icon name="arrow-right-on-rectangle" size="xs" />
        Logout
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

### Timeline

```blade
<div class="space-y-6">
    @foreach($events as $event)
        <div class="flex gap-4">
            <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center">
                    <x-keys::icon name="{{ $event->icon }}" size="sm" />
                </div>
                @if(!$loop->last)
                    <x-keys::separator
                        orientation="vertical"
                        spacing="md"
                        color="brand"
                    />
                @endif
            </div>
            <div class="flex-1 pb-8">
                <x-keys::text weight="semibold">{{ $event->title }}</x-keys::text>
                <x-keys::text size="sm" color="muted">{{ $event->description }}</x-keys::text>
            </div>
        </div>
    @endforeach
</div>
```

### Breadcrumb Separator

```blade
<div class="flex items-center gap-2">
    <x-keys::text>Home</x-keys::text>
    <x-keys::separator orientation="vertical" spacing="none" class="h-4" />
    <x-keys::text>Projects</x-keys::text>
    <x-keys::separator orientation="vertical" spacing="none" class="h-4" />
    <x-keys::text weight="semibold">Current Project</x-keys::text>
</div>
```

### Footer Sections

```blade
<footer class="bg-accent/5 border-t border-border">
    <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <x-keys::heading size="md">Product</x-keys::heading>
                <x-keys::separator spacing="sm" color="brand" size="xs" class="w-12" />
                <ul class="space-y-2 mt-4">
                    <li><x-keys::text size="sm">Features</x-keys::text></li>
                    <li><x-keys::text size="sm">Pricing</x-keys::text></li>
                </ul>
            </div>

            <!-- More footer columns -->
        </div>

        <x-keys::separator spacing="lg" />

        <x-keys::text size="sm" color="muted" align="center">
            © 2025 Company Name. All rights reserved.
        </x-keys::text>
    </div>
</footer>
```

## Accessibility

The Separator component includes accessibility features:

- Uses `role="separator"` for screen readers
- `aria-orientation` attribute for vertical separators
- Semantic HTML structure
- Sufficient contrast for visual separators

```blade
{{-- Accessible horizontal separator --}}
<x-keys::separator />

{{-- Accessible vertical separator --}}
<x-keys::separator orientation="vertical" />
```

## Component Structure

The Separator component consists of:

1. **PHP Class** (`Separator.php`)
   - Props validation
   - Icon-only detection
   - Data attributes generation

2. **Blade Template** (`separator.blade.php`)
   - Orientation support
   - Multiple variant rendering
   - Dynamic spacing and sizing
   - Color customization

## Data Attributes

The component generates data attributes:

- `data-keys-separator="true"` - Component identifier
- `data-variant="line"` - Separator variant
- `data-orientation="horizontal"` - Orientation
- `data-color="neutral"` - Color scheme
- `data-size="sm"` - Line thickness
- `data-spacing="md"` - Margin/height spacing
- `data-alignment="center"` - Content alignment
- `data-has-icon="true"` - Has icon
- `data-icon="star"` - Icon name

## Best Practices

1. **Use appropriate spacing**: Match spacing to content density

2. **Choose semantic colors**: Use brand color for important divisions

3. **Use text separators sparingly**: Best for login forms or section breaks

4. **Consider gradient for subtle divisions**: Less visual weight than solid lines

5. **Use vertical separators in toolbars**: Better than borders for grouping

6. **Match size to importance**: Thicker lines for major divisions

7. **Use dashed for temporary divisions**: Visual distinction from permanent separators

8. **Test contrast**: Ensure separators are visible but not distracting

9. **Use icon separators for special sections**: Adds visual interest

10. **Maintain consistency**: Use same variant throughout your app

## Variant Comparison

```blade
<!-- Line (default) -->
<x-keys::separator variant="line" />

<!-- Dashed -->
<x-keys::separator variant="dashed" />

<!-- Gradient -->
<x-keys::separator variant="gradient" />

<!-- Text -->
<x-keys::separator variant="text">Section Break</x-keys::separator>

<!-- Icon -->
<x-keys::separator variant="icon" icon="star" />
```

## Known Limitations

- Text in vertical separators uses experimental CSS properties
- Icon alignment in vertical mode may need adjustment
- Gradient variant doesn't support dashed style
- Maximum recommended thickness is `lg`
- Text variant requires content in slot

## Performance Tips

- Separators are lightweight with minimal overhead
- Gradient rendering is GPU-accelerated
- No JavaScript required
- Efficiently renders in loops
- CSS-only animations

## Styling Tips

### Custom Width

```blade
<x-keys::separator class="max-w-md mx-auto" />
```

### Custom Colors

```blade
<x-keys::separator class="border-purple-500" />
```

### Responsive Spacing

```blade
<x-keys::separator spacing="sm" class="md:my-8 lg:my-12" />
```

### Animated Gradient

```blade
<x-keys::separator
    variant="gradient"
    color="brand"
    class="animate-pulse"
/>
```
