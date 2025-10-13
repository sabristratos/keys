# Field Component

A form field container component that provides consistent spacing and structure for form inputs. Used to wrap form elements like inputs, selects, textareas, and their associated labels and error messages.

## Basic Usage

```blade
<x-keys::field>
    <x-keys::label for="email">Email</x-keys::label>
    <x-keys::input id="email" type="email" />
    <x-keys::error :messages="$errors->get('email')" />
</x-keys::field>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spacing` | `string` | `'md'` | Spacing between field elements: `none`, `sm`, `md`, `lg` |
| `id` | `string\|null` | auto-generated | Custom ID for the field container |

## Spacing Variants

### None
No spacing between elements (useful when you need custom spacing).

```blade
<x-keys::field spacing="none">
    <x-keys::label for="name">Name</x-keys::label>
    <x-keys::input id="name" />
</x-keys::field>
```

### Small
```blade
<x-keys::field spacing="sm">
    <x-keys::label for="username">Username</x-keys::label>
    <x-keys::input id="username" />
    <x-keys::error :messages="$errors->get('username')" />
</x-keys::field>
```

### Medium (Default)
```blade
<x-keys::field spacing="md">
    <x-keys::label for="email">Email Address</x-keys::label>
    <x-keys::input id="email" type="email" />
    <x-keys::error :messages="$errors->get('email')" />
</x-keys::field>
```

### Large
```blade
<x-keys::field spacing="lg">
    <x-keys::label for="bio">Biography</x-keys::label>
    <x-keys::textarea id="bio" rows="4" />
    <x-keys::error :messages="$errors->get('bio')" />
</x-keys::field>
```

## With Different Input Types

### Text Input
```blade
<x-keys::field>
    <x-keys::label for="name">Full Name</x-keys::label>
    <x-keys::input id="name" type="text" placeholder="John Doe" />
</x-keys::field>
```

### Select
```blade
<x-keys::field>
    <x-keys::label for="country">Country</x-keys::label>
    <x-keys::select id="country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
    </x-keys::select>
</x-keys::field>
```

### Textarea
```blade
<x-keys::field>
    <x-keys::label for="message">Message</x-keys::label>
    <x-keys::textarea id="message" rows="4" placeholder="Enter your message..." />
</x-keys::field>
```

### Checkbox
```blade
<x-keys::field spacing="sm">
    <div class="flex items-center gap-2">
        <x-keys::checkbox id="terms" />
        <x-keys::label for="terms">I agree to the terms and conditions</x-keys::label>
    </div>
</x-keys::field>
```

### Toggle
```blade
<x-keys::field>
    <div class="flex items-center justify-between">
        <x-keys::label for="notifications">Email Notifications</x-keys::label>
        <x-keys::toggle id="notifications" />
    </div>
</x-keys::field>
```

## With Validation Errors

```blade
<x-keys::field>
    <x-keys::label for="email">Email</x-keys::label>
    <x-keys::input
        id="email"
        type="email"
        wire:model="email"
        :class="$errors->has('email') ? 'border-red-500' : ''"
    />
    <x-keys::error :messages="$errors->get('email')" />
</x-keys::field>
```

## With Help Text

```blade
<x-keys::field>
    <x-keys::label for="password">Password</x-keys::label>
    <x-keys::input id="password" type="password" />
    <x-keys::text size="sm" variant="muted">
        Must be at least 8 characters with uppercase, lowercase, and numbers.
    </x-keys::text>
</x-keys::field>
```

## Livewire Integration

### Basic Form Field
```blade
<x-keys::field>
    <x-keys::label for="name">Name</x-keys::label>
    <x-keys::input
        id="name"
        wire:model.live="name"
    />
    <x-keys::error :messages="$errors->get('name')" />
</x-keys::field>
```

### With Real-Time Validation
```blade
<form wire:submit="save">
    <x-keys::field>
        <x-keys::label for="email">Email</x-keys::label>
        <x-keys::input
            id="email"
            type="email"
            wire:model.blur="email"
        />
        <x-keys::error :messages="$errors->get('email')" />
    </x-keys::field>

    <x-keys::field>
        <x-keys::label for="password">Password</x-keys::label>
        <x-keys::input
            id="password"
            type="password"
            wire:model="password"
        />
        <x-keys::error :messages="$errors->get('password')" />
    </x-keys::field>

    <x-keys::button type="submit" color="primary">
        Save
    </x-keys::button>
</form>
```

## Form Groups

Combine multiple fields in a form:

```blade
<div class="space-y-6">
    <x-keys::field>
        <x-keys::label for="first_name">First Name</x-keys::label>
        <x-keys::input id="first_name" wire:model="firstName" />
        <x-keys::error :messages="$errors->get('firstName')" />
    </x-keys::field>

    <x-keys::field>
        <x-keys::label for="last_name">Last Name</x-keys::label>
        <x-keys::input id="last_name" wire:model="lastName" />
        <x-keys::error :messages="$errors->get('lastName')" />
    </x-keys::field>

    <x-keys::field>
        <x-keys::label for="email">Email</x-keys::label>
        <x-keys::input id="email" type="email" wire:model="email" />
        <x-keys::error :messages="$errors->get('email')" />
    </x-keys::field>
</div>
```

## Inline Fields

Create horizontal form layouts:

```blade
<div class="grid grid-cols-2 gap-4">
    <x-keys::field>
        <x-keys::label for="first_name">First Name</x-keys::label>
        <x-keys::input id="first_name" />
    </x-keys::field>

    <x-keys::field>
        <x-keys::label for="last_name">Last Name</x-keys::label>
        <x-keys::input id="last_name" />
    </x-keys::field>
</div>
```

## Complex Field Example

```blade
<x-keys::field spacing="lg">
    <x-keys::label for="address">
        Street Address
        <span class="text-red-500">*</span>
    </x-keys::label>

    <x-keys::input
        id="address"
        wire:model="address"
        placeholder="123 Main St"
        required
    />

    <x-keys::text size="sm" variant="muted">
        Enter your complete street address including apartment or unit number.
    </x-keys::text>

    <x-keys::error :messages="$errors->get('address')" />
</x-keys::field>
```

## Accessibility

The Field component promotes accessibility by:

- Providing consistent structure for form elements
- Encouraging proper label and input association
- Grouping related elements together
- Supporting error message display
- Maintaining appropriate spacing for readability

## Data Attributes

The component generates data attributes for CSS targeting:

- `data-keys-field="true"` - Component identifier
- `data-spacing="md"` - Spacing variant

## Use Cases

### Registration Form
```blade
<form wire:submit="register">
    <div class="space-y-6">
        <x-keys::field>
            <x-keys::label for="username">Username</x-keys::label>
            <x-keys::input id="username" wire:model="username" />
            <x-keys::error :messages="$errors->get('username')" />
        </x-keys::field>

        <x-keys::field>
            <x-keys::label for="email">Email</x-keys::label>
            <x-keys::input id="email" type="email" wire:model="email" />
            <x-keys::error :messages="$errors->get('email')" />
        </x-keys::field>

        <x-keys::field>
            <x-keys::label for="password">Password</x-keys::label>
            <x-keys::input id="password" type="password" wire:model="password" />
            <x-keys::error :messages="$errors->get('password')" />
        </x-keys::field>

        <x-keys::button type="submit" color="primary" class="w-full">
            Create Account
        </x-keys::button>
    </div>
</form>
```

### Profile Settings
```blade
<div class="space-y-6">
    <x-keys::field>
        <x-keys::label for="display_name">Display Name</x-keys::label>
        <x-keys::input id="display_name" wire:model="displayName" />
        <x-keys::text size="sm" variant="muted">
            This is how your name will appear to others.
        </x-keys::text>
    </x-keys::field>

    <x-keys::field>
        <x-keys::label for="bio">Bio</x-keys::label>
        <x-keys::textarea id="bio" wire:model="bio" rows="4" />
        <x-keys::text size="sm" variant="muted">
            {{ strlen($bio) }}/160 characters
        </x-keys::text>
    </x-keys::field>

    <x-keys::field spacing="sm">
        <div class="flex items-center justify-between">
            <div>
                <x-keys::label for="public_profile">Public Profile</x-keys::label>
                <x-keys::text size="sm" variant="muted">
                    Make your profile visible to everyone
                </x-keys::text>
            </div>
            <x-keys::toggle id="public_profile" wire:model="isPublic" />
        </div>
    </x-keys::field>
</div>
```

## Styling

The field component uses Tailwind CSS v4 for:

- Configurable vertical spacing between elements
- Clean, minimal styling
- Responsive layouts
- Consistent spacing across all form elements

## Best Practices

1. **Always use with labels**: Ensure every input has an associated label for accessibility

2. **Show errors clearly**: Use the Error component to display validation messages

3. **Provide help text**: Add guidance for complex or important fields

4. **Choose appropriate spacing**: Use larger spacing for forms with many fields

5. **Group related fields**: Use consistent spacing within field groups

6. **Required field indicators**: Mark required fields visually (e.g., with asterisks)

7. **Maintain consistency**: Use the same spacing variant throughout a form

## Component Structure

The Field component consists of:

1. **PHP Class** (`Field.php`)
   - Spacing validation
   - Auto-generated IDs
   - Data attributes generation

2. **Blade Template** (`field.blade.php`)
   - Spacing classes
   - Slot for field contents
