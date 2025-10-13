# Time Picker Component

A comprehensive time selection component with 12/24 hour format support, configurable step intervals, quick presets, and popover interface.

## Basic Usage

```blade
<x-keys::time-picker name="appointment_time" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | auto-generated | Input ID |
| `value` | `string\|null` | `null` | Time value |
| `placeholder` | `string\|null` | auto-generated | Placeholder text |
| `format` | `string` | `'24'` | Time format: `12`, `24` |
| `step` | `int` | `1` | Minute step intervals: `1`, `5`, `15`, `30` |
| `min-time` | `string\|null` | `null` | Minimum time |
| `max-time` | `string\|null` | `null` | Maximum time |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |
| `width` | `string` | `'full'` | Width: `auto`, `full` |
| `disabled` | `bool` | `false` | Disable the picker |
| `readonly` | `bool` | `false` | Make readonly |
| `required` | `bool` | `false` | Mark as required |
| `label` | `string\|null` | `null` | Label text (shorthand mode) |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|Collection\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display validation errors |
| `clearable` | `bool` | `false` | Show clear button |
| `show-seconds` | `bool` | `false` | Include seconds |
| `format-mode` | `string` | `'flexible'` | Format mode: `12`, `24`, `flexible` |

## Time Formats

### 24-Hour Format (Default)
```blade
<x-keys::time-picker
    label="Meeting Time"
    name="meeting_time"
    format="24"
/>
```

### 12-Hour Format
```blade
<x-keys::time-picker
    label="Appointment"
    name="appointment"
    format="12"
/>
```

## Step Intervals

```blade
<!-- 1 minute steps -->
<x-keys::time-picker name="precise_time" :step="1" />

<!-- 5 minute steps -->
<x-keys::time-picker name="time" :step="5" />

<!-- 15 minute steps -->
<x-keys::time-picker name="time" :step="15" />

<!-- 30 minute steps -->
<x-keys::time-picker name="time" :step="30" />
```

## With Seconds

```blade
<x-keys::time-picker
    label="Precise Timestamp"
    name="timestamp"
    :show-seconds="true"
/>
```

## Time Constraints

```blade
<x-keys::time-picker
    label="Business Hours"
    name="time"
    min-time="09:00"
    max-time="17:00"
/>
```

## With Quick Presets

The component automatically includes quick time presets (Morning, Noon, Afternoon, Evening).

## Clearable

```blade
<x-keys::time-picker
    label="Optional Time"
    name="optional_time"
    :clearable="true"
/>
```

## Livewire Integration

```blade
<x-keys::time-picker
    label="Start Time"
    name="start_time"
    wire:model.live="startTime"
/>

<x-keys::time-picker
    label="End Time"
    name="end_time"
    wire:model.live="endTime"
/>

<p>Duration: {{ calculateDuration($startTime, $endTime) }}</p>
```

## Use Cases

### Appointment Booking
```blade
<form wire:submit="bookAppointment">
    <x-keys::field>
        <x-keys::label>Select Appointment Time</x-keys::label>
        <x-keys::time-picker
            name="appointment_time"
            wire:model="appointmentTime"
            format="12"
            :step="15"
            min-time="09:00"
            max-time="17:00"
            :required="true"
        />
    </x-keys::field>

    <x-keys::button type="submit" color="primary">
        Book Appointment
    </x-keys::button>
</form>
```

### Business Hours
```blade
<div class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
        <x-keys::time-picker
            label="Opening Time"
            name="opening_time"
            wire:model="hours.opening"
            format="12"
        />

        <x-keys::time-picker
            label="Closing Time"
            name="closing_time"
            wire:model="hours.closing"
            format="12"
        />
    </div>
</div>
```

## Accessibility

- Keyboard navigation
- ARIA labels and roles
- Screen reader support
- Focus management

## Data Attributes

- `data-keys-timepicker="true"`
- `data-format="24"`
- `data-format-mode="flexible"`
- `data-step="1"`
- `data-size="md"`
- `data-clearable="true"` (if applicable)
- `data-show-seconds="true"` (if applicable)

## Best Practices

1. **Use appropriate step intervals**: Match to use case (15 min for appointments, 1 min for precise times)
2. **Set business hour constraints**: Use min/max time for working hours
3. **Choose correct format**: 12-hour for user-facing, 24-hour for technical
4. **Enable clearable for optional fields**: Allow users to unset times
5. **Validate time ranges**: Ensure end time is after start time

## Component Structure

1. **PHP Class** (`TimePicker.php`)
2. **Blade Template** (`timepicker.blade.php`)
3. **TypeScript Actions** (`TimePickerActions.ts`)
