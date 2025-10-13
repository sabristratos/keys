# Popover Component

A foundational overlay component using the native HTML Popover API with CSS anchor positioning. Provides the base for dropdowns, tooltips, and custom floating content with automatic positioning and focus management.

## Basic Usage

```blade
<x-keys::popover id="basic-popover">
    <x-slot:trigger>
        <x-keys::button>Open Popover</x-keys::button>
    </x-slot:trigger>

    <x-keys::text>Popover content goes here</x-keys::text>
</x-keys::popover>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string\|null` | Auto-generated | Unique identifier for the popover |
| `variant` | `string` | `'default'` | Style variant: `default`, `tooltip`, `menu` |
| `size` | `string` | `'md'` | Size variant: `sm`, `md`, `lg` |
| `placement` | `string` | `'bottom'` | Position: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`, `right-end` |
| `arrow` | `bool` | `false` | Show arrow pointing to trigger |
| `manual` | `bool` | `false` | Manual control (doesn't auto-close on outside click) |

## Size Variants

### Small
```blade
<x-keys::popover size="sm">
    <x-slot:trigger>
        <x-keys::button size="sm">Small Popover</x-keys::button>
    </x-slot:trigger>

    <x-keys::text size="sm">Compact popover content</x-keys::text>
</x-keys::popover>
```

### Medium (Default)
```blade
<x-keys::popover size="md">
    <x-slot:trigger>
        <x-keys::button>Medium Popover</x-keys::button>
    </x-slot:trigger>

    <x-keys::text>Standard popover content</x-keys::text>
</x-keys::popover>
```

### Large
```blade
<x-keys::popover size="lg">
    <x-slot:trigger>
        <x-keys::button size="lg">Large Popover</x-keys::button>
    </x-slot:trigger>

    <x-keys::text>Spacious popover content with more room</x-keys::text>
</x-keys::popover>
```

## Placements

### Bottom (Default)
```blade
<x-keys::popover placement="bottom">
    <x-slot:trigger>
        <x-keys::button>Bottom</x-keys::button>
    </x-slot:trigger>

    <x-keys::text>Content below trigger</x-keys::text>
</x-keys::popover>
```

### Top
```blade
<x-keys::popover placement="top">
    <x-slot:trigger>
        <x-keys::button>Top</x-keys::button>
    </x-slot:trigger>

    <x-keys::text>Content above trigger</x-keys::text>
</x-keys::popover>
```

### Left
```blade
<x-keys::popover placement="left">
    <x-slot:trigger>
        <x-keys::button>Left</x-keys::button>
    </x-slot:trigger>

    <x-keys::text>Content to the left</x-keys::text>
</x-keys::popover>
```

### Right
```blade
<x-keys::popover placement="right">
    <x-slot:trigger>
        <x-keys::button>Right</x-keys::button>
    </x-slot:trigger>

    <x-keys::text>Content to the right</x-keys::text>
</x-keys::popover>
```

### Aligned Placements
```blade
{{-- Top Start --}}
<x-keys::popover placement="top-start">
    <x-slot:trigger>
        <x-keys::button>Top Start</x-keys::button>
    </x-slot:trigger>
    <x-keys::text>Aligned to the start</x-keys::text>
</x-keys::popover>

{{-- Bottom End --}}
<x-keys::popover placement="bottom-end">
    <x-slot:trigger>
        <x-keys::button>Bottom End</x-keys::button>
    </x-slot:trigger>
    <x-keys::text>Aligned to the end</x-keys::text>
</x-keys::popover>
```

## With Arrow

```blade
<x-keys::popover :arrow="true" placement="top">
    <x-slot:trigger>
        <x-keys::button>With Arrow</x-keys::button>
    </x-slot:trigger>

    <x-keys::text>This popover has an arrow pointing to the trigger</x-keys::text>
</x-keys::popover>
```

## Variants

### Default
```blade
<x-keys::popover variant="default">
    <x-slot:trigger>
        <x-keys::button>Default Style</x-keys::button>
    </x-slot:trigger>

    <x-keys::text>Standard popover appearance</x-keys::text>
</x-keys::popover>
```

### Tooltip Style
```blade
<x-keys::popover variant="tooltip">
    <x-slot:trigger>
        <x-keys::button>Tooltip Style</x-keys::button>
    </x-slot:trigger>

    Compact tooltip-like appearance
</x-keys::popover>
```

### Menu Style
```blade
<x-keys::popover variant="menu">
    <x-slot:trigger>
        <x-keys::button>Menu Style</x-keys::button>
    </x-slot:trigger>

    <div class="space-y-1">
        <button class="w-full text-left px-2 py-1 hover:bg-neutral-100 rounded">
            Option 1
        </button>
        <button class="w-full text-left px-2 py-1 hover:bg-neutral-100 rounded">
            Option 2
        </button>
    </div>
</x-keys::popover>
```

## Manual Control

For manual control (doesn't auto-close):

```blade
<x-keys::popover :manual="true">
    <x-slot:trigger>
        <x-keys::button>Manual Popover</x-keys::button>
    </x-slot:trigger>

    <div class="space-y-3">
        <x-keys::text>This popover stays open until explicitly closed</x-keys::text>

        <x-keys::button
            size="sm"
            onclick="document.getElementById('manual-popover').hidePopover()"
        >
            Close
        </x-keys::button>
    </div>
</x-keys::popover>
```

## Real-World Examples

### User Profile Card
```blade
<x-keys::popover placement="bottom-end" size="lg" :arrow="true">
    <x-slot:trigger>
        <x-keys::avatar
            :src="auth()->user()->avatar"
            :name="auth()->user()->name"
            size="sm"
        />
    </x-slot:trigger>

    <div class="space-y-3">
        <div class="flex items-center gap-3">
            <x-keys::avatar
                :src="auth()->user()->avatar"
                :name="auth()->user()->name"
                size="lg"
            />
            <div>
                <x-keys::text weight="semibold">
                    {{ auth()->user()->name }}
                </x-keys::text>
                <x-keys::text size="sm" color="muted">
                    {{ auth()->user()->email }}
                </x-keys::text>
            </div>
        </div>

        <x-keys::separator />

        <div class="flex gap-2">
            <x-keys::button href="/profile" size="sm" class="flex-1">
                View Profile
            </x-keys::button>
            <x-keys::button wire:click="logout" variant="outline" size="sm">
                Sign Out
            </x-keys::button>
        </div>
    </div>
</x-keys::popover>
```

### Quick Actions Menu
```blade
<x-keys::popover placement="bottom-start" variant="menu">
    <x-slot:trigger>
        <x-keys::button variant="ghost" icon-left="heroicon-o-ellipsis-horizontal" />
    </x-slot:trigger>

    <div class="min-w-40">
        <button
            wire:click="edit"
            class="w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded flex items-center gap-2"
        >
            <x-keys::icon name="heroicon-o-pencil" size="sm" />
            <span>Edit</span>
        </button>

        <button
            wire:click="share"
            class="w-full text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded flex items-center gap-2"
        >
            <x-keys::icon name="heroicon-o-share" size="sm" />
            <span>Share</span>
        </button>

        <x-keys::separator class="my-1" />

        <button
            wire:click="delete"
            class="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-danger rounded flex items-center gap-2"
        >
            <x-keys::icon name="heroicon-o-trash" size="sm" />
            <span>Delete</span>
        </button>
    </div>
</x-keys::popover>
```

### Color Picker
```blade
<x-keys::popover placement="bottom" size="lg">
    <x-slot:trigger>
        <button class="w-8 h-8 rounded border-2 border-border" style="background: {{ $selectedColor }};"></button>
    </x-slot:trigger>

    <div>
        <x-keys::text weight="medium" class="mb-3">Select Color</x-keys::text>

        <div class="grid grid-cols-6 gap-2">
            @foreach($colors as $color)
                <button
                    wire:click="selectColor('{{ $color }}')"
                    class="w-8 h-8 rounded border-2 {{ $selectedColor === $color ? 'border-brand' : 'border-border' }}"
                    style="background: {{ $color }};"
                ></button>
            @endforeach
        </div>
    </div>
</x-keys::popover>
```

### Date Range Selector
```blade
<x-keys::popover placement="bottom" size="lg" :arrow="true">
    <x-slot:trigger>
        <x-keys::button icon-left="heroicon-o-calendar">
            {{ $dateRangeLabel }}
        </x-keys::button>
    </x-slot:trigger>

    <div class="space-y-3">
        <x-keys::heading level="h4" size="sm">Select Date Range</x-keys::heading>

        <div class="flex gap-3">
            <div class="flex-1">
                <x-keys::label for="start-date">Start Date</x-keys::label>
                <x-keys::input
                    id="start-date"
                    type="date"
                    wire:model.live="startDate"
                />
            </div>

            <div class="flex-1">
                <x-keys::label for="end-date">End Date</x-keys::label>
                <x-keys::input
                    id="end-date"
                    type="date"
                    wire:model.live="endDate"
                />
            </div>
        </div>

        <div class="flex justify-end gap-2">
            <x-keys::button
                variant="outline"
                size="sm"
                onclick="this.closest('[popover]').hidePopover()"
            >
                Cancel
            </x-keys::button>
            <x-keys::button
                color="brand"
                size="sm"
                wire:click="applyDateRange"
            >
                Apply
            </x-keys::button>
        </div>
    </div>
</x-keys::popover>
```

### Share Options
```blade
<x-keys::popover placement="bottom" :arrow="true">
    <x-slot:trigger>
        <x-keys::button icon-left="heroicon-o-share">Share</x-keys::button>
    </x-slot:trigger>

    <div class="space-y-3 min-w-64">
        <x-keys::heading level="h4" size="sm">Share this item</x-keys::heading>

        <div class="flex gap-2">
            <x-keys::button variant="outline" size="sm" class="flex-1">
                <x-keys::icon name="heroicon-o-link" size="sm" />
            </x-keys::button>
            <x-keys::button variant="outline" size="sm" class="flex-1">
                <x-keys::icon name="heroicon-o-envelope" size="sm" />
            </x-keys::button>
            <x-keys::button variant="outline" size="sm" class="flex-1">
                <x-keys::icon name="heroicon-o-globe-alt" size="sm" />
            </x-keys::button>
        </div>

        <x-keys::separator />

        <div>
            <x-keys::label for="share-link">Share Link</x-keys::label>
            <div class="flex gap-2">
                <x-keys::input
                    id="share-link"
                    :value="$shareUrl"
                    readonly
                    class="flex-1"
                />
                <x-keys::button
                    size="sm"
                    onclick="navigator.clipboard.writeText(this.previousElementSibling.value)"
                >
                    Copy
                </x-keys::button>
            </div>
        </div>
    </div>
</x-keys::popover>
```

### Filter Panel
```blade
<x-keys::popover placement="bottom-start" size="lg">
    <x-slot:trigger>
        <x-keys::button icon-left="heroicon-o-funnel">
            Filters
            @if($activeFiltersCount > 0)
                <x-keys::badge size="xs" class="ml-2">
                    {{ $activeFiltersCount }}
                </x-keys::badge>
            @endif
        </x-keys::button>
    </x-slot:trigger>

    <div class="space-y-4 w-80">
        <x-keys::heading level="h4" size="sm">Filter Options</x-keys::heading>

        <div>
            <x-keys::label for="status-filter">Status</x-keys::label>
            <x-keys::select id="status-filter" wire:model.live="statusFilter">
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
            </x-keys::select>
        </div>

        <div>
            <x-keys::label for="date-filter">Date Range</x-keys::label>
            <x-keys::select id="date-filter" wire:model.live="dateFilter">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
            </x-keys::select>
        </div>

        <x-keys::separator />

        <div class="flex justify-between">
            <x-keys::button
                variant="ghost"
                size="sm"
                wire:click="clearFilters"
            >
                Clear All
            </x-keys::button>
            <x-keys::button
                color="brand"
                size="sm"
                onclick="this.closest('[popover]').hidePopover()"
            >
                Apply
            </x-keys::button>
        </div>
    </div>
</x-keys::popover>
```

## Programmatic Control

### JavaScript API

```javascript
// Get popover element
const popover = document.getElementById('my-popover');

// Show popover
popover.showPopover();

// Hide popover
popover.hidePopover();

// Toggle popover
popover.togglePopover();

// Check if showing
const isShowing = popover.matches(':popover-open');
```

### From Button Click
```blade
<x-keys::button onclick="document.getElementById('my-popover').showPopover()">
    Open Popover
</x-keys::button>

<x-keys::popover id="my-popover" :manual="true">
    <x-slot:trigger>
        <!-- Empty or hidden trigger -->
    </x-slot:trigger>

    <x-keys::text>Programmatically controlled popover</x-keys::text>
</x-keys::popover>
```

## Accessibility

The Popover component includes comprehensive accessibility features:

- Native Popover API with built-in focus management
- Top-layer rendering (appears above all other content)
- Escape key dismisses (for auto mode)
- Focus trapping via browser
- Proper layering and z-index management
- Keyboard navigable

```blade
<x-keys::popover>
    <x-slot:trigger>
        <x-keys::button aria-label="Open options menu">
            Options
        </x-keys::button>
    </x-slot:trigger>

    <div role="menu">
        {{-- Menu content --}}
    </div>
</x-keys::popover>
```

## Best Practices

1. **Use appropriate sizes**: Match popover size to content volume

2. **Consider viewport edges**: Test placement near screen boundaries

3. **Provide close mechanism**: For manual popovers, always include a way to close

4. **Keep content focused**: Popovers should have a single, clear purpose

5. **Test on mobile**: Ensure popovers work well on touch devices

6. **Use semantic HTML**: Include appropriate ARIA roles for custom content

7. **Limit nesting**: Avoid deeply nested popovers

8. **Performance**: Don't create too many popovers on a single page

9. **Use variants appropriately**: Menu variant for lists, tooltip for brief info

10. **Auto vs Manual**: Use auto for most cases, manual for complex interactions

## Technical Details

### Native Popover API

The Popover component uses the modern Popover API with:

- Top-layer rendering (no z-index issues)
- Native focus management
- Automatic light dismiss
- Hardware-accelerated animations
- Better accessibility than custom overlays

### CSS Anchor Positioning

Popovers are anchored using CSS:

```css
/* Trigger */
anchor-name: --trigger-xyz;

/* Popover */
--popover-anchor: --trigger-xyz;
```

This provides:
- Native browser positioning
- Automatic viewport collision detection
- No JavaScript calculation overhead
- Better performance

## Browser Support

Requires modern browsers with Popover API support:

- Chrome/Edge 114+
- Safari 17+
- Firefox 125+

## Component Structure

The Popover component consists of:

1. **PHP Class** (`Popover.php`)
   - Props validation
   - Unique ID generation
   - Data attributes generation

2. **Blade Template** (`popover.blade.php`)
   - Trigger wrapper with CSS anchor
   - Native popover element
   - Optional arrow
   - Variant-based styling

## Data Attributes

The component generates helpful data attributes:

- `data-keys-popover="true"` - Component identifier
- `data-variant="default"` - Style variant
- `data-size="md"` - Size variant
- `data-placement="bottom"` - Position
- `data-arrow="true"` - Arrow visibility
- `data-manual="true"` - Control mode
- `data-popover-trigger="id"` - Trigger identifier
