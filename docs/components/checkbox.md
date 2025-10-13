# Checkbox Component

A versatile checkbox component with multiple variants, indeterminate state, icon support, and comprehensive Livewire integration. Features standard, bordered, colored, and card variants for different UI contexts.

## Basic Usage

```blade
<x-keys::checkbox
    wire:model="accepted"
    name="accepted"
    label="I accept the terms and conditions"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | Auto-generated | Checkbox ID |
| `value` | `string\|null` | `'1'` | Value when checked |
| `checked` | `bool` | `false` | Checked state |
| `disabled` | `bool` | `false` | Disabled state |
| `required` | `bool` | `false` | Required field |
| `indeterminate` | `bool` | `false` | Indeterminate state (mixed) |
| `variant` | `string` | `'standard'` | Variant: `standard`, `bordered`, `colored`, `card` |
| `color` | `string` | `'brand'` | Color: `brand`, `success`, `warning`, `danger`, `info`, `neutral` |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg`, `xl` |
| `label` | `string\|null` | `null` | Label text |
| `description` | `string\|null` | `null` | Description text |
| `title` | `string\|null` | `null` | Title (for card variant) |
| `icon` | `string\|null` | `null` | Icon name (Heroicon) |
| `label-position` | `string` | `'right'` | Label position: `left`, `right` |
| `errors` | `string\|array\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display errors |
| `has-error` | `bool` | `false` | Force error state |
| `actions` | `array` | `[]` | Custom actions |
| `action-variant` | `string` | `'ghost'` | Action button variant |
| `action-size` | `string` | `'xs'` | Action button size |
| `show-input` | `bool` | `true` | Show hidden input |
| `indicator` | `bool` | `true` | Show checkbox indicator |

## Variants

### Standard (Default)

Minimal checkbox with label:

```blade
<x-keys::checkbox
    wire:model="newsletter"
    label="Subscribe to newsletter"
/>
```

### Bordered

Checkbox with border container:

```blade
<x-keys::checkbox
    wire:model="terms"
    variant="bordered"
    label="I agree to the Terms of Service"
    description="Please read our terms before continuing"
/>
```

### Colored

Checkbox with colored border when checked:

```blade
<x-keys::checkbox
    wire:model="premium"
    variant="colored"
    color="brand"
    label="Premium Features"
    description="Unlock advanced functionality"
/>
```

### Card

Rich card-style checkbox:

```blade
<x-keys::checkbox
    wire:model="planBasic"
    variant="card"
    color="brand"
    title="Basic Plan"
    description="Perfect for individuals and small teams"
    icon="heroicon-o-cube"
/>
```

## Colors

```blade
<x-keys::checkbox color="brand" label="Brand" />
<x-keys::checkbox color="success" label="Success" />
<x-keys::checkbox color="warning" label="Warning" />
<x-keys::checkbox color="danger" label="Danger" />
<x-keys::checkbox color="info" label="Info" />
<x-keys::checkbox color="neutral" label="Neutral" />
```

## Sizes

```blade
<x-keys::checkbox size="xs" label="Extra Small" />
<x-keys::checkbox size="sm" label="Small" />
<x-keys::checkbox size="md" label="Medium (Default)" />
<x-keys::checkbox size="lg" label="Large" />
<x-keys::checkbox size="xl" label="Extra Large" />
```

## Indeterminate State

Useful for "select all" scenarios:

```blade
<x-keys::checkbox
    wire:model="selectAll"
    label="Select All"
    :indeterminate="$someChecked && !$allChecked"
    :checked="$allChecked"
/>
```

## With Icon

```blade
<x-keys::checkbox
    wire:model="notifications"
    label="Push Notifications"
    icon="heroicon-o-bell"
    description="Receive notifications on your device"
/>
```

## With Description

```blade
<x-keys::checkbox
    wire:model="marketing"
    label="Marketing Emails"
    description="Receive emails about new products, features, and special offers"
/>
```

## States

### Disabled

```blade
<x-keys::checkbox
    name="feature"
    label="Premium Feature"
    description="Available in Pro plan"
    :disabled="true"
/>
```

### Required

```blade
<x-keys::checkbox
    wire:model="agreeToTerms"
    label="I agree to the Terms and Conditions"
    :required="true"
/>
```

### Checked by Default

```blade
<x-keys::checkbox
    wire:model="defaultSettings"
    label="Enable by default"
    :checked="true"
/>
```

## Livewire Integration

### Single Checkbox

```blade
<x-keys::checkbox
    wire:model="rememberMe"
    label="Remember me"
/>
```

Component class:
```php
use Livewire\Component;

class LoginForm extends Component
{
    public bool $rememberMe = false;

    public function login()
    {
        // $this->rememberMe is automatically updated
        // ...
    }
}
```

### Checkbox Group (Array)

```blade
<div class="space-y-3">
    <x-keys::heading size="md">Select your interests</x-keys::heading>

    <x-keys::checkbox
        wire:model="interests"
        value="technology"
        label="Technology"
    />

    <x-keys::checkbox
        wire:model="interests"
        value="design"
        label="Design"
    />

    <x-keys::checkbox
        wire:model="interests"
        value="business"
        label="Business"
    />
</div>
```

Component class:
```php
public array $interests = [];

public function mount()
{
    $this->interests = auth()->user()->interests ?? [];
}

public function updatedInterests()
{
    auth()->user()->update(['interests' => $this->interests]);
}
```

### Select All Implementation

```blade
<div class="space-y-3">
    <x-keys::checkbox
        wire:model.live="selectAll"
        label="Select All Items"
        :indeterminate="count($selectedItems) > 0 && count($selectedItems) < count($items)"
        :checked="count($selectedItems) === count($items)"
    />

    <x-keys::separator />

    @foreach($items as $item)
        <x-keys::checkbox
            wire:model.live="selectedItems"
            :value="$item->id"
            :label="$item->name"
        />
    @endforeach
</div>
```

Component class:
```php
public array $selectedItems = [];
public bool $selectAll = false;

public function updatedSelectAll($value)
{
    $this->selectedItems = $value
        ? $this->items->pluck('id')->toArray()
        : [];
}

public function updatedSelectedItems()
{
    $this->selectAll = count($this->selectedItems) === count($this->items);
}
```

## Validation

```blade
<x-keys::checkbox
    wire:model="agreeToTerms"
    label="I agree to the Terms and Conditions"
    :errors="$errors->get('agreeToTerms')"
    required
/>
```

Component class:
```php
public bool $agreeToTerms = false;

public function submit()
{
    $this->validate([
        'agreeToTerms' => ['required', 'accepted'],
    ], [
        'agreeToTerms.accepted' => 'You must agree to the terms to continue.',
    ]);

    // Process submission...
}
```

## Use Cases

### Terms and Conditions

```blade
<form wire:submit="register">
    <div class="space-y-4">
        <x-keys::input
            wire:model="email"
            type="email"
            label="Email"
            required
        />

        <x-keys::input
            wire:model="password"
            type="password"
            label="Password"
            required
        />

        <x-keys::checkbox
            wire:model="agreeToTerms"
            label="I agree to the Terms of Service and Privacy Policy"
            :errors="$errors->get('agreeToTerms')"
            required
        />

        <x-keys::checkbox
            wire:model="newsletter"
            label="Send me product updates and tips"
        />

        <x-keys::button type="submit" color="primary" class="w-full">
            Create Account
        </x-keys::button>
    </div>
</form>
```

### Plan Selection (Card Variant)

```blade
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-keys::checkbox
        wire:model="selectedPlan"
        value="basic"
        variant="card"
        color="neutral"
        size="lg"
        title="Basic"
        description="Perfect for individuals"
        icon="heroicon-o-cube"
    />

    <x-keys::checkbox
        wire:model="selectedPlan"
        value="pro"
        variant="card"
        color="brand"
        size="lg"
        title="Pro"
        description="Best for small teams"
        icon="heroicon-o-cube-transparent"
    >
        <x-keys::badge color="brand" size="xs">Popular</x-keys::badge>
    </x-keys::checkbox>

    <x-keys::checkbox
        wire:model="selectedPlan"
        value="enterprise"
        variant="card"
        color="success"
        size="lg"
        title="Enterprise"
        description="For large organizations"
        icon="heroicon-o-building-office"
    />
</div>
```

### Feature Permissions

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="lg">User Permissions</x-keys::heading>
    </x-slot:header>

    <div class="space-y-4">
        <x-keys::checkbox
            wire:model="permissions"
            value="users.view"
            variant="bordered"
            label="View Users"
            description="Can view the users list"
        />

        <x-keys::checkbox
            wire:model="permissions"
            value="users.create"
            variant="bordered"
            label="Create Users"
            description="Can create new user accounts"
        />

        <x-keys::checkbox
            wire:model="permissions"
            value="users.edit"
            variant="bordered"
            label="Edit Users"
            description="Can modify existing users"
        />

        <x-keys::checkbox
            wire:model="permissions"
            value="users.delete"
            variant="bordered"
            color="danger"
            label="Delete Users"
            description="Can permanently delete users"
        />
    </div>

    <x-slot:footer>
        <x-keys::button
            wire:click="savePermissions"
            color="primary"
            class="w-full"
        >
            Save Permissions
        </x-keys::button>
    </x-slot:footer>
</x-keys::card>
```

### Settings with Icons

```blade
<div class="space-y-4">
    <x-keys::checkbox
        wire:model="notifications.email"
        label="Email Notifications"
        description="Receive notifications via email"
        icon="heroicon-o-envelope"
        variant="bordered"
    />

    <x-keys::checkbox
        wire:model="notifications.push"
        label="Push Notifications"
        description="Receive push notifications on your device"
        icon="heroicon-o-bell"
        variant="bordered"
    />

    <x-keys::checkbox
        wire:model="notifications.sms"
        label="SMS Notifications"
        description="Receive text message alerts"
        icon="heroicon-o-device-phone-mobile"
        variant="bordered"
    />
</div>
```

### Multi-Category Selection

```blade
<div class="space-y-6">
    <div>
        <x-keys::heading size="md" class="mb-3">Categories</x-keys::heading>

        <div class="space-y-3">
            <x-keys::checkbox
                wire:model="categories"
                value="technology"
                label="Technology"
                icon="heroicon-o-cpu-chip"
            />

            <x-keys::checkbox
                wire:model="categories"
                value="design"
                label="Design"
                icon="heroicon-o-paint-brush"
            />

            <x-keys::checkbox
                wire:model="categories"
                value="business"
                label="Business"
                icon="heroicon-o-briefcase"
            />

            <x-keys::checkbox
                wire:model="categories"
                value="marketing"
                label="Marketing"
                icon="heroicon-o-megaphone"
            />
        </div>
    </div>
</div>
```

### Table Row Selection

```blade
<x-keys::table>
    <x-keys::table.head>
        <x-keys::table.row>
            <x-keys::table.header>
                <x-keys::checkbox
                    wire:model.live="selectAll"
                    :indeterminate="count($selectedUsers) > 0 && count($selectedUsers) < count($users)"
                    :checked="count($selectedUsers) === count($users)"
                />
            </x-keys::table.header>
            <x-keys::table.header>Name</x-keys::table.header>
            <x-keys::table.header>Email</x-keys::table.header>
            <x-keys::table.header>Role</x-keys::table.header>
        </x-keys::table.row>
    </x-keys::table.head>

    <x-keys::table.body>
        @foreach($users as $user)
            <x-keys::table.row>
                <x-keys::table.cell>
                    <x-keys::checkbox
                        wire:model.live="selectedUsers"
                        :value="$user->id"
                    />
                </x-keys::table.cell>
                <x-keys::table.cell>{{ $user->name }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $user->email }}</x-keys::table.cell>
                <x-keys::table.cell>{{ $user->role }}</x-keys::table.cell>
            </x-keys::table.row>
        @endforeach
    </x-keys::table.body>
</x-keys::table>

@if(count($selectedUsers) > 0)
    <div class="mt-4 flex gap-3">
        <x-keys::button
            wire:click="deleteSelected"
            color="danger"
            variant="outlined"
        >
            Delete Selected ({{ count($selectedUsers) }})
        </x-keys::button>
        <x-keys::button
            wire:click="exportSelected"
            variant="outlined"
        >
            Export Selected
        </x-keys::button>
    </div>
@endif
```

### Privacy Preferences

```blade
<x-keys::card>
    <x-slot:header>
        <div class="flex items-center gap-2">
            <x-keys::icon name="heroicon-o-shield-check" size="md" class="text-brand" />
            <x-keys::heading size="lg">Privacy Settings</x-keys::heading>
        </div>
    </x-slot:header>

    <div class="space-y-4">
        <x-keys::checkbox
            wire:model="privacy.profile_visible"
            variant="colored"
            color="info"
            label="Make my profile visible to other users"
            description="Your profile will appear in search results"
        />

        <x-keys::checkbox
            wire:model="privacy.show_email"
            variant="colored"
            color="info"
            label="Show my email address on my profile"
            description="Others can see your email"
        />

        <x-keys::checkbox
            wire:model="privacy.show_activity"
            variant="colored"
            color="info"
            label="Show my activity status"
            description="Let others see when you're online"
        />

        <x-keys::checkbox
            wire:model="privacy.allow_messages"
            variant="colored"
            color="info"
            label="Allow direct messages"
            description="Users can send you private messages"
        />
    </div>

    <x-slot:footer>
        <x-keys::button
            wire:click="savePrivacySettings"
            color="primary"
            class="w-full"
        >
            Save Privacy Settings
        </x-keys::button>
    </x-slot:footer>
</x-keys::card>
```

### Add-ons Selection

```blade
<div class="space-y-3">
    <x-keys::heading size="lg" class="mb-4">Select Add-ons</x-keys::heading>

    <x-keys::checkbox
        wire:model="addons"
        value="analytics"
        variant="card"
        color="brand"
        title="Advanced Analytics"
        description="Get detailed insights and reports"
        icon="heroicon-o-chart-bar"
    >
        <div class="flex items-center gap-2">
            <x-keys::text size="lg" weight="semibold" color="brand">+$10/mo</x-keys::text>
        </div>
    </x-keys::checkbox>

    <x-keys::checkbox
        wire:model="addons"
        value="priority-support"
        variant="card"
        color="success"
        title="Priority Support"
        description="Get help from our team within 24 hours"
        icon="heroicon-o-life-buoy"
    >
        <div class="flex items-center gap-2">
            <x-keys::text size="lg" weight="semibold" color="success">+$15/mo</x-keys::text>
        </div>
    </x-keys::checkbox>

    <x-keys::checkbox
        wire:model="addons"
        value="custom-domain"
        variant="card"
        color="info"
        title="Custom Domain"
        description="Use your own domain name"
        icon="heroicon-o-globe-alt"
    >
        <div class="flex items-center gap-2">
            <x-keys::text size="lg" weight="semibold" color="info">+$5/mo</x-keys::text>
        </div>
    </x-keys::checkbox>
</div>

<div class="mt-6">
    <x-keys::text size="xl" weight="semibold">
        Total: ${{ $basePrice + $addonPrice }}/mo
    </x-keys::text>
</div>
```

## Accessibility

The Checkbox component includes comprehensive accessibility features:

- Native `<input type="checkbox">` for proper screen reader support
- `aria-required` for required fields
- `aria-invalid` for error states
- `aria-describedby` for description association
- `aria-checked="mixed"` for indeterminate state
- Focus-visible styles
- Keyboard accessible (Space to toggle)
- Proper label association via `<label for="...">`

```blade
<x-keys::checkbox
    wire:model="subscribe"
    label="Subscribe to newsletter"
    description="Weekly updates delivered to your inbox"
    aria-describedby="newsletter-hint"
/>
<span id="newsletter-hint" class="sr-only">
    You can unsubscribe at any time
</span>
```

## Component Structure

The Checkbox component consists of:

1. **PHP Class** (`Checkbox.php`)
   - Props validation
   - ID generation
   - Error handling
   - Data attributes generation
   - Uses `HasActions` and `HandlesValidationErrors` traits

2. **Blade Template** (`checkbox.blade.php`)
   - Hidden native checkbox input
   - Visual checkbox indicator (can be hidden)
   - Label, title, description display
   - Error display
   - Actions support
   - Variant-based styling

3. **TypeScript Actions** (`CheckboxActions.ts`)
   - Indeterminate state management
   - Group selection handling

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-checkbox="true"` - Component identifier
- `data-variant="standard"` - Visual variant
- `data-color="brand"` - Color scheme
- `data-size="md"` - Size variant
- `data-checked="true"` - Checked state
- `data-disabled="true"` - Disabled state
- `data-required="true"` - Required field
- `data-indeterminate="true"` - Indeterminate state
- `data-invalid="true"` - Error state
- `data-has-content="true"` - Has label/description
- `data-has-icon="true"` - Has icon
- `data-icon="..."` - Icon name
- `data-has-description="true"` - Has description
- `data-has-actions="true"` - Has actions
- `data-input-hidden="true"` - Input hidden
- `data-indicator-hidden="true"` - Indicator hidden
- `data-value="..."` - Checkbox value

## Best Practices

1. **Use clear labels**: Make it obvious what the checkbox controls

2. **Provide descriptions for complex options**: Help users understand implications

3. **Choose appropriate variants**: Standard for simple lists, card for feature selection

4. **Use semantic colors**: Match color to meaning (danger for destructive, success for positive)

5. **Group related checkboxes**: Use proper spacing and visual hierarchy

6. **Implement select all**: For lists with multiple checkboxes

7. **Use indeterminate state**: Show partial selection in hierarchical lists

8. **Validate properly**: Always validate required checkboxes on the server

9. **Provide feedback**: Show success messages after bulk actions

10. **Test accessibility**: Ensure keyboard navigation and screen reader support

## Variant Comparison

```blade
<!-- Standard -->
<x-keys::checkbox
    label="Standard Variant"
    description="Minimal styling"
/>

<!-- Bordered -->
<x-keys::checkbox
    variant="bordered"
    label="Bordered Variant"
    description="With border container"
/>

<!-- Colored -->
<x-keys::checkbox
    variant="colored"
    color="brand"
    label="Colored Variant"
    description="Colored when checked"
/>

<!-- Card -->
<x-keys::checkbox
    variant="card"
    color="brand"
    title="Card Variant"
    description="Rich card styling"
    icon="heroicon-o-star"
/>
```

## Known Limitations

- Card variant automatically converts `label` prop to `title`
- Actions support available but rarely used in practice
- Maximum 44x44px touch target for xs/sm sizes
- Indeterminate state requires manual management
- Label position affects entire layout, not just alignment

## Performance Tips

- Use `wire:model.live` only when immediate updates are needed
- For large lists, consider pagination to limit rendered checkboxes
- Debounce bulk operations to avoid excessive server requests
- Use Alpine.js for client-side select all when appropriate
- Cache checkbox groups that don't change frequently
