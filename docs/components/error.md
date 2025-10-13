# Error Component

Displays validation errors and messages with support for single or multiple error messages. Perfect for form validation feedback with optional icon display.

## Basic Usage

```blade
<x-keys::error :messages="$errors->get('email')" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `messages` | `string\|array\|Collection\|null` | `null` | Error message(s) to display |
| `show-icon` | `bool` | `true` | Whether to show error icon |
| `id` | `string\|null` | auto-generated | Custom ID for the error element |

## Message Formats

### Single String Message
```blade
<x-keys::error messages="This field is required" />
```

### Array of Messages
```blade
<x-keys::error :messages="['Email is required', 'Email must be valid']" />
```

### Laravel Validation Errors
```blade
<x-keys::error :messages="$errors->get('email')" />
```

### Collection
```blade
<x-keys::error :messages="collect(['Error 1', 'Error 2'])" />
```

## With/Without Icon

### With Icon (Default)
```blade
<x-keys::error :messages="$errors->get('password')" />
```

### Without Icon
```blade
<x-keys::error :messages="$errors->get('username')" :show-icon="false" />
```

## Form Field Integration

### Basic Field with Error
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

### Multiple Field Validations
```blade
<form wire:submit="save">
    <x-keys::field>
        <x-keys::label for="name">Name</x-keys::label>
        <x-keys::input id="name" wire:model="name" />
        <x-keys::error :messages="$errors->get('name')" />
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

    <x-keys::button type="submit" color="primary">
        Submit
    </x-keys::button>
</form>
```

## Conditional Display

### Show Only When Error Exists
```blade
@if($errors->has('email'))
    <x-keys::error :messages="$errors->get('email')" />
@endif
```

The component automatically handles empty/null messages and won't render if no errors exist:

```blade
<!-- This won't display anything if no errors -->
<x-keys::error :messages="$errors->get('email')" />
```

## Livewire Integration

### Real-Time Validation
```blade
<x-keys::field>
    <x-keys::label for="email">Email</x-keys::label>
    <x-keys::input
        id="email"
        type="email"
        wire:model.live="email"
    />
    <x-keys::error :messages="$errors->get('email')" />
</x-keys::field>
```

### Blur Validation
```blade
<x-keys::field>
    <x-keys::label for="username">Username</x-keys::label>
    <x-keys::input
        id="username"
        wire:model.blur="username"
    />
    <x-keys::error :messages="$errors->get('username')" />
</x-keys::field>
```

### Custom Validation Messages
```blade
<div>
    @if($customError)
        <x-keys::error :messages="$customError" />
    @endif
</div>
```

```php
class MyComponent extends Component
{
    public string $email = '';
    public ?string $customError = null;

    public function updatedEmail(): void
    {
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $this->customError = 'Please enter a valid email address';
        } else {
            $this->customError = null;
        }
    }
}
```

## Multiple Errors Display

When multiple errors exist for a field:

```blade
<x-keys::field>
    <x-keys::label for="password">Password</x-keys::label>
    <x-keys::input id="password" type="password" wire:model="password" />
    <!-- Will display all password-related errors as a list -->
    <x-keys::error :messages="$errors->get('password')" />
</x-keys::field>
```

Example validation rules that produce multiple errors:

```php
protected function rules(): array
{
    return [
        'password' => [
            'required',
            'min:8',
            'regex:/[a-z]/',      // lowercase
            'regex:/[A-Z]/',      // uppercase
            'regex:/[0-9]/',      // number
            'regex:/[@$!%*#?&]/', // special char
        ],
    ];
}

protected function messages(): array
{
    return [
        'password.required' => 'Password is required',
        'password.min' => 'Password must be at least 8 characters',
        'password.regex' => 'Password must contain lowercase, uppercase, numbers, and special characters',
    ];
}
```

## Styling Variations

### Custom Styling
```blade
<x-keys::error
    :messages="$errors->get('email')"
    class="mt-2"
/>
```

### In a Card
```blade
<x-keys::card>
    <form wire:submit="save">
        <x-keys::field>
            <x-keys::label for="title">Title</x-keys::label>
            <x-keys::input id="title" wire:model="title" />
            <x-keys::error :messages="$errors->get('title')" />
        </x-keys::field>

        <x-keys::button type="submit" color="primary">
            Save
        </x-keys::button>
    </form>
</x-keys::card>
```

## Component Methods

The Error component provides helper methods:

```php
$error = new Error(messages: ['Email is required']);

$error->hasErrors();              // true
$error->getMessages();            // ['Email is required']
$error->hasMultipleMessages();    // false
```

## Accessibility

The Error component includes accessibility features:

- ARIA attributes for error messages
- Role attributes for screen readers
- Proper semantic HTML
- Association with form fields via IDs
- Icon provides visual feedback

```blade
<x-keys::field>
    <x-keys::label for="email">Email</x-keys::label>
    <x-keys::input
        id="email"
        aria-describedby="email-error"
        :aria-invalid="$errors->has('email') ? 'true' : 'false'"
    />
    <x-keys::error
        id="email-error"
        :messages="$errors->get('email')"
    />
</x-keys::field>
```

## Data Attributes

The component generates data attributes for CSS targeting:

- `data-keys-error="true"` - Component identifier
- `data-message-count="1"` - Number of error messages
- `data-show-icon="true"` - Icon display state
- `data-multiple-messages="true"` - Multiple messages indicator

## Use Cases

### Login Form
```blade
<form wire:submit="login">
    <div class="space-y-6">
        <!-- General error message -->
        @if($loginError)
            <x-keys::alert type="danger">
                {{ $loginError }}
            </x-keys::alert>
        @endif

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
            Sign In
        </x-keys::button>
    </div>
</form>
```

### Profile Update Form
```blade
<form wire:submit="updateProfile">
    <x-keys::field>
        <x-keys::label for="name">Name</x-keys::label>
        <x-keys::input id="name" wire:model.blur="name" />
        <x-keys::error :messages="$errors->get('name')" />
    </x-keys::field>

    <x-keys::field>
        <x-keys::label for="bio">Bio</x-keys::label>
        <x-keys::textarea id="bio" wire:model="bio" rows="4" />
        <x-keys::text size="sm" variant="muted">
            {{ strlen($bio) }}/160 characters
        </x-keys::text>
        <x-keys::error :messages="$errors->get('bio')" />
    </x-keys::field>

    <div class="flex gap-3 justify-end">
        <x-keys::button variant="outlined" wire:click="cancel">
            Cancel
        </x-keys::button>
        <x-keys::button type="submit" color="primary">
            Update Profile
        </x-keys::button>
    </div>
</form>
```

### Complex Validation
```blade
<x-keys::field>
    <x-keys::label for="password">Password</x-keys::label>
    <x-keys::input
        id="password"
        type="password"
        wire:model.blur="password"
    />

    <!-- Password requirements -->
    <x-keys::text size="sm" variant="muted">
        Password must contain:
        <ul class="list-disc list-inside">
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
            <li>One special character</li>
        </ul>
    </x-keys::text>

    <!-- Validation errors -->
    <x-keys::error :messages="$errors->get('password')" />
</x-keys::field>
```

## Styling

The error component uses Tailwind CSS v4 and includes:

- Red color scheme for error indication
- Icon with error symbol
- Smooth transitions when appearing/disappearing
- Proper spacing with form elements
- Multiple message list formatting

## Best Practices

1. **Always show errors**: Display validation errors immediately after validation

2. **Use with Field component**: Combine with Field for proper spacing

3. **Provide clear messages**: Write helpful, actionable error messages

4. **Position correctly**: Place errors directly below the related input

5. **Show icons**: Keep icons enabled for visual feedback

6. **Clear errors**: Remove error messages when the user corrects the input

7. **Multiple errors**: Show all relevant errors for a field, not just the first

8. **Accessibility**: Ensure errors are announced to screen readers

## Component Structure

The Error component consists of:

1. **PHP Class** (`Error.php`)
   - Message normalization (string, array, Collection)
   - Error existence checking
   - Multiple message detection
   - Data attributes generation

2. **Blade Template** (`error.blade.php`)
   - Icon rendering
   - Single/multiple message display
   - ARIA attributes
   - Conditional rendering
