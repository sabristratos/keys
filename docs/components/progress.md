# Progress Component

A comprehensive progress indicator component with multiple variants, animations, and value display options. Features size variants, color themes, striped and animated styles, and full accessibility support.

## Basic Usage

```blade
<x-keys::progress :value="75" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `int\|float` | `0` | Current progress value |
| `max` | `int\|float` | `100` | Maximum progress value |
| `label` | `string\|null` | `null` | Label text displayed above the progress bar |
| `showValue` | `bool` | `true` | Whether to show value/max display (e.g., "75/100") |
| `showPercentage` | `bool` | `true` | Whether to show percentage display (e.g., "75%") |
| `size` | `string` | `'md'` | Size variant: `xs`, `sm`, `md`, `lg`, `xl` |
| `color` | `string` | `'brand'` | Color variant: `brand`, `success`, `warning`, `danger`, `info`, `neutral` |
| `variant` | `string` | `'default'` | Style variant (for future extensions) |
| `animated` | `bool` | `false` | Whether to show animated moving stripes |
| `striped` | `bool` | `false` | Whether to show static stripes |
| `status` | `string\|null` | `null` | Status text displayed below the progress bar |
| `id` | `string\|null` | Auto-generated | Custom ID for the progress element |

## Size Variants

### Extra Small
```blade
<x-keys::progress :value="25" size="xs" label="Extra Small" />
```

### Small
```blade
<x-keys::progress :value="40" size="sm" label="Small" />
```

### Medium (Default)
```blade
<x-keys::progress :value="60" size="md" label="Medium" />
```

### Large
```blade
<x-keys::progress :value="80" size="lg" label="Large" />
```

### Extra Large
```blade
<x-keys::progress :value="90" size="xl" label="Extra Large" />
```

## Color Variants

### Brand (Default)
```blade
<x-keys::progress :value="75" color="brand" label="Brand Color" />
```

### Success
```blade
<x-keys::progress :value="100" color="success" label="Upload Complete" />
```

### Warning
```blade
<x-keys::progress :value="85" color="warning" label="Storage Almost Full" />
```

### Danger
```blade
<x-keys::progress :value="95" color="danger" label="Critical Usage" />
```

### Info
```blade
<x-keys::progress :value="50" color="info" label="Processing" />
```

### Neutral
```blade
<x-keys::progress :value="60" color="neutral" label="Neutral Progress" />
```

## Visual Styles

### Default
```blade
<x-keys::progress :value="70" label="Solid Progress" />
```

### Striped
```blade
<x-keys::progress :value="65" :striped="true" label="Striped Progress" />
```

### Animated
```blade
<x-keys::progress :value="80" :animated="true" label="Processing..." />
```

### Animated with Color
```blade
<x-keys::progress
    :value="45"
    :animated="true"
    color="success"
    label="Uploading Files"
/>
```

## Value Display Options

### Show Percentage (Default)
```blade
<x-keys::progress :value="75" label="Progress" />
{{-- Displays: 75% --}}
```

### Show Value/Max
```blade
<x-keys::progress
    :value="750"
    :max="1000"
    :showPercentage="false"
    :showValue="true"
    label="Files Processed"
/>
{{-- Displays: 750/1000 --}}
```

### Hide Value Display
```blade
<x-keys::progress
    :value="60"
    :showPercentage="false"
    :showValue="false"
    label="Loading"
/>
```

### Label Only
```blade
<x-keys::progress
    :value="40"
    label="Installation Progress"
    :showPercentage="false"
    :showValue="false"
/>
```

## With Status Text

```blade
<x-keys::progress
    :value="3"
    :max="5"
    label="Processing Items"
    status="3 of 5 items completed"
    color="info"
    :animated="true"
/>
```

## Real-World Examples

### File Upload Progress
```blade
<x-keys::progress
    :value="$uploadedBytes"
    :max="$totalBytes"
    label="Uploading {{ $filename }}"
    status="{{ $uploadSpeed }} MB/s - {{ $remainingTime }} remaining"
    color="brand"
    :animated="true"
    size="lg"
/>
```

### Download Progress
```blade
<x-keys::progress
    :value="$downloadPercent"
    label="Downloading Update"
    color="info"
    :animated="true"
    status="Please don't close this window"
/>
```

### Installation Steps
```blade
<x-keys::progress
    :value="$currentStep"
    :max="$totalSteps"
    :showPercentage="false"
    label="Installation Progress"
    status="Step {{ $currentStep }} of {{ $totalSteps }}: {{ $currentStepName }}"
    color="brand"
    size="lg"
/>
```

### Course Completion
```blade
<x-keys::progress
    :value="$completedLessons"
    :max="$totalLessons"
    label="{{ $courseName }}"
    color="success"
    status="{{ $completedLessons }} of {{ $totalLessons }} lessons completed"
/>
```

### Storage Usage
```blade
@php
    $usagePercent = ($usedStorage / $totalStorage) * 100;
    $color = match(true) {
        $usagePercent >= 90 => 'danger',
        $usagePercent >= 75 => 'warning',
        default => 'info'
    };
@endphp

<x-keys::progress
    :value="$usedStorage"
    :max="$totalStorage"
    label="Storage Usage"
    :color="$color"
    status="{{ $usedStorageFormatted }} of {{ $totalStorageFormatted }} used"
/>
```

### Task Completion
```blade
<x-keys::progress
    :value="$completedTasks"
    :max="$totalTasks"
    label="Today's Tasks"
    color="success"
    status="{{ $remainingTasks }} remaining"
/>
```

### Profile Completion
```blade
<x-keys::progress
    :value="$profileCompletionPercent"
    label="Profile Completion"
    color="brand"
    status="Complete your profile to unlock all features"
    size="lg"
/>
```

### Form Progress
```blade
<x-keys::progress
    :value="$currentPage"
    :max="$totalPages"
    :showPercentage="false"
    label="Application Form"
    status="Page {{ $currentPage }} of {{ $totalPages }}"
    color="brand"
/>
```

### Build Progress
```blade
<x-keys::progress
    :value="$buildProgress"
    label="Building Project"
    :animated="true"
    color="info"
    status="{{ $currentBuildStep }}"
    size="lg"
/>
```

### Quiz Progress
```blade
<x-keys::progress
    :value="$answeredQuestions"
    :max="$totalQuestions"
    :showPercentage="false"
    label="Quiz Progress"
    status="Question {{ $answeredQuestions + 1 }} of {{ $totalQuestions }}"
    color="brand"
/>
```

### Video Buffer
```blade
<x-keys::progress
    :value="$bufferedSeconds"
    :max="$totalSeconds"
    :showPercentage="false"
    :showValue="false"
    label="Buffering"
    color="info"
    :animated="true"
    size="xs"
/>
```

### Subscription Tier
```blade
<x-keys::progress
    :value="$usedFeatures"
    :max="$planLimit"
    label="API Requests ({{ $planName }})"
    status="{{ $remainingRequests }} requests remaining this month"
    :color="$remainingRequests < 1000 ? 'warning' : 'success'"
/>
```

### Health Check
```blade
<x-keys::progress
    :value="$passedChecks"
    :max="$totalChecks"
    :showPercentage="false"
    label="System Health"
    status="All systems operational"
    color="success"
    size="sm"
/>
```

### Loading Multiple Items
```blade
<div class="space-y-4">
    @foreach($downloads as $download)
        <x-keys::progress
            :value="$download->progress"
            label="{{ $download->filename }}"
            :animated="true"
            color="brand"
            status="{{ $download->status }}"
        />
    @endforeach
</div>
```

### Onboarding Steps
```blade
<x-keys::progress
    :value="$completedOnboardingSteps"
    :max="$totalOnboardingSteps"
    label="Getting Started"
    status="Complete these steps to get the most out of your account"
    color="brand"
    size="lg"
/>
```

## With Livewire

### Real-Time Progress Updates
```blade
<div wire:poll.500ms>
    <x-keys::progress
        :value="$progress"
        label="Processing"
        :animated="true"
        color="info"
        status="{{ $statusMessage }}"
    />
</div>
```

### File Upload with Livewire
```blade
<form wire:submit="upload">
    <input type="file" wire:model="file">

    @if($uploading)
        <x-keys::progress
            :value="$uploadProgress"
            label="Uploading {{ $file->getClientOriginalName() }}"
            :animated="true"
            color="brand"
            status="Please wait..."
        />
    @endif
</form>
```

### Task Processing
```blade
<div>
    <x-keys::button wire:click="processItems">
        Process Items
    </x-keys::button>

    @if($processing)
        <x-keys::progress
            :value="$processedItems"
            :max="$totalItems"
            label="Processing Items"
            :animated="true"
            color="info"
            status="{{ $currentItem }}"
            wire:poll.250ms="updateProgress"
        />
    @endif
</div>
```

### Multi-Step Form
```blade
<div>
    <x-keys::progress
        :value="$currentStep"
        :max="$totalSteps"
        :showPercentage="false"
        label="Registration"
        status="Step {{ $currentStep }}: {{ $stepNames[$currentStep - 1] }}"
        color="brand"
        size="lg"
    />

    @if($currentStep === 1)
        {{-- Step 1 form fields --}}
    @elseif($currentStep === 2)
        {{-- Step 2 form fields --}}
    @endif

    <div class="flex gap-3 mt-4">
        @if($currentStep > 1)
            <x-keys::button wire:click="previousStep" variant="outline">
                Previous
            </x-keys::button>
        @endif

        @if($currentStep < $totalSteps)
            <x-keys::button wire:click="nextStep">
                Next
            </x-keys::button>
        @else
            <x-keys::button wire:click="submit">
                Complete
            </x-keys::button>
        @endif
    </div>
</div>
```

### Dynamic Color Based on Value
```blade
@php
    $color = match(true) {
        $score >= 80 => 'success',
        $score >= 60 => 'info',
        $score >= 40 => 'warning',
        default => 'danger'
    };
@endphp

<x-keys::progress
    :value="$score"
    label="Performance Score"
    :color="$color"
    status="{{ $scoreLabel }}"
/>
```

### Complete Event
```blade
<div>
    <x-keys::progress
        :value="$progress"
        label="Processing"
        :animated="true"
        color="brand"
        wire:poll.500ms="checkProgress"
    />

    @if($completed)
        <x-keys::alert type="success" class="mt-4">
            Processing completed successfully!
        </x-keys::alert>
    @endif
</div>
```

## Accessibility

The Progress component includes comprehensive accessibility features:

- `role="progressbar"` for proper ARIA role
- `aria-valuenow` for current value
- `aria-valuemin` for minimum value (0)
- `aria-valuemax` for maximum value
- `aria-label` with descriptive text including percentage
- Semantic HTML structure
- Sufficient color contrast for all variants
- Screen reader friendly status updates

```blade
<x-keys::progress
    :value="75"
    label="Upload Progress"
    status="75% complete - uploading document.pdf"
/>
{{-- ARIA label: "Upload Progress: 75% complete" --}}
```

## Best Practices

1. **Use appropriate colors**: Match colors to context (success for completions, warning for high usage, danger for critical states)

2. **Provide clear labels**: Always include descriptive labels so users understand what's progressing

3. **Show relevant values**: Choose between percentage and value/max based on what's more meaningful to users

4. **Add status text**: Provide additional context with status messages when helpful

5. **Use animation wisely**: Animated stripes indicate active processing, don't overuse

6. **Match size to context**: Use larger sizes for prominent progress indicators, smaller for compact UIs

7. **Update frequently**: For real-time progress, update at reasonable intervals (250-500ms) to show smooth progression

8. **Handle edge cases**: Consider what to show at 0% and 100%

9. **Provide feedback**: Combine with success messages or next steps when progress completes

10. **Consider performance**: For multiple progress bars updating frequently, optimize polling and updates

## Dynamic Color Selection

Use conditional color selection for contextual feedback:

```blade
@php
    $color = match(true) {
        $value >= $max => 'success',
        $value / $max >= 0.9 => 'warning',
        $value / $max >= 0.75 => 'info',
        default => 'brand'
    };
@endphp

<x-keys::progress
    :value="$value"
    :max="$max"
    :color="$color"
    label="Resource Usage"
/>
```

## Multiple Progress Bars

Display multiple related progress indicators:

```blade
<div class="space-y-6">
    <x-keys::progress
        :value="$cpuUsage"
        label="CPU Usage"
        color="info"
    />

    <x-keys::progress
        :value="$memoryUsage"
        label="Memory Usage"
        :color="$memoryUsage > 80 ? 'warning' : 'info'"
    />

    <x-keys::progress
        :value="$diskUsage"
        label="Disk Usage"
        :color="$diskUsage > 90 ? 'danger' : 'info'"
    />
</div>
```

## In Cards

```blade
<x-keys::card>
    <x-keys::heading level="h3" size="lg">
        Monthly Goals
    </x-keys::heading>

    <div class="space-y-4 mt-4">
        <x-keys::progress
            :value="$salesProgress"
            label="Sales Target"
            color="success"
            status="{{ $salesAmount }} of {{ $salesTarget }}"
        />

        <x-keys::progress
            :value="$customersProgress"
            label="New Customers"
            color="brand"
            status="{{ $customersCount }} of {{ $customersTarget }}"
        />
    </div>
</x-keys::card>
```

## Technical Details

### Percentage Calculation

The component automatically calculates percentage from value and max:

```php
// Rounded to 1 decimal place
$percentage = round(($value / $max) * 100, 1);
```

### Value Clamping

Values are automatically clamped to valid range:

```php
// Ensures value is between 0 and max
$value = max(0, min($value, $max));
```

### Stripe Animation

Animated stripes use CSS keyframes for smooth performance:

```css
@keyframes progress-bar-stripes {
    0% {
        background-position-x: 1rem;
    }
}
```

### Transitions

Progress bar width changes are smoothly animated:

```css
transition-all duration-300 ease-out
```

## Component Structure

The Progress component consists of:

1. **PHP Class** (`Progress.php`)
   - Props validation and defaults
   - Percentage calculation
   - Display value formatting
   - ARIA label generation
   - Completion state checking
   - Data attributes generation

2. **Blade Template** (`progress.blade.php`)
   - Optional header with label and value
   - Progress bar container with ARIA attributes
   - Animated/striped progress bar
   - Optional status text
   - CSS animations for stripes

## Data Attributes

The component generates helpful data attributes:

- `data-keys-progress="true"` - Component identifier
- `data-variant="default"` - Style variant
- `data-size="md"` - Size variant
- `data-color="brand"` - Color variant
- `data-value="75"` - Current value
- `data-max="100"` - Maximum value
- `data-percent="75.0"` - Calculated percentage
- `data-striped="true"` - Striped style indicator
- `data-animated="true"` - Animation indicator
- `data-show-value="true"` - Value display indicator
- `data-show-percentage="true"` - Percentage display indicator
- `data-status="Processing..."` - Status text
- `data-complete="true"` - Completion indicator

## Helper Methods

The component provides useful helper methods:

```php
$progress->getPercentage(); // Returns float percentage (0-100)
$progress->getDisplayValue(); // Returns formatted display string
$progress->getAriaLabel(); // Returns accessibility label
$progress->isComplete(); // Returns true if value >= max
```
