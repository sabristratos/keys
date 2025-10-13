# Main Component

A pre-styled main content area component designed for application layouts. Provides responsive padding, optional header/footer slots, and mobile sidebar integration.

## Basic Usage

```blade
<x-keys::main>
    <h1>Page Content</h1>
    <p>Your main content goes here.</p>
</x-keys::main>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string\|null` | `null` | Page title |
| `sidebar-id` | `string` | `'main-sidebar'` | ID of sidebar to toggle |
| `show-mobile-toggle` | `bool` | `true` | Show mobile sidebar toggle |
| `padding` | `string` | `'md'` | Padding size: `none`, `sm`, `md`, `lg` |
| `wrapper-class` | `string\|null` | `null` | Custom wrapper classes |

## Basic Page Layout

```blade
<div class="flex min-h-screen">
    <x-keys::sidebar id="main-sidebar">
        <!-- sidebar content -->
    </x-keys::sidebar>

    <x-keys::main sidebar-id="main-sidebar">
        <h1>Dashboard</h1>
        <!-- page content -->
    </x-keys::main>
</div>
```

## With Title

```blade
<x-keys::main title="Dashboard">
    <p>Welcome to your dashboard</p>
</x-keys::main>
```

## Padding Variants

```blade
<!-- No padding -->
<x-keys::main padding="none">
    <div class="custom-layout">
        <!-- content -->
    </div>
</x-keys::main>

<!-- Small padding -->
<x-keys::main padding="sm">
    <!-- content -->
</x-keys::main>

<!-- Medium padding (Default) -->
<x-keys::main padding="md">
    <!-- content -->
</x-keys::main>

<!-- Large padding -->
<x-keys::main padding="lg">
    <!-- content -->
</x-keys::main>
```

## With Header and Footer Slots

```blade
<x-keys::main>
    <x-slot:header>
        <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold">Dashboard</h1>
            <x-keys::button color="primary">New Item</x-keys::button>
        </div>
    </x-slot:header>

    <div class="space-y-6">
        <!-- main content -->
    </div>

    <x-slot:footer>
        <div class="flex justify-between items-center">
            <p class="text-sm text-gray-500">&copy; 2024 Company Name</p>
            <div class="flex gap-4">
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
            </div>
        </div>
    </x-slot:footer>
</x-keys::main>
```

## Custom Wrapper Class

```blade
<x-keys::main wrapper-class="bg-gray-50 dark:bg-gray-900">
    <!-- content -->
</x-keys::main>
```

## Complete Layout Example

```blade
<div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <x-keys::sidebar
        id="app-sidebar"
        position="left"
        width="md"
        :collapsible="true"
    >
        <div class="p-4">
            <h2 class="text-lg font-semibold mb-4">Navigation</h2>
            <nav class="space-y-2">
                <a href="/dashboard" class="block px-3 py-2 rounded hover:bg-gray-100">
                    Dashboard
                </a>
                <a href="/projects" class="block px-3 py-2 rounded hover:bg-gray-100">
                    Projects
                </a>
                <a href="/settings" class="block px-3 py-2 rounded hover:bg-gray-100">
                    Settings
                </a>
            </nav>
        </div>
    </x-keys::sidebar>

    <!-- Main Content -->
    <x-keys::main sidebar-id="app-sidebar">
        <x-slot:header>
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl font-bold">Dashboard</h1>
                <div class="flex gap-3">
                    <x-keys::button variant="outlined">Export</x-keys::button>
                    <x-keys::button color="primary">Create New</x-keys::button>
                </div>
            </div>
        </x-slot:header>

        <!-- Page Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Cards, content, etc. -->
        </div>
    </x-keys::main>
</div>
```

## Mobile Sidebar Toggle

The component automatically includes a mobile toggle button in the header when `show-mobile-toggle` is true (default).

```blade
<x-keys::main
    sidebar-id="mobile-sidebar"
    :show-mobile-toggle="true"
>
    <!-- content -->
</x-keys::main>
```

Disable mobile toggle:

```blade
<x-keys::main :show-mobile-toggle="false">
    <!-- content -->
</x-keys::main>
```

## Accessibility

The Main component:

- Uses semantic `<main>` element
- Proper heading hierarchy
- Landmark regions
- Focus management with sidebar

## Best Practices

1. **Use semantic structure**: Always use Main for primary content area
2. **One main per page**: Only use one Main component per page
3. **Consistent padding**: Use same padding across similar pages
4. **Responsive design**: Test mobile sidebar toggle behavior
5. **Header for actions**: Place page-level actions in header slot
6. **Footer for metadata**: Use footer for copyright, links, etc.

## Component Structure

1. **PHP Class** (`Main.php`)
   - Props validation
   - Padding configuration
   - Sidebar integration

2. **Blade Template** (`main.blade.php`)
   - Main element wrapper
   - Header slot
   - Content area
   - Footer slot
   - Mobile toggle button
