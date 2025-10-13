# Sidebar Component

A flexible navigation sidebar component with support for positioning, collapsible behavior, multiple variants, and sticky positioning. Ideal for application layouts, navigation menus, and content organization.

## Basic Usage

```blade
<x-keys::sidebar>
    <nav>
        <a href="/dashboard">Dashboard</a>
        <a href="/settings">Settings</a>
        <a href="/profile">Profile</a>
    </nav>
</x-keys::sidebar>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string\|null` | auto-generated | Custom ID for the sidebar |
| `position` | `string` | `'left'` | Position: `left`, `right` |
| `width` | `string` | `'md'` | Width: `xs`, `sm`, `md`, `lg`, `xl` |
| `variant` | `string` | `'default'` | Visual style: `default`, `bordered`, `elevated`, `transparent` |
| `collapsible` | `bool` | `true` | Whether sidebar can be collapsed |
| `collapsed` | `bool` | `false` | Initial collapsed state |
| `sticky` | `bool` | `false` | Whether sidebar is sticky on scroll |
| `aria-label` | `string\|null` | `null` | ARIA label for accessibility |
| `title` | `string\|null` | `null` | Sidebar title |
| `subtitle` | `string\|null` | `null` | Sidebar subtitle |

## Positions

### Left (Default)
```blade
<x-keys::sidebar position="left">
    <nav>
        <!-- navigation items -->
    </nav>
</x-keys::sidebar>
```

### Right
```blade
<x-keys::sidebar position="right">
    <nav>
        <!-- navigation items -->
    </nav>
</x-keys::sidebar>
```

## Width Variants

```blade
<!-- Extra Small -->
<x-keys::sidebar width="xs">
    <!-- content -->
</x-keys::sidebar>

<!-- Small -->
<x-keys::sidebar width="sm">
    <!-- content -->
</x-keys::sidebar>

<!-- Medium (Default) -->
<x-keys::sidebar width="md">
    <!-- content -->
</x-keys::sidebar>

<!-- Large -->
<x-keys::sidebar width="lg">
    <!-- content -->
</x-keys::sidebar>

<!-- Extra Large -->
<x-keys::sidebar width="xl">
    <!-- content -->
</x-keys::sidebar>
```

## Visual Variants

### Default
Clean sidebar with subtle background.

```blade
<x-keys::sidebar variant="default">
    <nav>
        <!-- navigation items -->
    </nav>
</x-keys::sidebar>
```

### Bordered
Sidebar with border on the edge.

```blade
<x-keys::sidebar variant="bordered">
    <nav>
        <!-- navigation items -->
    </nav>
</x-keys::sidebar>
```

### Elevated
Sidebar with shadow for depth.

```blade
<x-keys::sidebar variant="elevated">
    <nav>
        <!-- navigation items -->
    </nav>
</x-keys::sidebar>
```

### Transparent
Transparent sidebar for overlay layouts.

```blade
<x-keys::sidebar variant="transparent">
    <nav>
        <!-- navigation items -->
    </nav>
</x-keys::sidebar>
```

## Collapsible Sidebar

```blade
<x-keys::sidebar :collapsible="true" :collapsed="false" id="main-sidebar">
    <nav>
        <a href="/dashboard">Dashboard</a>
        <a href="/users">Users</a>
        <a href="/settings">Settings</a>
    </nav>
</x-keys::sidebar>

<!-- Toggle button -->
<button onclick="document.querySelector('[data-keys-sidebar]').dataset.collapsed =
    document.querySelector('[data-keys-sidebar]').dataset.collapsed === 'true' ? 'false' : 'true'">
    Toggle Sidebar
</button>
```

## Sticky Sidebar

Remains visible while scrolling:

```blade
<x-keys::sidebar :sticky="true">
    <nav>
        <a href="/overview">Overview</a>
        <a href="/analytics">Analytics</a>
        <a href="/reports">Reports</a>
    </nav>
</x-keys::sidebar>
```

## With Header

```blade
<x-keys::sidebar title="Navigation" subtitle="Main menu">
    <nav>
        <a href="/home">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
    </nav>
</x-keys::sidebar>
```

## Livewire Integration

### With Dynamic State

```blade
<x-keys::sidebar :collapsed="$sidebarCollapsed" id="app-sidebar">
    <nav>
        <a href="/dashboard" wire:navigate>Dashboard</a>
        <a href="/projects" wire:navigate>Projects</a>
        <a href="/team" wire:navigate>Team</a>
    </nav>
</x-keys::sidebar>

<button wire:click="toggleSidebar">
    Toggle Sidebar
</button>
```

```php
class Layout extends Component
{
    public bool $sidebarCollapsed = false;

    public function toggleSidebar(): void
    {
        $this->sidebarCollapsed = !$this->sidebarCollapsed;
    }
}
```

## Layout Integration

### With Main Content

```blade
<div class="flex min-h-screen">
    <x-keys::sidebar position="left" width="md">
        <nav>
            <a href="/dashboard">Dashboard</a>
            <a href="/analytics">Analytics</a>
            <a href="/settings">Settings</a>
        </nav>
    </x-keys::sidebar>

    <x-keys::main sidebar-id="main-sidebar">
        <h1>Page Content</h1>
        <!-- main content -->
    </x-keys::main>
</div>
```

## Accessibility

The Sidebar component includes comprehensive accessibility features:

- `role="navigation"` for semantic navigation
- Support for custom `aria-label` attributes
- Keyboard navigation support
- Focus management for collapsible behavior
- Screen reader friendly collapse/expand states

```blade
<x-keys::sidebar aria-label="Main navigation">
    <nav>
        <a href="/home">Home</a>
        <a href="/about">About</a>
    </nav>
</x-keys::sidebar>
```

## Data Attributes

The component generates comprehensive data attributes for CSS targeting and JavaScript:

- `data-keys-sidebar="true"` - Component identifier
- `data-position="left"` - Position setting
- `data-width="md"` - Width variant
- `data-variant="default"` - Visual variant
- `data-collapsible="true"` - Collapsible capability (if enabled)
- `data-collapsed="false"` - Current collapse state (if collapsible)
- `data-sticky="true"` - Sticky positioning (if enabled)

## Use Cases

### Application Navigation

```blade
<x-keys::sidebar
    position="left"
    width="md"
    variant="bordered"
    aria-label="Application navigation"
>
    <div class="px-4 py-6">
        <h2 class="text-lg font-semibold mb-4">My App</h2>

        <nav class="space-y-2">
            <a href="/dashboard" class="block px-3 py-2 rounded hover:bg-gray-100">
                Dashboard
            </a>
            <a href="/projects" class="block px-3 py-2 rounded hover:bg-gray-100">
                Projects
            </a>
            <a href="/team" class="block px-3 py-2 rounded hover:bg-gray-100">
                Team
            </a>
        </nav>
    </div>
</x-keys::sidebar>
```

### Documentation Sidebar

```blade
<x-keys::sidebar
    position="left"
    width="sm"
    :sticky="true"
    variant="transparent"
>
    <nav class="space-y-4 p-4">
        <div>
            <h3 class="font-semibold mb-2">Getting Started</h3>
            <ul class="space-y-1 ml-4">
                <li><a href="#installation">Installation</a></li>
                <li><a href="#configuration">Configuration</a></li>
            </ul>
        </div>

        <div>
            <h3 class="font-semibold mb-2">Components</h3>
            <ul class="space-y-1 ml-4">
                <li><a href="#button">Button</a></li>
                <li><a href="#input">Input</a></li>
            </ul>
        </div>
    </nav>
</x-keys::sidebar>
```

### Admin Dashboard

```blade
<x-keys::sidebar
    position="left"
    width="lg"
    variant="elevated"
    :collapsible="true"
    title="Admin Panel"
    subtitle="v2.0"
>
    <div class="flex flex-col h-full">
        <nav class="flex-1 px-4 py-6 space-y-1">
            <a href="/admin/dashboard" class="flex items-center gap-3 px-3 py-2 rounded">
                <x-icon name="heroicon-o-home" />
                <span>Dashboard</span>
            </a>
            <a href="/admin/users" class="flex items-center gap-3 px-3 py-2 rounded">
                <x-icon name="heroicon-o-users" />
                <span>Users</span>
            </a>
            <a href="/admin/settings" class="flex items-center gap-3 px-3 py-2 rounded">
                <x-icon name="heroicon-o-cog" />
                <span>Settings</span>
            </a>
        </nav>

        <div class="p-4 border-t">
            <div class="flex items-center gap-3">
                <img src="/avatar.jpg" alt="User" class="w-10 h-10 rounded-full">
                <div>
                    <p class="font-medium">John Doe</p>
                    <p class="text-sm text-gray-500">Admin</p>
                </div>
            </div>
        </div>
    </div>
</x-keys::sidebar>
```

## Styling

The sidebar component uses Tailwind CSS v4 and includes:

- Smooth transitions for collapse/expand animations
- Responsive width system
- Position-aware styling (left/right)
- Variant-based backgrounds and borders
- Sticky positioning support
- Z-index management for proper layering

## Best Practices

1. **Use semantic positioning**: Left for primary navigation, right for secondary content

2. **Choose appropriate width**: Narrow for simple links, wider for rich content

3. **Enable collapsible on mobile**: Improve mobile experience with collapsible sidebars

4. **Provide ARIA labels**: Always include descriptive labels for accessibility

5. **Use sticky wisely**: Only use sticky positioning when sidebar needs to remain visible

6. **Consider content hierarchy**: Organize navigation items logically

7. **Match variant to layout**: Use elevated for prominent sidebars, transparent for overlays

## Component Structure

The Sidebar component consists of:

1. **PHP Class** (`Sidebar.php`)
   - Props validation
   - Position and width handling
   - Collapse state management
   - Data attributes generation

2. **Blade Template** (`sidebar.blade.php`)
   - Position-based layout
   - Width variants
   - Variant styling
   - Collapsible functionality
   - Slot for content
