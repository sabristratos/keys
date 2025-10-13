# Color Picker Component

A clean and accessible color picker combining native HTML5 color input with a text input for manual hex entry. Supports validation, form integration, and real-time color updates.

## Basic Usage

```blade
<x-keys::color-picker name="theme_color" value="#3b82f6" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | auto-generated | Input ID |
| `value` | `string\|null` | `'#3b82f6'` | Color value in hex format |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg` |
| `disabled` | `bool` | `false` | Disable the color picker |
| `readonly` | `bool` | `false` | Make readonly |
| `required` | `bool` | `false` | Mark as required |
| `label` | `string\|null` | `null` | Label text (shorthand mode) |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|Collection\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display validation errors |
| `hint` | `string\|null` | `null` | Hint text |
| `force-error` | `bool` | `false` | Force error state |
| `placeholder` | `string\|null` | `'#000000'` | Placeholder text |

## Basic Examples

```blade
<x-keys::field>
    <x-keys::label for="brand-color">Brand Color</x-keys::label>
    <x-keys::color-picker
        id="brand-color"
        name="brand_color"
        value="#3b82f6"
    />
</x-keys::field>
```

## Sizes

```blade
<!-- Extra Small -->
<x-keys::color-picker size="xs" name="color_xs" />

<!-- Small -->
<x-keys::color-picker size="sm" name="color_sm" />

<!-- Medium (Default) -->
<x-keys::color-picker size="md" name="color_md" />

<!-- Large -->
<x-keys::color-picker size="lg" name="color_lg" />
```

## Shorthand with Label

```blade
<x-keys::color-picker
    label="Primary Color"
    name="primary_color"
    value="#ef4444"
    hint="Choose your brand's primary color"
/>
```

## With Validation

```blade
<form wire:submit="save">
    <x-keys::color-picker
        label="Theme Color"
        name="theme_color"
        wire:model="themeColor"
        :required="true"
        :errors="$errors->get('theme_color')"
    />

    <x-keys::button type="submit" color="primary">
        Save Color
    </x-keys::button>
</form>
```

## Livewire Integration

```blade
<x-keys::color-picker
    label="Background Color"
    name="bg_color"
    wire:model.live="backgroundColor"
/>

<div
    class="w-full h-32 rounded mt-4"
    style="background-color: {{ $backgroundColor }}"
>
    <p class="text-center py-12">Preview</p>
</div>
```

## Use Cases

### Theme Customization

```blade
<div class="space-y-4">
    <x-keys::color-picker
        label="Primary Color"
        name="colors[primary]"
        wire:model.live="colors.primary"
    />

    <x-keys::color-picker
        label="Secondary Color"
        name="colors[secondary]"
        wire:model.live="colors.secondary"
    />

    <x-keys::color-picker
        label="Accent Color"
        name="colors[accent]"
        wire:model.live="colors.accent"
    />
</div>

<div class="mt-6 p-4 rounded"
    style="
        background: {{ $colors['primary'] }};
        border: 2px solid {{ $colors['secondary'] }};
        color: {{ $colors['accent'] }};
    "
>
    Theme Preview
</div>
```

### Brand Settings

```blade
<form wire:submit="saveBrandSettings">
    <div class="grid grid-cols-2 gap-6">
        <x-keys::color-picker
            label="Logo Color"
            name="brand[logo_color]"
            wire:model="brand.logo_color"
            :required="true"
        />

        <x-keys::color-picker
            label="Button Color"
            name="brand[button_color]"
            wire:model="brand.button_color"
            :required="true"
        />
    </div>

    <x-keys::button type="submit" color="primary" class="mt-6">
        Save Brand Settings
    </x-keys::button>
</form>
```

### Color Palette Builder

```blade
<div>
    <h3 class="text-lg font-semibold mb-4">Build Your Palette</h3>

    @foreach($palette as $index => $color)
        <div class="flex gap-4 items-end mb-4">
            <x-keys::color-picker
                label="Color {{ $index + 1 }}"
                name="palette[{{ $index }}]"
                wire:model.live="palette.{{ $index }}"
            />

            <x-keys::button
                variant="ghost"
                color="danger"
                wire:click="removeColor({{ $index }})"
            >
                Remove
            </x-keys::button>
        </div>
    @endforeach

    <x-keys::button variant="outlined" wire:click="addColor">
        Add Color
    </x-keys::button>
</div>
```

## Accessibility

The Color Picker component includes:

- Proper label association
- Keyboard navigation
- ARIA attributes for validation states
- Screen reader support
- Focus-visible styles

## Data Attributes

- `data-keys-color-picker="true"` - Component identifier
- `data-size="md"` - Size variant
- `data-disabled="true"` - Disabled state (if applicable)
- `data-readonly="true"` - Readonly state (if applicable)
- `data-required="true"` - Required state (if applicable)
- `data-invalid="true"` - Error state (if applicable)
- `data-has-value="true"` - Has value (if applicable)

## Best Practices

1. **Provide labels**: Always include descriptive labels

2. **Show preview**: Display a preview of the selected color

3. **Validate hex format**: Ensure values are valid hex colors

4. **Use appropriate defaults**: Provide sensible default colors

5. **Consider accessibility**: Test color combinations for sufficient contrast

6. **Group related colors**: Use together for theme/brand settings

7. **Support manual entry**: Allow users to paste hex values

## Component Structure

The Color Picker component consists of:

1. **PHP Class** (`ColorPicker.php`)
   - Props validation
   - Hex format handling
   - Data attributes generation

2. **Blade Template** (`color-picker.blade.php`)
   - Native color input
   - Hex text input
   - Preview swatch
   - Validation display
