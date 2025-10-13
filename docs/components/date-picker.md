# Date Picker Component

A comprehensive date picker with single date and range selection, calendar popover, quick selectors, validation, and Livewire integration.

## Basic Usage

```blade
<x-keys::date-picker name="date" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | auto-generated | Input ID |
| `value` | `mixed` | `null` | Selected date |
| `placeholder` | `string\|null` | auto-generated | Placeholder text |
| `format` | `string` | `'Y-m-d'` | Date format |
| `display-format` | `string\|null` | same as format | Display format |
| `is-range` | `bool` | `false` | Enable date range selection |
| `start-date` | `mixed` | `null` | Range start date |
| `end-date` | `mixed` | `null` | Range end date |
| `min-date` | `string\|Carbon\|null` | `null` | Minimum selectable date |
| `max-date` | `string\|Carbon\|null` | `null` | Maximum selectable date |
| `disabled-dates` | `array` | `[]` | Array of disabled dates |
| `months-to-show` | `int` | `1` | Number of months to display |
| `quick-selectors` | `bool\|array` | `false` | Quick date selectors |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |
| `width` | `string` | `'full'` | Width: `auto`, `full` |
| `inline` | `bool` | `false` | Show calendar inline |
| `disabled` | `bool` | `false` | Disable the picker |
| `readonly` | `bool` | `false` | Make readonly |
| `clearable` | `bool` | `false` | Show clear button |
| `show-calendar-icon` | `bool` | `true` | Show calendar icon |
| `close-on-select` | `bool` | `true` | Close on date selection |
| `icon-left` | `string\|null` | `null` | Left icon |
| `icon-right` | `string\|null` | `null` | Right icon |
| `required` | `bool` | `false` | Mark as required |
| `label` | `string\|null` | `null` | Label text (shorthand mode) |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|Collection\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display validation errors |

## Single Date

```blade
<x-keys::date-picker
    label="Select Date"
    name="date"
    value="2024-06-15"
/>
```

## Date Range

```blade
<x-keys::date-picker
    label="Date Range"
    name="date_range"
    :is-range="true"
    start-date="2024-06-01"
    end-date="2024-06-30"
/>
```

## Date Formats

```blade
<!-- Y-m-d (Default) -->
<x-keys::date-picker name="date" format="Y-m-d" />

<!-- m/d/Y -->
<x-keys::date-picker name="date" format="m/d/Y" />

<!-- d-m-Y -->
<x-keys::date-picker name="date" format="d-m-Y" />

<!-- F j, Y (June 15, 2024) -->
<x-keys::date-picker name="date" format="F j, Y" />
```

## Display vs Storage Format

```blade
<x-keys::date-picker
    name="date"
    format="Y-m-d"
    display-format="F j, Y"
/>
```

## Date Constraints

```blade
<x-keys::date-picker
    label="Appointment Date"
    name="appointment"
    min-date="2024-06-01"
    max-date="2024-12-31"
    :disabled-dates="['2024-07-04', '2024-12-25']"
/>
```

## Quick Selectors

```blade
<x-keys::date-picker
    label="Select Date"
    name="date"
    :quick-selectors="true"
/>
```

Custom quick selectors:

```blade
<x-keys::date-picker
    name="date"
    :quick-selectors="[
        ['label' => 'Today', 'value' => 'today'],
        ['label' => 'Tomorrow', 'value' => 'tomorrow'],
        ['label' => 'Next Week', 'value' => 'nextweek']
    ]"
/>
```

## Multiple Months

```blade
<x-keys::date-picker
    name="date_range"
    :is-range="true"
    :months-to-show="2"
/>
```

## Inline Calendar

```blade
<x-keys::date-picker
    name="date"
    :inline="true"
/>
```

## Clearable

```blade
<x-keys::date-picker
    label="Optional Date"
    name="optional_date"
    :clearable="true"
/>
```

## Livewire Integration

```blade
<x-keys::date-picker
    label="Start Date"
    name="start_date"
    wire:model.live="startDate"
/>

<x-keys::date-picker
    label="End Date"
    name="end_date"
    wire:model.live="endDate"
/>

<p>Selected: {{ $startDate }} to {{ $endDate }}</p>
```

## Use Cases

### Event Booking
```blade
<form wire:submit="bookEvent">
    <x-keys::date-picker
        label="Event Date"
        name="event_date"
        wire:model="eventDate"
        min-date="{{ now()->format('Y-m-d') }}"
        :quick-selectors="true"
        :required="true"
    />

    <x-keys::button type="submit" color="primary">
        Book Event
    </x-keys::button>
</form>
```

### Report Date Range
```blade
<div class="flex gap-4">
    <x-keys::date-picker
        label="From"
        name="from"
        wire:model.live="from"
    />

    <x-keys::date-picker
        label="To"
        name="to"
        wire:model.live="to"
    />

    <x-keys::button wire:click="generateReport">
        Generate
    </x-keys::button>
</div>
```

### Travel Dates
```blade
<x-keys::date-picker
    label="Travel Dates"
    name="travel_dates"
    :is-range="true"
    :months-to-show="2"
    :quick-selectors="true"
    min-date="{{ now()->format('Y-m-d') }}"
    placeholder="Select check-in and check-out dates"
/>
```

## Accessibility

- Keyboard navigation (arrow keys, Enter, Escape)
- ARIA labels and roles
- Screen reader support
- Focus management

## Data Attributes

- `data-keys-date-picker="true"`
- `data-size="md"`
- `data-format="Y-m-d"`
- `data-range="true"` (if applicable)
- `data-clearable="true"` (if applicable)
- `data-inline="true"` (if applicable)

## Best Practices

1. **Set appropriate constraints**: Use min/max dates for valid ranges
2. **Disable unavailable dates**: Mark holidays, blackout dates as disabled
3. **Use quick selectors**: For common date selections
4. **Show multiple months for ranges**: Easier to select across months
5. **Validate date ranges**: Ensure end date is after start date
6. **Format for locale**: Use appropriate date format for target audience

## Component Structure

1. **PHP Class** (`DatePicker.php`)
2. **Blade Template** (`date-picker.blade.php`)
3. **TypeScript Actions** (`DatePickerActions.ts`)
