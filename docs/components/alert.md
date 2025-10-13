# Alert Component

A versatile alert component for displaying notifications, messages, and status updates. Features semantic color variants, dismissible functionality, optional titles and icons, and comprehensive accessibility support.

## Basic Usage

```blade
<x-keys::alert variant="info">
    This is an informational message.
</x-keys::alert>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'info'` | Alert type: `info`, `success`, `warning`, `danger`, `neutral`, `brand` |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |
| `icon` | `string\|null` | Auto-detected | Custom icon name (Heroicon) or `null` to use default |
| `title` | `string\|null` | `null` | Optional alert title |
| `dismissible` | `bool` | `false` | Enable close/dismiss button |
| `id` | `string\|null` | Auto-generated | Alert ID (auto-generated for dismissible alerts) |

## Variants

Each variant has a semantic color scheme and default icon:

### Info (Default)
```blade
<x-keys::alert variant="info">
    Your profile has been updated successfully.
</x-keys::alert>
```

### Success
```blade
<x-keys::alert variant="success">
    Your changes have been saved.
</x-keys::alert>
```

### Warning
```blade
<x-keys::alert variant="warning">
    Your subscription will expire in 3 days.
</x-keys::alert>
```

### Danger
```blade
<x-keys::alert variant="danger">
    There was an error processing your request.
</x-keys::alert>
```

### Neutral
```blade
<x-keys::alert variant="neutral">
    This is a neutral message.
</x-keys::alert>
```

### Brand
```blade
<x-keys::alert variant="brand">
    Check out our new features!
</x-keys::alert>
```

## Default Icons

Each variant has an automatic icon:

- **Info**: `heroicon-o-information-circle`
- **Success**: `heroicon-o-check-circle`
- **Warning**: `heroicon-o-exclamation-triangle`
- **Danger**: `heroicon-o-x-circle`
- **Neutral**: `heroicon-o-chat-bubble-left-ellipsis`
- **Brand**: `heroicon-o-star`

## With Title

```blade
<x-keys::alert variant="success" title="Success!">
    Your account has been created and you can now log in.
</x-keys::alert>
```

## Custom Icon

Override the default icon:

```blade
<x-keys::alert variant="info" icon="heroicon-o-light-bulb">
    Did you know? You can customize your dashboard layout.
</x-keys::alert>
```

Remove the icon entirely:

```blade
<x-keys::alert variant="info" :icon="null">
    This alert has no icon.
</x-keys::alert>
```

Note: Empty string values are treated as null, so the default icon will be used.

## Sizes

### Small
```blade
<x-keys::alert variant="success" size="sm">
    Compact success message.
</x-keys::alert>
```

### Medium (Default)
```blade
<x-keys::alert variant="success" size="md">
    Standard success message with medium padding.
</x-keys::alert>
```

### Large
```blade
<x-keys::alert variant="success" size="lg">
    Large success message with extra padding and larger text.
</x-keys::alert>
```

## Dismissible Alerts

Enable dismiss functionality:

```blade
<x-keys::alert variant="info" :dismissible="true">
    This alert can be closed by clicking the X button.
</x-keys::alert>
```

With custom ID:

```blade
<x-keys::alert variant="info" :dismissible="true" id="welcome-alert">
    Welcome! This is a one-time message.
</x-keys::alert>
```

## With Actions

Add action buttons using the `actions` slot:

```blade
<x-keys::alert variant="warning">
    Your subscription is about to expire.

    <x-slot:actions>
        <x-keys::button size="xs" color="warning">
            Renew Now
        </x-keys::button>
        <x-keys::button size="xs" variant="ghost">
            Learn More
        </x-keys::button>
    </x-slot:actions>
</x-keys::alert>
```

## Complex Content

### With Title and Actions
```blade
<x-keys::alert variant="danger" title="Payment Failed" :dismissible="true">
    We couldn't process your payment. Please update your payment method to continue using our service.

    <x-slot:actions>
        <x-keys::button size="xs" color="danger">
            Update Payment
        </x-keys::button>
        <x-keys::button size="xs" variant="ghost">
            Contact Support
        </x-keys::button>
    </x-slot:actions>
</x-keys::alert>
```

### With List
```blade
<x-keys::alert variant="warning" title="Action Required">
    Please complete the following steps:

    <ul class="list-disc list-inside mt-2 space-y-1">
        <li>Verify your email address</li>
        <li>Complete your profile</li>
        <li>Set up two-factor authentication</li>
    </ul>
</x-keys::alert>
```

## Livewire Integration

### Display Validation Errors
```blade
@if ($errors->any())
    <x-keys::alert variant="danger" title="Validation Errors" :dismissible="true">
        <ul class="list-disc list-inside space-y-1">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </x-keys::alert>
@endif
```

### Flash Messages
```blade
@if (session('success'))
    <x-keys::alert variant="success" :dismissible="true">
        {{ session('success') }}
    </x-keys::alert>
@endif

@if (session('error'))
    <x-keys::alert variant="danger" :dismissible="true">
        {{ session('error') }}
    </x-keys::alert>
@endif
```

### Dynamic Alerts
```blade
@if ($showAlert)
    <x-keys::alert :variant="$alertType" :dismissible="true">
        {{ $alertMessage }}
    </x-keys::alert>
@endif
```

## Accessibility

The Alert component includes comprehensive accessibility features:

- `role="alert"` for screen readers
- `aria-live="polite"` for dynamic updates
- Proper heading hierarchy when using titles
- Keyboard-accessible dismiss button
- Clear color contrast for all variants
- Icon + text for multiple sensory channels

```blade
<x-keys::alert variant="success" role="alert" aria-live="polite">
    Your changes have been saved successfully.
</x-keys::alert>
```

## Use Cases

### Success Confirmation
```blade
<x-keys::alert variant="success" title="Profile Updated" :dismissible="true">
    Your profile information has been updated successfully.
</x-keys::alert>
```

### Error Message
```blade
<x-keys::alert variant="danger" title="Error">
    There was a problem processing your request. Please try again later.
</x-keys::alert>
```

### Warning Notice
```blade
<x-keys::alert variant="warning" title="Limited Time Offer" :dismissible="true">
    Upgrade to Pro before the end of the month and save 20%!

    <x-slot:actions>
        <x-keys::button size="xs" color="warning">
            Upgrade Now
        </x-keys::button>
    </x-slot:actions>
</x-keys::alert>
```

### Information Banner
```blade
<x-keys::alert variant="info" icon="heroicon-o-megaphone">
    We've launched new features! Check out our updated dashboard.
</x-keys::alert>
```

### Feature Announcement
```blade
<x-keys::alert variant="brand" title="New Features Available!" size="lg">
    We've added powerful new tools to help you work more efficiently.

    <x-slot:actions>
        <x-keys::button size="sm" color="primary">
            Learn More
        </x-keys::button>
    </x-slot:actions>
</x-keys::alert>
```

## Styling

The alert component uses Tailwind CSS v4 and includes:

- Semantic color schemes for each variant
- Border and background colors matching the variant
- Icon colors matching the variant
- Responsive padding and spacing
- Smooth dismiss animations
- Focus-visible styles for dismiss button

## Component Structure

The Alert component consists of:

1. **PHP Class** (`Alert.php`)
   - Props validation
   - Default icon detection
   - Title checking
   - ID generation for dismissible alerts
   - Data attributes generation

2. **Blade Template** (`alert.blade.php`)
   - Responsive layout structure
   - Icon positioning
   - Optional title rendering
   - Actions slot support
   - Dismiss button integration

3. **TypeScript Actions** (`AlertActions.ts`)
   - Dismiss functionality
   - Animation handling
   - Event dispatching

## Data Attributes

The component generates comprehensive data attributes for CSS targeting:

- `data-keys-alert="true"` - Component identifier
- `data-variant="info"` - Alert variant
- `data-size="md"` - Size variant
- `data-dismissible="true"` - Dismissible state
- `data-alert-id="..."` - Alert ID
- `data-has-icon="true"` - Has icon
- `data-icon="..."` - Icon name
- `data-has-title="true"` - Has title
- `data-has-actions="true"` - Has actions
- `data-icon-size="md"` - Icon size

## Best Practices

1. **Use appropriate variants**: Match the variant to the message intent (success for confirmations, danger for errors)

2. **Keep messages concise**: Short, clear messages are more effective

3. **Use titles for complex messages**: Titles help users quickly understand the alert purpose

4. **Make important alerts dismissible**: Allow users to close alerts they've acknowledged

5. **Provide actionable information**: Include next steps or actions when appropriate

6. **Don't overuse alerts**: Too many alerts can overwhelm users

7. **Consider timing**: For success messages, consider using Toast instead for temporary notifications

## Examples

### Complete Form Feedback
```blade
<form wire:submit="save">
    @if ($errors->any())
        <x-keys::alert variant="danger" title="Please fix the following errors:" class="mb-4">
            <ul class="list-disc list-inside space-y-1">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </x-keys::alert>
    @endif

    @if (session('success'))
        <x-keys::alert variant="success" :dismissible="true" class="mb-4">
            {{ session('success') }}
        </x-keys::alert>
    @endif

    <!-- form fields -->

    <x-keys::button type="submit" color="primary">
        Save Changes
    </x-keys::button>
</form>
```

### Multi-Action Alert
```blade
<x-keys::alert variant="warning" title="Account Security" size="lg">
    We detected a login from a new device. If this wasn't you, please secure your account immediately.

    <x-slot:actions>
        <x-keys::button size="sm" color="danger">
            Secure Account
        </x-keys::button>
        <x-keys::button size="sm" variant="outlined">
            Review Activity
        </x-keys::button>
        <x-keys::button size="sm" variant="ghost">
            Dismiss
        </x-keys::button>
    </x-slot:actions>
</x-keys::alert>
```

### Promotional Alert
```blade
<x-keys::alert variant="brand" icon="heroicon-o-gift" :dismissible="true">
    <strong>Special Offer:</strong> Get 3 months free when you upgrade to our annual plan this week.

    <x-slot:actions>
        <x-keys::button href="/pricing" size="xs" color="primary">
            View Plans
        </x-keys::button>
    </x-slot:actions>
</x-keys::alert>
```
