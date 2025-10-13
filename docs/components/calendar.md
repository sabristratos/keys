# Calendar Component

A standalone calendar component for date and date range selection with month navigation, date constraints, quick selectors, and form integration.

## Basic Usage

```blade
<x-keys::calendar name="selected_date" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | auto-generated | Calendar ID |
| `value` | `mixed` | `null` | Selected date |
| `min-date` | `string\|Carbon\|null` | `null` | Minimum selectable date |
| `max-date` | `string\|Carbon\|null` | `null` | Maximum selectable date |
| `disabled-dates` | `array` | `[]` | Array of disabled dates |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |
| `disabled` | `bool` | `false` | Disable selection |
| `required` | `bool` | `false` | Mark as required |
| `label` | `string\|null` | `null` | Label text (shorthand mode) |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|Collection\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display validation errors |
| `current-month` | `Carbon\|null` | current month | Starting month to display |
| `is-range` | `bool` | `false` | Enable range selection |
| `start-date` | `mixed` | `null` | Range start date |
| `end-date` | `mixed` | `null` | Range end date |
| `months-to-show` | `int` | `1` | Number of months to display |
| `quick-selectors` | `bool\|array` | `false` | Quick date selectors |
| `full-width` | `bool` | `false` | Full width display |

## Single Date Selection

```blade
<x-keys::calendar
    name="appointment_date"
    value="2024-06-15"
/>
```

## Date Range Selection

```blade
<x-keys::calendar
    name="date_range"
    :is-range="true"
    start-date="2024-06-01"
    end-date="2024-06-30"
/>
```

## With Constraints

```blade
<x-keys::calendar
    name="booking_date"
    min-date="2024-06-01"
    max-date="2024-12-31"
    :disabled-dates="['2024-07-04', '2024-12-25', '2024-12-31']"
/>
```

## Multiple Months

```blade
<x-keys::calendar
    name="date_range"
    :is-range="true"
    :months-to-show="2"
/>
```

## With Quick Selectors

```blade
<x-keys::calendar
    name="report_date"
    :quick-selectors="true"
/>
```

Custom quick selectors:

```blade
<x-keys::calendar
    name="date"
    :quick-selectors="[
        ['label' => 'Today', 'value' => 'today'],
        ['label' => 'This Week', 'value' => 'thisweek', 'range' => true],
        ['label' => 'This Month', 'value' => 'thismonth', 'range' => true]
    ]"
/>
```

## Sizes

```blade
<x-keys::calendar size="sm" name="date" />
<x-keys::calendar size="md" name="date" />
<x-keys::calendar size="lg" name="date" />
```

## Full Width

```blade
<x-keys::calendar
    name="date"
    :full-width="true"
/>
```

## Livewire Integration

```blade
<x-keys::calendar
    name="selected_date"
    wire:model.live="selectedDate"
/>

<p>Selected Date: {{ $selectedDate }}</p>
```

### Range Selection

```blade
<x-keys::calendar
    name="date_range"
    :is-range="true"
    wire:model.live="dateRange"
/>

<p>From: {{ $dateRange['start'] ?? 'Not selected' }}</p>
<p>To: {{ $dateRange['end'] ?? 'Not selected' }}</p>
```

## Use Cases

### Vacation Planner

```blade
<div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Select Vacation Dates</h2>

    <x-keys::calendar
        name="vacation_dates"
        :is-range="true"
        :months-to-show="2"
        wire:model.live="vacationDates"
        min-date="{{ now()->format('Y-m-d') }}"
        :disabled-dates="$blackoutDates"
        :quick-selectors="true"
    />

    @if($vacationDates['start'] && $vacationDates['end'])
        <div class="mt-6 p-4 bg-blue-50 rounded">
            <p class="font-semibold">Your vacation:</p>
            <p>{{ $vacationDates['start'] }} to {{ $vacationDates['end'] }}</p>
            <p>{{ $daysCount }} days</p>
        </div>
    @endif
</div>
```

### Event Scheduling

```blade
<form wire:submit="scheduleEvent">
    <x-keys::field>
        <x-keys::label>Event Date</x-keys::label>
        <x-keys::calendar
            name="event_date"
            wire:model="eventDate"
            min-date="{{ now()->addDay()->format('Y-m-d') }}"
            :required="true"
        />
    </x-keys::field>

    <x-keys::button type="submit" color="primary" class="mt-4">
        Schedule Event
    </x-keys::button>
</form>
```

### Availability Calendar

```blade
<div>
    <h3 class="text-lg font-semibold mb-4">Check Availability</h3>

    <x-keys::calendar
        name="check_in_out"
        :is-range="true"
        :months-to-show="2"
        wire:model.live="checkInOut"
        min-date="{{ now()->format('Y-m-d') }}"
        :disabled-dates="$bookedDates"
        size="lg"
    />

    @if($checkInOut['start'] && $checkInOut['end'])
        <div class="mt-6 p-6 border rounded-lg">
            <h4 class="font-semibold mb-2">Booking Summary</h4>
            <p>Check-in: {{ $checkInOut['start'] }}</p>
            <p>Check-out: {{ $checkInOut['end'] }}</p>
            <p class="mt-2 text-xl font-bold">Total: ${{ $totalPrice }}</p>

            <x-keys::button color="primary" class="mt-4 w-full">
                Book Now
            </x-keys::button>
        </div>
    @endif
</div>
```

## Accessibility

The Calendar component includes:

- Keyboard navigation (arrow keys, Enter, Escape, Home, End, Page Up, Page Down)
- ARIA labels and roles
- Screen reader support
- Focus management
- Proper date announcements

## Data Attributes

- `data-keys-calendar="true"`
- `data-variant="single"` or `"range"`
- `data-size="md"`
- `data-months-to-show="1"`
- `data-is-range="true"` (if applicable)
- `data-has-min-date="true"` (if applicable)
- `data-has-max-date="true"` (if applicable)
- `data-has-disabled-dates="true"` (if applicable)
- `data-selection-state` - Current selection state

## Best Practices

1. **Set appropriate constraints**: Prevent selection of invalid dates
2. **Mark unavailable dates**: Clearly indicate disabled dates
3. **Show multiple months for ranges**: Easier to see across month boundaries
4. **Provide quick selectors**: For common date selections
5. **Validate selections**: Ensure end date is after start date for ranges
6. **Consider timezone**: Be clear about timezone for bookings
7. **Test keyboard navigation**: Ensure calendar is fully keyboard accessible

## Component Structure

1. **PHP Class** (`Calendar.php`)
   - Date calculation
   - Constraint validation
   - Range handling
   - Data attributes generation

2. **Blade Template** (`calendar.blade.php`)
   - Month grid rendering
   - Date cells
   - Navigation controls
   - Quick selectors

3. **TypeScript Actions** (`CalendarActions.ts`)
   - Date selection handling
   - Range selection logic
   - Keyboard navigation
   - Quick selector actions
