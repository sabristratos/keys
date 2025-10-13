# Input Component

A comprehensive form input component with icon support, actions, validation, and extensive customization. Supports various input types, auto-generated actions (clear, copy, password toggle), prefix/postfix text, and comprehensive error handling for Laravel validation.

## Basic Usage

```blade
<x-keys::input
    name="email"
    type="email"
    placeholder="Enter your email"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | HTML input type |
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | Auto from name | Input ID |
| `value` | `string\|null` | `null` | Input value |
| `placeholder` | `string\|null` | `null` | Placeholder text |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg`, `xl` |
| `disabled` | `bool` | `false` | Disabled state |
| `readonly` | `bool` | `false` | Readonly state |
| `required` | `bool` | `false` | Required field |
| `label` | `string\|null` | `null` | Label for shorthand mode |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display validation errors |
| `icon` | `string\|null` | `null` | Alias for `icon-left` |
| `icon-left` | `string\|null` | `null` | Left icon (Heroicon) |
| `icon-right` | `string\|null` | `null` | Right icon (Heroicon) |
| `hint` | `string\|null` | `null` | Hint text below input |
| `actions` | `array` | `[]` | Custom actions |
| `clearable` | `bool` | `false` | Enable clear button |
| `copyable` | `bool` | `false` | Enable copy button |
| `show-password` | `bool` | `false` | Enable password toggle |
| `external-url` | `string\|null` | `null` | Enable external link |
| `action-variant` | `string` | `'ghost'` | Action button variant |
| `action-size` | `string` | `'xs'` | Action button size |
| `has-error` | `bool` | `false` | Force error state |
| `prefix` | `string\|null` | `null` | Prefix text |
| `postfix` | `string\|null` | `null` | Postfix text |

## Shorthand Mode (with Label)

The simplest way to create a labeled input:

```blade
<x-keys::input
    name="email"
    type="email"
    label="Email Address"
    placeholder="you@example.com"
    required
/>
```

With optional indicator:
```blade
<x-keys::input
    name="phone"
    type="tel"
    label="Phone Number"
    :optional="true"
/>
```

## Standard Mode (without Label)

For custom layouts, omit the `label` prop:

```blade
<x-keys::label for="custom-email">Email</x-keys::label>
<x-keys::input
    id="custom-email"
    name="email"
    type="email"
/>
<x-keys::error :messages="$errors->get('email')" />
```

## Input Types

### Text (Default)
```blade
<x-keys::input name="username" label="Username" />
```

### Email
```blade
<x-keys::input type="email" name="email" label="Email" />
```

### Password
```blade
<x-keys::input type="password" name="password" label="Password" />
```

With password toggle:
```blade
<x-keys::input
    type="password"
    name="password"
    label="Password"
    :show-password="true"
/>
```

### Number
```blade
<x-keys::input type="number" name="age" label="Age" />
```

### Tel
```blade
<x-keys::input type="tel" name="phone" label="Phone Number" />
```

### URL
```blade
<x-keys::input type="url" name="website" label="Website" />
```

### Search
```blade
<x-keys::input
    type="search"
    name="query"
    placeholder="Search..."
    icon-left="heroicon-o-magnifying-glass"
/>
```

### Date
```blade
<x-keys::input type="date" name="birthday" label="Birthday" />
```

### Time
```blade
<x-keys::input type="time" name="appointment" label="Appointment Time" />
```

## With Icons

### Left Icon
```blade
<x-keys::input
    name="email"
    label="Email"
    icon-left="heroicon-o-envelope"
/>
```

### Right Icon
```blade
<x-keys::input
    name="website"
    label="Website"
    icon-right="heroicon-o-arrow-top-right-on-square"
/>
```

### Both Icons
```blade
<x-keys::input
    name="amount"
    type="number"
    label="Amount"
    icon-left="heroicon-o-currency-dollar"
    icon-right="heroicon-o-calculator"
/>
```

## Sizes

```blade
<x-keys::input size="xs" label="Extra Small" />
<x-keys::input size="sm" label="Small" />
<x-keys::input size="md" label="Medium (Default)" />
<x-keys::input size="lg" label="Large" />
<x-keys::input size="xl" label="Extra Large" />
```

## Actions

### Clearable
Add a clear button to empty the input:

```blade
<x-keys::input
    name="search"
    label="Search"
    :clearable="true"
    icon-left="heroicon-o-magnifying-glass"
/>
```

### Copyable
Add a copy-to-clipboard button:

```blade
<x-keys::input
    name="api-key"
    label="API Key"
    value="sk_live_abc123xyz"
    :copyable="true"
    readonly
/>
```

### Password Toggle
Show/hide password visibility:

```blade
<x-keys::input
    type="password"
    name="password"
    label="Password"
    :show-password="true"
/>
```

### External Link
Open input value in new tab:

```blade
<x-keys::input
    name="profile-url"
    label="Profile URL"
    :external-url="true"
/>
```

### Multiple Actions
Combine multiple actions:

```blade
<x-keys::input
    name="password"
    type="password"
    label="Password"
    :clearable="true"
    :show-password="true"
/>
```

## Prefix & Postfix

### Prefix Text
```blade
<x-keys::input
    name="domain"
    label="Domain"
    prefix="https://"
/>
```

### Postfix Text
```blade
<x-keys::input
    name="username"
    label="Twitter Handle"
    postfix="@twitter.com"
/>
```

### Currency
```blade
<x-keys::input
    type="number"
    name="price"
    label="Price"
    prefix="$"
    postfix="USD"
/>
```

## Validation & Errors

### With Livewire Validation
```blade
<x-keys::input
    wire:model="email"
    name="email"
    type="email"
    label="Email Address"
    :errors="$errors->get('email')"
    required
/>
```

### Manual Error State
```blade
<x-keys::input
    name="username"
    label="Username"
    :has-error="true"
    :errors="['Username is already taken']"
/>
```

### Without Error Display
```blade
<x-keys::input
    name="email"
    label="Email"
    :errors="$errors->get('email')"
    :show-errors="false"
/>
```

## With Hint Text

```blade
<x-keys::input
    name="password"
    type="password"
    label="Password"
    hint="Must be at least 8 characters with one uppercase letter and one number"
/>
```

## States

### Disabled
```blade
<x-keys::input
    name="email"
    label="Email"
    value="user@example.com"
    :disabled="true"
/>
```

### Readonly
```blade
<x-keys::input
    name="id"
    label="User ID"
    value="12345"
    :readonly="true"
    :copyable="true"
/>
```

### Required
```blade
<x-keys::input
    name="email"
    label="Email Address"
    :required="true"
/>
```

## Livewire Integration

### Two-Way Binding
```blade
<x-keys::input
    wire:model="email"
    name="email"
    label="Email"
    type="email"
/>
```

### Live Binding
```blade
<x-keys::input
    wire:model.live="search"
    name="search"
    label="Search"
    icon-left="heroicon-o-magnifying-glass"
/>
```

### With Debounce
```blade
<x-keys::input
    wire:model.live.debounce.500ms="query"
    name="query"
    label="Search"
    :clearable="true"
/>
```

### With Blur
```blade
<x-keys::input
    wire:model.blur="username"
    name="username"
    label="Username"
/>
```

### Loading State
```blade
<x-keys::input
    wire:model.live="search"
    name="search"
    label="Search"
>
    <x-slot:icon-right>
        <div wire:loading wire:target="search">
            <x-keys::loading size="xs" animation="spinner" />
        </div>
    </x-slot:icon-right>
</x-keys::input>
```

## Complete Forms

### Login Form
```blade
<form wire:submit="login">
    <div class="space-y-4">
        <x-keys::input
            wire:model="email"
            type="email"
            name="email"
            label="Email Address"
            icon-left="heroicon-o-envelope"
            :errors="$errors->get('email')"
            required
        />

        <x-keys::input
            wire:model="password"
            type="password"
            name="password"
            label="Password"
            icon-left="heroicon-o-lock-closed"
            :show-password="true"
            :errors="$errors->get('password')"
            required
        />

        <x-keys::button type="submit" color="primary" class="w-full">
            Sign In
        </x-keys::button>
    </div>
</form>
```

### Profile Form
```blade
<form wire:submit="updateProfile">
    <div class="space-y-4">
        <x-keys::input
            wire:model="name"
            name="name"
            label="Full Name"
            :errors="$errors->get('name')"
            required
        />

        <x-keys::input
            wire:model="email"
            type="email"
            name="email"
            label="Email"
            icon-left="heroicon-o-envelope"
            :errors="$errors->get('email')"
            required
        />

        <x-keys::input
            wire:model="phone"
            type="tel"
            name="phone"
            label="Phone Number"
            icon-left="heroicon-o-phone"
            :errors="$errors->get('phone')"
            :optional="true"
        />

        <x-keys::input
            wire:model="website"
            type="url"
            name="website"
            label="Website"
            prefix="https://"
            :errors="$errors->get('website')"
            :optional="true"
        />

        <div class="flex justify-end gap-3">
            <x-keys::button variant="ghost" type="button">
                Cancel
            </x-keys::button>
            <x-keys::button type="submit" color="primary">
                Save Changes
            </x-keys::button>
        </div>
    </div>
</form>
```

### Search Form
```blade
<form wire:submit="search">
    <x-keys::input
        wire:model.live.debounce.300ms="query"
        name="query"
        type="search"
        placeholder="Search products..."
        icon-left="heroicon-o-magnifying-glass"
        :clearable="true"
        size="lg"
    />

    @if ($query)
        <div class="mt-4">
            <!-- Search results -->
        </div>
    @endif
</form>
```

## Use Cases

### Email Input
```blade
<x-keys::input
    wire:model.blur="email"
    type="email"
    name="email"
    label="Email Address"
    icon-left="heroicon-o-envelope"
    placeholder="you@example.com"
    :errors="$errors->get('email')"
    hint="We'll never share your email with anyone"
    required
/>
```

### API Key Display
```blade
<x-keys::input
    name="api-key"
    label="API Key"
    :value="auth()->user()->api_key"
    :readonly="true"
    :copyable="true"
    hint="Keep this key secret and secure"
/>
```

### URL with Preview
```blade
<x-keys::input
    wire:model="url"
    name="url"
    type="url"
    label="Website URL"
    prefix="https://"
    :external-url="true"
    :errors="$errors->get('url')"
/>
```

### Price Input
```blade
<x-keys::input
    wire:model="price"
    type="number"
    name="price"
    label="Price"
    prefix="$"
    postfix="USD"
    step="0.01"
    min="0"
    :errors="$errors->get('price')"
/>
```

### Search with Live Results
```blade
<x-keys::input
    wire:model.live.debounce.300ms="searchTerm"
    name="search"
    type="search"
    placeholder="Search..."
    icon-left="heroicon-o-magnifying-glass"
    :clearable="true"
    size="lg"
/>
```

## Accessibility

The Input component includes comprehensive accessibility features:

- Proper label association via `for` attribute
- Required indicators
- Error message association via `aria-describedby`
- Disabled state with proper attributes
- Focus-visible styles
- Screen reader support for actions

```blade
<x-keys::input
    name="email"
    label="Email Address"
    type="email"
    required
    aria-describedby="email-hint"
/>
<span id="email-hint" class="text-sm text-text-muted">
    We'll use this to send you updates
</span>
```

## Component Structure

The Input component consists of:

1. **PHP Class** (`Input.php`)
   - Props validation
   - Auto-generated actions
   - Error handling
   - Data attributes generation
   - Shorthand mode detection

2. **Blade Template** (`input.blade.php`)
   - Responsive wrapper
   - Icon positioning
   - Action buttons
   - Error display
   - Hint text

3. **TypeScript Actions** (`FormActions.ts`)
   - Clear functionality
   - Copy to clipboard
   - Password toggle
   - External link opening

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-input="true"` - Component identifier
- `data-type="text"` - Input type
- `data-size="md"` - Size variant
- `data-disabled="true"` - Disabled state
- `data-readonly="true"` - Readonly state
- `data-required="true"` - Required field
- `data-invalid="true"` - Error state
- `data-has-icon-left="true"` - Has left icon
- `data-has-icon-right="true"` - Has right icon
- `data-has-actions="true"` - Has actions
- `data-clearable="true"` - Clearable
- `data-copyable="true"` - Copyable
- `data-password-toggle="true"` - Password toggle
- `data-has-value="true"` - Has value
- `data-has-prefix="true"` - Has prefix
- `data-has-postfix="true"` - Has postfix

## Best Practices

1. **Use shorthand mode when possible**: Simpler syntax for most cases

2. **Provide labels**: Always include labels for accessibility

3. **Show validation errors**: Help users fix mistakes

4. **Use appropriate input types**: Ensures correct keyboard on mobile

5. **Add hint text for complex fields**: Guide users on requirements

6. **Use icons meaningfully**: Icons should clarify the input purpose

7. **Make clearable when appropriate**: Help users quickly reset inputs

8. **Handle loading states**: Show feedback during validation

9. **Use readonly for display**: Don't disable copyable content

10. **Group related inputs**: Use proper form structure
