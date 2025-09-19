# Keys UI

A modern Blade components library for Laravel 12 and Tailwind v4. Build beautiful, consistent user interfaces with over 50 pre-built components designed for the modern Laravel ecosystem.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/keys/ui.svg?style=flat-square)](https://packagist.org/packages/keys/ui)
[![Total Downloads](https://img.shields.io/packagist/dt/keys/ui.svg?style=flat-square)](https://packagist.org/packages/keys/ui)

## Features

- 🎨 **50+ Beautiful Components** - Buttons, forms, modals, tables, navigation, and more
- 🚀 **Laravel 12 Ready** - Built specifically for the latest Laravel features
- 🎯 **Tailwind v4 Native** - Uses modern `@import "tailwindcss"` syntax with semantic design tokens
- ♿ **Accessibility First** - WCAG compliant components out of the box
- 🔧 **Progressive Enhancement** - Works without JavaScript, enhanced with it
- 🎭 **Multi-State Support** - Native icon toggling and state management
- 📱 **Responsive Design** - Mobile-first approach with consistent breakpoints
- 🌙 **Dark Mode Support** - Complete light/dark theme integration

## Installation

Install the package via Composer:

```bash
composer require keys/ui
```

The package will automatically register its service provider and publish necessary assets.

## Quick Start

### Basic Usage

Start using components immediately with the `x-keys::` namespace:

```blade
{{-- Button with icon --}}
<x-keys::button icon="heroicon-o-plus" color="brand">
    Create Post
</x-keys::button>

{{-- Form input with validation --}}
<x-keys::input
    name="email"
    type="email"
    label="Email Address"
    placeholder="Enter your email"
    :errors="$errors"
/>

{{-- Card component --}}
<x-keys::card>
    <x-keys::card.header>
        <h3>Welcome</h3>
    </x-keys::card.header>
    <x-keys::card.body>
        <p>This is a beautiful card component.</p>
    </x-keys::card.body>
</x-keys::card>
```

### Asset Integration

#### CSS Setup
Import Keys UI styles in your main CSS file (e.g., `resources/css/app.css`):

```css
@import "../../vendor/keys/ui/resources/css/keys-ui.css";

/* Your custom styles can override Keys UI styles below */
:root {
    --brand: your-custom-brand-color;
}
```

#### JavaScript Setup
Add the Keys UI JavaScript to your layout:

```blade
<!DOCTYPE html>
<html>
<head>
    <!-- Your existing head content -->
</head>
<body>
    <!-- Your content -->

    <!-- Add Keys UI JavaScript (excludes CSS) -->
    @keysAssets()
</body>
</html>
```

> **Note**: `@keysAssets()` only includes JavaScript and translations. CSS must be imported manually to allow for easy customization.

## Component Overview

### Form Components
- **Input** - Text, email, password, number inputs with validation
- **Textarea** - Multi-line text input with auto-resize
- **Select** - Advanced dropdown with search, multiselect, and custom options
- **Checkbox** - Single and group selections with card variants
- **Radio** - Radio buttons with full card clickability
- **Toggle** - Switch components for boolean values
- **Range** - Slider inputs with custom styling
- **File Upload** - Drag-and-drop file uploads with previews

### Navigation Components
- **Button** - Multi-state buttons with icon support
- **Button Group** - Grouped button collections
- **Breadcrumbs** - Navigation breadcrumb trails
- **Menu** - Dropdown menus with submenus and separators
- **Tabs** - Tabbed navigation interfaces

### Layout Components
- **Card** - Flexible content containers
- **Modal** - Overlay dialogs and popups
- **Accordion** - Collapsible content sections
- **Table** - Data tables with sorting and filtering
- **Separator** - Visual content dividers

### Feedback Components
- **Alert** - Status messages and notifications
- **Toast** - Temporary notification messages
- **Loading** - Loading states and spinners
- **Progress** - Progress bars and indicators
- **Tooltip** - Contextual help and information

### Display Components
- **Badge** - Status indicators and tags
- **Avatar** - User profile images with fallbacks
- **Avatar Stack** - Overlapping avatar collections
- **Icon** - Heroicon integration with size variants
- **Image** - Optimized image display with lazy loading

### Advanced Components
- **Calendar** - Date selection and display
- **Date Picker** - Date input with calendar popup
- **Time Picker** - Time selection interface
- **Editor** - Rich text editing with Quill.js
- **Gallery** - Image galleries with lightbox
- **Dropdown** - Advanced dropdown positioning

## Design System

Keys UI implements a semantic design system using CSS custom properties:

```css
/* Color tokens */
--color-brand      /* Primary brand color */
--color-success    /* Success states */
--color-warning    /* Warning states */
--color-danger     /* Error states */
--color-neutral    /* Neutral grays */

/* Surface tokens */
--color-surface    /* Background surfaces */
--color-foreground /* Text colors */
--color-border     /* Border colors */
--color-muted      /* Subdued content */

/* Radius tokens */
--radius-sm        /* Small border radius */
--radius-md        /* Medium border radius */
--radius-lg        /* Large border radius */
```

These tokens automatically generate Tailwind utilities like `bg-brand`, `text-success`, `border-neutral`, etc.

## Multi-State Components

Many components support multiple visual states:

```blade
{{-- Button with state changes --}}
<x-keys::button
    icon="heroicon-o-eye"
    icon-toggle="heroicon-o-eye-slash"
    icon-success="heroicon-o-check"
>
    Toggle Password
</x-keys::button>

{{-- Input with action button --}}
<x-keys::input
    name="password"
    type="password"
    action-icon="heroicon-o-eye"
    action-icon-toggle="heroicon-o-eye-slash"
    action-click="togglePassword"
/>
```

## Advanced Usage

### Custom Styling

#### Override Design Tokens
Override component styles using CSS custom properties:

```css
:root {
    --color-brand: #your-color;
    --radius-md: 0.75rem;
}
```

#### Force Light Theme Only
By default, Keys UI supports both light and dark themes. To force light theme only:

```css
@import "../../vendor/keys/ui/resources/css/keys-ui.css";

/* Force light theme only */
:root {
    color-scheme: light;
}

/* Override dark mode variables to use light values */
:root {
    --surface: white;
    --body: var(--color-neutral-50);
    --foreground: var(--color-neutral-900);
    --border: var(--color-neutral-200);
    --input: var(--color-neutral-50);
    --muted: var(--color-neutral-600);

    /* Brand colors (light theme values) */
    --brand: var(--color-brand-500);
    --brand-hover: var(--color-brand-600);
    --brand-active: var(--color-brand-700);
}

/* Disable dark mode custom variant */
@media (prefers-color-scheme: dark) {
    :root {
        color-scheme: light;
    }
}
```

#### Theme Customization
Customize the entire color palette:

```css
@import "../../vendor/keys/ui/resources/css/keys-ui.css";

:root {
    /* Custom brand colors */
    --color-brand-500: #3b82f6;
    --color-brand-600: #2563eb;
    --color-brand-700: #1d4ed8;

    /* Apply to semantic tokens */
    --brand: var(--color-brand-500);
    --brand-hover: var(--color-brand-600);
    --brand-active: var(--color-brand-700);
}
```

### JavaScript Integration

Components work with Alpine.js, Livewire, and vanilla JavaScript:

```blade
{{-- Alpine.js integration --}}
<x-keys::button @click="showModal = true">
    Open Modal
</x-keys::button>

{{-- Livewire integration --}}
<x-keys::button wire:click="save">
    Save Changes
</x-keys::button>
```

### Form Validation

Seamless Laravel validation integration:

```blade
<x-keys::input
    name="username"
    label="Username"
    :errors="$errors"
    help="Choose a unique username"
    required
/>
```

## RTL (Right-to-Left) Support

Keys UI includes comprehensive RTL support for Arabic, Hebrew, and other right-to-left languages.

### Automatic RTL Detection

RTL support is automatically enabled based on:
- HTML `dir` attribute
- Document language (`lang` attribute)
- Explicit CSS classes

```html
<!-- Automatic RTL detection -->
<html lang="ar" dir="rtl">
<html lang="he" dir="rtl">

<!-- Manual RTL activation -->
<html dir="rtl" class="rtl">
```

### RTL Features

- **Automatic Layout Flipping**: Components automatically mirror their layout in RTL mode
- **Smart Icon Positioning**: Icons and actions adjust position based on text direction
- **Dropdown Positioning**: Menus and dropdowns position correctly for RTL layouts
- **Text Alignment**: Text automatically aligns to the appropriate side
- **Logical Properties**: Uses logical CSS properties (start/end) instead of physical (left/right)

### JavaScript RTL Utilities

```javascript
import { RTLUtils } from 'keys-ui';

// Check if current document is RTL
const isRTL = RTLUtils.isRTL();

// Transform CSS classes for RTL
const rtlClasses = RTLUtils.transformDirectionalClasses('ml-4 text-left');

// Get RTL-aware dropdown positioning
const position = RTLUtils.getDropdownPosition('right', 'start');
```

### Component RTL Examples

```blade
{{-- These components automatically adapt to RTL --}}
<x-keys::input
    name="email"
    placeholder="أدخل البريد الإلكتروني"
    icon-left="heroicon-o-envelope"
    label="البريد الإلكتروني"
/>

<x-keys::button icon="heroicon-o-arrow-right">
    التالي {{-- Next in Arabic --}}
</x-keys::button>

<x-keys::dropdown position="left">
    {{-- Automatically becomes position="right" in RTL --}}
    <x-keys::dropdown.trigger>قائمة</x-keys::dropdown.trigger>
    <x-keys::dropdown.panel>
        <x-keys::menu.item>عنصر القائمة</x-keys::menu.item>
    </x-keys::dropdown.panel>
</x-keys::dropdown>
```

### CSS Custom Properties for RTL

```css
/* RTL-aware custom properties */
:root {
    --text-align-start: left;   /* Becomes 'right' in RTL */
    --text-align-end: right;    /* Becomes 'left' in RTL */
}

[dir="rtl"] {
    --text-align-start: right;
    --text-align-end: left;
}
```

### Supported RTL Languages

Keys UI automatically detects these RTL languages:
- Arabic (ar)
- Hebrew (he)
- Persian/Farsi (fa)
- Urdu (ur)
- Pashto (ps)
- And many more...

## Requirements

- PHP ^8.2
- Laravel ^12.0
- Tailwind CSS v4

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Security

If you discover any security-related issues, please email security@keys.dev instead of using the issue tracker.

## Credits

- [Keys Team](https://github.com/sabristratos)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.