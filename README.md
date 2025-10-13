# Keys UI

A modern, comprehensive Blade component library for Laravel 12+ with Tailwind CSS v4 and Livewire 3 integration.

[![Latest Version](https://img.shields.io/packagist/v/keys/ui.svg?style=flat-square)](https://packagist.org/packages/keys/ui)
[![License](https://img.shields.io/packagist/l/keys/ui.svg?style=flat-square)](LICENSE.md)

## Features

- **50+ Professional Components** - Buttons, forms, modals, tables, charts, and more
- **Tailwind CSS v4** - Built with the latest Tailwind CSS using native CSS features
- **TypeScript Actions** - Interactive functionality with type-safe TypeScript
- **Livewire 3 Integration** - Seamless wire:model binding and reactive components
- **Accessibility First** - ARIA attributes, keyboard navigation, screen reader support
- **RTL Support** - Built-in right-to-left language support
- **Theme Customization** - Extensive CSS variable system for easy theming
- **Zero Configuration** - Auto-discovery and automatic asset serving
- **Data Attribute API** - Granular control via data attributes for advanced customization

## Requirements

- PHP 8.2 or higher
- Laravel 12.0 or higher
- Tailwind CSS 4.0 or higher
- Livewire 3.0 (optional, for reactive components)

## Installation

Install the package via Composer:

```bash
composer require keys/ui
```

The package will automatically register its service provider and discover all components.

## Setup

### 1. Import CSS

Add the Keys UI stylesheet to your `resources/css/app.css` file:

```css
@import 'tailwindcss';
@import '../../vendor/keys/ui/resources/css/keys-ui.css';
```

### 2. Include JavaScript

Add the Keys UI assets directive to your layout file before the closing `</body>` tag:

```blade
<!DOCTYPE html>
<html>
<head>
    <!-- Your head content -->
</head>
<body>
    <!-- Your content -->

    @keysAssets
    <!-- Or alternatively: <x-keys::scripts /> -->
</body>
</html>
```

### 3. Build Assets

Compile your assets:

```bash
npm run build
```

## Quick Start

### Basic Button

```blade
<x-keys::button color="primary" size="md">
    Click Me
</x-keys::button>
```

### Button with Icon

```blade
<x-keys::button icon-left="heroicon-o-plus" color="primary">
    Add Item
</x-keys::button>
```

### Form Input with Livewire

```blade
<x-keys::input
    wire:model="email"
    type="email"
    label="Email Address"
    placeholder="Enter your email"
    :errors="$errors->get('email')"
/>
```

### Modal

```blade
<x-keys::button @click="$dispatch('openModal', { id: 'example-modal' })">
    Open Modal
</x-keys::button>

<x-keys::modal id="example-modal" size="md">
    <x-slot:header>
        <x-keys::heading size="lg">Modal Title</x-keys::heading>
    </x-slot:header>

    Modal content goes here.

    <x-slot:footer>
        <x-keys::button color="primary">Confirm</x-keys::button>
    </x-slot:footer>
</x-keys::modal>
```

### Using Services (PHP)

```php
use Keys\UI\Facades\Keys;

// Show a toast notification
Keys::toast()->success('Item saved successfully!');

// Show a modal programmatically
Keys::modal('confirmation')
    ->title('Confirm Action')
    ->message('Are you sure?')
    ->show();
```

## Available Components

### Layout & Structure
- `main` - Application main layout container
- `sidebar` - Navigation sidebar with sections and items
- `card` - Flexible card container with header, body, footer, actions
- `separator` - Visual content divider

### Buttons & Actions
- `button` - Versatile button with variants, sizes, icons, and states
- `button.group` - Grouped button layout

### Form Components

#### Text Inputs
- `input` - Text input with icons, actions, and validation
- `textarea` - Multi-line text input with auto-resize
- `editor` - Rich text editor (Quill.js integration)

#### Selection Controls
- `select` - Dropdown select with search and multi-select
- `checkbox` - Checkbox with multiple variants
- `checkbox.group` - Grouped checkbox inputs
- `radio` - Radio button with variants
- `radio.group` - Grouped radio inputs
- `toggle` - Switch toggle input
- `choice-group` - Advanced choice selection

#### Specialized Inputs
- `color-picker` - Color selection with palette
- `date-picker` - Date selection with calendar
- `time-picker` - Time selection input
- `range` - Slider for numeric ranges
- `rating` - Star rating input
- `file-upload` - File upload with drag-and-drop

#### Form Utilities
- `field` - Form field wrapper with label and error handling
- `label` - Form label with tooltip support
- `error` - Validation error message display
- `group` - Input group container

### Feedback Components

#### Overlays
- `modal` - Dialog modal with Livewire integration
- `slideout` - Side panel overlay
- `popover` - Floating popover content
- `dropdown` - Dropdown menu with items and submenus
- `tooltip` - Contextual tooltips

#### Messages & Notifications
- `alert` - Static alert messages
- `toast` - Temporary notification messages
- `empty-state` - Empty state placeholder

#### Progress Indicators
- `progress` - Progress bar
- `loading` - Loading spinner with multiple animations

### Display Components

#### Typography
- `heading` - Semantic headings (h1-h6)
- `text` - Styled text with variants
- `kbd` - Keyboard key display

#### Content Display
- `badge` - Status and label badges
- `avatar` - User avatar with status
- `avatar.stack` - Stacked avatars
- `icon` - Heroicon integration
- `image` - Responsive image with lightbox

#### Navigation
- `breadcrumbs` - Hierarchical navigation trail
- `tabs` - Tabbed interface with variants
- `steps` - Multi-step process indicator

#### Data Display
- `table` - Data table with sorting and pagination
- `chart` - Chart.js integration
- `accordion` - Collapsible content sections
- `calendar` - Standalone calendar component
- `countdown` - Countdown timer

#### Social
- `social.links` - Social media link buttons
- `social.share` - Social sharing buttons

## Theme Customization

Keys UI uses CSS variables for theming, making it easy to customize colors, spacing, shadows, and more. You can override these variables in your `resources/css/app.css` file after importing the Keys UI styles.

### Basic Customization

```css
@import 'tailwindcss';
@import '../../vendor/keys/ui/resources/css/keys-ui.css';

@theme {
    /* Override brand color (defaults to amber) */
    --color-brand-50: var(--color-blue-50);
    --color-brand-100: var(--color-blue-100);
    --color-brand-200: var(--color-blue-200);
    --color-brand-300: var(--color-blue-300);
    --color-brand-400: var(--color-blue-400);
    --color-brand-500: var(--color-blue-500);
    --color-brand-600: var(--color-blue-600);
    --color-brand-700: var(--color-blue-700);
    --color-brand-800: var(--color-blue-800);
    --color-brand-900: var(--color-blue-900);
    --color-brand-950: var(--color-blue-950);

    /* Customize border radius */
    --radius-base: 0.75rem; /* Default is 0.5rem */
}
```

### Customizable Color Tokens

#### Palette Tokens
Map contextual colors to Tailwind's color palette:

```css
@theme {
    /* Brand (defaults to amber) */
    --color-brand-*: var(--color-{color}-*);

    /* Danger (defaults to red) */
    --color-danger-*: var(--color-{color}-*);

    /* Warning (defaults to yellow) */
    --color-warning-*: var(--color-{color}-*);

    /* Success (defaults to lime) */
    --color-success-*: var(--color-{color}-*);

    /* Info (defaults to sky) */
    --color-info-*: var(--color-{color}-*);
}
```

#### Semantic Colors
Component-oriented color system using `light-dark()`:

```css
@theme {
    /* Body/Page Background */
    --color-body: light-dark(var(--color-neutral-100), var(--color-neutral-950));
    --color-body-foreground: light-dark(var(--color-neutral-900), var(--color-neutral-50));

    /* Cards & Raised Surfaces */
    --color-card: light-dark(white, var(--color-neutral-900));
    --color-card-foreground: light-dark(var(--color-neutral-900), var(--color-neutral-50));

    /* Panels (Sidebars, Sections) */
    --color-panel: light-dark(var(--color-neutral-50), var(--color-neutral-800));
    --color-panel-foreground: light-dark(var(--color-neutral-900), var(--color-neutral-50));

    /* Form Inputs */
    --color-input: light-dark(var(--color-neutral-50), var(--color-neutral-800));
    --color-input-foreground: light-dark(var(--color-neutral-900), var(--color-neutral-50));

    /* Floating Elements (Dropdowns, Tooltips) */
    --color-popover: light-dark(white, var(--color-neutral-800));
    --color-popover-foreground: light-dark(var(--color-neutral-900), var(--color-neutral-50));

    /* Modals & Dialogs */
    --color-dialog: light-dark(white, var(--color-neutral-900));
    --color-dialog-foreground: light-dark(var(--color-neutral-900), var(--color-neutral-50));

    /* Inverted Sections */
    --color-inverted: light-dark(var(--color-neutral-900), var(--color-neutral-50));
    --color-inverted-foreground: light-dark(var(--color-neutral-50), var(--color-neutral-900));

    /* Overlay (segmented controls, layered backgrounds) */
    --color-overlay: light-dark(var(--color-neutral-200), var(--color-neutral-800));
}
```

#### Typography Hierarchy

```css
@theme {
    --color-heading: light-dark(var(--color-neutral-950), var(--color-neutral-50));
    --color-text: light-dark(var(--color-neutral-800), var(--color-neutral-100));
    --color-text-muted: light-dark(var(--color-neutral-600), var(--color-neutral-400));
    --color-text-subtle: light-dark(var(--color-neutral-500), var(--color-neutral-500));
    --color-text-disabled: light-dark(var(--color-neutral-400), var(--color-neutral-600));
}
```

#### Borders

```css
@theme {
    --color-border: light-dark(var(--color-neutral-300), var(--color-neutral-700));
    --color-border-subtle: light-dark(var(--color-neutral-200), var(--color-neutral-800));
    --color-border-strong: light-dark(var(--color-neutral-400), var(--color-neutral-600));
}
```

#### Interactive States

```css
@theme {
    --color-hover: light-dark(var(--color-neutral-200), var(--color-neutral-700));
    --color-active: light-dark(var(--color-neutral-300), var(--color-neutral-600));
    --color-selected: light-dark(var(--color-neutral-100), var(--color-neutral-800));
    --color-focus: var(--color-brand-500);
}
```

### Other Customizable Tokens

#### Border Radius

```css
@theme {
    --radius-base: 0.5rem;
    --radius-sm: calc(var(--radius-base) * 0.25);
    --radius-md: calc(var(--radius-base) * 0.75);
    --radius-lg: var(--radius-base);
    --radius-xl: calc(var(--radius-base) * 1.5);
    --radius-2xl: calc(var(--radius-base) * 2);
    --radius-3xl: calc(var(--radius-base) * 3);
}
```

#### Shadows

```css
@theme {
    --shadow-highlight: light-dark(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2));
    --shadow-dark: light-dark(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1));
    --shadow-soft: light-dark(rgba(0, 0, 0, 0.015), rgba(0, 0, 0, 0.05));

    --shadow-xs: /* ... */;
    --shadow-sm: /* ... */;
    --shadow-md: /* ... */;
    --shadow-lg: /* ... */;
    --shadow-xl: /* ... */;
    --shadow-2xl: /* ... */;
}
```

#### Component-Specific

```css
@theme {
    /* Sidebar */
    --color-sidebar: light-dark(var(--color-neutral-50), var(--color-neutral-900));
    --color-sidebar-foreground: var(--color-text);
    --color-sidebar-border: var(--color-border);
    --color-sidebar-hover: var(--color-hover);

    /* Charts */
    --color-chart-1: var(--color-brand);
    --color-chart-2: var(--color-info);
    --color-chart-3: var(--color-success);
    --color-chart-4: var(--color-warning);
    --color-chart-5: var(--color-danger);

    /* Code Blocks */
    --color-code: light-dark(var(--color-neutral-100), var(--color-neutral-800));
    --color-code-foreground: light-dark(var(--color-danger-600), var(--color-danger-400));
}
```

## Advanced Customization via Data Attributes

Keys UI components use consistent data attributes for CSS targeting, allowing granular control without modifying component files.

### Data Attribute Patterns

All components follow these conventions:

```html
<!-- Component identification -->
<button data-keys-button="true">...</button>

<!-- Variants and props -->
<button data-color="primary" data-size="md" data-variant="solid">...</button>

<!-- State flags -->
<button data-loading="true" data-disabled="true">...</button>

<!-- Multi-state components -->
<button data-multi-state="true" data-icon-default="check" data-icon-success="checkmark">...</button>
```

### Targeting Components with CSS

You can add custom styles by targeting data attributes:

```css
/* Target all primary buttons */
[data-keys-button][data-color="primary"] {
    /* Custom styles */
}

/* Target large buttons */
[data-keys-button][data-size="lg"] {
    /* Custom styles */
}

/* Target loading state */
[data-keys-button][data-loading="true"] {
    /* Custom loading styles */
}

/* Target specific input types */
[data-keys-input][data-type="email"] {
    /* Custom styles for email inputs */
}
```

### Component Data Attributes

Common data attributes across components:

- `data-keys-{component}="true"` - Component identifier
- `data-color="{color}"` - Color variant
- `data-size="{size}"` - Size variant
- `data-variant="{variant}"` - Style variant
- `data-disabled="true"` - Disabled state
- `data-loading="true"` - Loading state
- `data-has-icon="true"` - Has icon flag
- `data-icon-only="true"` - Icon-only flag

## Service Layer

Keys UI provides service managers for modals and toasts, accessible via the `Keys` facade.

### Modal Manager

```php
use Keys\UI\Facades\Keys;

// Show a modal
Keys::modal('my-modal')
    ->title('Confirm Action')
    ->message('Are you sure you want to proceed?')
    ->size('sm')
    ->show();

// Close a modal
Keys::modal('my-modal')->close();

// Confirmation modal
Keys::modal()->confirm()
    ->title('Delete Item')
    ->message('This action cannot be undone.')
    ->onConfirm('deleteItem')
    ->show();
```

### Toast Manager

```php
use Keys\UI\Facades\Keys;

// Success toast
Keys::toast()->success('Item saved successfully!');

// Error toast
Keys::toast()->error('An error occurred.', 'Error');

// Warning toast
Keys::toast()->warning('Please review your changes.');

// Info toast
Keys::toast()->info('New update available.');

// Custom toast
Keys::toast()->show('custom', [
    'message' => 'Custom message',
    'title' => 'Custom Title',
    'duration' => 5000
]);
```

## Livewire Integration

Keys UI components work seamlessly with Livewire 3.

### Wire:model Binding

```blade
<x-keys::input
    wire:model.live="search"
    placeholder="Search..."
/>

<x-keys::select
    wire:model="category"
    :options="$categories"
    placeholder="Select category"
/>

<x-keys::checkbox
    wire:model="accepted"
    label="I accept the terms"
/>
```

### Validation Errors

```blade
<x-keys::input
    wire:model="email"
    type="email"
    label="Email Address"
    :errors="$errors->get('email')"
/>
```

### Livewire Events

```blade
<!-- Dispatch modal event -->
<x-keys::button wire:click="$dispatch('openModal', { id: 'user-form' })">
    Edit User
</x-keys::button>

<!-- Listen for events -->
<div x-data @modal-closed.window="console.log('Modal closed')">
    <!-- Content -->
</div>
```

## Available Commands

### npm Commands

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Watch mode for development
npm run watch

# Type checking only
npm run typecheck

# Full CI pipeline (typecheck + build + verify)
npm run ci

# Verify build output
npm run build:verify

# Sync version between package.json and config
npm run sync-version

# Clean dist folder
npm run clean
```

### Composer Commands

```bash
# Build assets (runs npm install and npm run build)
composer keys:build-assets

# Verify build
composer keys:verify
```

## Publishing Assets

Keys UI uses automatic asset serving, so publishing is optional. However, you can publish assets if needed:

### Publish Configuration

```bash
php artisan vendor:publish --tag=keys-ui-config
```

### Publish Views

```bash
php artisan vendor:publish --tag=keys-ui-views
```

### Publish Components

```bash
php artisan vendor:publish --tag=keys-ui-components
```

### Publish Translations

```bash
php artisan vendor:publish --tag=keys-ui-lang
```

### Publish Assets

```bash
php artisan vendor:publish --tag=keys-ui-assets
```

### Publish All

```bash
php artisan vendor:publish --provider="Keys\UI\KeysUiServiceProvider"
```

## Contributing

### Development Setup

1. Clone the repository
2. Install dependencies:

```bash
composer install
npm install
```

3. Build assets:

```bash
npm run build
```

4. Watch for changes:

```bash
npm run watch
```

### Building for Production

```bash
# Type check and build
npm run ci

# Or build only
npm run build
```

### Code Structure

- `src/` - PHP component classes, services, and providers
- `resources/views/components/` - Blade component templates
- `resources/js/` - TypeScript action classes
- `resources/css/` - CSS styles and theme
- `config/` - Configuration files
- `lang/` - Translation files
- `dist/` - Built JavaScript bundles

## License

Keys UI is open-sourced software licensed under the [MIT license](LICENSE.md).

## Credits

Built with:
- [Laravel](https://laravel.com)
- [Livewire](https://livewire.laravel.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Alpine.js](https://alpinejs.dev)
- [Heroicons](https://heroicons.com)
- [Quill](https://quilljs.com)
- [Chart.js](https://www.chartjs.org)
