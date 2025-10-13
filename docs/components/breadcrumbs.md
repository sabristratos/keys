# Breadcrumbs Component

A flexible breadcrumb navigation component for displaying hierarchical navigation paths. Features customizable separators, icons, truncation, responsive design, and full accessibility support.

## Basic Usage

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/products">Products</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item>Current Page</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

## Container Props

The `Breadcrumbs` component is a simple wrapper with no props - it accepts standard HTML attributes:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| No props | - | - | Container accepts any HTML attributes |

## Item Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string\|null` | `null` | URL to link to (omit for current page) |
| `icon` | `string\|null` | `null` | Heroicon name to display |
| `separator` | `string` | `'chevron'` | Separator style: `chevron`, `slash`, `none` |
| `truncate` | `bool` | `false` | Enable text truncation for long items |
| `maxWidth` | `string\|null` | `null` | Custom max-width class (overrides truncate) |

## Examples

### Simple Breadcrumbs

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/docs">Documentation</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item>Components</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### With Icons

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/" icon="heroicon-o-home">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/settings" icon="heroicon-o-cog">Settings</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item icon="heroicon-o-user">Profile</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### Icon-Only Breadcrumbs

When an item has an icon but no text content, it automatically renders as icon-only:

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/" icon="heroicon-o-home" />
    <x-keys::breadcrumbs.item href="/settings" icon="heroicon-o-cog">Settings</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item icon="heroicon-o-user">Profile</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

## Separator Variants

### Chevron (Default)

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/products">Products</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item>Laptops</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### Slash Separator

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/" separator="slash">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/products" separator="slash">Products</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item separator="none">Laptops</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### No Separator

Hide separators completely:

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/" separator="none">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/products" separator="none">Products</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item separator="none">Laptops</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### Mixed Separators

You can use different separators for different items:

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/" separator="chevron">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/products" separator="slash">Products</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item separator="none">Laptops</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

## Truncation

### Default Truncation

Enable truncation with responsive max-widths (32/48/64 units):

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/products" :truncate="true">
        Very Long Product Category Name That Will Be Truncated
    </x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item>Current Item</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### Custom Max Width

Provide custom max-width for finer control:

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/products" maxWidth="max-w-20">
        Long Category Name
    </x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item>Current</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

## Real-World Examples

### E-commerce Navigation

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/" icon="heroicon-o-home" />
    <x-keys::breadcrumbs.item href="/shop">Shop</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/shop/electronics">Electronics</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/shop/electronics/laptops">Laptops</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item>MacBook Pro 16"</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### Documentation Navigation

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/docs" icon="heroicon-o-book-open">Docs</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/docs/components">Components</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/docs/components/forms">Forms</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item>Input</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### Admin Panel Navigation

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/admin" icon="heroicon-o-home" />
    <x-keys::breadcrumbs.item href="/admin/users" icon="heroicon-o-users">Users</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/admin/users/{{ $user->id }}" :truncate="true">
        {{ $user->name }}
    </x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item icon="heroicon-o-pencil">Edit</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### File System Navigation

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/files" icon="heroicon-o-folder" />
    <x-keys::breadcrumbs.item href="/files/documents" separator="slash">Documents</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/files/documents/projects" separator="slash">Projects</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item separator="none">2024</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

## Dynamic Breadcrumbs

### From Route Segments

```blade
@php
    $segments = collect(request()->segments());
    $path = '';
@endphp

<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/" icon="heroicon-o-home" />

    @foreach($segments as $index => $segment)
        @php
            $path .= '/' . $segment;
            $isLast = $index === $segments->count() - 1;
        @endphp

        <x-keys::breadcrumbs.item
            :href="$isLast ? null : $path"
            :separator="$isLast ? 'none' : 'chevron'"
        >
            {{ ucfirst(str_replace('-', ' ', $segment)) }}
        </x-keys::breadcrumbs.item>
    @endforeach
</x-keys::breadcrumbs>
```

### From Model Relationships

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/">Home</x-keys::breadcrumbs.item>

    @if($category->parent)
        <x-keys::breadcrumbs.item href="/categories/{{ $category->parent->slug }}">
            {{ $category->parent->name }}
        </x-keys::breadcrumbs.item>
    @endif

    <x-keys::breadcrumbs.item href="/categories/{{ $category->slug }}">
        {{ $category->name }}
    </x-keys::breadcrumbs.item>

    <x-keys::breadcrumbs.item>{{ $product->name }}</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### With Livewire

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item wire:click="goHome" href="#" icon="heroicon-o-home" />

    @foreach($this->breadcrumbs as $breadcrumb)
        <x-keys::breadcrumbs.item
            wire:click="navigateTo('{{ $breadcrumb['url'] }}')"
            :href="$loop->last ? null : $breadcrumb['url']"
            :separator="$loop->last ? 'none' : 'chevron'"
        >
            {{ $breadcrumb['label'] }}
        </x-keys::breadcrumbs.item>
    @endforeach
</x-keys::breadcrumbs>
```

## Styling

### Custom Container Styling

```blade
<x-keys::breadcrumbs class="bg-surface-subtle p-4 rounded-lg">
    <x-keys::breadcrumbs.item href="/">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item>Current</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

### Custom Item Styling

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/" class="font-bold">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/products" class="text-brand">Products</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item class="italic">Current Page</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

## Accessibility

The Breadcrumbs component includes comprehensive accessibility features:

- Semantic HTML with `<nav>` and `<ol>` elements
- `aria-label="Breadcrumb"` for screen reader context
- `aria-current="page"` on current (non-link) items
- `aria-hidden="true"` on decorative separators
- Focus-visible ring states for keyboard navigation
- Proper heading hierarchy support
- Screen reader friendly link text

```blade
<x-keys::breadcrumbs>
    <x-keys::breadcrumbs.item href="/">
        <span class="sr-only">Navigate to </span>Home
    </x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/products">
        <span class="sr-only">Navigate to </span>Products
    </x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item>
        Current Page
    </x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

## Responsive Behavior

The breadcrumbs component is fully responsive:

- Wraps on mobile, single line on desktop
- Icons remain visible and don't shrink
- Responsive truncation breakpoints (sm/md)
- Touch-friendly tap targets
- Horizontal scrolling on very small screens

```blade
<x-keys::breadcrumbs class="overflow-x-auto">
    <x-keys::breadcrumbs.item href="/">Home</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/level1">Level 1</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/level1/level2">Level 2</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item href="/level1/level2/level3">Level 3</x-keys::breadcrumbs.item>
    <x-keys::breadcrumbs.item>Level 4</x-keys::breadcrumbs.item>
</x-keys::breadcrumbs>
```

## Best Practices

1. **Always provide a Home link**: Start breadcrumbs with a home or root item

2. **Last item is current page**: Don't provide `href` for the last item to indicate current location

3. **Hide separator on last item**: Use `separator="none"` on the final breadcrumb

4. **Use consistent separators**: Stick to one separator style unless there's a specific UX reason

5. **Consider truncation**: Use `truncate` for long category names to maintain layout

6. **Icon usage**: Icons work great for Home and other common navigation items

7. **Keep it shallow**: Try to limit breadcrumbs to 5-6 levels for better UX

8. **Make links meaningful**: Ensure each breadcrumb label clearly describes its destination

## Component Structure

The Breadcrumbs component consists of:

1. **PHP Container Class** (`Breadcrumbs.php`)
   - Simple wrapper component
   - Data attributes generation
   - No business logic

2. **PHP Item Class** (`Breadcrumbs\Item.php`)
   - Props validation
   - Link detection
   - Icon handling
   - Separator logic
   - Truncation support

3. **Blade Templates**
   - `breadcrumbs.blade.php` - Navigation container
   - `breadcrumbs\item.blade.php` - Individual items

## Data Attributes

The component generates helpful data attributes:

**Container:**
- `data-keys-breadcrumbs="true"` - Component identifier

**Item:**
- `data-keys-breadcrumb-item="true"` - Component identifier
- `data-separator="chevron"` - Separator style
- `data-is-link="true"` - Whether item is a link
- `data-has-icon="true"` - Whether item has an icon
- `data-truncate="true"` - Whether text truncation is enabled
