# Loading Component

A versatile loading indicator component with multiple animation styles. Features spinner, dots, bars, pulse, wave, and bounce animations with comprehensive size variants and full accessibility support.

## Basic Usage

```blade
<x-keys::loading />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `string` | `'spinner'` | Animation style: `spinner`, `dots`, `bars`, `pulse`, `wave`, `bounce` |
| `size` | `string` | `'md'` | Size variant: `xs`, `sm`, `md`, `lg`, `xl` |
| `label` | `string\|null` | `'Loading...'` | Accessibility label for screen readers |
| `id` | `string\|null` | Auto-generated | Custom ID for the loading element |

## Animation Types

### Spinner (Default)
Classic circular spinner animation:

```blade
<x-keys::loading animation="spinner" />
```

### Dots
Three bouncing dots with staggered animation:

```blade
<x-keys::loading animation="dots" />
```

### Bars
Five vertical bars with pulsing heights:

```blade
<x-keys::loading animation="bars" />
```

### Pulse
Pulsing circle with expanding ring effect:

```blade
<x-keys::loading animation="pulse" />
```

### Wave
Five vertical bars creating a wave effect:

```blade
<x-keys::loading animation="wave" />
```

### Bounce
Three bouncing dots with alternating timing:

```blade
<x-keys::loading animation="bounce" />
```

## Size Variants

### Extra Small
```blade
<x-keys::loading size="xs" />
```

### Small
```blade
<x-keys::loading size="sm" />
```

### Medium (Default)
```blade
<x-keys::loading size="md" />
```

### Large
```blade
<x-keys::loading size="lg" />
```

### Extra Large
```blade
<x-keys::loading size="xl" />
```

## All Combinations

### Spinner in All Sizes
```blade
<div class="flex items-center gap-4">
    <x-keys::loading animation="spinner" size="xs" />
    <x-keys::loading animation="spinner" size="sm" />
    <x-keys::loading animation="spinner" size="md" />
    <x-keys::loading animation="spinner" size="lg" />
    <x-keys::loading animation="spinner" size="xl" />
</div>
```

### All Animations at Medium Size
```blade
<div class="flex items-center gap-6">
    <x-keys::loading animation="spinner" />
    <x-keys::loading animation="dots" />
    <x-keys::loading animation="bars" />
    <x-keys::loading animation="pulse" />
    <x-keys::loading animation="wave" />
    <x-keys::loading animation="bounce" />
</div>
```

## With Custom Labels

```blade
<x-keys::loading label="Fetching data..." />

<x-keys::loading
    animation="spinner"
    label="Processing your request..."
/>

<x-keys::loading
    animation="dots"
    label="Saving changes..."
/>
```

## Color Variations

The loading indicator uses `currentColor`, so it inherits text color:

### Brand Color
```blade
<div class="text-brand">
    <x-keys::loading />
</div>
```

### Success Color
```blade
<div class="text-success">
    <x-keys::loading animation="dots" />
</div>
```

### Warning Color
```blade
<div class="text-warning">
    <x-keys::loading animation="bars" />
</div>
```

### Danger Color
```blade
<div class="text-danger">
    <x-keys::loading animation="pulse" />
</div>
```

### Custom Color
```blade
<div class="text-purple-600">
    <x-keys::loading animation="wave" />
</div>
```

## Real-World Examples

### Button Loading State
```blade
<x-keys::button
    wire:click="save"
    :disabled="$isSaving"
>
    @if($isSaving)
        <x-keys::loading size="sm" class="mr-2" />
        Saving...
    @else
        Save Changes
    @endif
</x-keys::button>
```

### Card Loading State
```blade
<x-keys::card>
    @if($loading)
        <div class="flex flex-col items-center justify-center py-12">
            <x-keys::loading size="lg" />
            <x-keys::text size="sm" class="text-text-muted mt-4">
                Loading content...
            </x-keys::text>
        </div>
    @else
        {{-- Card content --}}
        <x-keys::heading level="h3">{{ $title }}</x-keys::heading>
        <x-keys::text>{{ $content }}</x-keys::text>
    @endif
</x-keys::card>
```

### Full Page Loading
```blade
@if($isLoading)
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 flex flex-col items-center gap-4">
            <x-keys::loading animation="spinner" size="xl" />
            <x-keys::text weight="medium">Loading application...</x-keys::text>
        </div>
    </div>
@endif
```

### Inline Text Loading
```blade
<x-keys::text>
    Processing
    <x-keys::loading size="xs" class="mx-1" />
    Please wait...
</x-keys::text>
```

### Data Table Loading
```blade
<x-keys::table>
    @if($loading)
        <tr>
            <td colspan="5" class="text-center py-12">
                <div class="flex flex-col items-center gap-3">
                    <x-keys::loading animation="dots" size="lg" />
                    <x-keys::text class="text-text-muted">
                        Loading table data...
                    </x-keys::text>
                </div>
            </td>
        </tr>
    @else
        @foreach($items as $item)
            <tr>
                {{-- Table rows --}}
            </tr>
        @endforeach
    @endif
</x-keys::table>
```

### Search Results Loading
```blade
<div>
    <x-keys::input
        wire:model.live="search"
        placeholder="Search..."
    />

    <div class="mt-4">
        @if($searching)
            <div class="flex items-center gap-3 py-8 justify-center">
                <x-keys::loading animation="wave" />
                <x-keys::text class="text-text-muted">
                    Searching...
                </x-keys::text>
            </div>
        @elseif(count($results) > 0)
            @foreach($results as $result)
                {{-- Result items --}}
            @endforeach
        @else
            <x-keys::empty-state
                title="No results found"
                description="Try adjusting your search"
            />
        @endif
    </div>
</div>
```

### Form Submission Loading
```blade
<form wire:submit="register">
    {{-- Form fields --}}

    <x-keys::button
        type="submit"
        color="primary"
        :disabled="$isSubmitting"
        class="w-full"
    >
        @if($isSubmitting)
            <x-keys::loading size="sm" class="mr-2" label="Creating account..." />
            Creating Account...
        @else
            Create Account
        @endif
    </x-keys::button>
</form>
```

### Image Upload Loading
```blade
<div class="relative">
    <input
        type="file"
        wire:model="photo"
        class="sr-only"
        id="photo-upload"
    />

    <label
        for="photo-upload"
        class="block w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:border-brand"
    >
        @if($uploading)
            <div class="flex flex-col items-center justify-center h-full">
                <x-keys::loading animation="pulse" size="lg" />
                <x-keys::text size="sm" class="text-text-muted mt-3">
                    Uploading... {{ $progress }}%
                </x-keys::text>
            </div>
        @elseif($photo)
            <img src="{{ $photo->temporaryUrl() }}" class="w-full h-full object-cover rounded-lg" />
        @else
            <div class="flex flex-col items-center justify-center h-full">
                <x-keys::icon name="heroicon-o-photo" size="xl" class="text-text-muted" />
                <x-keys::text size="sm" class="text-text-muted mt-2">
                    Click to upload photo
                </x-keys::text>
            </div>
        @endif
    </label>
</div>
```

### Infinite Scroll Loading
```blade
<div>
    @foreach($items as $item)
        <div class="border-b border-border py-4">
            {{-- Item content --}}
        </div>
    @endforeach

    @if($hasMore)
        <div
            wire:intersect="loadMore"
            class="flex justify-center py-8"
        >
            <x-keys::loading animation="dots" />
        </div>
    @endif
</div>
```

### Modal Loading Content
```blade
<x-keys::modal wire:model="showModal" title="User Details">
    @if($loadingUser)
        <div class="flex flex-col items-center justify-center py-12">
            <x-keys::loading size="lg" />
            <x-keys::text size="sm" class="text-text-muted mt-4">
                Loading user details...
            </x-keys::text>
        </div>
    @else
        {{-- User details content --}}
    @endif
</x-keys::modal>
```

### Skeleton Loading Pattern
```blade
<div class="space-y-4">
    @if($loading)
        @foreach(range(1, 3) as $i)
            <div class="flex items-center gap-4 p-4 bg-surface rounded-lg">
                <div class="w-12 h-12 bg-neutral-200 rounded-full animate-pulse"></div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 bg-neutral-200 rounded animate-pulse w-3/4"></div>
                    <div class="h-3 bg-neutral-200 rounded animate-pulse w-1/2"></div>
                </div>
            </div>
        @endforeach
    @else
        @foreach($items as $item)
            {{-- Actual content --}}
        @endforeach
    @endif
</div>
```

### Dropdown Menu Loading
```blade
<x-keys::dropdown id="notifications">
    <x-slot:trigger>
        <x-keys::button variant="ghost" icon-left="heroicon-o-bell">
            @if($unreadCount > 0)
                <x-keys::badge size="xs" class="ml-1">
                    {{ $unreadCount }}
                </x-keys::badge>
            @endif
        </x-keys::button>
    </x-slot:trigger>

    @if($loadingNotifications)
        <div class="py-6 px-4 flex justify-center">
            <x-keys::loading animation="spinner" />
        </div>
    @elseif(count($notifications) > 0)
        @foreach($notifications as $notification)
            <x-keys::dropdown.item>
                {{ $notification->message }}
            </x-keys::dropdown.item>
        @endforeach
    @else
        <div class="py-6 px-4 text-center">
            <x-keys::text size="sm" class="text-text-muted">
                No notifications
            </x-keys::text>
        </div>
    @endif
</x-keys::dropdown>
```

## With Livewire

### Loading State
```blade
<div>
    <x-keys::button wire:click="fetchData">
        Fetch Data
    </x-keys::button>

    <div wire:loading wire:target="fetchData" class="mt-4">
        <x-keys::loading />
        <x-keys::text size="sm" class="text-text-muted ml-2">
            Fetching...
        </x-keys::text>
    </div>

    <div wire:loading.remove wire:target="fetchData">
        {{-- Content --}}
    </div>
</div>
```

### Multiple Loading States
```blade
<div class="space-y-4">
    <x-keys::button wire:click="save">Save</x-keys::button>
    <x-keys::button wire:click="delete">Delete</x-keys::button>

    <div wire:loading wire:target="save" class="flex items-center gap-2">
        <x-keys::loading size="sm" />
        <x-keys::text size="sm">Saving...</x-keys::text>
    </div>

    <div wire:loading wire:target="delete" class="flex items-center gap-2">
        <x-keys::loading size="sm" class="text-danger" />
        <x-keys::text size="sm" class="text-danger">Deleting...</x-keys::text>
    </div>
</div>
```

## Accessibility

The Loading component includes comprehensive accessibility features:

- `role="status"` for screen reader announcements
- `aria-live="polite"` for non-intrusive updates
- `aria-label` for descriptive loading messages
- Semantic markup for assistive technologies
- Color-independent visual indicators
- Sufficient animation speed for visibility

```blade
<x-keys::loading
    label="Processing payment - please do not refresh the page"
/>
```

## Best Practices

1. **Provide context**: Use descriptive labels that explain what's loading

2. **Match animation to context**: Use subtle animations for inline loading, prominent ones for page loads

3. **Size appropriately**: Match loading size to the content area

4. **Use color wisely**: Match loading color to the action (danger for delete operations)

5. **Show progress when possible**: Combine with progress indicators for long operations

6. **Don't overuse**: Show loading indicators only for operations taking >300ms

7. **Consider skeleton screens**: For complex layouts, use skeleton loading patterns

8. **Handle errors**: Always provide feedback when loading fails

9. **Test accessibility**: Ensure screen readers announce loading states

10. **Optimize animations**: Respect user preferences for reduced motion

## Animation Selection Guide

- **Spinner**: General purpose, recognizable, works everywhere
- **Dots**: Compact, good for inline text and small spaces
- **Bars**: Audio/media related contexts, dynamic feel
- **Pulse**: Emphasis, important operations, attention-grabbing
- **Wave**: Continuous processes, data streaming
- **Bounce**: Playful, casual contexts, less formal applications

## Component Structure

The Loading component consists of:

1. **PHP Class** (`Loading.php`)
   - Props validation and defaults
   - Animation type validation
   - Size validation
   - Accessibility label generation
   - Data attributes generation

2. **Blade Template** (`loading.blade.php`)
   - Animation-specific markup
   - SVG for spinner animation
   - Multiple elements for dots, bars, wave, bounce
   - CSS animations (spin, bounce, pulse, ping)
   - Responsive sizing

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-loading="true"` - Component identifier
- `data-animation="spinner"` - Animation type
- `data-size="md"` - Size variant
- `role="status"` - ARIA role for screen readers
- `aria-live="polite"` - Live region for announcements
- `aria-label="Loading..."` - Accessibility label

## CSS Animations Used

- `animate-spin` - Continuous 360° rotation (spinner)
- `animate-bounce` - Up and down bouncing (dots, bounce)
- `animate-pulse` - Opacity pulsing (bars, wave)
- `animate-ping` - Expanding ring effect (pulse)
