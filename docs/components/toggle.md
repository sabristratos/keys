# Toggle Component

A modern switch/toggle component for boolean values with label support, multiple sizes, colors, and comprehensive Livewire integration. Features label positioning, description text, hint text, and action support.

## Basic Usage

```blade
<x-keys::toggle
    wire:model="emailNotifications"
    name="email_notifications"
    label="Email Notifications"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | Auto-generated | Toggle ID |
| `checked` | `bool` | `false` | Checked state |
| `value` | `string\|null` | `'1'` | Value when checked |
| `color` | `string` | `'brand'` | Color: `brand`, `success`, `warning`, `danger`, `info`, `neutral` |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |
| `disabled` | `bool` | `false` | Disabled state |
| `readonly` | `bool` | `false` | Readonly state |
| `required` | `bool` | `false` | Required field |
| `label` | `string\|null` | `null` | Label text |
| `label-position` | `string` | `'right'` | Label position: `left`, `right` |
| `description` | `string\|null` | `null` | Description text |
| `hint` | `string\|null` | `null` | Hint text below toggle |
| `errors` | `string\|array\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display errors |
| `has-error` | `bool` | `false` | Force error state |
| `actions` | `array` | `[]` | Custom actions |
| `action-variant` | `string` | `'ghost'` | Action button variant |
| `action-size` | `string` | `'xs'` | Action button size |

## Colors

```blade
<x-keys::toggle color="brand" label="Brand" />
<x-keys::toggle color="success" label="Success" />
<x-keys::toggle color="warning" label="Warning" />
<x-keys::toggle color="danger" label="Danger" />
<x-keys::toggle color="info" label="Info" />
<x-keys::toggle color="neutral" label="Neutral" />
```

## Sizes

```blade
<x-keys::toggle size="sm" label="Small" />
<x-keys::toggle size="md" label="Medium (Default)" />
<x-keys::toggle size="lg" label="Large" />
```

## Label Positioning

### Right Label (Default)

```blade
<x-keys::toggle
    wire:model="notifications"
    label="Enable Notifications"
    label-position="right"
/>
```

### Left Label

```blade
<x-keys::toggle
    wire:model="darkMode"
    label="Dark Mode"
    label-position="left"
/>
```

## With Description

```blade
<x-keys::toggle
    wire:model="marketing"
    label="Marketing Emails"
    description="Receive emails about new products and special offers"
/>
```

## With Hint Text

```blade
<x-keys::toggle
    wire:model="twoFactor"
    label="Two-Factor Authentication"
    hint="Adds an extra layer of security to your account"
/>
```

## With Description and Hint

```blade
<x-keys::toggle
    wire:model="analytics"
    label="Analytics Tracking"
    description="Allow us to collect anonymous usage data"
    hint="This helps us improve the product"
/>
```

## States

### Disabled

```blade
<x-keys::toggle
    name="feature"
    label="Premium Feature"
    :disabled="true"
/>
```

### Readonly

```blade
<x-keys::toggle
    name="verified"
    label="Account Verified"
    :checked="true"
    :readonly="true"
/>
```

### Required

```blade
<x-keys::toggle
    wire:model="terms"
    label="I agree to the Terms and Conditions"
    :required="true"
/>
```

### Checked by Default

```blade
<x-keys::toggle
    wire:model="defaultNotifications"
    label="Notifications"
    :checked="true"
/>
```

## Livewire Integration

### Two-Way Binding

```blade
<x-keys::toggle
    wire:model="emailNotifications"
    label="Email Notifications"
/>
```

Component class:
```php
use Livewire\Component;

class Settings extends Component
{
    public bool $emailNotifications = false;

    public function save()
    {
        // $this->emailNotifications is automatically updated
        $this->validate();

        auth()->user()->update([
            'email_notifications' => $this->emailNotifications,
        ]);
    }
}
```

### Live Updates

```blade
<x-keys::toggle
    wire:model.live="enableFeature"
    label="Enable Feature"
/>

@if($enableFeature)
    <div class="mt-4">
        <x-keys::input
            wire:model="featureName"
            label="Feature Name"
        />
    </div>
@endif
```

### Blur Updates

```blade
<x-keys::toggle
    wire:model.blur="autoSave"
    label="Auto-save"
    description="Automatically save changes"
/>
```

Component class:
```php
public function updatedAutoSave($value)
{
    auth()->user()->settings()->update(['auto_save' => $value]);

    session()->flash('message', 'Auto-save preference updated');
}
```

## Validation

```blade
<x-keys::toggle
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
        'agreeToTerms.accepted' => 'You must agree to the terms and conditions.',
    ]);

    // Process submission...
}
```

## Use Cases

### Account Settings

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="lg">Notification Settings</x-keys::heading>
    </x-slot:header>

    <div class="space-y-6">
        <x-keys::toggle
            wire:model.blur="settings.email_notifications"
            label="Email Notifications"
            description="Receive email about your account activity"
            color="brand"
        />

        <x-keys::separator />

        <x-keys::toggle
            wire:model.blur="settings.push_notifications"
            label="Push Notifications"
            description="Receive push notifications on your devices"
            color="brand"
        />

        <x-keys::separator />

        <x-keys::toggle
            wire:model.blur="settings.sms_notifications"
            label="SMS Notifications"
            description="Receive text messages for important updates"
            color="brand"
        />
    </div>
</x-keys::card>
```

### Privacy Settings

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="lg">Privacy Settings</x-keys::heading>
    </x-slot:header>

    <div class="space-y-6">
        <x-keys::toggle
            wire:model="privacy.profile_visible"
            label="Public Profile"
            description="Make your profile visible to other users"
            hint="You can change this at any time"
        />

        <x-keys::separator />

        <x-keys::toggle
            wire:model="privacy.show_email"
            label="Show Email Address"
            description="Display your email on your public profile"
        />

        <x-keys::separator />

        <x-keys::toggle
            wire:model="privacy.allow_messages"
            label="Allow Direct Messages"
            description="Let other users send you messages"
        />
    </div>

    <x-slot:footer>
        <x-keys::button
            wire:click="savePrivacySettings"
            color="primary"
            class="w-full"
        >
            Save Changes
        </x-keys::button>
    </x-slot:footer>
</x-keys::card>
```

### Feature Toggles

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="lg">Feature Flags</x-keys::heading>
    </x-slot:header>

    <div class="space-y-4">
        <x-keys::toggle
            wire:model.live="features.beta_features"
            label="Beta Features"
            description="Try out new features before they're released"
            color="info"
        />

        @if($features['beta_features'])
            <div class="ml-4 pl-4 border-l-2 space-y-4">
                <x-keys::toggle
                    wire:model="features.new_dashboard"
                    label="New Dashboard"
                    description="Try the redesigned dashboard"
                    size="sm"
                />

                <x-keys::toggle
                    wire:model="features.advanced_analytics"
                    label="Advanced Analytics"
                    description="Access detailed analytics and reports"
                    size="sm"
                />
            </div>
        @endif
    </div>
</x-keys::card>
```

### Security Settings

```blade
<x-keys::card>
    <x-slot:header>
        <div class="flex items-center gap-2">
            <x-keys::icon name="heroicon-o-shield-check" size="md" class="text-brand" />
            <x-keys::heading size="lg">Security</x-keys::heading>
        </div>
    </x-slot:header>

    <div class="space-y-6">
        <x-keys::toggle
            wire:model="security.two_factor"
            label="Two-Factor Authentication"
            description="Require a code from your phone in addition to your password"
            color="success"
        />

        <x-keys::separator />

        <x-keys::toggle
            wire:model="security.login_alerts"
            label="Login Alerts"
            description="Get notified when someone logs into your account"
            color="warning"
        />

        <x-keys::separator />

        <x-keys::toggle
            wire:model="security.session_timeout"
            label="Automatic Session Timeout"
            description="Log out automatically after 30 minutes of inactivity"
        />
    </div>
</x-keys::card>
```

### Subscription Preferences

```blade
<form wire:submit="updateSubscription">
    <x-keys::card>
        <x-slot:header>
            <x-keys::heading size="lg">Subscription Preferences</x-keys::heading>
        </x-slot:header>

        <div class="space-y-6">
            <x-keys::toggle
                wire:model="subscription.newsletter"
                label="Newsletter"
                description="Receive our weekly newsletter with tips and updates"
                color="brand"
            />

            <x-keys::separator />

            <x-keys::toggle
                wire:model="subscription.product_updates"
                label="Product Updates"
                description="Get notified about new features and improvements"
                color="info"
            />

            <x-keys::separator />

            <x-keys::toggle
                wire:model="subscription.promotions"
                label="Promotional Emails"
                description="Receive special offers and discounts"
                color="success"
            />

            <x-keys::separator />

            <x-keys::toggle
                wire:model="subscription.partner_offers"
                label="Partner Offers"
                description="Receive offers from our trusted partners"
            />
        </div>

        <x-slot:footer>
            <div class="flex justify-between items-center">
                <x-keys::button
                    type="button"
                    variant="ghost"
                    wire:click="unsubscribeAll"
                >
                    Unsubscribe from All
                </x-keys::button>
                <x-keys::button
                    type="submit"
                    color="primary"
                >
                    Save Preferences
                </x-keys::button>
            </div>
        </x-slot:footer>
    </x-keys::card>
</form>
```

### Dark Mode Toggle

```blade
<div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
        <x-keys::icon
            name="heroicon-o-moon"
            size="md"
            class="text-text-muted"
        />
        <div>
            <x-keys::heading size="sm">Dark Mode</x-keys::heading>
            <x-keys::text size="sm" color="muted">
                Switch to dark theme
            </x-keys::text>
        </div>
    </div>

    <x-keys::toggle
        wire:model.live="darkMode"
        color="brand"
        size="lg"
    />
</div>
```

Component class:
```php
public bool $darkMode = false;

public function mount()
{
    $this->darkMode = auth()->user()->dark_mode ?? false;
}

public function updatedDarkMode($value)
{
    auth()->user()->update(['dark_mode' => $value]);

    $this->dispatch('theme-changed', theme: $value ? 'dark' : 'light');
}
```

### Conditional Form Fields

```blade
<form wire:submit="save">
    <div class="space-y-4">
        <x-keys::toggle
            wire:model.live="useCustomDomain"
            label="Use Custom Domain"
            description="Connect your own domain name"
        />

        @if($useCustomDomain)
            <x-keys::input
                wire:model="customDomain"
                name="custom_domain"
                label="Domain Name"
                placeholder="example.com"
                :errors="$errors->get('customDomain')"
                required
            />

            <x-keys::input
                wire:model="dnsRecord"
                name="dns_record"
                label="DNS Record"
                hint="Add this TXT record to your DNS settings"
                readonly
                :copyable="true"
            />
        @endif

        <div class="flex justify-end gap-3">
            <x-keys::button variant="ghost" type="button">
                Cancel
            </x-keys::button>
            <x-keys::button type="submit" color="primary">
                Save Settings
            </x-keys::button>
        </div>
    </div>
</form>
```

### Multi-Step Form

```blade
<div class="space-y-6">
    <x-keys::toggle
        wire:model.live="step1Complete"
        label="Step 1: Profile Information"
        description="Complete your basic profile"
        :checked="$profile->isComplete()"
        color="success"
    />

    @if($step1Complete)
        <x-keys::toggle
            wire:model.live="step2Complete"
            label="Step 2: Preferences"
            description="Set your account preferences"
            color="info"
        />
    @endif

    @if($step2Complete)
        <x-keys::toggle
            wire:model.live="step3Complete"
            label="Step 3: Verification"
            description="Verify your email address"
            color="warning"
        />
    @endif

    @if($step3Complete)
        <x-keys::alert variant="success">
            <strong>Setup Complete!</strong> Your account is ready to use.
        </x-keys::alert>
    @endif
</div>
```

## Accessibility

The Toggle component includes comprehensive accessibility features:

- Proper `role="switch"` for screen readers
- `aria-checked` state management
- `aria-label` or `aria-labelledby` for label association
- `aria-describedby` for description and error messages
- Focus-visible styles
- Keyboard accessible (Space/Enter to toggle)
- Disabled state with proper attributes

```blade
<x-keys::toggle
    wire:model="notifications"
    label="Enable Notifications"
    aria-describedby="notifications-hint"
/>
<span id="notifications-hint" class="text-sm text-text-muted">
    You can change this setting at any time
</span>
```

## Component Structure

The Toggle component consists of:

1. **PHP Class** (`Toggle.php`)
   - Props validation
   - ID generation
   - Error handling
   - Data attributes generation
   - Uses `HasActions` trait

2. **Blade Template** (`toggle.blade.php`)
   - Label positioning
   - Switch element with color variants
   - Description and hint display
   - Error display
   - Actions support

3. **TypeScript Actions** (`ToggleActions.ts`)
   - Toggle state management
   - Keyboard event handling
   - ARIA attribute updates

## Data Attributes

The component generates data attributes:

- `data-keys-toggle="true"` - Component identifier
- `data-color="brand"` - Color scheme
- `data-size="md"` - Size variant
- `data-checked="true"` - Checked state
- `data-disabled="true"` - Disabled state
- `data-readonly="true"` - Readonly state
- `data-required="true"` - Required field
- `data-invalid="true"` - Error state
- `data-label-position="right"` - Label position
- `data-has-description="true"` - Has description
- `data-has-actions="true"` - Has actions

## Best Practices

1. **Use clear labels**: Make it obvious what the toggle controls

2. **Provide descriptions**: Help users understand what happens when toggled

3. **Choose appropriate colors**: Use semantic colors (success for enabled features, danger for destructive actions)

4. **Use live updates sparingly**: Only use `wire:model.live` when immediate feedback is needed

5. **Group related toggles**: Use cards and separators to organize settings

6. **Provide feedback**: Show success messages or visual confirmation after changes

7. **Consider defaults**: Set sensible default states for toggles

8. **Use readonly for display**: Show non-editable states with readonly instead of disabled

9. **Add hints for complex settings**: Explain consequences or requirements

10. **Test accessibility**: Ensure keyboard navigation and screen reader support work correctly

## Styling Tips

### Horizontal Layout

```blade
<div class="flex items-center justify-between">
    <div>
        <x-keys::heading size="sm">Feature Name</x-keys::heading>
        <x-keys::text size="sm" color="muted">
            Feature description
        </x-keys::text>
    </div>
    <x-keys::toggle wire:model="feature" />
</div>
```

### Compact List

```blade
<div class="space-y-2">
    @foreach($features as $feature)
        <div class="flex items-center justify-between py-2">
            <x-keys::text>{{ $feature->name }}</x-keys::text>
            <x-keys::toggle
                wire:model="enabled.{{ $feature->id }}"
                size="sm"
            />
        </div>
    @endforeach
</div>
```

### With Badge

```blade
<div class="flex items-center gap-3">
    <x-keys::toggle wire:model="betaFeatures" />
    <div class="flex items-center gap-2">
        <x-keys::text>Beta Features</x-keys::text>
        <x-keys::badge color="brand" size="xs">New</x-keys::badge>
    </div>
</div>
```

## Known Limitations

- Label position changes affect the entire layout (not just text alignment)
- Actions support available but rarely used in practice
- Size variants affect only the switch, not label text size
- Custom value only applies when checked (unchecked is always empty)

## Performance Tips

- Use `wire:model.blur` for better performance when live updates aren't needed
- Debounce related actions when toggles trigger expensive operations
- Consider grouping multiple toggle updates into a single save action
- Use conditional rendering to hide dependent fields until needed
