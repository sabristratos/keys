# Choice Group Component

A fieldset component for grouping related checkbox or radio button choices with consistent styling, validation support, and flexible layouts.

## Basic Usage

```blade
<x-keys::choice-group legend="Select your interests">
    <x-keys::checkbox name="interests[]" value="design" label="Design" />
    <x-keys::checkbox name="interests[]" value="development" label="Development" />
    <x-keys::checkbox name="interests[]" value="marketing" label="Marketing" />
</x-keys::choice-group>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `legend` | `string\|null` | `null` | Fieldset legend text |
| `description` | `string\|null` | `null` | Helper description |
| `type` | `string` | `'checkbox'` | Choice type: `checkbox`, `radio` |
| `layout` | `string` | `'stacked'` | Layout: `stacked`, `grid`, `inline` |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg` |
| `required` | `bool` | `false` | Mark as required |
| `disabled` | `bool` | `false` | Disable all choices |
| `errors` | `string\|array\|Collection\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display validation errors |

## Types

### Checkbox Group
```blade
<x-keys::choice-group legend="Features" type="checkbox">
    <x-keys::checkbox name="features[]" value="ssl" label="SSL Certificate" />
    <x-keys::checkbox name="features[]" value="cdn" label="CDN" />
    <x-keys::checkbox name="features[]" value="backups" label="Daily Backups" />
</x-keys::choice-group>
```

### Radio Group
```blade
<x-keys::choice-group legend="Subscription Plan" type="radio">
    <x-keys::radio name="plan" value="basic" label="Basic - $9/mo" />
    <x-keys::radio name="plan" value="pro" label="Pro - $29/mo" />
    <x-keys::radio name="plan" value="enterprise" label="Enterprise - $99/mo" />
</x-keys::choice-group>
```

## Layouts

### Stacked (Default)
```blade
<x-keys::choice-group legend="Notifications" layout="stacked">
    <x-keys::checkbox name="notify[]" value="email" label="Email" />
    <x-keys::checkbox name="notify[]" value="sms" label="SMS" />
    <x-keys::checkbox name="notify[]" value="push" label="Push Notifications" />
</x-keys::choice-group>
```

### Grid
```blade
<x-keys::choice-group legend="Categories" layout="grid">
    <x-keys::checkbox name="categories[]" value="tech" label="Technology" />
    <x-keys::checkbox name="categories[]" value="design" label="Design" />
    <x-keys::checkbox name="categories[]" value="business" label="Business" />
    <x-keys::checkbox name="categories[]" value="marketing" label="Marketing" />
</x-keys::choice-group>
```

### Inline
```blade
<x-keys::choice-group legend="Size" layout="inline" type="radio">
    <x-keys::radio name="size" value="s" label="S" />
    <x-keys::radio name="size" value="m" label="M" />
    <x-keys::radio name="size" value="l" label="L" />
    <x-keys::radio name="size" value="xl" label="XL" />
</x-keys::choice-group>
```

## With Description

```blade
<x-keys::choice-group
    legend="Email Preferences"
    description="Choose which emails you'd like to receive"
>
    <x-keys::checkbox name="emails[]" value="updates" label="Product Updates" />
    <x-keys::checkbox name="emails[]" value="newsletter" label="Newsletter" />
    <x-keys::checkbox name="emails[]" value="promotions" label="Promotions" />
</x-keys::choice-group>
```

## With Validation

```blade
<x-keys::choice-group
    legend="Terms & Conditions"
    :required="true"
    :errors="$errors->get('terms')"
>
    <x-keys::checkbox name="terms[]" value="terms" label="I agree to the Terms of Service" />
    <x-keys::checkbox name="terms[]" value="privacy" label="I agree to the Privacy Policy" />
</x-keys::choice-group>
```

## Livewire Integration

```blade
<x-keys::choice-group legend="Select Topics" type="checkbox">
    <x-keys::checkbox wire:model.live="topics" value="tech" label="Technology" />
    <x-keys::checkbox wire:model.live="topics" value="science" label="Science" />
    <x-keys::checkbox wire:model.live="topics" value="arts" label="Arts" />
</x-keys::choice-group>

<p>Selected: {{ implode(', ', $topics) }}</p>
```

## Accessibility

- Uses proper `<fieldset>` and `<legend>` elements
- ARIA attributes for validation states
- Keyboard navigation support
- Screen reader friendly

## Data Attributes

- `data-keys-choice-group="true"`
- `data-type="checkbox"`
- `data-layout="stacked"`
- `data-size="md"`
- `data-disabled="true"` (if applicable)
- `data-required="true"` (if applicable)
- `data-invalid="true"` (if applicable)

## Best Practices

1. **Use descriptive legends**: Clearly state what the choices are for
2. **Provide descriptions**: Add context when needed
3. **Choose appropriate type**: Radio for single selection, checkbox for multiple
4. **Use grid for many options**: Makes scanning easier
5. **Group related choices**: Keep related options together
6. **Validate properly**: Ensure at least one option is selected when required

## Component Structure

1. **PHP Class** (`ChoiceGroup.php`)
2. **Blade Template** (`choice-group.blade.php`)
