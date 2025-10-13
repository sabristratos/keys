# Radio Component

A versatile radio button component for single-selection scenarios with multiple variants, icon support, and comprehensive Livewire integration. Features standard, bordered, colored, and card variants for different UI contexts.

## Basic Usage

```blade
<div class="space-y-3">
    <x-keys::radio
        wire:model="plan"
        name="plan"
        value="basic"
        label="Basic Plan"
    />

    <x-keys::radio
        wire:model="plan"
        name="plan"
        value="pro"
        label="Pro Plan"
    />

    <x-keys::radio
        wire:model="plan"
        name="plan"
        value="enterprise"
        label="Enterprise Plan"
    />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name (shared across group) |
| `id` | `string\|null` | Auto-generated | Radio ID |
| `value` | `string\|null` | `null` | Value when selected |
| `checked` | `bool` | `false` | Checked state |
| `disabled` | `bool` | `false` | Disabled state |
| `required` | `bool` | `false` | Required field |
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
| `indicator` | `bool` | `true` | Show radio indicator |

## Variants

### Standard (Default)

Minimal radio with label:

```blade
<div class="space-y-3">
    <x-keys::radio
        wire:model="size"
        name="size"
        value="small"
        label="Small"
    />

    <x-keys::radio
        wire:model="size"
        name="size"
        value="medium"
        label="Medium"
    />

    <x-keys::radio
        wire:model="size"
        name="size"
        value="large"
        label="Large"
    />
</div>
```

### Bordered

Radio with border container:

```blade
<div class="space-y-3">
    <x-keys::radio
        wire:model="delivery"
        name="delivery"
        value="standard"
        variant="bordered"
        label="Standard Delivery"
        description="5-7 business days"
    />

    <x-keys::radio
        wire:model="delivery"
        name="delivery"
        value="express"
        variant="bordered"
        label="Express Delivery"
        description="2-3 business days"
    />
</div>
```

### Colored

Radio with colored border when selected:

```blade
<div class="space-y-3">
    <x-keys::radio
        wire:model="priority"
        name="priority"
        value="low"
        variant="colored"
        color="success"
        label="Low Priority"
        description="Normal processing time"
    />

    <x-keys::radio
        wire:model="priority"
        name="priority"
        value="high"
        variant="colored"
        color="danger"
        label="High Priority"
        description="Expedited processing"
    />
</div>
```

### Card

Rich card-style radio:

```blade
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-keys::radio
        wire:model="selectedPlan"
        name="plan"
        value="basic"
        variant="card"
        color="neutral"
        title="Basic"
        description="$9/month - Perfect for individuals"
        icon="heroicon-o-cube"
    />

    <x-keys::radio
        wire:model="selectedPlan"
        name="plan"
        value="pro"
        variant="card"
        color="brand"
        title="Pro"
        description="$29/month - Best for small teams"
        icon="heroicon-o-cube-transparent"
    />

    <x-keys::radio
        wire:model="selectedPlan"
        name="plan"
        value="enterprise"
        variant="card"
        color="success"
        title="Enterprise"
        description="$99/month - For large organizations"
        icon="heroicon-o-building-office"
    />
</div>
```

## Colors

```blade
<x-keys::radio color="brand" label="Brand" />
<x-keys::radio color="success" label="Success" />
<x-keys::radio color="warning" label="Warning" />
<x-keys::radio color="danger" label="Danger" />
<x-keys::radio color="info" label="Info" />
<x-keys::radio color="neutral" label="Neutral" />
```

## Sizes

```blade
<x-keys::radio size="xs" label="Extra Small" />
<x-keys::radio size="sm" label="Small" />
<x-keys::radio size="md" label="Medium (Default)" />
<x-keys::radio size="lg" label="Large" />
<x-keys::radio size="xl" label="Extra Large" />
```

## With Icon

```blade
<div class="space-y-3">
    <x-keys::radio
        wire:model="paymentMethod"
        name="payment"
        value="credit-card"
        label="Credit Card"
        icon="heroicon-o-credit-card"
        description="Pay with credit or debit card"
    />

    <x-keys::radio
        wire:model="paymentMethod"
        name="payment"
        value="paypal"
        label="PayPal"
        icon="heroicon-o-banknotes"
        description="Pay with your PayPal account"
    />
</div>
```

## With Description

```blade
<div class="space-y-3">
    <x-keys::radio
        wire:model="subscription"
        name="subscription"
        value="monthly"
        label="Monthly Subscription"
        description="Billed monthly at $29/month"
    />

    <x-keys::radio
        wire:model="subscription"
        name="subscription"
        value="yearly"
        label="Yearly Subscription"
        description="Billed annually at $290/year (Save $58!)"
    />
</div>
```

## States

### Disabled

```blade
<x-keys::radio
    name="option"
    value="disabled"
    label="Disabled Option"
    description="This option is not available"
    :disabled="true"
/>
```

### Required

```blade
<div class="space-y-3">
    <x-keys::heading size="md">
        Select your plan <span class="text-danger">*</span>
    </x-keys::heading>

    <x-keys::radio
        wire:model="plan"
        name="plan"
        value="basic"
        label="Basic"
        :required="true"
    />

    <x-keys::radio
        wire:model="plan"
        name="plan"
        value="pro"
        label="Pro"
        :required="true"
    />
</div>
```

### Checked by Default

```blade
<x-keys::radio
    wire:model="default"
    name="default"
    value="yes"
    label="Default Option"
    :checked="true"
/>
```

## Livewire Integration

### Basic Radio Group

```blade
<div class="space-y-3">
    <x-keys::heading size="md">Select a Color</x-keys::heading>

    <x-keys::radio
        wire:model="color"
        name="color"
        value="red"
        label="Red"
    />

    <x-keys::radio
        wire:model="color"
        name="color"
        value="blue"
        label="Blue"
    />

    <x-keys::radio
        wire:model="color"
        name="color"
        value="green"
        label="Green"
    />
</div>

<div class="mt-4">
    <x-keys::text>Selected: {{ $color }}</x-keys::text>
</div>
```

Component class:
```php
use Livewire\Component;

class ColorSelector extends Component
{
    public string $color = 'red';

    public function render()
    {
        return view('livewire.color-selector');
    }
}
```

### With Live Updates

```blade
<div class="space-y-4">
    <div class="space-y-3">
        <x-keys::radio
            wire:model.live="shippingMethod"
            name="shipping"
            value="standard"
            variant="bordered"
            label="Standard Shipping"
            description="Free - 5-7 business days"
        />

        <x-keys::radio
            wire:model.live="shippingMethod"
            name="shipping"
            value="express"
            variant="bordered"
            label="Express Shipping"
            description="$9.99 - 2-3 business days"
        />

        <x-keys::radio
            wire:model.live="shippingMethod"
            name="shipping"
            value="overnight"
            variant="bordered"
            label="Overnight Shipping"
            description="$19.99 - Next business day"
        />
    </div>

    <x-keys::card>
        <div class="flex justify-between">
            <x-keys::text>Shipping Cost:</x-keys::text>
            <x-keys::text weight="semibold">${{ $shippingCost }}</x-keys::text>
        </div>
    </x-keys::card>
</div>
```

Component class:
```php
public string $shippingMethod = 'standard';

public function getShippingCostProperty()
{
    return match($this->shippingMethod) {
        'express' => 9.99,
        'overnight' => 19.99,
        default => 0,
    };
}
```

## Validation

```blade
<form wire:submit="submit">
    <div class="space-y-3">
        <x-keys::heading size="md">
            Select your preference <span class="text-danger">*</span>
        </x-keys::heading>

        <x-keys::radio
            wire:model="preference"
            name="preference"
            value="option1"
            label="Option 1"
        />

        <x-keys::radio
            wire:model="preference"
            name="preference"
            value="option2"
            label="Option 2"
        />

        @if($errors->has('preference'))
            <x-keys::error :messages="$errors->get('preference')" />
        @endif
    </div>

    <x-keys::button type="submit" color="primary" class="mt-4">
        Submit
    </x-keys::button>
</form>
```

Component class:
```php
public ?string $preference = null;

public function submit()
{
    $this->validate([
        'preference' => ['required'],
    ], [
        'preference.required' => 'Please select an option.',
    ]);

    // Process submission...
}
```

## Use Cases

### Plan Selection

```blade
<form wire:submit="subscribe">
    <x-keys::card>
        <x-slot:header>
            <x-keys::heading size="xl">Choose Your Plan</x-keys::heading>
        </x-slot:header>

        <div class="space-y-4">
            <x-keys::radio
                wire:model.live="selectedPlan"
                name="plan"
                value="basic"
                variant="card"
                color="neutral"
                size="lg"
                title="Basic Plan"
                description="$9/month - Perfect for individuals"
                icon="heroicon-o-cube"
            >
                <div class="mt-2 space-y-1">
                    <x-keys::text size="sm" class="flex items-center gap-2">
                        <x-keys::icon name="heroicon-o-check" size="xs" class="text-success" />
                        1 User
                    </x-keys::text>
                    <x-keys::text size="sm" class="flex items-center gap-2">
                        <x-keys::icon name="heroicon-o-check" size="xs" class="text-success" />
                        10 Projects
                    </x-keys::text>
                </div>
            </x-keys::radio>

            <x-keys::radio
                wire:model.live="selectedPlan"
                name="plan"
                value="pro"
                variant="card"
                color="brand"
                size="lg"
                title="Pro Plan"
                description="$29/month - Best for small teams"
                icon="heroicon-o-cube-transparent"
            >
                <x-keys::badge color="brand" size="xs" class="mt-2">Most Popular</x-keys::badge>
                <div class="mt-2 space-y-1">
                    <x-keys::text size="sm" class="flex items-center gap-2">
                        <x-keys::icon name="heroicon-o-check" size="xs" class="text-success" />
                        5 Users
                    </x-keys::text>
                    <x-keys::text size="sm" class="flex items-center gap-2">
                        <x-keys::icon name="heroicon-o-check" size="xs" class="text-success" />
                        Unlimited Projects
                    </x-keys::text>
                    <x-keys::text size="sm" class="flex items-center gap-2">
                        <x-keys::icon name="heroicon-o-check" size="xs" class="text-success" />
                        Priority Support
                    </x-keys::text>
                </div>
            </x-keys::radio>

            <x-keys::radio
                wire:model.live="selectedPlan"
                name="plan"
                value="enterprise"
                variant="card"
                color="success"
                size="lg"
                title="Enterprise Plan"
                description="$99/month - For large organizations"
                icon="heroicon-o-building-office"
            >
                <div class="mt-2 space-y-1">
                    <x-keys::text size="sm" class="flex items-center gap-2">
                        <x-keys::icon name="heroicon-o-check" size="xs" class="text-success" />
                        Unlimited Users
                    </x-keys::text>
                    <x-keys::text size="sm" class="flex items-center gap-2">
                        <x-keys::icon name="heroicon-o-check" size="xs" class="text-success" />
                        Unlimited Projects
                    </x-keys::text>
                    <x-keys::text size="sm" class="flex items-center gap-2">
                        <x-keys::icon name="heroicon-o-check" size="xs" class="text-success" />
                        Dedicated Support
                    </x-keys::text>
                    <x-keys::text size="sm" class="flex items-center gap-2">
                        <x-keys::icon name="heroicon-o-check" size="xs" class="text-success" />
                        Custom Integration
                    </x-keys::text>
                </div>
            </x-keys::radio>
        </div>

        <x-slot:footer>
            <div class="flex items-center justify-between">
                <x-keys::text size="xl" weight="semibold">
                    Total: ${{ $planPrice }}/month
                </x-keys::text>
                <x-keys::button type="submit" color="primary">
                    Subscribe Now
                </x-keys::button>
            </div>
        </x-slot:footer>
    </x-keys::card>
</form>
```

### Payment Method Selection

```blade
<div class="space-y-4">
    <x-keys::heading size="lg">Payment Method</x-keys::heading>

    <x-keys::radio
        wire:model="paymentMethod"
        name="payment"
        value="credit-card"
        variant="bordered"
        icon="heroicon-o-credit-card"
        label="Credit Card"
        description="Pay with Visa, Mastercard, or American Express"
    />

    <x-keys::radio
        wire:model="paymentMethod"
        name="payment"
        value="paypal"
        variant="bordered"
        icon="heroicon-o-banknotes"
        label="PayPal"
        description="Pay securely with your PayPal account"
    />

    <x-keys::radio
        wire:model="paymentMethod"
        name="payment"
        value="bank-transfer"
        variant="bordered"
        icon="heroicon-o-building-library"
        label="Bank Transfer"
        description="Direct transfer from your bank account"
    />
</div>
```

### Shipping Options

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="lg">Shipping Options</x-keys::heading>
    </x-slot:header>

    <div class="space-y-3">
        <x-keys::radio
            wire:model.live="shipping"
            name="shipping"
            value="standard"
            variant="colored"
            color="success"
            label="Standard Shipping"
            description="Free - Delivery in 5-7 business days"
        />

        <x-keys::radio
            wire:model.live="shipping"
            name="shipping"
            value="express"
            variant="colored"
            color="warning"
            label="Express Shipping"
            description="$9.99 - Delivery in 2-3 business days"
        />

        <x-keys::radio
            wire:model.live="shipping"
            name="shipping"
            value="overnight"
            variant="colored"
            color="danger"
            label="Overnight Shipping"
            description="$19.99 - Delivery next business day"
        />
    </div>

    <x-slot:footer>
        <div class="flex justify-between items-center">
            <x-keys::text size="sm" color="muted">
                Estimated delivery: {{ $estimatedDelivery }}
            </x-keys::text>
            <x-keys::text weight="semibold">
                Shipping: ${{ $shippingCost }}
            </x-keys::text>
        </div>
    </x-slot:footer>
</x-keys::card>
```

### User Role Selection

```blade
<form wire:submit="assignRole">
    <x-keys::card>
        <x-slot:header>
            <x-keys::heading size="lg">Assign User Role</x-keys::heading>
        </x-slot:header>

        <div class="space-y-3">
            <x-keys::radio
                wire:model="role"
                name="role"
                value="viewer"
                variant="bordered"
                label="Viewer"
                description="Can view all content but cannot make changes"
            />

            <x-keys::radio
                wire:model="role"
                name="role"
                value="editor"
                variant="bordered"
                label="Editor"
                description="Can view and edit content"
            />

            <x-keys::radio
                wire:model="role"
                name="role"
                value="admin"
                variant="bordered"
                color="warning"
                label="Administrator"
                description="Full access to all features and settings"
            />
        </div>

        <x-slot:footer>
            <div class="flex justify-end gap-3">
                <x-keys::button variant="ghost" type="button">
                    Cancel
                </x-keys::button>
                <x-keys::button type="submit" color="primary">
                    Assign Role
                </x-keys::button>
            </div>
        </x-slot:footer>
    </x-keys::card>
</form>
```

### Survey Question

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="md">
            How satisfied are you with our service?
        </x-keys::heading>
    </x-slot:header>

    <div class="space-y-3">
        <x-keys::radio
            wire:model="satisfaction"
            name="satisfaction"
            value="very-satisfied"
            variant="colored"
            color="success"
            label="Very Satisfied"
            icon="heroicon-o-face-smile"
        />

        <x-keys::radio
            wire:model="satisfaction"
            name="satisfaction"
            value="satisfied"
            variant="colored"
            color="info"
            label="Satisfied"
            icon="heroicon-o-hand-thumb-up"
        />

        <x-keys::radio
            wire:model="satisfaction"
            name="satisfaction"
            value="neutral"
            variant="colored"
            color="neutral"
            label="Neutral"
            icon="heroicon-o-minus"
        />

        <x-keys::radio
            wire:model="satisfaction"
            name="satisfaction"
            value="dissatisfied"
            variant="colored"
            color="warning"
            label="Dissatisfied"
            icon="heroicon-o-hand-thumb-down"
        />

        <x-keys::radio
            wire:model="satisfaction"
            name="satisfaction"
            value="very-dissatisfied"
            variant="colored"
            color="danger"
            label="Very Dissatisfied"
            icon="heroicon-o-face-frown"
        />
    </div>

    <x-slot:footer>
        <x-keys::button
            wire:click="submitFeedback"
            color="primary"
            class="w-full"
        >
            Submit Feedback
        </x-keys::button>
    </x-slot:footer>
</x-keys::card>
```

### Filter Options

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="md">Filter Results</x-keys::heading>
    </x-slot:header>

    <div class="space-y-4">
        <div>
            <x-keys::heading size="sm" class="mb-2">Sort By</x-keys::heading>
            <div class="space-y-2">
                <x-keys::radio
                    wire:model.live="sortBy"
                    name="sort"
                    value="newest"
                    label="Newest First"
                    size="sm"
                />
                <x-keys::radio
                    wire:model.live="sortBy"
                    name="sort"
                    value="oldest"
                    label="Oldest First"
                    size="sm"
                />
                <x-keys::radio
                    wire:model.live="sortBy"
                    name="sort"
                    value="popular"
                    label="Most Popular"
                    size="sm"
                />
            </div>
        </div>

        <x-keys::separator />

        <div>
            <x-keys::heading size="sm" class="mb-2">Status</x-keys::heading>
            <div class="space-y-2">
                <x-keys::radio
                    wire:model.live="status"
                    name="status"
                    value="all"
                    label="All Items"
                    size="sm"
                />
                <x-keys::radio
                    wire:model.live="status"
                    name="status"
                    value="active"
                    label="Active Only"
                    size="sm"
                />
                <x-keys::radio
                    wire:model.live="status"
                    name="status"
                    value="archived"
                    label="Archived Only"
                    size="sm"
                />
            </div>
        </div>
    </div>
</x-keys::card>
```

## Accessibility

The Radio component includes comprehensive accessibility features:

- Native `<input type="radio">` for proper screen reader support
- `aria-required` for required fields
- `aria-invalid` for error states
- `aria-describedby` for description association
- Focus-visible styles
- Keyboard accessible (Arrow keys to navigate group, Space to select)
- Proper label association via `<label for="...">`
- Grouped radios automatically linked by `name` attribute

```blade
<fieldset>
    <legend class="sr-only">Select a size</legend>

    <x-keys::radio
        wire:model="size"
        name="size"
        value="small"
        label="Small"
    />

    <x-keys::radio
        wire:model="size"
        name="size"
        value="large"
        label="Large"
    />
</fieldset>
```

## Component Structure

The Radio component consists of:

1. **PHP Class** (`Radio.php`)
   - Props validation
   - ID generation
   - Error handling
   - Data attributes generation
   - Uses `HasActions` and `HandlesValidationErrors` traits

2. **Blade Template** (`radio.blade.php`)
   - Hidden native radio input
   - Visual radio indicator (can be hidden)
   - Label, title, description display
   - Error display
   - Actions support
   - Variant-based styling

3. **TypeScript Actions** (`RadioActions.ts`)
   - Radio group management
   - Keyboard navigation

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-radio="true"` - Component identifier
- `data-variant="standard"` - Visual variant
- `data-color="brand"` - Color scheme
- `data-size="md"` - Size variant
- `data-value="..."` - Radio value
- `data-checked="true"` - Checked state
- `data-disabled="true"` - Disabled state
- `data-required="true"` - Required field
- `data-invalid="true"` - Error state
- `data-has-content="true"` - Has label/description
- `data-has-icon="true"` - Has icon
- `data-icon="..."` - Icon name
- `data-has-description="true"` - Has description
- `data-has-actions="true"` - Has actions
- `data-input-hidden="true"` - Input hidden
- `data-indicator-hidden="true"` - Indicator hidden

## Best Practices

1. **Use consistent names**: All radios in a group must share the same `name` attribute

2. **Provide clear labels**: Make it obvious what each option represents

3. **Use descriptions for clarity**: Help users understand the implications of each choice

4. **Choose appropriate variants**: Standard for simple lists, card for feature-rich options

5. **Use semantic colors**: Match color to meaning (warning for important choices, success for recommended)

6. **Always provide a default**: One radio should typically be checked by default

7. **Group related options**: Use proper spacing and visual hierarchy

8. **Limit options**: Too many radio buttons are overwhelming (consider a select instead)

9. **Validate properly**: Always validate required radio groups on the server

10. **Test accessibility**: Ensure keyboard navigation and screen reader support

## Variant Comparison

```blade
<!-- Standard -->
<x-keys::radio
    name="example"
    value="1"
    label="Standard Variant"
    description="Minimal styling"
/>

<!-- Bordered -->
<x-keys::radio
    name="example"
    value="2"
    variant="bordered"
    label="Bordered Variant"
    description="With border container"
/>

<!-- Colored -->
<x-keys::radio
    name="example"
    value="3"
    variant="colored"
    color="brand"
    label="Colored Variant"
    description="Colored when selected"
/>

<!-- Card -->
<x-keys::radio
    name="example"
    value="4"
    variant="card"
    color="brand"
    title="Card Variant"
    description="Rich card styling"
    icon="heroicon-o-star"
/>
```

## Known Limitations

- All radios in a group must share the same `name` attribute
- Card variant automatically converts `label` prop to `title`
- Actions support available but rarely used in practice
- Maximum 44x44px touch target for xs/sm sizes
- Label position affects entire layout, not just alignment

## Performance Tips

- Use `wire:model.live` only when immediate updates are needed
- For large radio groups, consider using a select dropdown instead
- Cache radio options that don't change frequently
- Use Alpine.js for client-side filtering when appropriate
- Debounce dependent operations to avoid excessive server requests
