# Dropdown Component

A comprehensive dropdown menu component built on top of the Popover component. Supports multiple positioning options, nested submenus, separators, checkboxes, radio buttons, and comprehensive keyboard navigation.

## Basic Usage

```blade
<x-keys::dropdown id="menu-dropdown">
    <x-slot:trigger>
        <x-keys::button>
            Open Menu
        </x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Profile</x-keys::dropdown.item>
    <x-keys::dropdown.item>Settings</x-keys::dropdown.item>
    <x-keys::dropdown.separator />
    <x-keys::dropdown.item>Logout</x-keys::dropdown.item>
</x-keys::dropdown>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string\|null` | Auto-generated | Unique dropdown identifier |
| `position` | `string` | `'bottom'` | Position: `top`, `bottom`, `left`, `right` |
| `align` | `string` | `'start'` | Alignment: `start`, `center`, `end` |
| `offset` | `int` | `8` | Distance from trigger (pixels) |
| `disabled` | `bool` | `false` | Disable dropdown |
| `modal` | `bool` | `false` | Modal behavior (backdrop) |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |

## Positioning

### Bottom (Default)
```blade
<x-keys::dropdown id="bottom-menu" position="bottom" align="start">
    <x-slot:trigger>
        <x-keys::button>Bottom Start</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Option 1</x-keys::dropdown.item>
    <x-keys::dropdown.item>Option 2</x-keys::dropdown.item>
</x-keys::dropdown>
```

### Top
```blade
<x-keys::dropdown id="top-menu" position="top">
    <x-slot:trigger>
        <x-keys::button>Top Menu</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Option 1</x-keys::dropdown.item>
    <x-keys::dropdown.item>Option 2</x-keys::dropdown.item>
</x-keys::dropdown>
```

### Left
```blade
<x-keys::dropdown id="left-menu" position="left">
    <x-slot:trigger>
        <x-keys::button>Left Menu</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Option 1</x-keys::dropdown.item>
    <x-keys::dropdown.item>Option 2</x-keys::dropdown.item>
</x-keys::dropdown>
```

### Right
```blade
<x-keys::dropdown id="right-menu" position="right">
    <x-slot:trigger>
        <x-keys::button>Right Menu</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Option 1</x-keys::dropdown.item>
    <x-keys::dropdown.item>Option 2</x-keys::dropdown.item>
</x-keys::dropdown>
```

## Alignment

### Start (Default)
```blade
<x-keys::dropdown position="bottom" align="start">
    <x-slot:trigger>
        <x-keys::button>Align Start</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Option 1</x-keys::dropdown.item>
</x-keys::dropdown>
```

### Center
```blade
<x-keys::dropdown position="bottom" align="center">
    <x-slot:trigger>
        <x-keys::button>Align Center</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Option 1</x-keys::dropdown.item>
</x-keys::dropdown>
```

### End
```blade
<x-keys::dropdown position="bottom" align="end">
    <x-slot:trigger>
        <x-keys::button>Align End</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Option 1</x-keys::dropdown.item>
</x-keys::dropdown>
```

## Dropdown Items

### Basic Items
```blade
<x-keys::dropdown id="basic-menu">
    <x-slot:trigger>
        <x-keys::button>Menu</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>View</x-keys::dropdown.item>
    <x-keys::dropdown.item>Edit</x-keys::dropdown.item>
    <x-keys::dropdown.item>Delete</x-keys::dropdown.item>
</x-keys::dropdown>
```

### With Icons
```blade
<x-keys::dropdown id="icon-menu">
    <x-slot:trigger>
        <x-keys::button icon-left="heroicon-o-ellipsis-horizontal" />
    </x-slot:trigger>

    <x-keys::dropdown.item icon="heroicon-o-pencil">
        Edit
    </x-keys::dropdown.item>
    <x-keys::dropdown.item icon="heroicon-o-document-duplicate">
        Duplicate
    </x-keys::dropdown.item>
    <x-keys::dropdown.item icon="heroicon-o-trash" color="danger">
        Delete
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

### With Links
```blade
<x-keys::dropdown id="link-menu">
    <x-slot:trigger>
        <x-keys::button>Navigate</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item href="/dashboard">
        Dashboard
    </x-keys::dropdown.item>
    <x-keys::dropdown.item href="/profile">
        Profile
    </x-keys::dropdown.item>
    <x-keys::dropdown.item href="/settings">
        Settings
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

### Disabled Items
```blade
<x-keys::dropdown id="disabled-menu">
    <x-slot:trigger>
        <x-keys::button>Menu</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Active Item</x-keys::dropdown.item>
    <x-keys::dropdown.item :disabled="true">
        Disabled Item
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

## Separators

Use separators to group related items:

```blade
<x-keys::dropdown id="separated-menu">
    <x-slot:trigger>
        <x-keys::button>Account</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item icon="heroicon-o-user">
        Profile
    </x-keys::dropdown.item>
    <x-keys::dropdown.item icon="heroicon-o-cog-6-tooth">
        Settings
    </x-keys::dropdown.item>

    <x-keys::dropdown.separator />

    <x-keys::dropdown.item icon="heroicon-o-question-mark-circle">
        Help
    </x-keys::dropdown.item>
    <x-keys::dropdown.item icon="heroicon-o-information-circle">
        About
    </x-keys::dropdown.item>

    <x-keys::dropdown.separator />

    <x-keys::dropdown.item icon="heroicon-o-arrow-right-on-rectangle" color="danger">
        Logout
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

## Submenus

Create nested dropdown menus:

```blade
<x-keys::dropdown id="submenu-dropdown">
    <x-slot:trigger>
        <x-keys::button>File</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item icon="heroicon-o-document">
        New File
    </x-keys::dropdown.item>

    <x-keys::dropdown.submenu label="Open Recent" icon="heroicon-o-clock">
        <x-keys::dropdown.item>Document 1.pdf</x-keys::dropdown.item>
        <x-keys::dropdown.item>Document 2.pdf</x-keys::dropdown.item>
        <x-keys::dropdown.item>Document 3.pdf</x-keys::dropdown.item>
    </x-keys::dropdown.submenu>

    <x-keys::dropdown.separator />

    <x-keys::dropdown.item icon="heroicon-o-arrow-up-tray">
        Save
    </x-keys::dropdown.item>
    <x-keys::dropdown.item icon="heroicon-o-printer">
        Print
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

## Checkboxes & Radio Buttons

### Checkbox Items
```blade
<x-keys::dropdown id="checkbox-menu">
    <x-slot:trigger>
        <x-keys::button>View Options</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.checkbox
        wire:model="showSidebar"
        name="sidebar"
        label="Show Sidebar"
    />
    <x-keys::dropdown.checkbox
        wire:model="showToolbar"
        name="toolbar"
        label="Show Toolbar"
    />
    <x-keys::dropdown.checkbox
        wire:model="showFooter"
        name="footer"
        label="Show Footer"
    />
</x-keys::dropdown>
```

### Radio Items
```blade
<x-keys::dropdown id="radio-menu">
    <x-slot:trigger>
        <x-keys::button>Sort By</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.radio
        wire:model="sortBy"
        value="name"
        name="sort"
        label="Name"
    />
    <x-keys::dropdown.radio
        wire:model="sortBy"
        value="date"
        name="sort"
        label="Date"
    />
    <x-keys::dropdown.radio
        wire:model="sortBy"
        value="size"
        name="sort"
        label="Size"
    />
</x-keys::dropdown>
```

## Sizes

```blade
<x-keys::dropdown size="sm">
    <x-slot:trigger>
        <x-keys::button size="sm">Small</x-keys::button>
    </x-slot:trigger>
    <!-- items -->
</x-keys::dropdown>

<x-keys::dropdown size="md">
    <x-slot:trigger>
        <x-keys::button size="md">Medium</x-keys::button>
    </x-slot:trigger>
    <!-- items -->
</x-keys::dropdown>

<x-keys::dropdown size="lg">
    <x-slot:trigger>
        <x-keys::button size="lg">Large</x-keys::button>
    </x-slot:trigger>
    <!-- items -->
</x-keys::dropdown>
```

## Modal Mode

Enable modal behavior with backdrop:

```blade
<x-keys::dropdown :modal="true">
    <x-slot:trigger>
        <x-keys::button>Modal Dropdown</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Option 1</x-keys::dropdown.item>
    <x-keys::dropdown.item>Option 2</x-keys::dropdown.item>
</x-keys::dropdown>
```

## With Custom Trigger

### Icon Button Trigger
```blade
<x-keys::dropdown id="icon-trigger">
    <x-slot:trigger>
        <x-keys::button
            variant="ghost"
            icon-left="heroicon-o-ellipsis-vertical"
            size="sm"
        >
            <span class="sr-only">More options</span>
        </x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item>Edit</x-keys::dropdown.item>
    <x-keys::dropdown.item>Share</x-keys::dropdown.item>
    <x-keys::dropdown.item color="danger">Delete</x-keys::dropdown.item>
</x-keys::dropdown>
```

### Avatar Trigger
```blade
<x-keys::dropdown id="user-menu" position="bottom" align="end">
    <x-slot:trigger>
        <button type="button">
            <x-keys::avatar
                :src="auth()->user()->avatar"
                :name="auth()->user()->name"
            />
        </button>
    </x-slot:trigger>

    <x-keys::dropdown.item icon="heroicon-o-user">
        Profile
    </x-keys::dropdown.item>
    <x-keys::dropdown.item icon="heroicon-o-cog-6-tooth">
        Settings
    </x-keys::dropdown.item>
    <x-keys::dropdown.separator />
    <x-keys::dropdown.item icon="heroicon-o-arrow-right-on-rectangle">
        Logout
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

## Livewire Integration

### With Actions
```blade
<x-keys::dropdown id="action-menu">
    <x-slot:trigger>
        <x-keys::button>Actions</x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item
        icon="heroicon-o-pencil"
        wire:click="edit({{ $item->id }})"
    >
        Edit
    </x-keys::dropdown.item>

    <x-keys::dropdown.item
        icon="heroicon-o-document-duplicate"
        wire:click="duplicate({{ $item->id }})"
    >
        Duplicate
    </x-keys::dropdown.item>

    <x-keys::dropdown.separator />

    <x-keys::dropdown.item
        icon="heroicon-o-trash"
        color="danger"
        wire:click="delete({{ $item->id }})"
        wire:confirm="Are you sure?"
    >
        Delete
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

### With State
```blade
<x-keys::dropdown id="state-menu">
    <x-slot:trigger>
        <x-keys::button>
            Status: {{ ucfirst($status) }}
        </x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.radio
        wire:model.live="status"
        value="active"
        label="Active"
    />
    <x-keys::dropdown.radio
        wire:model.live="status"
        value="pending"
        label="Pending"
    />
    <x-keys::dropdown.radio
        wire:model.live="status"
        value="inactive"
        label="Inactive"
    />
</x-keys::dropdown>
```

## Use Cases

### User Menu
```blade
<x-keys::dropdown id="user-dropdown" position="bottom" align="end">
    <x-slot:trigger>
        <button type="button" class="flex items-center gap-2">
            <x-keys::avatar
                :src="auth()->user()->avatar"
                :name="auth()->user()->name"
                size="sm"
            />
            <span>{{ auth()->user()->name }}</span>
            <x-keys::icon name="heroicon-o-chevron-down" size="xs" />
        </button>
    </x-slot:trigger>

    <div class="px-4 py-3 border-b border-border">
        <x-keys::text size="sm" weight="medium">{{ auth()->user()->name }}</x-keys::text>
        <x-keys::text size="xs" class="text-text-muted">{{ auth()->user()->email }}</x-keys::text>
    </div>

    <x-keys::dropdown.item icon="heroicon-o-user" href="/profile">
        Your Profile
    </x-keys::dropdown.item>
    <x-keys::dropdown.item icon="heroicon-o-cog-6-tooth" href="/settings">
        Settings
    </x-keys::dropdown.item>
    <x-keys::dropdown.item icon="heroicon-o-credit-card" href="/billing">
        Billing
    </x-keys::dropdown.item>

    <x-keys::dropdown.separator />

    <x-keys::dropdown.item icon="heroicon-o-question-mark-circle" href="/help">
        Help & Support
    </x-keys::dropdown.item>

    <x-keys::dropdown.separator />

    <x-keys::dropdown.item
        icon="heroicon-o-arrow-right-on-rectangle"
        wire:click="logout"
        color="danger"
    >
        Sign Out
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

### Action Menu (Table Row)
```blade
<x-keys::dropdown id="row-{{ $item->id }}">
    <x-slot:trigger>
        <x-keys::button
            variant="ghost"
            size="sm"
            icon-left="heroicon-o-ellipsis-horizontal"
        >
            <span class="sr-only">Actions</span>
        </x-keys::button>
    </x-slot:trigger>

    <x-keys::dropdown.item
        icon="heroicon-o-eye"
        href="{{ route('items.show', $item) }}"
    >
        View
    </x-keys::dropdown.item>

    <x-keys::dropdown.item
        icon="heroicon-o-pencil"
        href="{{ route('items.edit', $item) }}"
    >
        Edit
    </x-keys::dropdown.item>

    <x-keys::dropdown.item
        icon="heroicon-o-document-duplicate"
        wire:click="duplicate({{ $item->id }})"
    >
        Duplicate
    </x-keys::dropdown.item>

    <x-keys::dropdown.separator />

    <x-keys::dropdown.item
        icon="heroicon-o-archive-box"
        wire:click="archive({{ $item->id }})"
    >
        Archive
    </x-keys::dropdown.item>

    <x-keys::dropdown.item
        icon="heroicon-o-trash"
        wire:click="delete({{ $item->id }})"
        wire:confirm="Are you sure you want to delete this item?"
        color="danger"
    >
        Delete
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

### Filter Menu
```blade
<x-keys::dropdown id="filter-menu">
    <x-slot:trigger>
        <x-keys::button icon-left="heroicon-o-funnel">
            Filters
            @if($activeFilters > 0)
                <x-keys::badge size="xs" class="ml-2">
                    {{ $activeFilters }}
                </x-keys::badge>
            @endif
        </x-keys::button>
    </x-slot:trigger>

    <div class="px-4 py-2 text-xs font-semibold text-text-muted uppercase">
        Status
    </div>

    <x-keys::dropdown.checkbox
        wire:model.live="filters.active"
        label="Active"
    />
    <x-keys::dropdown.checkbox
        wire:model.live="filters.pending"
        label="Pending"
    />
    <x-keys::dropdown.checkbox
        wire:model.live="filters.archived"
        label="Archived"
    />

    <x-keys::dropdown.separator />

    <div class="px-4 py-2 text-xs font-semibold text-text-muted uppercase">
        Category
    </div>

    <x-keys::dropdown.radio
        wire:model.live="filters.category"
        value="all"
        label="All Categories"
    />
    <x-keys::dropdown.radio
        wire:model.live="filters.category"
        value="design"
        label="Design"
    />
    <x-keys::dropdown.radio
        wire:model.live="filters.category"
        value="development"
        label="Development"
    />

    <x-keys::dropdown.separator />

    <x-keys::dropdown.item
        icon="heroicon-o-x-mark"
        wire:click="clearFilters"
    >
        Clear All Filters
    </x-keys::dropdown.item>
</x-keys::dropdown>
```

### Context Menu
```blade
<div
    @contextmenu.prevent="$refs.contextMenu.show()"
    class="relative p-4 bg-card border rounded-lg"
>
    Right-click for context menu

    <x-keys::dropdown id="context-menu" x-ref="contextMenu">
        <x-slot:trigger>
            <button type="button" class="hidden"></button>
        </x-slot:trigger>

        <x-keys::dropdown.item icon="heroicon-o-clipboard">
            Copy
        </x-keys::dropdown.item>
        <x-keys::dropdown.item icon="heroicon-o-clipboard-document">
            Paste
        </x-keys::dropdown.item>
        <x-keys::dropdown.separator />
        <x-keys::dropdown.item icon="heroicon-o-trash" color="danger">
            Delete
        </x-keys::dropdown.item>
    </x-keys::dropdown>
</div>
```

## Keyboard Navigation

The Dropdown component supports comprehensive keyboard navigation:

- **Enter/Space**: Open dropdown
- **Escape**: Close dropdown
- **Arrow Up/Down**: Navigate items
- **Home**: Jump to first item
- **End**: Jump to last item
- **Tab**: Move to next focusable element
- **Type-ahead**: Jump to item by typing

## Accessibility

The Dropdown component includes comprehensive accessibility features:

- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support
- Disabled state handling

## Component Structure

The Dropdown component consists of:

1. **PHP Class** (`Dropdown.php`)
   - Props validation
   - Placement computation
   - Data attributes generation

2. **Blade Template** (`dropdown.blade.php`)
   - Wraps Popover component
   - Passes computed placement

3. **Child Components**:
   - `Dropdown.Item` - Menu item
   - `Dropdown.Separator` - Visual divider
   - `Dropdown.Submenu` - Nested menu
   - `Dropdown.Checkbox` - Checkbox item
   - `Dropdown.Radio` - Radio item

4. **TypeScript Actions** (`DropdownActions.ts`)
   - Click handling
   - Keyboard navigation
   - Focus management

## Data Attributes

The component generates comprehensive data attributes:

- `data-dropdown="true"` - Component identifier
- `data-dropdown-id="..."` - Dropdown ID
- `data-position="bottom"` - Position
- `data-align="start"` - Alignment
- `data-offset="8"` - Offset distance
- `data-disabled="false"` - Disabled state
- `data-modal="false"` - Modal mode

## Best Practices

1. **Provide clear trigger**: Make it obvious that element opens a dropdown

2. **Group related items**: Use separators to organize menu items

3. **Use icons consistently**: Include icons for all items or none

4. **Limit nesting depth**: Avoid deep submenu hierarchies

5. **Show active states**: Highlight current/selected items

6. **Handle long lists**: Consider search or categorization

7. **Close on action**: Close dropdown after item selection

8. **Position appropriately**: Ensure dropdown stays within viewport

9. **Use semantic colors**: Red for destructive actions

10. **Provide keyboard access**: Ensure full keyboard navigation
