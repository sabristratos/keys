# Keys UI - Component Library Documentation

Welcome to the Keys UI component library documentation. Keys UI is a modern, comprehensive Blade component library built with Laravel, Livewire 3, and Tailwind CSS v4.

## Overview

Keys UI provides 80+ professionally designed components with TypeScript-based actions, comprehensive accessibility support, and seamless Livewire integration. Every component is built with best practices, proper validation, and extensive customization options.

## Component Categories

### Core Components

#### Layout & Structure
- [**Main**](./components/main.md) - Application main layout container
- [**Sidebar**](./components/sidebar.md) - Navigation sidebar with sections, items, and dividers
- [**Card**](./components/card.md) - Flexible card container with header, body, footer, and actions
- [**Separator**](./components/separator.md) - Visual content divider

#### Navigation
- [**Breadcrumbs**](./components/breadcrumbs.md) - Hierarchical navigation trail
- [**Tabs**](./components/tabs.md) - Tabbed interface with multiple style variants
- [**Steps**](./components/steps.md) - Multi-step process indicator

#### Buttons & Actions
- [**Button**](./components/button.md) - Versatile button with multiple variants, sizes, and states
- [**Button.Group**](./components/button-group.md) - Grouped button layout

### Form Components

#### Text Inputs
- [**Input**](./components/input.md) - Text input with icons, actions, and validation
- [**Textarea**](./components/textarea.md) - Multi-line text input
- [**ColorPicker**](./components/color-picker.md) - Color selection input
- [**Range**](./components/range.md) - Slider input for numeric ranges

#### Selection Controls
- [**Select**](./components/select.md) - Dropdown select with search and multi-select
- [**Checkbox**](./components/checkbox.md) - Single checkbox with variants
- [**Checkbox.Group**](./components/checkbox-group.md) - Grouped checkbox inputs
- [**Radio**](./components/radio.md) - Single radio button with variants
- [**Radio.Group**](./components/radio-group.md) - Grouped radio button inputs
- [**Toggle**](./components/toggle.md) - Switch toggle input
- [**ChoiceGroup**](./components/choice-group.md) - Advanced choice selection

#### Date & Time
- [**DatePicker**](./components/date-picker.md) - Date selection with calendar
- [**TimePicker**](./components/time-picker.md) - Time selection input
- [**Calendar**](./components/calendar.md) - Standalone calendar component
- [**Countdown**](./components/countdown.md) - Countdown timer

#### File Management
- [**FileUpload**](./components/file-upload.md) - File upload with drag-and-drop
- [**Image**](./components/image.md) - Responsive image with lightbox

#### Form Utilities
- [**Field**](./components/field.md) - Form field wrapper with label and error handling
- [**Label**](./components/label.md) - Form label with tooltip support
- [**Error**](./components/error.md) - Validation error message display
- [**Group**](./components/group.md) - Input group container

### Feedback Components

#### Overlays
- [**Modal**](./components/modal.md) - Dialog modal with Livewire integration
- [**Slideout**](./components/slideout.md) - Side panel overlay
- [**Popover**](./components/popover.md) - Floating popover content
- [**Dropdown**](./components/dropdown.md) - Dropdown menu with items and submenus
- [**Tooltip**](./components/tooltip.md) - Contextual tooltips

#### Messages & Notifications
- [**Alert**](./components/alert.md) - Static alert messages
- [**Toast**](./components/toast.md) - Temporary notification messages
- [**EmptyState**](./components/empty-state.md) - Empty state placeholder

#### Progress Indicators
- [**Progress**](./components/progress.md) - Progress bar
- [**Loading**](./components/loading.md) - Loading spinner animations

### Display Components

#### Typography
- [**Heading**](./components/heading.md) - Semantic headings (h1-h6)
- [**Text**](./components/text.md) - Text with styling options
- [**Kbd**](./components/kbd.md) - Keyboard key display

#### Content Display
- [**Badge**](./components/badge.md) - Status and label badges
- [**Avatar**](./components/avatar.md) - User avatar with status
- [**Avatar.Stack**](./components/avatar-stack.md) - Stacked avatars
- [**Icon**](./components/icon.md) - Heroicon integration
- [**Rating**](./components/rating.md) - Star rating display

#### Data Display
- [**Table**](./components/table.md) - Data table with sorting and pagination
- [**Chart**](./components/chart.md) - Chart.js integration
- [**Accordion**](./components/accordion.md) - Collapsible content sections

### Rich Content

#### Editors
- [**Editor**](./components/editor.md) - Rich text editor (Quill.js)

#### Social
- [**Social.Links**](./components/social-links.md) - Social media link buttons
- [**Social.Share**](./components/social-share.md) - Social sharing buttons

### Utility Components

- [**Scripts**](./components/scripts.md) - Component initialization scripts
- [**HeadingDecorator**](./components/heading-decorator.md) - Heading decoration utility

## Component Structure

Every Keys UI component follows a consistent architecture:

### 1. PHP Component Class
Located in `packages/keys-ui/src/Components/`, component classes handle:
- Props validation using `ComponentConstants`
- Business logic and computed properties
- Data attribute generation for CSS/JS targeting
- View rendering

### 2. Blade Template
Located in `packages/keys-ui/resources/views/components/`, templates provide:
- Responsive, accessible HTML structure
- Tailwind CSS v4 styling
- Slot support for flexible composition
- Data attributes for JavaScript integration

### 3. TypeScript Actions
Located in `packages/keys-ui/resources/js/`, action files provide:
- Interactive behavior and state management
- Event handling
- DOM manipulation
- Integration with component props

## Usage

### Basic Usage

```blade
<x-keys::button color="primary" size="md">
    Click Me
</x-keys::button>
```

### With Icons

```blade
<x-keys::button icon-left="heroicon-o-plus" color="primary">
    Add Item
</x-keys::button>
```

### With Livewire

```blade
<x-keys::input
    wire:model="email"
    type="email"
    label="Email Address"
    :errors="$errors->get('email')"
/>
```

### Composition

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="lg">Card Title</x-keys::heading>
    </x-slot:header>

    Card content goes here.

    <x-slot:footer>
        <x-keys::button color="primary">Save</x-keys::button>
    </x-slot:footer>
</x-keys::card>
```

## Design System

### Color Palette

Keys UI uses a semantic color system:

- **Brand Colors**: `brand`, `primary`, `accent`
- **Contextual Colors**: `success`, `warning`, `danger`, `info`, `neutral`
- **Extended Colors**: `red`, `green`, `blue`, `purple`, `yellow`, `indigo`, `pink`, `gray`, `teal`, `orange`

### Size Scale

Components use a consistent size scale:

- `xs` - Extra Small
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large
- `xl` - Extra Large
- `full` - Full width (where applicable)

### Variants

Many components support multiple visual variants:

- **Button**: `solid`, `outlined`, `ghost`, `subtle`
- **Badge**: `filled`, `outlined`, `subtle`
- **Tabs**: `default`, `pills`, `underline`

## Accessibility

All Keys UI components are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

## Livewire Integration

Components are designed to work seamlessly with Livewire:

- `wire:model` binding support
- Validation error display
- Event listening
- Reactive updates
- Loading states

## Icons

Keys UI integrates with [Blade Heroicons](https://github.com/blade-ui-kit/blade-heroicons):

- Outline icons: `heroicon-o-*`
- Solid icons: `heroicon-s-*`
- Mini icons: `heroicon-m-*`

Example: `heroicon-o-user`, `heroicon-s-check`, `heroicon-m-bell`

## Customization

### Tailwind CSS

All components use Tailwind CSS v4 utility classes and can be customized via:

1. Passing additional classes via `class` attribute
2. Modifying the Tailwind configuration
3. Using CSS variables for theming

### Component Props

Every component exposes comprehensive props for customization. See individual component documentation for details.

### Extending Components

You can extend Keys UI components:

```php
namespace App\View\Components;

use Keys\UI\Components\Button as BaseButton;

class Button extends BaseButton
{
    // Add custom logic
}
```

## Development

### Building Assets

```bash
# Build once
php artisan keys:build

# Watch mode
php artisan keys:build --watch

# Dev mode with auto-publish
php artisan keys:build --dev --publish
```

### Running Tests

```bash
php artisan test
```

### Type Checking

```bash
cd packages/keys-ui
npm run typecheck
```

## Getting Started

1. Browse the component documentation in the left sidebar
2. Check out the examples in each component page
3. View the source code in `packages/keys-ui/`
4. Experiment with props and variants

## Next Steps

- [Button Component →](./components/button.md)
- [Alert Component →](./components/alert.md)
- [Modal Component →](./components/modal.md)
- [Input Component →](./components/input.md)
- [Dropdown Component →](./components/dropdown.md)

## Support

For issues, questions, or contributions, visit the [GitHub repository](https://github.com/yourusername/keys-ui).
