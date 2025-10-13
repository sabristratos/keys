# Label Component

A comprehensive form label component with tooltip support, required/optional indicators, icons, and full accessibility support. Automatically integrates with form controls and provides clear visual feedback for field requirements.

## Basic Usage

```blade
<x-keys::label for="email">Email Address</x-keys::label>
<x-keys::input id="email" type="email" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `for` | `string\|null` | `null` | ID of the associated form control |
| `size` | `string` | `'md'` | Size variant: `sm`, `md`, `lg` |
| `required` | `bool` | `false` | Show required indicator (*) |
| `optional` | `bool` | `false` | Show optional text |
| `tooltip` | `string\|null` | `null` | Tooltip content for info icon |
| `tooltipPlacement` | `string` | `'top'` | Tooltip placement: `top`, `bottom`, `left`, `right` |
| `tooltipColor` | `string` | `'dark'` | Tooltip color: `dark`, `light` |
| `id` | `string\|null` | Auto-generated | Custom ID for the label element |
| `icon` | `string\|null` | `null` | Icon name to display before label text |
| `iconSize` | `string` | `'xs'` | Icon size: `xs`, `sm`, `md`, `lg` |

## Size Variants

### Small
```blade
<x-keys::label for="username" size="sm">Username</x-keys::label>
<x-keys::input id="username" size="sm" />
```

### Medium (Default)
```blade
<x-keys::label for="email" size="md">Email</x-keys::label>
<x-keys::input id="email" />
```

### Large
```blade
<x-keys::label for="password" size="lg">Password</x-keys::label>
<x-keys::input id="password" type="password" size="lg" />
```

## Required Fields

### With Asterisk
```blade
<x-keys::label for="name" :required="true">Full Name</x-keys::label>
<x-keys::input id="name" required />
```

### Multiple Required Fields
```blade
<div class="space-y-4">
    <div>
        <x-keys::label for="email" :required="true">Email</x-keys::label>
        <x-keys::input id="email" type="email" required />
    </div>

    <div>
        <x-keys::label for="password" :required="true">Password</x-keys::label>
        <x-keys::input id="password" type="password" required />
    </div>
</div>
```

## Optional Fields

Show optional indicator for clarity:

```blade
<x-keys::label for="phone" :optional="true">Phone Number</x-keys::label>
<x-keys::input id="phone" type="tel" />
```

### Form with Mixed Required/Optional
```blade
<div class="space-y-4">
    <div>
        <x-keys::label for="name" :required="true">Name</x-keys::label>
        <x-keys::input id="name" required />
    </div>

    <div>
        <x-keys::label for="company" :optional="true">Company</x-keys::label>
        <x-keys::input id="company" />
    </div>

    <div>
        <x-keys::label for="website" :optional="true">Website</x-keys::label>
        <x-keys::input id="website" type="url" />
    </div>
</div>
```

## With Tooltips

### Simple Tooltip
```blade
<x-keys::label
    for="username"
    :required="true"
    tooltip="Your username must be unique and between 3-20 characters"
>
    Username
</x-keys::label>
<x-keys::input id="username" />
```

### Tooltip Placement
```blade
<x-keys::label
    for="email"
    tooltip="We'll never share your email with anyone"
    tooltipPlacement="right"
>
    Email Address
</x-keys::label>
<x-keys::input id="email" type="email" />
```

### Light Tooltip
```blade
<x-keys::label
    for="password"
    tooltip="Password must be at least 8 characters"
    tooltipColor="light"
>
    Password
</x-keys::label>
<x-keys::input id="password" type="password" />
```

### Complex Tooltip Content
```blade
<x-keys::label
    for="apiKey"
    :required="true"
    tooltip="Your API key is used to authenticate requests. Keep it secret and never commit it to version control."
    tooltipPlacement="bottom"
>
    API Key
</x-keys::label>
<x-keys::input id="apiKey" type="password" />
```

## With Icons

### Icon Before Label
```blade
<x-keys::label
    for="email"
    icon="heroicon-o-envelope"
    :required="true"
>
    Email Address
</x-keys::label>
<x-keys::input id="email" type="email" />
```

### Different Icon Sizes
```blade
<x-keys::label
    for="search"
    icon="heroicon-o-magnifying-glass"
    iconSize="sm"
>
    Search
</x-keys::label>
<x-keys::input id="search" />
```

### Icon with Tooltip
```blade
<x-keys::label
    for="username"
    icon="heroicon-o-user"
    tooltip="Choose a unique username"
    :required="true"
>
    Username
</x-keys::label>
<x-keys::input id="username" />
```

## Real-World Examples

### Registration Form
```blade
<form wire:submit="register">
    <div class="space-y-4">
        <div>
            <x-keys::label
                for="fullName"
                :required="true"
                icon="heroicon-o-user"
            >
                Full Name
            </x-keys::label>
            <x-keys::input
                id="fullName"
                wire:model="fullName"
                :errors="$errors->get('fullName')"
            />
        </div>

        <div>
            <x-keys::label
                for="email"
                :required="true"
                icon="heroicon-o-envelope"
                tooltip="We'll send a verification email to this address"
            >
                Email Address
            </x-keys::label>
            <x-keys::input
                id="email"
                type="email"
                wire:model="email"
                :errors="$errors->get('email')"
            />
        </div>

        <div>
            <x-keys::label
                for="password"
                :required="true"
                icon="heroicon-o-lock-closed"
                tooltip="Must be at least 8 characters with one number and one special character"
            >
                Password
            </x-keys::label>
            <x-keys::input
                id="password"
                type="password"
                wire:model="password"
                :errors="$errors->get('password')"
            />
        </div>

        <div>
            <x-keys::label
                for="phone"
                :optional="true"
                icon="heroicon-o-phone"
            >
                Phone Number
            </x-keys::label>
            <x-keys::input
                id="phone"
                type="tel"
                wire:model="phone"
            />
        </div>
    </div>

    <x-keys::button type="submit" class="mt-6">
        Create Account
    </x-keys::button>
</form>
```

### Settings Form
```blade
<div class="space-y-6">
    <div>
        <x-keys::label
            for="displayName"
            :required="true"
            tooltip="This is how your name will appear to other users"
        >
            Display Name
        </x-keys::label>
        <x-keys::input id="displayName" wire:model="displayName" />
    </div>

    <div>
        <x-keys::label
            for="bio"
            :optional="true"
            tooltip="Tell others about yourself (max 500 characters)"
            tooltipPlacement="right"
        >
            Bio
        </x-keys::label>
        <x-keys::textarea id="bio" wire:model="bio" rows="4" />
    </div>

    <div>
        <x-keys::label
            for="website"
            :optional="true"
            icon="heroicon-o-globe-alt"
        >
            Website
        </x-keys::label>
        <x-keys::input id="website" type="url" wire:model="website" />
    </div>

    <div>
        <x-keys::label
            for="timezone"
            :required="true"
            tooltip="Used for displaying dates and times"
        >
            Timezone
        </x-keys::label>
        <x-keys::select id="timezone" wire:model="timezone">
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
        </x-keys::select>
    </div>
</div>
```

### Contact Form
```blade
<form wire:submit="sendMessage">
    <div class="space-y-4">
        <div>
            <x-keys::label for="name" :required="true">
                Your Name
            </x-keys::label>
            <x-keys::input
                id="name"
                wire:model="name"
                placeholder="John Doe"
            />
        </div>

        <div>
            <x-keys::label
                for="email"
                :required="true"
                tooltip="We'll use this to reply to your message"
            >
                Email
            </x-keys::label>
            <x-keys::input
                id="email"
                type="email"
                wire:model="email"
                placeholder="john@example.com"
            />
        </div>

        <div>
            <x-keys::label
                for="subject"
                :required="true"
            >
                Subject
            </x-keys::label>
            <x-keys::input
                id="subject"
                wire:model="subject"
                placeholder="How can we help?"
            />
        </div>

        <div>
            <x-keys::label
                for="message"
                :required="true"
                tooltip="Please provide as much detail as possible"
            >
                Message
            </x-keys::label>
            <x-keys::textarea
                id="message"
                wire:model="message"
                rows="6"
                placeholder="Your message..."
            />
        </div>
    </div>

    <x-keys::button type="submit" class="mt-6">
        Send Message
    </x-keys::button>
</form>
```

### Search Form
```blade
<div class="flex items-end gap-4">
    <div class="flex-1">
        <x-keys::label
            for="search"
            size="sm"
            icon="heroicon-o-magnifying-glass"
        >
            Search
        </x-keys::label>
        <x-keys::input
            id="search"
            wire:model.live="search"
            placeholder="Search products..."
            size="sm"
        />
    </div>

    <div class="w-48">
        <x-keys::label
            for="category"
            size="sm"
            :optional="true"
        >
            Category
        </x-keys::label>
        <x-keys::select id="category" wire:model.live="category" size="sm">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
        </x-keys::select>
    </div>

    <x-keys::button size="sm">Search</x-keys::button>
</div>
```

### Checkbox with Label
```blade
<div class="flex items-start gap-2">
    <x-keys::checkbox id="terms" wire:model="acceptedTerms" />
    <x-keys::label
        for="terms"
        :required="true"
        class="mb-0"
    >
        I accept the terms and conditions
    </x-keys::label>
</div>
```

### Radio Group with Labels
```blade
<fieldset>
    <legend class="text-sm font-medium mb-3">Select Plan</legend>

    <div class="space-y-3">
        <div class="flex items-center gap-2">
            <x-keys::radio id="plan-basic" name="plan" value="basic" />
            <x-keys::label for="plan-basic" class="mb-0">
                Basic - $9/month
            </x-keys::label>
        </div>

        <div class="flex items-center gap-2">
            <x-keys::radio id="plan-pro" name="plan" value="pro" />
            <x-keys::label
                for="plan-pro"
                class="mb-0"
                tooltip="Includes all basic features plus advanced analytics"
            >
                Pro - $29/month
            </x-keys::label>
        </div>

        <div class="flex items-center gap-2">
            <x-keys::radio id="plan-enterprise" name="plan" value="enterprise" />
            <x-keys::label
                for="plan-enterprise"
                class="mb-0"
                tooltip="Custom solutions for large teams"
            >
                Enterprise - Contact us
            </x-keys::label>
        </div>
    </div>
</fieldset>
```

## With Livewire Validation

```blade
<div>
    <x-keys::label
        for="username"
        :required="true"
        tooltip="Username must be unique"
    >
        Username
    </x-keys::label>

    <x-keys::input
        id="username"
        wire:model.blur="username"
        :errors="$errors->get('username')"
    />

    @error('username')
        <x-keys::text size="xs" class="text-danger mt-1">
            {{ $message }}
        </x-keys::text>
    @enderror
</div>
```

## Accessibility

The Label component includes comprehensive accessibility features:

- Semantic `<label>` element
- Proper `for` attribute linking to form controls
- ARIA labels for required fields ("required field")
- Tooltip content accessible via keyboard
- Screen reader friendly required/optional indicators
- Sufficient color contrast for all text
- Focus-visible states for interactive elements

```blade
<x-keys::label
    for="email"
    :required="true"
    tooltip="Your email address for account notifications"
>
    Email Address
</x-keys::label>
```

## Localization

The Label component uses localized strings for indicators:

- Required field ARIA label: `keys-ui::keys-ui.aria.required_field`
- Optional text: `keys-ui::keys-ui.labels.optional`

Override these in your language files:

```php
// resources/lang/en/keys-ui/keys-ui.php
return [
    'aria' => [
        'required_field' => 'Required field',
    ],
    'labels' => [
        'optional' => 'optional',
    ],
];
```

## Styling

### Custom Classes
```blade
<x-keys::label for="email" class="mb-4 text-brand">
    Email Address
</x-keys::label>
```

### Inline with Form Control
```blade
<div class="flex items-center gap-2">
    <x-keys::label for="remember" class="mb-0 order-2">
        Remember me
    </x-keys::label>
    <x-keys::checkbox id="remember" class="order-1" />
</div>
```

## Best Practices

1. **Always associate labels**: Use the `for` attribute to link labels with form controls

2. **Be clear about requirements**: Use `required` for mandatory fields

3. **Use tooltips sparingly**: Add tooltips only when additional context is needed

4. **Keep tooltip text concise**: Aim for 1-2 sentences maximum

5. **Match sizes**: Use the same size for label and input

6. **Use icons consistently**: If using icons, apply them to all similar fields

7. **Provide helpful error messages**: Combine with validation error display

8. **Consider optional indicators**: Show "optional" on forms where most fields are required

9. **Test accessibility**: Ensure screen readers can navigate your forms

10. **Localize text**: Use translation keys for required/optional indicators

## Component Structure

The Label component consists of:

1. **PHP Class** (`Label.php`)
   - Props validation and defaults
   - Tooltip configuration
   - Icon handling
   - Data attributes generation

2. **Blade Template** (`label.blade.php`)
   - Semantic label element
   - Text component integration
   - Icon rendering
   - Tooltip with info icon
   - Required/optional indicators
   - Conditional rendering logic

## Data Attributes

The component generates helpful data attributes:

- `data-keys-label="true"` - Component identifier
- `data-size="md"` - Size variant
- `data-for="input-id"` - Associated control ID
- `data-required="true"` - Required field indicator
- `data-optional="true"` - Optional field indicator
- `data-has-tooltip="true"` - Tooltip presence
- `data-has-icon="true"` - Icon presence
