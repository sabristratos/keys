# Rating Component

An interactive star rating component with support for custom icons, half-star ratings, readonly mode, and form validation. Perfect for reviews, feedback forms, and user ratings.

## Basic Usage

```blade
<x-keys::rating name="rating" :value="4" :max="5" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | auto-generated | Input ID |
| `value` | `int\|float` | `0` | Current rating value |
| `max` | `int` | `5` | Maximum rating |
| `readonly` | `bool` | `false` | Display-only mode |
| `disabled` | `bool` | `false` | Disable interaction |
| `required` | `bool` | `false` | Mark as required |
| `icon` | `string` | `'star'` | Icon name (defaults to Heroicon) |
| `icon-filled` | `string\|null` | auto-generated | Filled icon |
| `icon-outlined` | `string\|null` | auto-generated | Outlined icon |
| `color` | `string` | `'warning'` | Color: `warning`, `primary`, `success`, `danger` |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg`, `xl` |
| `label` | `string\|null` | `null` | Label text (shorthand mode) |
| `hint` | `string\|null` | `null` | Hint text |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|Collection\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display validation errors |
| `allow-half` | `bool` | `false` | Allow half-star ratings |
| `show-count` | `bool` | `false` | Show numerical count |

## Basic Examples

```blade
<x-keys::field>
    <x-keys::label for="product-rating">Rate this product</x-keys::label>
    <x-keys::rating
        id="product-rating"
        name="rating"
        :value="0"
        :max="5"
    />
</x-keys::field>
```

## Sizes

```blade
<x-keys::rating size="xs" :value="4" />
<x-keys::rating size="sm" :value="4" />
<x-keys::rating size="md" :value="4" />
<x-keys::rating size="lg" :value="4" />
<x-keys::rating size="xl" :value="4" />
```

## Colors

```blade
<x-keys::rating color="warning" :value="4" />
<x-keys::rating color="primary" :value="4" />
<x-keys::rating color="success" :value="4" />
<x-keys::rating color="danger" :value="4" />
```

## Half-Star Ratings

```blade
<x-keys::rating
    :value="3.5"
    :max="5"
    :allow-half="true"
/>
```

## Readonly Mode

Display ratings without interaction:

```blade
<x-keys::rating
    :value="4.5"
    :readonly="true"
    :allow-half="true"
    :show-count="true"
/>
```

## With Count

```blade
<x-keys::rating
    :value="4"
    :max="5"
    :show-count="true"
/>
```

## Custom Icons

```blade
<x-keys::rating
    name="favorite"
    icon="heroicon-o-heart"
    icon-filled="heroicon-s-heart"
    color="danger"
    :value="3"
/>
```

## Shorthand with Label

```blade
<x-keys::rating
    label="Your Rating"
    name="rating"
    :max="5"
    hint="Click to rate"
/>
```

## Livewire Integration

```blade
<x-keys::rating
    label="Rate this movie"
    name="rating"
    wire:model.live="rating"
    :max="5"
/>

<p>You rated: {{ $rating }} stars</p>
```

## With Validation

```blade
<form wire:submit="submitReview">
    <x-keys::rating
        label="Rating"
        name="rating"
        wire:model="rating"
        :required="true"
        :errors="$errors->get('rating')"
    />

    <x-keys::button type="submit" color="primary">
        Submit Review
    </x-keys::button>
</form>
```

## Use Cases

### Product Review

```blade
<div class="space-y-4">
    <x-keys::rating
        label="Overall Rating"
        name="overall_rating"
        wire:model="review.overall"
        :required="true"
    />

    <x-keys::rating
        label="Quality"
        name="quality_rating"
        wire:model="review.quality"
    />

    <x-keys::rating
        label="Value"
        name="value_rating"
        wire:model="review.value"
    />

    <x-keys::textarea
        label="Review"
        name="comment"
        wire:model="review.comment"
    />
</div>
```

### Display Average Rating

```blade
<div class="flex items-center gap-2">
    <x-keys::rating
        :value="$averageRating"
        :readonly="true"
        :allow-half="true"
        size="lg"
    />
    <span class="text-lg font-semibold">{{ number_format($averageRating, 1) }}</span>
    <span class="text-gray-500">({{ $totalReviews }} reviews)</span>
</div>
```

### Feedback Form

```blade
<form wire:submit="submitFeedback">
    <h3 class="text-lg font-semibold mb-4">How would you rate us?</h3>

    <div class="space-y-4">
        <x-keys::rating
            label="Customer Service"
            name="service_rating"
            wire:model="feedback.service"
            :show-count="true"
        />

        <x-keys::rating
            label="Product Quality"
            name="quality_rating"
            wire:model="feedback.quality"
            :show-count="true"
        />

        <x-keys::rating
            label="Value for Money"
            name="value_rating"
            wire:model="feedback.value"
            :show-count="true"
        />
    </div>

    <x-keys::button type="submit" color="primary" class="mt-6">
        Submit Feedback
    </x-keys::button>
</form>
```

## Accessibility

The Rating component includes:

- Proper ARIA labels and roles
- Keyboard navigation (arrow keys)
- Focus-visible styles
- Screen reader announcements
- Semantic HTML structure

## Data Attributes

- `data-keys-rating="true"`
- `data-size="md"`
- `data-color="warning"`
- `data-max="5"`
- `data-value="4"`
- `data-readonly="true"` (if applicable)
- `data-disabled="true"` (if applicable)
- `data-required="true"` (if applicable)
- `data-allow-half="true"` (if applicable)

## Best Practices

1. **Use 5 stars by default**: Most familiar to users
2. **Make interactive ratings obvious**: Clear hover/focus states
3. **Show current value**: Display numerical rating alongside stars
4. **Provide context**: Use labels to explain what's being rated
5. **Handle validation**: Require ratings when necessary
6. **Use readonly for display**: Don't allow interaction on display ratings
7. **Consider half-stars**: For more granular ratings

## Component Structure

1. **PHP Class** (`Rating.php`)
2. **Blade Template** (`rating.blade.php`)
3. **TypeScript Actions** (`RatingActions.ts`)
