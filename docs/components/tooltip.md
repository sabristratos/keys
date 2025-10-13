# Tooltip Component

A contextual information component using the native HTML Popover API with CSS anchor positioning. Provides tooltips with zero JavaScript overhead, multiple placement options, and rich content support.

## Basic Usage

```blade
<x-keys::tooltip content="This is a tooltip">
    <x-keys::button>Hover me</x-keys::button>
</x-keys::tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `string` | `'top'` | Tooltip position: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`, `right-end` |
| `color` | `string` | `'dark'` | Color theme: `dark`, `light` |
| `size` | `string` | `'md'` | Size variant: `sm`, `md`, `lg` |
| `id` | `string\|null` | Auto-generated | Custom ID for the tooltip |
| `content` | `string\|null` | `null` | Simple text content for the tooltip |

## Placements

### Top (Default)
```blade
<x-keys::tooltip content="Top tooltip" placement="top">
    <x-keys::button>Top</x-keys::button>
</x-keys::tooltip>
```

### Bottom
```blade
<x-keys::tooltip content="Bottom tooltip" placement="bottom">
    <x-keys::button>Bottom</x-keys::button>
</x-keys::tooltip>
```

### Left
```blade
<x-keys::tooltip content="Left tooltip" placement="left">
    <x-keys::button>Left</x-keys::button>
</x-keys::tooltip>
```

### Right
```blade
<x-keys::tooltip content="Right tooltip" placement="right">
    <x-keys::button>Right</x-keys::button>
</x-keys::tooltip>
```

### Top Start
```blade
<x-keys::tooltip content="Top start tooltip" placement="top-start">
    <x-keys::button>Top Start</x-keys::button>
</x-keys::tooltip>
```

### Top End
```blade
<x-keys::tooltip content="Top end tooltip" placement="top-end">
    <x-keys::button>Top End</x-keys::button>
</x-keys::tooltip>
```

### Bottom Start
```blade
<x-keys::tooltip content="Bottom start tooltip" placement="bottom-start">
    <x-keys::button>Bottom Start</x-keys::button>
</x-keys::tooltip>
```

### Bottom End
```blade
<x-keys::tooltip content="Bottom end tooltip" placement="bottom-end">
    <x-keys::button>Bottom End</x-keys::button>
</x-keys::tooltip>
```

## Color Variants

### Dark (Default)
```blade
<x-keys::tooltip content="Dark tooltip" color="dark">
    <x-keys::button>Dark Theme</x-keys::button>
</x-keys::tooltip>
```

### Light
```blade
<x-keys::tooltip content="Light tooltip" color="light">
    <x-keys::button>Light Theme</x-keys::button>
</x-keys::tooltip>
```

## Size Variants

### Small
```blade
<x-keys::tooltip content="Small tooltip" size="sm">
    <x-keys::button size="sm">Small</x-keys::button>
</x-keys::tooltip>
```

### Medium (Default)
```blade
<x-keys::tooltip content="Medium tooltip" size="md">
    <x-keys::button>Medium</x-keys::button>
</x-keys::tooltip>
```

### Large
```blade
<x-keys::tooltip content="Large tooltip" size="lg">
    <x-keys::button size="lg">Large</x-keys::button>
</x-keys::tooltip>
```

## Rich Content

Use the `template` slot for complex tooltip content:

```blade
<x-keys::tooltip placement="right">
    <x-keys::button icon-left="heroicon-o-information-circle" variant="ghost" size="sm" />

    <x-slot:template>
        <div class="space-y-2">
            <x-keys::heading level="h4" size="sm" color="white">
                Help Information
            </x-keys::heading>
            <x-keys::text size="xs" color="white">
                Click this button to access detailed help documentation.
            </x-keys::text>
        </div>
    </x-slot:template>
</x-keys::tooltip>
```

## Real-World Examples

### Icon with Tooltip
```blade
<x-keys::tooltip content="Delete item">
    <x-keys::button
        variant="ghost"
        color="danger"
        icon-left="heroicon-o-trash"
        size="sm"
    />
</x-keys::tooltip>
```

### Button Group with Tooltips
```blade
<div class="flex gap-1">
    <x-keys::tooltip content="Bold">
        <x-keys::button variant="ghost" size="sm" icon-left="heroicon-o-bold" />
    </x-keys::tooltip>

    <x-keys::tooltip content="Italic">
        <x-keys::button variant="ghost" size="sm" icon-left="heroicon-o-italic" />
    </x-keys::tooltip>

    <x-keys::tooltip content="Underline">
        <x-keys::button variant="ghost" size="sm" icon-left="heroicon-o-underline" />
    </x-keys::tooltip>
</div>
```

### Form Field Help
```blade
<div>
    <div class="flex items-center gap-2">
        <x-keys::label for="username">Username</x-keys::label>

        <x-keys::tooltip
            content="Your username must be unique and between 3-20 characters"
            placement="right"
        >
            <x-keys::icon
                name="heroicon-o-information-circle"
                size="xs"
                class="text-text-muted"
            />
        </x-keys::tooltip>
    </div>

    <x-keys::input id="username" />
</div>
```

### Status Indicator
```blade
<div class="flex items-center gap-2">
    <x-keys::text>Server Status:</x-keys::text>

    <x-keys::tooltip content="All systems operational" placement="top">
        <x-keys::badge color="success">
            <x-keys::icon name="heroicon-o-check-circle" size="xs" class="mr-1" />
            Online
        </x-keys::badge>
    </x-keys::tooltip>
</div>
```

### Truncated Text
```blade
<x-keys::tooltip content="{{ $fullText }}">
    <x-keys::text lineClamp="1" class="max-w-xs">
        {{ $fullText }}
    </x-keys::text>
</x-keys::tooltip>
```

### Action Menu Items
```blade
<div class="flex gap-2">
    <x-keys::tooltip content="Edit">
        <x-keys::button
            wire:click="edit({{ $item->id }})"
            variant="ghost"
            size="sm"
            icon-left="heroicon-o-pencil"
        />
    </x-keys::tooltip>

    <x-keys::tooltip content="Duplicate">
        <x-keys::button
            wire:click="duplicate({{ $item->id }})"
            variant="ghost"
            size="sm"
            icon-left="heroicon-o-document-duplicate"
        />
    </x-keys::tooltip>

    <x-keys::tooltip content="Delete">
        <x-keys::button
            wire:click="delete({{ $item->id }})"
            variant="ghost"
            color="danger"
            size="sm"
            icon-left="heroicon-o-trash"
        />
    </x-keys::tooltip>
</div>
```

### Table Column Headers
```blade
<x-keys::table>
    <thead>
        <tr>
            <th>Name</th>
            <th>
                <div class="flex items-center gap-1">
                    <span>Status</span>
                    <x-keys::tooltip
                        content="Current status of the item"
                        size="sm"
                    >
                        <x-keys::icon
                            name="heroicon-o-question-mark-circle"
                            size="xs"
                        />
                    </x-keys::tooltip>
                </div>
            </th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {{-- Table rows --}}
    </tbody>
</x-keys::table>
```

### Navigation Icons
```blade
<nav class="flex gap-4">
    <x-keys::tooltip content="Dashboard" placement="bottom">
        <a href="/dashboard">
            <x-keys::icon name="heroicon-o-home" />
        </a>
    </x-keys::tooltip>

    <x-keys::tooltip content="Messages" placement="bottom">
        <a href="/messages">
            <x-keys::icon name="heroicon-o-envelope" />
        </a>
    </x-keys::tooltip>

    <x-keys::tooltip content="Notifications" placement="bottom">
        <a href="/notifications">
            <x-keys::icon name="heroicon-o-bell" />
        </a>
    </x-keys::tooltip>
</nav>
```

### Card Actions
```blade
<x-keys::card>
    <div class="flex items-start justify-between">
        <div class="flex-1">
            <x-keys::heading level="h3" size="lg">{{ $title }}</x-keys::heading>
            <x-keys::text color="muted">{{ $description }}</x-keys::text>
        </div>

        <div class="flex gap-1">
            <x-keys::tooltip content="Share">
                <x-keys::button variant="ghost" size="sm" icon-left="heroicon-o-share" />
            </x-keys::tooltip>

            <x-keys::tooltip content="Settings">
                <x-keys::button variant="ghost" size="sm" icon-left="heroicon-o-cog" />
            </x-keys::tooltip>
        </div>
    </div>
</x-keys::card>
```

### Avatar with Info
```blade
<x-keys::tooltip placement="right" size="lg">
    <x-keys::avatar
        :src="$user->avatar"
        :name="$user->name"
        size="md"
    />

    <x-slot:template>
        <div class="space-y-1">
            <x-keys::text weight="medium" color="white">
                {{ $user->name }}
            </x-keys::text>
            <x-keys::text size="xs" color="white">
                {{ $user->email }}
            </x-keys::text>
            <x-keys::text size="xs" color="white">
                Member since {{ $user->created_at->format('M Y') }}
            </x-keys::text>
        </div>
    </x-slot:template>
</x-keys::tooltip>
```

### Keyboard Shortcuts
```blade
<x-keys::tooltip placement="bottom">
    <x-keys::button>Save</x-keys::button>

    <x-slot:template>
        <div class="flex items-center gap-2">
            <x-keys::text size="xs" color="white">Save changes</x-keys::text>
            <x-keys::kbd>⌘S</x-keys::kbd>
        </div>
    </x-slot:template>
</x-keys::tooltip>
```

### Progress Indicator
```blade
<x-keys::tooltip content="75% complete" placement="top">
    <x-keys::progress :value="75" />
</x-keys::tooltip>
```

### Disabled Element
```blade
<x-keys::tooltip content="This feature is coming soon">
    <span>
        <x-keys::button :disabled="true">
            Premium Feature
        </x-keys::button>
    </span>
</x-keys::tooltip>
```

### Image Preview
```blade
<x-keys::tooltip placement="right" size="lg">
    <x-keys::image
        :src="$thumbnail"
        alt="Product"
        size="sm"
        radius="md"
    />

    <x-slot:template>
        <x-keys::image
            :src="$fullImage"
            alt="Product preview"
            size="full"
            aspectRatio="square"
            class="w-64"
        />
    </x-slot:template>
</x-keys::tooltip>
```

## With Livewire

### Dynamic Content
```blade
<x-keys::tooltip content="{{ $tooltipMessage }}">
    <x-keys::button wire:click="performAction">
        {{ $buttonLabel }}
    </x-keys::button>
</x-keys::tooltip>
```

### Conditional Tooltips
```blade
@if($hasTooltip)
    <x-keys::tooltip content="{{ $helpText }}">
        <x-keys::icon name="heroicon-o-information-circle" />
    </x-keys::tooltip>
@else
    <x-keys::icon name="heroicon-o-information-circle" />
@endif
```

## Accessibility

The Tooltip component includes comprehensive accessibility features:

- `role="tooltip"` for proper semantic meaning
- `aria-hidden="true"` to hide from screen readers by default
- Native Popover API for browser accessibility support
- Keyboard dismissible (Escape key)
- Focus management via browser
- Hover and focus triggers

```blade
<x-keys::tooltip content="Accessible tooltip example">
    <x-keys::button aria-label="Help information">
        <x-keys::icon name="heroicon-o-question-mark-circle" />
    </x-keys::button>
</x-keys::tooltip>
```

## Best Practices

1. **Keep content concise**: Tooltips should be brief and informative

2. **Use appropriate placement**: Consider viewport edges and content flow

3. **Match size to context**: Use small tooltips for compact UIs

4. **Provide alternative access**: Don't rely solely on tooltips for critical information

5. **Use consistent themes**: Stick to dark or light theme throughout your app

6. **Avoid interactive content**: Tooltips should be informational, not actionable

7. **Consider mobile**: Tooltips don't work well on touch devices

8. **Test visibility**: Ensure tooltips don't overflow the viewport

9. **Use for supplementary info**: Primary content should be visible without tooltips

10. **Timing**: Keep default show/hide timing, it's optimized for usability

## Technical Details

### Native Popover API

The Tooltip component uses the modern Popover API with CSS anchor positioning, providing:

- Zero JavaScript overhead for positioning
- Native browser optimizations
- Automatic viewport collision detection
- Hardware-accelerated animations
- Better performance than JavaScript-based solutions

### CSS Anchor Positioning

Each tooltip is anchored to its trigger using CSS:

```html
<span style="anchor-name: --tooltip-xyz;">
    <!-- Trigger element -->
</span>

<div style="--popover-anchor: --tooltip-xyz;">
    <!-- Tooltip content -->
</div>
```

## Browser Support

The Tooltip component requires browsers with Popover API support:

- Chrome/Edge 114+
- Safari 17+
- Firefox 125+

For older browsers, consider providing fallback behavior or using a polyfill.

## Component Structure

The Tooltip component consists of:

1. **PHP Class** (`Tooltip.php`)
   - Props validation and defaults
   - Placement validation
   - Auto-generated unique IDs
   - Content detection

2. **Blade Template** (`tooltip.blade.php`)
   - CSS anchor setup
   - Popover element with native API
   - Show/hide JavaScript handlers
   - ARIA attributes

## Data Attributes

The component generates helpful data attributes:

- `data-keys-popover="true"` - Popover identifier
- `data-keys-tooltip="true"` - Tooltip identifier
- `data-placement="top"` - Placement position
- `data-color="dark"` - Color theme
- `data-tooltip-trigger="id"` - Trigger identifier
- `role="tooltip"` - ARIA role
- `aria-hidden="true"` - Visibility state
