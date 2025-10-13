# Button Component

A versatile button component supporting multiple variants, sizes, icons, loading states, and multi-state functionality. Buttons can render as both `<button>` and `<a>` elements with comprehensive accessibility support.

## Basic Usage

```blade
<x-keys::button>
    Click Me
</x-keys::button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `'secondary'` | Button color: `primary`, `secondary`, `danger`, `warning`, `success`, `info` |
| `variant` | `string` | `'solid'` | Visual style: `solid`, `outlined`, `ghost`, `subtle` |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg`, `xl` |
| `type` | `string` | `'button'` | HTML type: `button`, `submit`, `reset` |
| `href` | `string\|null` | `null` | URL for link buttons (renders as `<a>`) |
| `disabled` | `bool` | `false` | Disables the button |
| `loading` | `bool` | `false` | Shows loading state |
| `icon` | `string\|null` | `null` | Alias for `icon-left` |
| `icon-left` | `string\|null` | `null` | Left icon name (Heroicon) |
| `icon-right` | `string\|null` | `null` | Right icon name (Heroicon) |
| `loading-animation` | `string` | `'spinner'` | Loading animation: `spinner`, `dots`, `bars`, `pulse`, `wave`, `bounce` |
| `icon-toggle` | `string\|null` | `null` | Icon for toggle state (multi-state) |
| `icon-success` | `string\|null` | `null` | Icon for success state (multi-state) |
| `label-toggle` | `string\|null` | `null` | Label for toggle state (multi-state) |
| `label-success` | `string\|null` | `null` | Label for success state (multi-state) |
| `popovertarget` | `string\|null` | `null` | ID of popover element to control |

## Colors

### Primary
```blade
<x-keys::button color="primary">Primary</x-keys::button>
```

### Secondary (Default)
```blade
<x-keys::button color="secondary">Secondary</x-keys::button>
```

### Danger
```blade
<x-keys::button color="danger">Delete</x-keys::button>
```

### Warning
```blade
<x-keys::button color="warning">Warning</x-keys::button>
```

### Success
```blade
<x-keys::button color="success">Confirm</x-keys::button>
```

### Info
```blade
<x-keys::button color="info">Learn More</x-keys::button>
```

## Variants

### Solid (Default)
```blade
<x-keys::button variant="solid" color="primary">
    Solid Button
</x-keys::button>
```

### Outlined
```blade
<x-keys::button variant="outlined" color="primary">
    Outlined Button
</x-keys::button>
```

### Ghost
```blade
<x-keys::button variant="ghost" color="primary">
    Ghost Button
</x-keys::button>
```

### Subtle
```blade
<x-keys::button variant="subtle" color="primary">
    Subtle Button
</x-keys::button>
```

## Sizes

```blade
<x-keys::button size="xs">Extra Small</x-keys::button>
<x-keys::button size="sm">Small</x-keys::button>
<x-keys::button size="md">Medium</x-keys::button>
<x-keys::button size="lg">Large</x-keys::button>
<x-keys::button size="xl">Extra Large</x-keys::button>
```

## With Icons

### Left Icon
```blade
<x-keys::button icon-left="heroicon-o-plus" color="primary">
    Add Item
</x-keys::button>
```

### Right Icon
```blade
<x-keys::button icon-right="heroicon-o-arrow-right" color="primary">
    Continue
</x-keys::button>
```

### Both Icons
```blade
<x-keys::button
    icon-left="heroicon-o-document"
    icon-right="heroicon-o-arrow-down-tray"
    color="primary"
>
    Download PDF
</x-keys::button>
```

### Icon-Only Button
The button automatically detects when only an icon is present (with optional screen reader text):

```blade
<x-keys::button icon-left="heroicon-o-trash" color="danger">
    <span class="sr-only">Delete</span>
</x-keys::button>
```

## States

### Loading State
```blade
<x-keys::button :loading="true" color="primary">
    Processing...
</x-keys::button>
```

With custom loading animation:
```blade
<x-keys::button :loading="true" loading-animation="dots" color="primary">
    Processing...
</x-keys::button>
```

Available animations: `spinner`, `dots`, `bars`, `pulse`, `wave`, `bounce`

### Disabled State
```blade
<x-keys::button :disabled="true" color="primary">
    Disabled Button
</x-keys::button>
```

## Link Buttons

Render as `<a>` element with `href` prop:

```blade
<x-keys::button href="/dashboard" color="primary">
    Go to Dashboard
</x-keys::button>
```

External link:
```blade
<x-keys::button href="https://example.com" color="primary">
    Visit Website
</x-keys::button>
```

Disabled links render as `<span>`:
```blade
<x-keys::button href="/dashboard" :disabled="true" color="primary">
    Unavailable
</x-keys::button>
```

## Multi-State Buttons

Buttons can cycle through multiple states (default → toggle → success):

```blade
<x-keys::button
    color="primary"
    icon-left="heroicon-o-bookmark"
    icon-toggle="heroicon-s-bookmark"
    icon-success="heroicon-o-check"
    label-toggle="Bookmarked"
    label-success="Saved!"
>
    Bookmark
</x-keys::button>
```

This creates a button that:
1. Shows default state with outline bookmark icon
2. Toggles to filled bookmark icon with "Bookmarked" label
3. Shows success state with check icon and "Saved!" label

## Form Integration

### Submit Button
```blade
<form>
    <!-- form fields -->

    <x-keys::button type="submit" color="primary">
        Save Changes
    </x-keys::button>
</form>
```

### Reset Button
```blade
<x-keys::button type="reset" variant="ghost">
    Reset Form
</x-keys::button>
```

## Livewire Integration

### With Loading State
```blade
<x-keys::button
    wire:click="save"
    wire:loading.attr="disabled"
    color="primary"
>
    <span wire:loading.remove>Save</span>
    <span wire:loading>Saving...</span>
</x-keys::button>
```

### With Target
```blade
<x-keys::button
    wire:click="process"
    :loading="$isProcessing"
    color="primary"
>
    Process Data
</x-keys::button>
```

## Popover Integration

Control a popover element:

```blade
<x-keys::button
    popovertarget="settings-popover"
    color="secondary"
>
    Settings
</x-keys::button>

<x-keys::popover id="settings-popover">
    <!-- popover content -->
</x-keys::popover>
```

## Button Groups

Combine multiple buttons:

```blade
<x-keys::button-group>
    <x-keys::button color="primary">Left</x-keys::button>
    <x-keys::button color="primary">Middle</x-keys::button>
    <x-keys::button color="primary">Right</x-keys::button>
</x-keys::button-group>
```

## Accessibility

The Button component includes comprehensive accessibility features:

- Proper `type` attribute for button elements
- Support for `aria-label` via attributes
- Screen reader only text with `<span class="sr-only">`
- Focus-visible styles with ring
- Disabled state with `aria-disabled`
- Active state with scale animation

```blade
<x-keys::button
    icon-left="heroicon-o-trash"
    color="danger"
    aria-label="Delete item"
>
    <span class="sr-only">Delete</span>
</x-keys::button>
```

## Use Cases

### Primary Action
```blade
<x-keys::button color="primary" size="lg">
    Get Started
</x-keys::button>
```

### Destructive Action
```blade
<x-keys::button
    color="danger"
    icon-left="heroicon-o-trash"
    wire:click="delete"
    wire:confirm="Are you sure?"
>
    Delete Account
</x-keys::button>
```

### Loading Action
```blade
<x-keys::button
    color="primary"
    :loading="$isLoading"
    icon-left="heroicon-o-arrow-down-tray"
>
    Download Report
</x-keys::button>
```

### Navigation
```blade
<x-keys::button
    href="{{ route('dashboard') }}"
    color="primary"
    icon-right="heroicon-o-arrow-right"
>
    Continue to Dashboard
</x-keys::button>
```

### Icon Action
```blade
<x-keys::button
    icon-left="heroicon-o-ellipsis-horizontal"
    variant="ghost"
    size="sm"
>
    <span class="sr-only">More options</span>
</x-keys::button>
```

## Styling

The button component uses Tailwind CSS v4 and includes:

- Smooth transitions for all state changes
- Active state with scale animation
- Focus-visible ring for keyboard navigation
- Hover states for all variants
- Disabled state with reduced opacity
- Icon size adjustments based on button size
- Responsive padding and spacing

## Component Structure

The Button component consists of:

1. **PHP Class** (`Button.php`)
   - Props validation
   - Element type detection (button/link)
   - Icon-only detection
   - Multi-state logic
   - Data attributes generation

2. **Blade Template** (`button.blade.php`)
   - Dynamic element rendering
   - Variant-based styling
   - Icon positioning
   - Loading state rendering

3. **TypeScript Actions** (`ButtonActions.ts`)
   - Multi-state handling
   - Click interactions
   - Animation triggers

## Data Attributes

The component generates comprehensive data attributes for CSS targeting and JavaScript:

- `data-keys-button="true"` - Component identifier
- `data-color="primary"` - Color variant
- `data-variant="solid"` - Visual variant
- `data-size="md"` - Size variant
- `data-element-type="button"` - Element type
- `data-disabled="true"` - Disabled state
- `data-loading="true"` - Loading state
- `data-icon-only="true"` - Icon-only detection
- `data-multi-state="true"` - Multi-state functionality
- `data-has-icon="true"` - Has icons
- `data-href="..."` - Link URL (for links)

## Best Practices

1. **Use semantic colors**: Choose colors that match the action intent (danger for delete, success for confirm, etc.)

2. **Provide screen reader text**: Always include hidden text for icon-only buttons

3. **Use loading states**: Show feedback during async operations

4. **Choose appropriate sizes**: Use larger sizes for primary actions, smaller for secondary

5. **Combine variants wisely**: Solid for primary actions, ghost for tertiary actions

6. **Disable when appropriate**: Disable buttons during loading or when action is unavailable

## Examples

### Complete Form Submit
```blade
<form wire:submit="save">
    <!-- form fields -->

    <div class="flex gap-3 justify-end">
        <x-keys::button
            type="button"
            variant="ghost"
            wire:click="cancel"
        >
            Cancel
        </x-keys::button>

        <x-keys::button
            type="submit"
            color="primary"
            :loading="$isSaving"
        >
            <span wire:loading.remove>Save Changes</span>
            <span wire:loading>Saving...</span>
        </x-keys::button>
    </div>
</form>
```

### Action Button with Confirmation
```blade
<x-keys::button
    color="danger"
    icon-left="heroicon-o-trash"
    wire:click="deleteItem"
    wire:confirm="Are you sure you want to delete this item?"
>
    Delete Item
</x-keys::button>
```

### Toolbar Actions
```blade
<div class="flex gap-2">
    <x-keys::button icon-left="heroicon-o-pencil" variant="ghost" size="sm">
        <span class="sr-only">Edit</span>
    </x-keys::button>

    <x-keys::button icon-left="heroicon-o-trash" variant="ghost" size="sm" color="danger">
        <span class="sr-only">Delete</span>
    </x-keys::button>

    <x-keys::button icon-left="heroicon-o-share" variant="ghost" size="sm">
        <span class="sr-only">Share</span>
    </x-keys::button>
</div>
```
