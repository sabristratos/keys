# Icon Component

An intelligent icon component with automatic resolution supporting Heroicons (outline, solid, mini), custom SVG icons, and Blade icon components. Features smart detection with multiple naming conventions and fallback support.

## Basic Usage

```blade
{{-- Simple name (resolves to heroicon-o-heart) --}}
<x-keys::icon name="heart" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | Required | Icon name or path |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg`, `xl` |
| `variant` | `string` | `'outline'` | Variant: `outline`, `solid`, `mini` |
| `fallback` | `string\|null` | `'heroicon-o-question-mark-circle'` | Fallback icon if not found |

## Sizes

```blade
<x-keys::icon name="star" size="xs" />  {{-- 12×12px (0.75rem) --}}
<x-keys::icon name="star" size="sm" />  {{-- 16×16px (1rem) --}}
<x-keys::icon name="star" size="md" />  {{-- 20×20px (1.25rem) --}}
<x-keys::icon name="star" size="lg" />  {{-- 24×24px (1.5rem) --}}
<x-keys::icon name="star" size="xl" />  {{-- 32×32px (2rem) --}}
```

## Icon Resolution

The component uses intelligent resolution with the following priority:

1. **Custom SVG icons** (in `resources/icons/`)
2. **Blade icon components** (in `resources/views/components/icons/`)
3. **Heroicons** (from blade-heroicons package)

## Naming Conventions

### Simple Names (Recommended)

Most concise syntax - automatically resolves to heroicon outline:

```blade
<x-keys::icon name="heart" />          {{-- heroicon-o-heart --}}
<x-keys::icon name="user" />           {{-- heroicon-o-user --}}
<x-keys::icon name="bell" />           {{-- heroicon-o-bell --}}
```

### Variant Prop

Specify variant explicitly:

```blade
<x-keys::icon name="heart" variant="outline" />
<x-keys::icon name="heart" variant="solid" />
<x-keys::icon name="heart" variant="mini" />
```

### Shorthand Prefixes

Quick variant specification:

```blade
<x-keys::icon name="o:heart" />        {{-- outline --}}
<x-keys::icon name="s:heart" />        {{-- solid --}}
<x-keys::icon name="m:heart" />        {{-- mini --}}
```

### Explicit Prefixes

Full control over resolution:

```blade
<x-keys::icon name="hero:heart" />     {{-- Heroicon (default variant) --}}
<x-keys::icon name="custom:logo" />    {{-- Custom SVG --}}
<x-keys::icon name="blade:logo" />     {{-- Blade component --}}
```

### Fully Qualified Names (Backward Compatible)

Direct Heroicon package names:

```blade
<x-keys::icon name="heroicon-o-heart" />   {{-- outline --}}
<x-keys::icon name="heroicon-s-heart" />   {{-- solid --}}
<x-keys::icon name="heroicon-m-heart" />   {{-- mini --}}
```

## Heroicon Variants

### Outline (Default)

24×24px viewBox, 1.5px stroke:

```blade
<x-keys::icon name="heart" variant="outline" />
<x-keys::icon name="o:star" />
<x-keys::icon name="heroicon-o-bell" />
```

### Solid

24×24px viewBox, filled:

```blade
<x-keys::icon name="heart" variant="solid" />
<x-keys::icon name="s:star" />
<x-keys::icon name="heroicon-s-bell" />
```

### Mini

20×20px viewBox, solid:

```blade
<x-keys::icon name="heart" variant="mini" />
<x-keys::icon name="m:star" />
<x-keys::icon name="heroicon-m-bell" />
```

## Custom SVG Icons

Place custom SVG files in `resources/icons/`:

```
resources/
  icons/
    logo.svg
    brand.svg
    custom-icon.svg
```

Usage:

```blade
<x-keys::icon name="logo" />
<x-keys::icon name="custom:logo" />
<x-keys::icon name="brand" />
```

## Use Cases

### Buttons with Icons

```blade
<x-keys::button>
    <x-keys::icon name="plus" size="sm" />
    Create New
</x-keys::button>

<x-keys::button icon-left="trash" color="danger">
    Delete
</x-keys::button>

<x-keys::button icon-right="arrow-right" color="primary">
    Continue
</x-keys::button>
```

### Navigation Menu

```blade
<nav class="space-y-2">
    <a href="/dashboard" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-hover">
        <x-keys::icon name="home" size="sm" />
        <x-keys::text>Dashboard</x-keys::text>
    </a>

    <a href="/projects" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-hover">
        <x-keys::icon name="folder" size="sm" />
        <x-keys::text>Projects</x-keys::text>
    </a>

    <a href="/settings" class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-hover">
        <x-keys::icon name="cog-6-tooth" size="sm" />
        <x-keys::text>Settings</x-keys::text>
    </a>
</nav>
```

### Status Indicators

```blade
<div class="flex items-center gap-2">
    <x-keys::icon name="check-circle" size="sm" class="text-success" />
    <x-keys::text color="success">Completed</x-keys::text>
</div>

<div class="flex items-center gap-2">
    <x-keys::icon name="x-circle" size="sm" class="text-danger" />
    <x-keys::text color="danger">Failed</x-keys::text>
</div>

<div class="flex items-center gap-2">
    <x-keys::icon name="clock" size="sm" class="text-warning" />
    <x-keys::text color="warning">Pending</x-keys::text>
</div>
```

### Alert Messages

```blade
<x-keys::alert variant="success">
    <div class="flex items-start gap-3">
        <x-keys::icon name="s:check-circle" size="lg" class="text-success" />
        <div>
            <x-keys::text weight="semibold">Success</x-keys::text>
            <x-keys::text size="sm">Your changes have been saved.</x-keys::text>
        </div>
    </div>
</x-keys::alert>
```

### Empty States

```blade
<div class="text-center py-12">
    <x-keys::icon name="inbox" size="xl" class="text-text-muted mx-auto mb-4" />
    <x-keys::heading size="lg" color="muted">No items found</x-keys::heading>
    <x-keys::text color="muted" class="mt-2">
        Get started by creating your first item
    </x-keys::text>
    <x-keys::button color="primary" class="mt-6">
        <x-keys::icon name="plus" size="sm" />
        Create Item
    </x-keys::button>
</div>
```

### Feature List

```blade
<div class="space-y-4">
    <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
            <x-keys::icon name="s:bolt" size="md" class="text-brand" />
        </div>
        <div>
            <x-keys::heading size="md">Lightning Fast</x-keys::heading>
            <x-keys::text color="muted" class="mt-1">
                Built for performance with minimal overhead
            </x-keys::text>
        </div>
    </div>

    <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
            <x-keys::icon name="s:shield-check" size="md" class="text-success" />
        </div>
        <div>
            <x-keys::heading size="md">Secure by Default</x-keys::heading>
            <x-keys::text color="muted" class="mt-1">
                Enterprise-grade security built in
            </x-keys::text>
        </div>
    </div>
</div>
```

### Card Actions

```blade
<x-keys::card>
    <x-slot:header>
        <div class="flex items-center justify-between">
            <x-keys::heading size="lg">Project Details</x-keys::heading>
            <div class="flex gap-2">
                <x-keys::button variant="ghost" size="sm">
                    <x-keys::icon name="pencil" size="xs" />
                </x-keys::button>
                <x-keys::button variant="ghost" size="sm">
                    <x-keys::icon name="trash" size="xs" />
                </x-keys::button>
            </div>
        </div>
    </x-slot:header>

    <!-- Card content -->
</x-keys::card>
```

### Dropdown Menu Items

```blade
<x-keys::dropdown>
    <x-slot:trigger>
        <x-keys::button>Actions</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>
        <x-keys::icon name="eye" size="xs" />
        View
    </x-keys::dropdown.item>

    <x-keys::dropdown.item>
        <x-keys::icon name="pencil" size="xs" />
        Edit
    </x-keys::dropdown.item>

    <x-keys::dropdown.separator />

    <x-keys::dropdown.item>
        <x-keys::icon name="trash" size="xs" class="text-danger" />
        Delete
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

### Table Columns

```blade
<x-keys::table>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>
                <div class="flex items-center gap-2">
                    <x-keys::icon name="user" size="xs" />
                    User
                </div>
            </x-keys::table.header>
            <x-keys::table.header>
                <div class="flex items-center gap-2">
                    <x-keys::icon name="envelope" size="xs" />
                    Email
                </div>
            </x-keys::table.header>
            <x-keys::table.header>
                <div class="flex items-center gap-2">
                    <x-keys::icon name="shield-check" size="xs" />
                    Role
                </div>
            </x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <!-- Table body -->
</x-keys::table>
```

### Loading States

```blade
<x-keys::button :loading="true">
    <x-keys::icon name="arrow-path" size="sm" class="animate-spin" />
    Processing...
</x-keys::button>
```

### Social Icons

```blade
<div class="flex gap-4">
    <a href="#" class="text-text-muted hover:text-brand transition-colors">
        <x-keys::icon name="custom:twitter" size="lg" />
    </a>
    <a href="#" class="text-text-muted hover:text-brand transition-colors">
        <x-keys::icon name="custom:github" size="lg" />
    </a>
    <a href="#" class="text-text-muted hover:text-brand transition-colors">
        <x-keys::icon name="custom:linkedin" size="lg" />
    </a>
</div>
```

### Badge with Icon

```blade
<x-keys::badge color="brand">
    <x-keys::icon name="s:star" size="xs" />
    Premium
</x-keys::badge>

<x-keys::badge color="success">
    <x-keys::icon name="s:check" size="xs" />
    Verified
</x-keys::badge>
```

### Input Field Icons

```blade
<x-keys::input
    name="search"
    placeholder="Search..."
    icon-left="magnifying-glass"
/>

<x-keys::input
    name="email"
    type="email"
    placeholder="Email"
    icon-left="envelope"
/>
```

### Notification Count

```blade
<div class="relative inline-flex">
    <x-keys::button variant="ghost">
        <x-keys::icon name="bell" size="md" />
    </x-keys::button>
    <span class="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs font-semibold rounded-full flex items-center justify-center">
        3
    </span>
</div>
```

### File Type Icons

```blade
<div class="flex items-center gap-3">
    @if($file->type === 'pdf')
        <x-keys::icon name="document-text" size="lg" class="text-danger" />
    @elseif($file->type === 'image')
        <x-keys::icon name="photo" size="lg" class="text-success" />
    @elseif($file->type === 'video')
        <x-keys::icon name="film" size="lg" class="text-brand" />
    @else
        <x-keys::icon name="document" size="lg" class="text-text-muted" />
    @endif

    <div>
        <x-keys::text weight="medium">{{ $file->name }}</x-keys::text>
        <x-keys::text size="sm" color="muted">{{ $file->size }}</x-keys::text>
    </div>
</div>
```

### Step Indicators

```blade
<div class="flex items-center gap-4">
    <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center">
            <x-keys::icon name="s:check" size="sm" />
        </div>
        <x-keys::text weight="medium">Account</x-keys::text>
    </div>

    <div class="h-px flex-1 bg-border"></div>

    <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center">
            2
        </div>
        <x-keys::text weight="medium">Profile</x-keys::text>
    </div>

    <div class="h-px flex-1 bg-border"></div>

    <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-border flex items-center justify-center">
            3
        </div>
        <x-keys::text color="muted">Settings</x-keys::text>
    </div>
</div>
```

### Animated Icons

```blade
{{-- Spinning loader --}}
<x-keys::icon name="arrow-path" class="animate-spin" />

{{-- Bouncing notification --}}
<x-keys::icon name="bell" class="animate-bounce" />

{{-- Pulsing indicator --}}
<x-keys::icon name="wifi" class="animate-pulse" />
```

## Popular Heroicons

### Common Actions

```blade
<x-keys::icon name="plus" />           {{-- Add/Create --}}
<x-keys::icon name="pencil" />         {{-- Edit --}}
<x-keys::icon name="trash" />          {{-- Delete --}}
<x-keys::icon name="x-mark" />         {{-- Close --}}
<x-keys::icon name="check" />          {{-- Confirm --}}
<x-keys::icon name="magnifying-glass" /> {{-- Search --}}
<x-keys::icon name="ellipsis-vertical" /> {{-- More options --}}
```

### Navigation

```blade
<x-keys::icon name="home" />
<x-keys::icon name="arrow-left" />
<x-keys::icon name="arrow-right" />
<x-keys::icon name="chevron-down" />
<x-keys::icon name="chevron-up" />
<x-keys::icon name="bars-3" />         {{-- Menu --}}
```

### User & Account

```blade
<x-keys::icon name="user" />
<x-keys::icon name="user-circle" />
<x-keys::icon name="user-group" />
<x-keys::icon name="cog-6-tooth" />    {{-- Settings --}}
<x-keys::icon name="key" />            {{-- Password --}}
```

### Communication

```blade
<x-keys::icon name="envelope" />
<x-keys::icon name="bell" />
<x-keys::icon name="chat-bubble-left-right" />
<x-keys::icon name="phone" />
```

### Files & Media

```blade
<x-keys::icon name="document" />
<x-keys::icon name="folder" />
<x-keys::icon name="photo" />
<x-keys::icon name="film" />
<x-keys::icon name="cloud-arrow-up" />
<x-keys::icon name="cloud-arrow-down" />
```

### Status

```blade
<x-keys::icon name="check-circle" />
<x-keys::icon name="x-circle" />
<x-keys::icon name="exclamation-triangle" />
<x-keys::icon name="information-circle" />
<x-keys::icon name="question-mark-circle" />
```

## Accessibility

Icons should be accompanied by accessible labels:

```blade
{{-- Screen reader only text --}}
<button>
    <x-keys::icon name="trash" size="sm" />
    <span class="sr-only">Delete item</span>
</button>

{{-- Visible label --}}
<button class="flex items-center gap-2">
    <x-keys::icon name="pencil" size="sm" />
    <span>Edit</span>
</button>

{{-- ARIA label --}}
<button aria-label="Close dialog">
    <x-keys::icon name="x-mark" size="sm" />
</button>
```

## Component Structure

The Icon component consists of:

1. **PHP Class** (`Icon.php`)
   - Intelligent resolution system
   - Variant detection
   - Custom icon support
   - Fallback handling
   - Caching for performance

2. **Blade Template** (`icon.blade.php`)
   - Dynamic component rendering
   - Size classes
   - Fallback support

3. **Custom Icon Template** (`icon-custom.blade.php`)
   - SVG file inclusion
   - Dynamic sizing

## Data Attributes

The component generates data attributes:

- `data-icon="true"` - Component identifier
- `data-size="md"` - Icon size
- `data-variant="outline"` - Icon variant
- `data-icon-type="heroicon"` - Icon type (heroicon, custom, blade)
- `data-original-name="heart"` - Original name prop

## Best Practices

1. **Use consistent sizes**: Match icon size to surrounding text

2. **Choose appropriate variants**: Outline for general use, solid for emphasis

3. **Add accessible labels**: Always provide text alternatives

4. **Use semantic colors**: Match icon color to meaning

5. **Optimize custom SVGs**: Keep custom icons small and optimized

6. **Test fallbacks**: Ensure fallback icons display correctly

7. **Use simple names**: Prefer `name="heart"` over `name="heroicon-o-heart"`

8. **Consider context**: Choose icons that are immediately recognizable

9. **Maintain consistency**: Use the same icons for the same actions throughout

10. **Test at different sizes**: Ensure icons remain clear at all sizes

## Size Guidelines

| Size | Dimensions | Use Case |
|------|------------|----------|
| `xs` | 12×12px | Inline with small text, badges |
| `sm` | 16×16px | Buttons, inline text, compact UIs |
| `md` | 20×20px | Standard buttons, navigation |
| `lg` | 24×24px | Prominent actions, headings |
| `xl` | 32×32px | Hero sections, empty states |

## Known Limitations

- Custom icons must be SVG format
- Heroicons package must be installed (blade-heroicons)
- Icon resolution is cached per request
- Fallback must be a valid Heroicon
- Custom icons path is fixed to `resources/icons/`

## Performance Tips

- Icon existence is cached for performance
- Custom SVG icons are inlined (no HTTP requests)
- Use Heroicons when possible (optimized by package)
- Avoid excessive icon variants in loops
- Consider icon sprites for many custom icons

## Customization

### Custom Colors

```blade
<x-keys::icon name="heart" class="text-red-500" />
<x-keys::icon name="star" class="text-yellow-400" />
```

### Custom Sizing

```blade
<x-keys::icon name="logo" class="w-24 h-24" />
```

### With Background

```blade
<div class="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
    <x-keys::icon name="heart" class="text-brand" />
</div>
```

### Hover Effects

```blade
<button class="hover:text-brand transition-colors">
    <x-keys::icon name="heart" />
</button>
```
