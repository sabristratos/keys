# Range Component

A customizable range slider component supporting single and dual handles, tick marks, real-time value display, and form validation. Perfect for price filters, numeric settings, and value selection interfaces.

## Basic Usage

```blade
<x-keys::range name="volume" :min="0" :max="100" :value="50" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | auto-generated | Input ID |
| `value` | `mixed` | `null` | Current value (or array for dual) |
| `min-value` | `mixed` | `null` | Minimum value (dual mode) |
| `max-value` | `mixed` | `null` | Maximum value (dual mode) |
| `min` | `int\|float` | `0` | Minimum allowed value |
| `max` | `int\|float` | `100` | Maximum allowed value |
| `step` | `int\|float` | `1` | Step increment |
| `dual` | `bool` | `false` | Enable dual handles (range selection) |
| `ticks` | `array` | `[]` | Tick marks to display |
| `show-values` | `bool` | `false` | Show current values |
| `show-ticks` | `bool` | `false` | Show tick marks |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |
| `disabled` | `bool` | `false` | Disable the range |
| `required` | `bool` | `false` | Mark as required |
| `label` | `string\|null` | `null` | Label text (shorthand mode) |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|Collection\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display validation errors |
| `icon` | `string\|null` | `null` | Icon name |
| `hint` | `string\|null` | `null` | Hint text |

## Single Handle Range

```blade
<x-keys::field>
    <x-keys::label for="brightness">Brightness</x-keys::label>
    <x-keys::range
        id="brightness"
        name="brightness"
        :min="0"
        :max="100"
        :value="75"
        :show-values="true"
    />
</x-keys::field>
```

## Dual Handle Range

For selecting a range of values:

```blade
<x-keys::field>
    <x-keys::label for="price-range">Price Range</x-keys::label>
    <x-keys::range
        id="price-range"
        name="price_range"
        :min="0"
        :max="1000"
        :min-value="100"
        :max-value="500"
        :dual="true"
        :show-values="true"
    />
</x-keys::field>
```

## With Tick Marks

Display tick marks at specific values:

```blade
<x-keys::range
    name="rating"
    :min="0"
    :max="10"
    :value="7"
    :ticks="[0, 2.5, 5, 7.5, 10]"
    :show-ticks="true"
/>
```

With labels:

```blade
<x-keys::range
    name="size"
    :min="0"
    :max="4"
    :value="2"
    :ticks="[
        ['value' => 0, 'label' => 'XS'],
        ['value' => 1, 'label' => 'S'],
        ['value' => 2, 'label' => 'M'],
        ['value' => 3, 'label' => 'L'],
        ['value' => 4, 'label' => 'XL'],
    ]"
    :show-ticks="true"
/>
```

## Sizes

```blade
<!-- Small -->
<x-keys::range size="sm" name="small" :min="0" :max="100" />

<!-- Medium (Default) -->
<x-keys::range size="md" name="medium" :min="0" :max="100" />

<!-- Large -->
<x-keys::range size="lg" name="large" :min="0" :max="100" />
```

## Shorthand with Label

```blade
<x-keys::range
    label="Volume"
    name="volume"
    :min="0"
    :max="100"
    :value="50"
    :show-values="true"
/>
```

## With Step Increment

```blade
<x-keys::range
    label="Quantity"
    name="quantity"
    :min="0"
    :max="100"
    :step="5"
    :value="25"
/>
```

## Livewire Integration

```blade
<x-keys::range
    label="Temperature"
    name="temperature"
    :min="-10"
    :max="40"
    wire:model.live="temperature"
    :show-values="true"
/>

<p>Current temperature: {{ $temperature }}°C</p>
```

### Dual Range with Livewire

```blade
<x-keys::range
    label="Age Range"
    name="age_range"
    :min="18"
    :max="100"
    wire:model.live="ageRange"
    :dual="true"
    :show-values="true"
/>

<p>Age: {{ $ageRange[0] }} - {{ $ageRange[1] }}</p>
```

## With Validation

```blade
<form wire:submit="save">
    <x-keys::range
        label="Priority"
        name="priority"
        :min="1"
        :max="5"
        wire:model="priority"
        :required="true"
        :errors="$errors->get('priority')"
    />

    <x-keys::button type="submit" color="primary">
        Save
    </x-keys::button>
</form>
```

## Use Cases

### Price Filter

```blade
<x-keys::field>
    <x-keys::label>Price Range</x-keys::label>
    <x-keys::range
        name="price"
        :min="0"
        :max="10000"
        :min-value="1000"
        :max-value="5000"
        :dual="true"
        :show-values="true"
        :step="100"
    />
    <x-keys::text size="sm" variant="muted">
        Select your price range
    </x-keys::text>
</x-keys::field>
```

### Volume Control

```blade
<x-keys::range
    label="Master Volume"
    name="volume"
    :min="0"
    :max="100"
    :value="75"
    :show-values="true"
    icon="heroicon-o-speaker-wave"
/>
```

### Date Range (Years)

```blade
<x-keys::range
    label="Year Range"
    name="year_range"
    :min="1990"
    :max="2024"
    :min-value="2000"
    :max-value="2020"
    :dual="true"
    :show-values="true"
/>
```

## Accessibility

The Range component includes:

- Proper ARIA labels
- Keyboard navigation (arrow keys)
- Focus-visible styles
- Screen reader support
- Value announcements

## Data Attributes

- `data-keys-range="true"` - Component identifier
- `data-size="md"` - Size variant
- `data-min="0"` - Minimum value
- `data-max="100"` - Maximum value
- `data-step="1"` - Step increment
- `data-value` - Current value(s)
- `data-disabled="true"` - Disabled state (if applicable)
- `data-required="true"` - Required state (if applicable)
- `data-invalid="true"` - Error state (if applicable)
- `data-show-values="true"` - Show values (if enabled)
- `data-show-ticks="true"` - Show ticks (if enabled)
- `data-ticks-count` - Number of ticks (if applicable)

## Best Practices

1. **Use appropriate step sizes**: Match step to the data precision needed
2. **Show values for clarity**: Enable `show-values` for user feedback
3. **Use dual for ranges**: Enable dual handles for min/max selection
4. **Add tick marks for key values**: Help users select common values
5. **Validate inputs**: Ensure values stay within min/max bounds
6. **Provide labels**: Always use labels for accessibility
7. **Consider mobile**: Ensure handles are large enough to tap

## Component Structure

The Range component consists of:

1. **PHP Class** (`Range.php`)
   - Props validation
   - Value calculation
   - Tick processing
   - Data attributes generation

2. **Blade Template** (`range.blade.php`)
   - Track rendering
   - Handle positioning
   - Tick marks display
   - Value display

3. **TypeScript Actions** (`RangeActions.ts`)
   - Drag handling
   - Value updates
   - Touch support
