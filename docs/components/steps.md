# Steps Component

A multi-step progress indicator for wizards, forms, and sequential workflows. Supports horizontal and vertical orientations, multiple variants, clickable steps, and automatic state management.

## Basic Usage

```blade
<x-keys::steps :current-step="2">
    <x-keys::step label="Account" />
    <x-keys::step label="Profile" />
    <x-keys::step label="Review" />
    <x-keys::step label="Complete" />
</x-keys::steps>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `current-step` | `int` | `1` | Current active step (1-based index) |
| `orientation` | `string` | `'horizontal'` | Layout orientation: `horizontal` (responsive), `vertical` (always vertical) |
| `variant` | `string` | `'numbered'` | Visual variant: `numbered`, `icon`, `dots` |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |
| `clickable` | `bool` | `false` | Whether completed/available steps are clickable |
| `id` | `string\|null` | auto-generated | Custom ID for the steps container |

## Orientations

### Horizontal (Default - Responsive)
The horizontal orientation is responsive by default: vertical on mobile, horizontal on desktop.

```blade
<x-keys::steps :current-step="2" orientation="horizontal">
    <x-keys::step label="Personal Info" />
    <x-keys::step label="Contact Details" />
    <x-keys::step label="Confirmation" />
</x-keys::steps>
```

### Vertical (Always Vertical)
```blade
<x-keys::steps :current-step="2" orientation="vertical">
    <x-keys::step label="Create Account" />
    <x-keys::step label="Choose Plan" />
    <x-keys::step label="Payment" />
    <x-keys::step label="Complete" />
</x-keys::steps>
```

## Variants

### Numbered (Default)
Shows step numbers inside circles.

```blade
<x-keys::steps :current-step="2" variant="numbered">
    <x-keys::step label="Step One" />
    <x-keys::step label="Step Two" />
    <x-keys::step label="Step Three" />
</x-keys::steps>
```

### Icon
Shows custom icons for each step.

```blade
<x-keys::steps :current-step="2" variant="icon">
    <x-keys::step label="Account" icon="heroicon-o-user" />
    <x-keys::step label="Profile" icon="heroicon-o-identification" />
    <x-keys::step label="Complete" icon="heroicon-o-check-circle" />
</x-keys::steps>
```

### Dots
Shows simple dots for each step.

```blade
<x-keys::steps :current-step="2" variant="dots">
    <x-keys::step label="Start" />
    <x-keys::step label="Middle" />
    <x-keys::step label="End" />
</x-keys::steps>
```

## Sizes

```blade
<!-- Small -->
<x-keys::steps :current-step="1" size="sm">
    <x-keys::step label="Step 1" />
    <x-keys::step label="Step 2" />
</x-keys::steps>

<!-- Medium (Default) -->
<x-keys::steps :current-step="1" size="md">
    <x-keys::step label="Step 1" />
    <x-keys::step label="Step 2" />
</x-keys::steps>

<!-- Large -->
<x-keys::steps :current-step="1" size="lg">
    <x-keys::step label="Step 1" />
    <x-keys::step label="Step 2" />
</x-keys::steps>
```

## Clickable Steps

Enable clicking on completed steps to navigate back:

```blade
<x-keys::steps :current-step="3" :clickable="true">
    <x-keys::step
        label="Account"
        wire:click="goToStep(1)"
    />
    <x-keys::step
        label="Profile"
        wire:click="goToStep(2)"
    />
    <x-keys::step
        label="Review"
        wire:click="goToStep(3)"
    />
</x-keys::steps>
```

Only completed steps (before the current step) are clickable when `clickable="true"`.

## Step States

The Steps component automatically calculates and applies three states:

- **Complete**: Steps before the current step
- **Current**: The active step
- **Pending**: Steps after the current step

```blade
<x-keys::steps :current-step="2">
    <!-- This step is "complete" -->
    <x-keys::step label="Step 1" />

    <!-- This step is "current" -->
    <x-keys::step label="Step 2" />

    <!-- These steps are "pending" -->
    <x-keys::step label="Step 3" />
    <x-keys::step label="Step 4" />
</x-keys::steps>
```

## With Descriptions

Add descriptions to provide more context:

```blade
<x-keys::steps :current-step="2">
    <x-keys::step
        label="Personal Information"
        description="Enter your basic details"
    />
    <x-keys::step
        label="Contact Details"
        description="Phone and email"
    />
    <x-keys::step
        label="Verification"
        description="Confirm your identity"
    />
</x-keys::steps>
```

## Livewire Integration

### Multi-Step Form

```blade
<div>
    <x-keys::steps :current-step="$currentStep" :clickable="true">
        <x-keys::step
            label="Account"
            wire:click="goToStep(1)"
        />
        <x-keys::step
            label="Profile"
            wire:click="goToStep(2)"
        />
        <x-keys::step
            label="Review"
            wire:click="goToStep(3)"
        />
    </x-keys::steps>

    @if ($currentStep === 1)
        <!-- Account form fields -->
    @elseif ($currentStep === 2)
        <!-- Profile form fields -->
    @elseif ($currentStep === 3)
        <!-- Review content -->
    @endif

    <div class="flex gap-3 justify-between mt-6">
        @if ($currentStep > 1)
            <x-keys::button
                variant="outlined"
                wire:click="previousStep"
            >
                Previous
            </x-keys::button>
        @endif

        @if ($currentStep < 3)
            <x-keys::button
                color="primary"
                wire:click="nextStep"
            >
                Next
            </x-keys::button>
        @else
            <x-keys::button
                color="success"
                wire:click="submit"
            >
                Complete
            </x-keys::button>
        @endif
    </div>
</div>
```

```php
class MultiStepForm extends Component
{
    public int $currentStep = 1;

    public function goToStep(int $step): void
    {
        // Only allow going back to completed steps
        if ($step < $this->currentStep) {
            $this->currentStep = $step;
        }
    }

    public function nextStep(): void
    {
        $this->validate(); // Validate current step
        $this->currentStep++;
    }

    public function previousStep(): void
    {
        $this->currentStep--;
    }

    public function submit(): void
    {
        // Final submission
    }
}
```

## Component Methods

The Steps component provides helper methods for determining step states:

```php
// In your Blade template or component
$steps = new Steps(currentStep: 3);

$steps->isStepComplete(1);    // true
$steps->isStepComplete(2);    // true
$steps->isStepComplete(3);    // false

$steps->isStepCurrent(3);     // true
$steps->isStepCurrent(2);     // false

$steps->isStepPending(4);     // true
$steps->isStepPending(3);     // false

$steps->getStepStatus(1);     // 'complete'
$steps->getStepStatus(3);     // 'current'
$steps->getStepStatus(4);     // 'pending'

$steps->isStepClickable(1);   // true (if clickable enabled)
$steps->isStepClickable(4);   // false (pending steps not clickable)
```

## Accessibility

The Steps component includes comprehensive accessibility features:

- `role="list"` for the steps container
- Proper ARIA attributes for step states
- Keyboard navigation support
- Focus-visible styles
- Screen reader announcements for state changes

## Data Attributes

The component generates comprehensive data attributes for CSS targeting and JavaScript:

- `data-keys-steps="true"` - Component identifier
- `data-orientation="horizontal"` - Orientation setting
- `data-variant="numbered"` - Visual variant
- `data-size="md"` - Size variant
- `data-current-step="2"` - Current active step
- `data-clickable="true"` - Clickable state (if enabled)

## Use Cases

### Registration Wizard
```blade
<x-keys::steps :current-step="$step" :clickable="true">
    <x-keys::step
        label="Create Account"
        description="Basic information"
        wire:click="goToStep(1)"
    />
    <x-keys::step
        label="Choose Plan"
        description="Select your subscription"
        wire:click="goToStep(2)"
    />
    <x-keys::step
        label="Payment"
        description="Enter payment details"
        wire:click="goToStep(3)"
    />
    <x-keys::step
        label="Complete"
        description="Finish setup"
    />
</x-keys::steps>
```

### Checkout Process
```blade
<x-keys::steps :current-step="$checkoutStep" variant="numbered" size="lg">
    <x-keys::step label="Cart" icon="heroicon-o-shopping-cart" />
    <x-keys::step label="Shipping" icon="heroicon-o-truck" />
    <x-keys::step label="Payment" icon="heroicon-o-credit-card" />
    <x-keys::step label="Confirmation" icon="heroicon-o-check-circle" />
</x-keys::steps>
```

### Onboarding Flow
```blade
<x-keys::steps :current-step="$onboardingStep" orientation="vertical" size="lg">
    <x-keys::step
        label="Welcome"
        description="Learn about our platform"
    />
    <x-keys::step
        label="Setup Profile"
        description="Tell us about yourself"
    />
    <x-keys::step
        label="Import Data"
        description="Bring in your existing data"
    />
    <x-keys::step
        label="Invite Team"
        description="Add your team members"
    />
    <x-keys::step
        label="Get Started"
        description="You're all set!"
    />
</x-keys::steps>
```

## Styling

The steps component uses Tailwind CSS v4 and includes:

- Responsive design (horizontal becomes vertical on mobile)
- Smooth transitions between states
- Connector lines between steps
- Hover states for clickable steps
- Focus-visible rings for keyboard navigation
- Size-appropriate spacing and typography

## Best Practices

1. **Use descriptive labels**: Make it clear what each step involves

2. **Provide descriptions**: Add context for complex steps

3. **Enable clickable when appropriate**: Allow users to review previous steps

4. **Choose the right variant**: Use numbered for sequential steps, icons for visual clarity, dots for minimal UI

5. **Consider orientation**: Use vertical for many steps or detailed descriptions

6. **Validate before advancing**: Always validate the current step before moving forward

7. **Save progress**: Consider persisting step progress for long forms

8. **Show step count**: Display "Step 2 of 4" for user awareness

## Component Structure

The Steps component consists of:

1. **PHP Class** (`Steps.php`)
   - Props validation
   - Step state calculation
   - Clickable logic
   - Data attributes generation

2. **Blade Template** (`steps.blade.php`)
   - Responsive layout
   - Grid system
   - Slot for step items

3. **Step Component** (`Step.php`)
   - Individual step rendering
   - Icon/number display
   - State styling
