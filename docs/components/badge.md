# Badge Component

A versatile label component for displaying status, categories, counts, and tags. Supports multiple variants, colors, sizes, icons, and dismissible functionality.

## Basic Usage

```blade
<x-keys::badge>Default Badge</x-keys::badge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'filled'` | Style variant: `filled`, `outlined`, `subtle` |
| `color` | `string` | `'blue'` | Color: See color options below |
| `size` | `string` | `'sm'` | Size: `xs`, `sm`, `md` |
| `icon` | `string\|null` | `null` | Icon name (Heroicon) |
| `dismissible` | `bool` | `false` | Enable dismiss button |
| `id` | `string\|null` | Auto-generated | Badge ID (for dismissible) |

## Colors

Badge supports an extended color palette:

**Semantic Colors:**
- `brand` - Brand color
- `success` - Success/positive actions
- `warning` - Warning/caution
- `danger` - Error/destructive actions
- `info` - Informational content
- `neutral` - Neutral/default

**Extended Colors:**
- `red`, `green`, `blue`, `purple`, `yellow`
- `indigo`, `pink`, `gray`, `teal`, `orange`, `dark`

## Variants

### Filled (Default)
Solid background with contrasting text:

```blade
<x-keys::badge variant="filled" color="success">Active</x-keys::badge>
<x-keys::badge variant="filled" color="danger">Inactive</x-keys::badge>
<x-keys::badge variant="filled" color="warning">Pending</x-keys::badge>
```

### Outlined
Transparent background with border:

```blade
<x-keys::badge variant="outlined" color="brand">Brand</x-keys::badge>
<x-keys::badge variant="outlined" color="success">Success</x-keys::badge>
<x-keys::badge variant="outlined" color="info">Info</x-keys::badge>
```

### Subtle
Minimal style with dot indicator:

```blade
<x-keys::badge variant="subtle" color="success">Online</x-keys::badge>
<x-keys::badge variant="subtle" color="danger">Offline</x-keys::badge>
<x-keys::badge variant="subtle" color="warning">Away</x-keys::badge>
```

## Sizes

```blade
<x-keys::badge size="xs">Extra Small</x-keys::badge>
<x-keys::badge size="sm">Small (Default)</x-keys::badge>
<x-keys::badge size="md">Medium</x-keys::badge>
```

## With Icons

```blade
<x-keys::badge icon="heroicon-o-check-circle" color="success">
    Verified
</x-keys::badge>

<x-keys::badge icon="heroicon-o-x-circle" color="danger">
    Failed
</x-keys::badge>

<x-keys::badge icon="heroicon-o-clock" color="warning">
    Pending
</x-keys::badge>
```

## Icon-Only Badges

```blade
<x-keys::badge icon="heroicon-o-check" color="success" />
<x-keys::badge icon="heroicon-o-x-mark" color="danger" />
<x-keys::badge icon="heroicon-o-exclamation-triangle" color="warning" />
```

## Dismissible Badges

```blade
<x-keys::badge :dismissible="true" color="brand">
    Special Offer
</x-keys::badge>

<x-keys::badge :dismissible="true" color="info" id="promo-badge">
    Limited Time
</x-keys::badge>
```

Note: Dismissible functionality not available with `subtle` variant.

## Use Cases

### Status Indicators

```blade
<x-keys::badge color="success">Active</x-keys::badge>
<x-keys::badge color="danger">Inactive</x-keys::badge>
<x-keys::badge color="warning">Pending</x-keys::badge>
<x-keys::badge color="neutral">Draft</x-keys::badge>
```

### User Roles

```blade
<x-keys::badge color="purple">Admin</x-keys::badge>
<x-keys::badge color="blue">Editor</x-keys::badge>
<x-keys::badge color="green">Member</x-keys::badge>
<x-keys::badge color="gray">Guest</x-keys::badge>
```

### Counts & Notifications

```blade
<div class="relative inline-flex">
    <x-keys::button icon-left="heroicon-o-bell" />
    <x-keys::badge
        variant="filled"
        color="danger"
        size="xs"
        class="absolute -top-1 -right-1"
    >
        12
    </x-keys::badge>
</div>
```

### Tags

```blade
<div class="flex flex-wrap gap-2">
    <x-keys::badge variant="outlined" color="blue">PHP</x-keys::badge>
    <x-keys::badge variant="outlined" color="red">Laravel</x-keys::badge>
    <x-keys::badge variant="outlined" color="green">Vue.js</x-keys::badge>
    <x-keys::badge variant="outlined" color="purple">Tailwind</x-keys::badge>
</div>
```

### Online Status

```blade
<div class="flex items-center gap-2">
    <x-keys::avatar src="/avatar.jpg" name="John Doe" />
    <div>
        <div class="font-medium">John Doe</div>
        <x-keys::badge variant="subtle" color="success" size="xs">
            Online
        </x-keys::badge>
    </div>
</div>
```

### Priority Levels

```blade
<x-keys::badge icon="heroicon-o-arrow-up" color="danger">
    High Priority
</x-keys::badge>

<x-keys::badge icon="heroicon-o-minus" color="warning">
    Medium Priority
</x-keys::badge>

<x-keys::badge icon="heroicon-o-arrow-down" color="neutral">
    Low Priority
</x-keys::badge>
```

### Product Labels

```blade
<div class="relative">
    <img src="/product.jpg" alt="Product" />
    <x-keys::badge
        variant="filled"
        color="danger"
        class="absolute top-2 right-2"
    >
        Sale
    </x-keys::badge>
</div>
```

### Feature Badges

```blade
<div class="flex items-center gap-2">
    <x-keys::heading size="md">Premium Plan</x-keys::heading>
    <x-keys::badge color="yellow" icon="heroicon-o-star">
        Popular
    </x-keys::badge>
</div>
```

### Order Status

```blade
<x-keys::table>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>Order</x-keys::table.header>
            <x-keys::table.header>Status</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>
    <x-keys::table.body>
        @foreach($orders as $order)
            <x-keys::table.row>
                <x-keys::table.cell>{{ $order->id }}</x-keys::table.cell>
                <x-keys::table.cell>
                    @switch($order->status)
                        @case('delivered')
                            <x-keys::badge color="success">Delivered</x-keys::badge>
                            @break
                        @case('shipped')
                            <x-keys::badge color="blue">Shipped</x-keys::badge>
                            @break
                        @case('processing')
                            <x-keys::badge color="warning">Processing</x-keys::badge>
                            @break
                        @case('cancelled')
                            <x-keys::badge color="danger">Cancelled</x-keys::badge>
                            @break
                    @endswitch
                </x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>
```

### Category Filters

```blade
<div class="flex flex-wrap gap-2">
    <x-keys::badge
        variant="outlined"
        :dismissible="true"
        color="brand"
    >
        Electronics
    </x-keys::badge>
    <x-keys::badge
        variant="outlined"
        :dismissible="true"
        color="green"
    >
        Home & Garden
    </x-keys::badge>
    <x-keys::badge
        variant="outlined"
        :dismissible="true"
        color="purple"
    >
        Fashion
    </x-keys::badge>
</div>
```

### Verification Badges

```blade
<div class="flex items-center gap-2">
    <x-keys::heading size="lg">Premium Account</x-keys::heading>
    <x-keys::badge
        icon="heroicon-o-check-badge"
        color="blue"
        size="md"
    >
        Verified
    </x-keys::badge>
</div>
```

### Beta Features

```blade
<div class="flex items-center gap-2">
    <span>New Dashboard</span>
    <x-keys::badge color="brand" size="xs">Beta</x-keys::badge>
</div>
```

## All Color Examples

```blade
<div class="flex flex-wrap gap-2">
    <x-keys::badge color="brand">Brand</x-keys::badge>
    <x-keys::badge color="success">Success</x-keys::badge>
    <x-keys::badge color="warning">Warning</x-keys::badge>
    <x-keys::badge color="danger">Danger</x-keys::badge>
    <x-keys::badge color="info">Info</x-keys::badge>
    <x-keys::badge color="neutral">Neutral</x-keys::badge>
    <x-keys::badge color="red">Red</x-keys::badge>
    <x-keys::badge color="green">Green</x-keys::badge>
    <x-keys::badge color="blue">Blue</x-keys::badge>
    <x-keys::badge color="purple">Purple</x-keys::badge>
    <x-keys::badge color="yellow">Yellow</x-keys::badge>
    <x-keys::badge color="indigo">Indigo</x-keys::badge>
    <x-keys::badge color="pink">Pink</x-keys::badge>
    <x-keys::badge color="gray">Gray</x-keys::badge>
    <x-keys::badge color="teal">Teal</x-keys::badge>
    <x-keys::badge color="orange">Orange</x-keys::badge>
</div>
```

## Variant Comparison

```blade
<!-- Filled -->
<div class="flex gap-2">
    <x-keys::badge variant="filled" color="success">Filled Success</x-keys::badge>
    <x-keys::badge variant="outlined" color="success">Outlined Success</x-keys::badge>
    <x-keys::badge variant="subtle" color="success">Subtle Success</x-keys::badge>
</div>

<!-- Danger -->
<div class="flex gap-2 mt-2">
    <x-keys::badge variant="filled" color="danger">Filled Danger</x-keys::badge>
    <x-keys::badge variant="outlined" color="danger">Outlined Danger</x-keys::badge>
    <x-keys::badge variant="subtle" color="danger">Subtle Danger</x-keys::badge>
</div>

<!-- Info -->
<div class="flex gap-2 mt-2">
    <x-keys::badge variant="filled" color="info">Filled Info</x-keys::badge>
    <x-keys::badge variant="outlined" color="info">Outlined Info</x-keys::badge>
    <x-keys::badge variant="subtle" color="info">Subtle Info</x-keys::badge>
</div>
```

## Accessibility

The Badge component includes accessibility features:

- Semantic HTML elements
- Proper contrast ratios for all color combinations
- Screen reader support for dismissible badges
- Focus-visible styles for dismissible badges

```blade
<x-keys::badge
    :dismissible="true"
    aria-label="Remove special offer badge"
>
    Special Offer
</x-keys::badge>
```

## Component Structure

The Badge component consists of:

1. **PHP Class** (`Badge.php`)
   - Props validation
   - Icon-only detection
   - ID generation for dismissible badges
   - Data attributes generation

2. **Blade Template** (`badge.blade.php`)
   - Variant-based rendering
   - Icon support
   - Dismissible button
   - Dynamic sizing

3. **TypeScript Actions** (`BadgeActions.ts`)
   - Dismiss functionality
   - Animation handling

## Data Attributes

The component generates data attributes:

- `data-keys-badge="true"` - Component identifier
- `data-variant="filled"` - Visual variant
- `data-color="success"` - Color scheme
- `data-size="sm"` - Size variant
- `data-dismissible="true"` - Dismissible state
- `data-badge-id="..."` - Badge ID
- `data-has-icon="true"` - Has icon
- `data-icon="..."` - Icon name
- `data-icon-only="true"` - Icon-only mode

## Best Practices

1. **Use semantic colors**: Match color to meaning (success = green, danger = red)

2. **Keep text concise**: Badges should be short labels

3. **Use consistent sizing**: Match badge size to context

4. **Choose appropriate variants**: Filled for important status, outlined for secondary, subtle for presence

5. **Don't overuse**: Too many badges reduce effectiveness

6. **Provide context**: Ensure badge meaning is clear from surrounding content

7. **Use icons meaningfully**: Icons should clarify the badge purpose

8. **Consider color blindness**: Don't rely solely on color to convey meaning

9. **Use dismissible sparingly**: Only for temporary badges

10. **Maintain readability**: Ensure sufficient contrast

## Styling Tips

### Positioning

```blade
<!-- Absolute positioning for notifications -->
<div class="relative inline-flex">
    <x-keys::button>Messages</x-keys::button>
    <x-keys::badge class="absolute -top-2 -right-2">5</x-keys::badge>
</div>

<!-- Inline with text -->
<span class="flex items-center gap-2">
    New Feature
    <x-keys::badge>Beta</x-keys::badge>
</span>
```

### Custom Styling

```blade
<x-keys::badge class="font-bold uppercase tracking-wide">
    Custom Style
</x-keys::badge>

<x-keys::badge class="shadow-lg">
    With Shadow
</x-keys::badge>
```

## Known Limitations

- Dismissible not supported with `subtle` variant
- Icon-only badges have fixed dimensions
- Maximum recommended text length: ~20 characters
- Subtle variant dot color cannot be customized independently

## Performance Tips

- Use badges sparingly in lists/tables (can impact rendering)
- Consider caching computed badge HTML for repeated use
- Avoid excessive dismissible badges (JS event listeners)
