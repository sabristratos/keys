# Group Component

A flexible grouping component that visually combines multiple form elements and interactive components with shared borders and consistent styling. Perfect for creating compound controls, toolbars, and search bars.

## Basic Usage

```blade
<x-keys::group>
    <x-keys::input placeholder="Search..." />
    <x-keys::button color="primary">Search</x-keys::button>
</x-keys::group>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `string` | `'horizontal'` | Layout: `horizontal`, `vertical` |
| `attached` | `bool` | `true` | Whether children share borders |
| `size` | `string\|null` | `null` | Size variant passed to children: `xs`, `sm`, `md`, `lg`, `xl` |
| `gap` | `string` | `'md'` | Gap spacing for detached mode: `xs`, `sm`, `md`, `lg`, `xl` |

## Orientations

### Horizontal (Default)

```blade
<x-keys::group orientation="horizontal">
    <x-keys::input placeholder="Email" />
    <x-keys::button>Subscribe</x-keys::button>
</x-keys::group>
```

### Vertical

```blade
<x-keys::group orientation="vertical">
    <x-keys::input placeholder="First Name" />
    <x-keys::input placeholder="Last Name" />
    <x-keys::input placeholder="Email" />
</x-keys::group>
```

## Attached vs Detached

### Attached (Default)
Children share borders and have no spacing:

```blade
<x-keys::group :attached="true">
    <x-keys::input placeholder="Username" />
    <x-keys::button icon-left="heroicon-o-at-symbol">
        <span class="sr-only">Check availability</span>
    </x-keys::button>
</x-keys::group>
```

### Detached
Children have spacing between them:

```blade
<x-keys::group :attached="false" gap="sm">
    <x-keys::button variant="outlined">Option 1</x-keys::button>
    <x-keys::button variant="outlined">Option 2</x-keys::button>
    <x-keys::button variant="outlined">Option 3</x-keys::button>
</x-keys::group>
```

## Size Inheritance

Pass size to all children:

```blade
<x-keys::group size="lg">
    <x-keys::input placeholder="Large input" />
    <x-keys::button>Large button</x-keys::button>
</x-keys::group>
```

## Gap Spacing (Detached Mode)

```blade
<!-- Extra Small Gap -->
<x-keys::group :attached="false" gap="xs">
    <x-keys::button>One</x-keys::button>
    <x-keys::button>Two</x-keys::button>
</x-keys::group>

<!-- Small Gap -->
<x-keys::group :attached="false" gap="sm">
    <x-keys::button>One</x-keys::button>
    <x-keys::button>Two</x-keys::button>
</x-keys::group>

<!-- Medium Gap (Default) -->
<x-keys::group :attached="false" gap="md">
    <x-keys::button>One</x-keys::button>
    <x-keys::button>Two</x-keys::button>
</x-keys::group>
```

## Use Cases

### Search Bar

```blade
<x-keys::group>
    <x-keys::input
        placeholder="Search products..."
        icon-left="heroicon-o-magnifying-glass"
    />
    <x-keys::select>
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Clothing</option>
    </x-keys::select>
    <x-keys::button color="primary">
        Search
    </x-keys::button>
</x-keys::group>
```

### Input with Icon Button

```blade
<x-keys::group>
    <x-keys::input type="url" placeholder="https://example.com" />
    <x-keys::button variant="ghost" icon-left="heroicon-o-clipboard">
        <span class="sr-only">Copy</span>
    </x-keys::button>
</x-keys::group>
```

### Filter Controls

```blade
<x-keys::group size="sm">
    <x-keys::select>
        <option>Sort by</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Newest</option>
    </x-keys::select>
    <x-keys::button variant="outlined" icon-left="heroicon-o-funnel">
        Filters
    </x-keys::button>
</x-keys::group>
```

### Button Toolbar

```blade
<x-keys::group>
    <x-keys::button variant="outlined" icon-left="heroicon-o-bold">
        <span class="sr-only">Bold</span>
    </x-keys::button>
    <x-keys::button variant="outlined" icon-left="heroicon-o-italic">
        <span class="sr-only">Italic</span>
    </x-keys::button>
    <x-keys::button variant="outlined" icon-left="heroicon-o-underline">
        <span class="sr-only">Underline</span>
    </x-keys::button>
</x-keys::group>
```

### Pagination Controls

```blade
<x-keys::group>
    <x-keys::button variant="outlined" icon-left="heroicon-o-chevron-left">
        Previous
    </x-keys::button>
    <x-keys::input type="number" value="1" class="w-20 text-center" />
    <span class="flex items-center px-3">of 10</span>
    <x-keys::button variant="outlined" icon-right="heroicon-o-chevron-right">
        Next
    </x-keys::button>
</x-keys::group>
```

### Date Range Picker

```blade
<x-keys::group>
    <x-keys::input type="date" />
    <span class="flex items-center px-2">to</span>
    <x-keys::input type="date" />
    <x-keys::button color="primary">Apply</x-keys::button>
</x-keys::group>
```

### Segmented Control

```blade
<x-keys::group>
    <x-keys::button variant="outlined">Day</x-keys::button>
    <x-keys::button variant="outlined">Week</x-keys::button>
    <x-keys::button variant="outlined">Month</x-keys::button>
    <x-keys::button variant="outlined">Year</x-keys::button>
</x-keys::group>
```

## Livewire Integration

```blade
<x-keys::group>
    <x-keys::input
        wire:model.live.debounce.300ms="search"
        placeholder="Search..."
    />
    <x-keys::button
        wire:click="performSearch"
        :loading="$isSearching"
        color="primary"
    >
        Search
    </x-keys::button>
</x-keys::group>
```

## Accessibility

The Group component:

- Maintains proper focus order
- Preserves keyboard navigation
- Keeps child component accessibility
- Supports screen readers
- Manages z-index on hover/focus

## Data Attributes

- `data-keys-group="true"` - Component identifier
- `data-orientation="horizontal"` - Layout direction
- `data-attached="true"` - Attachment state
- `data-gap="md"` - Gap spacing
- `data-size="md"` - Size variant (if set)

## Styling

The group component uses Tailwind CSS v4 and includes:

- Shared border management
- Border radius on first/last children
- Hover and focus z-index stacking
- Flexible gap system
- Orientation-specific layouts

## Best Practices

1. **Use for related controls**: Group functionally related elements

2. **Match sizes**: Ensure all children work well together

3. **Consider mobile**: Test grouping on small screens

4. **Limit group size**: Don't group too many elements (3-5 max)

5. **Use appropriate orientation**: Vertical for stacked forms, horizontal for toolbars

6. **Provide clear labels**: Ensure grouped controls are understandable

7. **Test focus order**: Verify keyboard navigation is logical

## Component Structure

The Group component consists of:

1. **PHP Class** (`Group.php`)
   - Props validation
   - Orientation handling
   - Gap management
   - Data attributes generation

2. **Blade Template** (`group.blade.php`)
   - Flex layout
   - Border management
   - Gap spacing
   - Slot for children
