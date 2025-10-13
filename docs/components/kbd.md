# Kbd Component

A keyboard key display component that renders keyboard shortcuts and key combinations in a visually consistent way. Perfect for documentation, help text, and keyboard shortcut hints.

## Basic Usage

```blade
<x-keys::kbd keys="Ctrl+S" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keys` | `string` | required | Keyboard key(s) to display (can be single key or combination) |
| `variant` | `string` | `'default'` | Visual style: `default`, `muted` |
| `size` | `string` | `'sm'` | Size: `xs`, `sm`, `md` |

## Single Keys

### Letter Keys
```blade
<x-keys::kbd keys="A" />
<x-keys::kbd keys="Z" />
```

### Number Keys
```blade
<x-keys::kbd keys="1" />
<x-keys::kbd keys="0" />
```

### Special Keys
```blade
<x-keys::kbd keys="Enter" />
<x-keys::kbd keys="Escape" />
<x-keys::kbd keys="Tab" />
<x-keys::kbd keys="Space" />
<x-keys::kbd keys="Backspace" />
<x-keys::kbd keys="Delete" />
```

### Modifier Keys
```blade
<x-keys::kbd keys="Ctrl" />
<x-keys::kbd keys="Alt" />
<x-keys::kbd keys="Shift" />
<x-keys::kbd keys="Cmd" />
<x-keys::kbd keys="Meta" />
```

### Arrow Keys
```blade
<x-keys::kbd keys="↑" />
<x-keys::kbd keys="↓" />
<x-keys::kbd keys="←" />
<x-keys::kbd keys="→" />
```

## Key Combinations

### Common Shortcuts
```blade
<x-keys::kbd keys="Ctrl+C" />
<x-keys::kbd keys="Ctrl+V" />
<x-keys::kbd keys="Ctrl+X" />
<x-keys::kbd keys="Ctrl+Z" />
<x-keys::kbd keys="Ctrl+S" />
```

### Multiple Modifiers
```blade
<x-keys::kbd keys="Ctrl+Shift+P" />
<x-keys::kbd keys="Cmd+Shift+K" />
<x-keys::kbd keys="Alt+Shift+F" />
```

### Mac vs Windows
```blade
<!-- Windows/Linux -->
<x-keys::kbd keys="Ctrl+S" />

<!-- macOS -->
<x-keys::kbd keys="Cmd+S" />
```

## Variants

### Default
```blade
<x-keys::kbd keys="Ctrl+S" variant="default" />
```

### Muted
```blade
<x-keys::kbd keys="Ctrl+S" variant="muted" />
```

## Sizes

### Extra Small
```blade
<x-keys::kbd keys="Ctrl+S" size="xs" />
```

### Small (Default)
```blade
<x-keys::kbd keys="Ctrl+S" size="sm" />
```

### Medium
```blade
<x-keys::kbd keys="Ctrl+S" size="md" />
```

## In Context

### With Text
```blade
<p>
    Press <x-keys::kbd keys="Ctrl+S" /> to save your changes.
</p>
```

### In Lists
```blade
<ul class="space-y-2">
    <li>
        <x-keys::kbd keys="Ctrl+C" /> - Copy
    </li>
    <li>
        <x-keys::kbd keys="Ctrl+V" /> - Paste
    </li>
    <li>
        <x-keys::kbd keys="Ctrl+X" /> - Cut
    </li>
    <li>
        <x-keys::kbd keys="Ctrl+Z" /> - Undo
    </li>
</ul>
```

### In Tables
```blade
<table>
    <thead>
        <tr>
            <th>Shortcut</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><x-keys::kbd keys="Ctrl+S" /></td>
            <td>Save document</td>
        </tr>
        <tr>
            <td><x-keys::kbd keys="Ctrl+P" /></td>
            <td>Print document</td>
        </tr>
        <tr>
            <td><x-keys::kbd keys="Ctrl+F" /></td>
            <td>Find in document</td>
        </tr>
    </tbody>
</table>
```

### In Tooltips
```blade
<x-keys::tooltip content="Save changes (Ctrl+S)">
    <x-keys::button icon-left="heroicon-o-document-check">
        Save
    </x-keys::button>
</x-keys::tooltip>
```

### In Help Text
```blade
<x-keys::field>
    <x-keys::label for="search">Search</x-keys::label>
    <x-keys::input
        id="search"
        type="search"
        placeholder="Search..."
    />
    <x-keys::text size="sm" variant="muted">
        Press <x-keys::kbd keys="Ctrl+K" size="xs" /> to focus search
    </x-keys::text>
</x-keys::field>
```

## Keyboard Shortcut Documentation

### Application Shortcuts
```blade
<x-keys::card>
    <x-keys::heading size="h3">Keyboard Shortcuts</x-keys::heading>

    <div class="space-y-4 mt-4">
        <div>
            <x-keys::heading size="h4">General</x-keys::heading>
            <dl class="mt-2 space-y-2">
                <div class="flex justify-between">
                    <dt>New</dt>
                    <dd><x-keys::kbd keys="Ctrl+N" /></dd>
                </div>
                <div class="flex justify-between">
                    <dt>Open</dt>
                    <dd><x-keys::kbd keys="Ctrl+O" /></dd>
                </div>
                <div class="flex justify-between">
                    <dt>Save</dt>
                    <dd><x-keys::kbd keys="Ctrl+S" /></dd>
                </div>
            </dl>
        </div>

        <div>
            <x-keys::heading size="h4">Editing</x-keys::heading>
            <dl class="mt-2 space-y-2">
                <div class="flex justify-between">
                    <dt>Undo</dt>
                    <dd><x-keys::kbd keys="Ctrl+Z" /></dd>
                </div>
                <div class="flex justify-between">
                    <dt>Redo</dt>
                    <dd><x-keys::kbd keys="Ctrl+Y" /></dd>
                </div>
                <div class="flex justify-between">
                    <dt>Find</dt>
                    <dd><x-keys::kbd keys="Ctrl+F" /></dd>
                </div>
            </dl>
        </div>
    </div>
</x-keys::card>
```

### Modal Shortcuts
```blade
<x-keys::modal wire:model="showHelp">
    <x-keys::heading size="h2">Keyboard Shortcuts</x-keys::heading>

    <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
            <x-keys::badge>Navigation</x-keys::badge>
            <ul class="mt-2 space-y-2">
                <li class="flex items-center justify-between">
                    <span>Next</span>
                    <x-keys::kbd keys="Tab" size="xs" />
                </li>
                <li class="flex items-center justify-between">
                    <span>Previous</span>
                    <x-keys::kbd keys="Shift+Tab" size="xs" />
                </li>
            </ul>
        </div>

        <div>
            <x-keys::badge>Actions</x-keys::badge>
            <ul class="mt-2 space-y-2">
                <li class="flex items-center justify-between">
                    <span>Submit</span>
                    <x-keys::kbd keys="Ctrl+Enter" size="xs" />
                </li>
                <li class="flex items-center justify-between">
                    <span>Cancel</span>
                    <x-keys::kbd keys="Escape" size="xs" />
                </li>
            </ul>
        </div>
    </div>
</x-keys::modal>
```

## Platform-Specific Keys

### Conditional Rendering
```blade
@php
    $isMac = stripos(request()->userAgent(), 'Mac') !== false;
    $modifierKey = $isMac ? 'Cmd' : 'Ctrl';
@endphp

<p>
    Press <x-keys::kbd :keys="$modifierKey . '+S'" /> to save.
</p>
```

### Common Platform Keys
```blade
<!-- Save -->
<x-keys::kbd keys="Ctrl+S" />  {{-- Windows/Linux --}}
<x-keys::kbd keys="Cmd+S" />   {{-- macOS --}}

<!-- Copy -->
<x-keys::kbd keys="Ctrl+C" />  {{-- Windows/Linux --}}
<x-keys::kbd keys="Cmd+C" />   {{-- macOS --}}

<!-- Find -->
<x-keys::kbd keys="Ctrl+F" />  {{-- Windows/Linux --}}
<x-keys::kbd keys="Cmd+F" />   {{-- macOS --}}
```

## Function Keys
```blade
<x-keys::kbd keys="F1" />   {{-- Help --}}
<x-keys::kbd keys="F2" />   {{-- Rename --}}
<x-keys::kbd keys="F5" />   {{-- Refresh --}}
<x-keys::kbd keys="F11" />  {{-- Fullscreen --}}
<x-keys::kbd keys="F12" />  {{-- Dev Tools --}}
```

## Data Attributes

The component generates data attributes for CSS targeting:

- `data-keys-kbd="true"` - Component identifier
- `data-variant="default"` - Visual variant
- `data-size="sm"` - Size variant

## Use Cases

### Help Documentation
```blade
<x-keys::card>
    <x-keys::heading>Quick Reference</x-keys::heading>

    <div class="mt-4 space-y-3">
        <p>
            <x-keys::kbd keys="?" /> - Show keyboard shortcuts
        </p>
        <p>
            <x-keys::kbd keys="/" /> - Focus search
        </p>
        <p>
            <x-keys::kbd keys="Escape" /> - Close dialog
        </p>
    </div>
</x-keys::card>
```

### Command Palette
```blade
<div class="space-y-2">
    <div class="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
        <span>Create new file</span>
        <x-keys::kbd keys="Ctrl+N" size="xs" variant="muted" />
    </div>
    <div class="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
        <span>Open file</span>
        <x-keys::kbd keys="Ctrl+O" size="xs" variant="muted" />
    </div>
    <div class="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
        <span>Save file</span>
        <x-keys::kbd keys="Ctrl+S" size="xs" variant="muted" />
    </div>
</div>
```

### Button Labels
```blade
<x-keys::button color="primary">
    Save
    <span class="ml-2 opacity-70">
        <x-keys::kbd keys="Ctrl+S" size="xs" />
    </span>
</x-keys::button>
```

### Onboarding
```blade
<x-keys::card>
    <x-keys::heading>Pro Tip</x-keys::heading>
    <x-keys::text>
        Speed up your workflow! Press <x-keys::kbd keys="Ctrl+K" /> to open
        the command palette from anywhere.
    </x-keys::text>
</x-keys::card>
```

## Styling

The kbd component uses Tailwind CSS v4 and includes:

- Keyboard-style button appearance
- Proper spacing and padding
- Border and shadow effects
- Size variants for different contexts
- Variant styles for visual hierarchy

## Best Practices

1. **Use semantic key names**: Use descriptive names like "Enter", "Escape", "Space" rather than symbols

2. **Show platform-specific shortcuts**: Detect the platform and show appropriate modifiers (Cmd vs Ctrl)

3. **Combine with tooltips**: Show shortcuts in tooltips for button hover states

4. **Document comprehensively**: Create a shortcuts help page or modal

5. **Choose appropriate sizes**: Use smaller sizes in tooltips and help text, larger in documentation

6. **Be consistent**: Use the same format throughout your application

7. **Use with text**: Always provide context around the keyboard shortcut

## Component Structure

The Kbd component consists of:

1. **PHP Class** (`Kbd.php`)
   - Props validation
   - Size and variant validation
   - Data attributes generation

2. **Blade Template** (`kbd.blade.php`)
   - Keyboard key styling
   - Size-based classes
   - Variant styles
