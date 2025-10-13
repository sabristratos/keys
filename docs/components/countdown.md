# Countdown Component

A real-time countdown timer component with support for days, hours, minutes, and seconds. Features multiple display variants and customizable completion messages.

## Basic Usage

```blade
<x-keys::countdown target="2024-12-31 23:59:59" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `target` | `string\|null` | `null` | Target date/time or timestamp |
| `days` | `int\|null` | `null` | Days from now |
| `hours` | `int\|null` | `null` | Hours from now |
| `minutes` | `int\|null` | `null` | Minutes from now |
| `seconds` | `int\|null` | `null` | Seconds from now |
| `variant` | `string` | `'inline'` | Display variant: `inline`, `boxed` |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg`, `xl` |
| `show-labels` | `bool` | `true` | Show unit labels |
| `show-days` | `bool` | `true` | Show days |
| `show-hours` | `bool` | `true` | Show hours |
| `show-minutes` | `bool` | `true` | Show minutes |
| `show-seconds` | `bool` | `true` | Show seconds |
| `complete-message` | `string\|null` | `'Countdown finished!'` | Message when complete |
| `id` | `string\|null` | auto-generated | Custom ID |

## Target Date/Time

### Absolute Date
```blade
<x-keys::countdown target="2024-12-31 23:59:59" />
```

### Unix Timestamp
```blade
<x-keys::countdown :target="1735689599" />
```

## Relative Time

### From Now
```blade
<!-- 24 hours from now -->
<x-keys::countdown :hours="24" />

<!-- 7 days from now -->
<x-keys::countdown :days="7" />

<!-- Combination -->
<x-keys::countdown :days="2" :hours="12" :minutes="30" />
```

## Variants

### Inline (Default)
Compact inline display:

```blade
<x-keys::countdown
    variant="inline"
    target="2024-12-31 23:59:59"
/>
```

### Boxed
Each unit in a box:

```blade
<x-keys::countdown
    variant="boxed"
    target="2024-12-31 23:59:59"
/>
```

## Sizes

```blade
<x-keys::countdown size="sm" :days="7" />
<x-keys::countdown size="md" :days="7" />
<x-keys::countdown size="lg" :days="7" />
<x-keys::countdown size="xl" :days="7" />
```

## Customizing Display

### Hide Specific Units
```blade
<!-- Only show hours and minutes -->
<x-keys::countdown
    target="2024-12-31 18:00:00"
    :show-days="false"
    :show-seconds="false"
/>
```

### Hide Labels
```blade
<x-keys::countdown
    target="2024-12-31 23:59:59"
    :show-labels="false"
/>
```

## Completion Message

```blade
<x-keys::countdown
    target="2024-12-31 23:59:59"
    complete-message="Happy New Year!"
/>
```

## Use Cases

### Product Launch
```blade
<div class="text-center py-12">
    <h2 class="text-3xl font-bold mb-4">Launching Soon</h2>
    <x-keys::countdown
        target="2024-06-15 09:00:00"
        variant="boxed"
        size="xl"
        complete-message="We're Live!"
    />
    <p class="mt-4 text-gray-600">Get ready for something amazing</p>
</div>
```

### Sale Timer
```blade
<div class="bg-red-50 border border-red-200 rounded p-4">
    <div class="flex items-center justify-between">
        <div>
            <h3 class="font-semibold text-red-900">Flash Sale Ends In:</h3>
        </div>
        <x-keys::countdown
            :hours="6"
            variant="inline"
            size="lg"
            complete-message="Sale Ended"
        />
    </div>
</div>
```

### Event Countdown
```blade
<div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Conference Starts In:</h2>
    <x-keys::countdown
        target="2024-09-20 09:00:00"
        variant="boxed"
        size="xl"
    />
</div>
```

### Limited Offer
```blade
<div class="border rounded-lg p-6">
    <h3 class="text-lg font-semibold mb-2">Limited Time Offer</h3>
    <p class="text-gray-600 mb-4">Get 50% off - Hurry!</p>

    <x-keys::countdown
        :days="3"
        variant="boxed"
        size="md"
        complete-message="Offer Expired"
    />

    <x-keys::button color="primary" class="mt-4 w-full">
        Claim Offer
    </x-keys::button>
</div>
```

## Livewire Integration

```blade
<div>
    @if($offerActive)
        <x-keys::countdown
            :target="$offerEndTime"
            complete-message="Offer Expired"
        />
    @else
        <p class="text-red-600 font-semibold">Offer has ended</p>
    @endif
</div>
```

## Accessibility

The Countdown component:

- Uses semantic HTML
- Provides ARIA live regions for updates
- Announces completion to screen readers
- Maintains readable contrast ratios

## Data Attributes

- `data-keys-countdown="true"`
- `data-target="1735689599"`
- `data-units='["days","hours","minutes","seconds"]'`
- `data-complete-message="Countdown finished!"`

## Best Practices

1. **Use absolute dates for specific events**: More reliable than relative times
2. **Show appropriate units**: Hide unnecessary units for short countdowns
3. **Provide completion message**: Let users know when countdown finishes
4. **Match size to context**: Larger for heroes, smaller for inline
5. **Consider time zones**: Be clear about which timezone the countdown uses
6. **Test expiry behavior**: Ensure proper behavior when countdown reaches zero

## Component Structure

1. **PHP Class** (`Countdown.php`)
   - Target calculation
   - Unit configuration
   - Data attributes

2. **Blade Template** (`countdown.blade.php`)
   - Display variants
   - Unit rendering
   - Labels

3. **TypeScript Actions** (`CountdownActions.ts`)
   - Real-time updates
   - Completion handling
   - Time calculations
