# Slideout Component

A slide-in panel component using the native `<dialog>` element with smooth CSS animations. Supports left/right positions, multiple sizes, backdrop variants, and full Livewire integration for reactive applications.

## Basic Usage

```blade
<x-keys::slideout id="my-slideout">
    <h2>Slideout Content</h2>
    <p>This is a slideout panel.</p>
</x-keys::slideout>

<x-keys::button popovertarget="my-slideout">
    Open Slideout
</x-keys::button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | required | Unique identifier for the slideout |
| `position` | `string` | `'right'` | Position: `left`, `right` |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `width` | `string\|null` | `null` | Custom width (overrides size) |
| `closedby` | `string` | `'any'` | How to close: `any`, `closerequest`, `none` |
| `backdrop` | `string` | `'blur'` | Backdrop style: `blur`, `dark`, `none` |
| `scrollable` | `bool` | `false` | Whether body is scrollable |
| `animate` | `bool` | `true` | Enable CSS animations |
| `dismissible` | `bool` | `true` | Show close button |
| `lazy` | `bool` | `false` | Lazy load content |
| `persistent` | `bool` | `false` | Persist across navigation |
| `trap-focus` | `bool` | `true` | Trap focus within slideout |
| `wire-model` | `string\|null` | `null` | Livewire model binding |

## Positions

### Right (Default)
```blade
<x-keys::slideout id="right-slideout" position="right">
    <p>Slides in from the right</p>
</x-keys::slideout>
```

### Left
```blade
<x-keys::slideout id="left-slideout" position="left">
    <p>Slides in from the left</p>
</x-keys::slideout>
```

## Sizes

```blade
<!-- Extra Small -->
<x-keys::slideout id="xs-slideout" size="xs">
    <p>Extra small slideout</p>
</x-keys::slideout>

<!-- Small -->
<x-keys::slideout id="sm-slideout" size="sm">
    <p>Small slideout</p>
</x-keys::slideout>

<!-- Medium (Default) -->
<x-keys::slideout id="md-slideout" size="md">
    <p>Medium slideout</p>
</x-keys::slideout>

<!-- Large -->
<x-keys::slideout id="lg-slideout" size="lg">
    <p>Large slideout</p>
</x-keys::slideout>

<!-- Extra Large -->
<x-keys::slideout id="xl-slideout" size="xl">
    <p>Extra large slideout</p>
</x-keys::slideout>

<!-- Full Width -->
<x-keys::slideout id="full-slideout" size="full">
    <p>Full width slideout</p>
</x-keys::slideout>
```

## Custom Width

Override size with custom width:

```blade
<x-keys::slideout id="custom-slideout" width="500px">
    <p>Custom width slideout</p>
</x-keys::slideout>

<x-keys::slideout id="responsive-slideout" width="40rem">
    <p>Rem-based width slideout</p>
</x-keys::slideout>
```

## Backdrop Variants

### Blur (Default)
Blurred backdrop for modern look:

```blade
<x-keys::slideout id="blur-slideout" backdrop="blur">
    <p>Slideout with blurred backdrop</p>
</x-keys::slideout>
```

### Dark
Solid dark backdrop:

```blade
<x-keys::slideout id="dark-slideout" backdrop="dark">
    <p>Slideout with dark backdrop</p>
</x-keys::slideout>
```

### None
No backdrop (slideout only):

```blade
<x-keys::slideout id="no-backdrop-slideout" backdrop="none">
    <p>Slideout without backdrop</p>
</x-keys::slideout>
```

## With Header and Footer

```blade
<x-keys::slideout id="structured-slideout">
    <x-slot:header>
        <h2 class="text-xl font-semibold">Slideout Title</h2>
        <p class="text-sm text-gray-500">Subtitle or description</p>
    </x-slot:header>

    <div class="space-y-4">
        <p>Main content goes here</p>
        <!-- more content -->
    </div>

    <x-slot:footer>
        <div class="flex gap-3 justify-end">
            <x-keys::button variant="ghost" onclick="document.getElementById('structured-slideout').close()">
                Cancel
            </x-keys::button>
            <x-keys::button color="primary">
                Save
            </x-keys::button>
        </div>
    </x-slot:footer>
</x-keys::slideout>
```

## Scrollable Content

For long content, enable scrolling:

```blade
<x-keys::slideout id="scrollable-slideout" :scrollable="true">
    <div class="space-y-4">
        <p>Long content that scrolls...</p>
        <p>More content...</p>
        <!-- lots of content -->
    </div>
</x-keys::slideout>
```

## Close Behavior

### Any (Default)
Close on backdrop click or Escape key:

```blade
<x-keys::slideout id="any-close" closedby="any">
    <p>Click backdrop or press Escape to close</p>
</x-keys::slideout>
```

### Close Request
Only close on explicit close button:

```blade
<x-keys::slideout id="request-close" closedby="closerequest">
    <p>Only closes via close button</p>
</x-keys::slideout>
```

### None
Prevent closing (use custom close logic):

```blade
<x-keys::slideout id="no-close" closedby="none" :dismissible="false">
    <p>Must use custom close logic</p>
    <x-keys::button onclick="document.getElementById('no-close').close()">
        Custom Close
    </x-keys::button>
</x-keys::slideout>
```

## Livewire Integration

### Basic Wire Model

```blade
<x-keys::slideout id="livewire-slideout" wire-model="showSlideout">
    <h2>Livewire Slideout</h2>
    <p>Synced with component state</p>
</x-keys::slideout>

<x-keys::button wire:click="$toggle('showSlideout')">
    Toggle Slideout
</x-keys::button>
```

### With Events

```blade
<x-keys::slideout
    id="event-slideout"
    wire-model="showProfile"
    wire:open="handleOpen"
    wire:close="handleClose"
>
    <h2>User Profile</h2>
    <p>Profile content</p>
</x-keys::slideout>
```

```php
class ProfileComponent extends Component
{
    public bool $showProfile = false;

    public function handleOpen(): void
    {
        // Logic when slideout opens
    }

    public function handleClose(): void
    {
        // Logic when slideout closes
        $this->showProfile = false;
    }
}
```

### Lazy Loading

Load content only when opened:

```blade
<x-keys::slideout id="lazy-slideout" wire-model="showSettings" :lazy="true">
    @if ($showSettings)
        <h2>Settings</h2>
        <!-- expensive content loaded only when opened -->
    @endif
</x-keys::slideout>
```

## Use Cases

### Navigation Menu

```blade
<x-keys::slideout id="mobile-menu" position="left" size="sm">
    <x-slot:header>
        <h2 class="text-lg font-semibold">Menu</h2>
    </x-slot:header>

    <nav class="space-y-2">
        <a href="/" class="block px-4 py-2 hover:bg-gray-100 rounded">Home</a>
        <a href="/about" class="block px-4 py-2 hover:bg-gray-100 rounded">About</a>
        <a href="/services" class="block px-4 py-2 hover:bg-gray-100 rounded">Services</a>
        <a href="/contact" class="block px-4 py-2 hover:bg-gray-100 rounded">Contact</a>
    </nav>
</x-keys::slideout>

<x-keys::button popovertarget="mobile-menu" class="md:hidden">
    <x-icon name="heroicon-o-bars-3" />
</x-keys::button>
```

### Shopping Cart

```blade
<x-keys::slideout id="cart" position="right" size="md" :scrollable="true">
    <x-slot:header>
        <h2 class="text-xl font-semibold">Shopping Cart</h2>
        <p class="text-sm text-gray-500">{{ count($cartItems) }} items</p>
    </x-slot:header>

    <div class="space-y-4">
        @foreach($cartItems as $item)
            <div class="flex gap-4 p-4 border rounded">
                <img src="{{ $item->image }}" class="w-20 h-20 object-cover rounded">
                <div class="flex-1">
                    <h3 class="font-medium">{{ $item->name }}</h3>
                    <p class="text-gray-500">${{ $item->price }}</p>
                </div>
            </div>
        @endforeach
    </div>

    <x-slot:footer>
        <div class="space-y-4">
            <div class="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${{ $total }}</span>
            </div>
            <x-keys::button color="primary" class="w-full">
                Checkout
            </x-keys::button>
        </div>
    </x-slot:footer>
</x-keys::slideout>
```

### Filters Panel

```blade
<x-keys::slideout id="filters" position="left" size="sm">
    <x-slot:header>
        <h2 class="text-lg font-semibold">Filters</h2>
    </x-slot:header>

    <form wire:submit="applyFilters" class="space-y-6">
        <x-keys::field>
            <x-keys::label for="category">Category</x-keys::label>
            <x-keys::select id="category" wire:model="filters.category">
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
            </x-keys::select>
        </x-keys::field>

        <x-keys::field>
            <x-keys::label for="price-range">Price Range</x-keys::label>
            <x-keys::range
                id="price-range"
                wire:model="filters.price"
                :min="0"
                :max="1000"
                :dual="true"
            />
        </x-keys::field>
    </form>

    <x-slot:footer>
        <div class="flex gap-3">
            <x-keys::button variant="ghost" wire:click="resetFilters" class="flex-1">
                Reset
            </x-keys::button>
            <x-keys::button color="primary" wire:click="applyFilters" class="flex-1">
                Apply
            </x-keys::button>
        </div>
    </x-slot:footer>
</x-keys::slideout>
```

## Accessibility

The Slideout component includes comprehensive accessibility features:

- Uses native `<dialog>` element
- Proper focus management
- Keyboard navigation (Escape to close)
- Focus trap within slideout
- ARIA attributes for screen readers
- Respects reduced motion preferences

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-slideout="true"` - Component identifier
- `data-position="right"` - Position setting
- `data-size="md"` - Size variant
- `data-backdrop="blur"` - Backdrop style
- `data-closedby="any"` - Close behavior
- `data-animate="true"` - Animation state
- `data-scrollable="true"` - Scrollable state (if enabled)
- `data-has-header="true"` - Has header slot (if present)
- `data-has-footer="true"` - Has footer slot (if present)
- `data-lazy="true"` - Lazy loading (if enabled)
- `data-persistent="true"` - Persistent state (if enabled)
- `data-livewire-enabled="true"` - Livewire integration (if enabled)
- `data-trap-focus="false"` - Focus trap state (if disabled)

## Best Practices

1. **Use appropriate sizes**: Small for menus, medium for forms, large for detailed content

2. **Choose correct position**: Right for actions/details, left for navigation

3. **Enable scrolling for long content**: Prevents content overflow

4. **Provide clear headers**: Always include a descriptive title

5. **Use footer for actions**: Place primary and secondary actions in footer

6. **Handle close events**: Clean up state when slideout closes

7. **Consider mobile**: Test slideout behavior on small screens

8. **Lazy load heavy content**: Improve performance with lazy loading

## Component Structure

The Slideout component consists of:

1. **PHP Class** (`Slideout.php`)
   - Props validation
   - Position and size handling
   - Livewire integration
   - Event attributes generation
   - Data attributes generation

2. **Blade Template** (`slideout.blade.php`)
   - Dialog element structure
   - Position-based animations
   - Backdrop rendering
   - Header/footer slots
   - Close button

3. **TypeScript Actions** (`SlideoutActions.ts`)
   - Open/close handling
   - Livewire integration
   - Animation management
   - Focus trap logic
