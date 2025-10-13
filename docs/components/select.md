# Select Component

A comprehensive dropdown select component with search functionality, multiple selection support with chips, clearable options, and rich content capabilities. Built on the Popover component with full Livewire integration and accessibility features.

## Basic Usage

```blade
<x-keys::select name="country" label="Country">
    <x-keys::select.option value="us">United States</x-keys::select.option>
    <x-keys::select.option value="ca">Canada</x-keys::select.option>
    <x-keys::select.option value="mx">Mexico</x-keys::select.option>
</x-keys::select>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | Auto-generated | Select ID |
| `value` | `mixed` | `null` | Selected value(s) |
| `multiple` | `bool` | `false` | Enable multiple selection |
| `searchable` | `bool` | `false` | Enable search functionality |
| `clearable` | `bool` | `false` | Enable clear button |
| `placeholder` | `string\|null` | Auto | Placeholder text |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |
| `width` | `string` | `'full'` | Width: `auto`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `fit`, `full` |
| `disabled` | `bool` | `false` | Disabled state |
| `required` | `bool` | `false` | Required field |
| `label` | `string\|null` | `null` | Label for shorthand mode |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display errors |
| `has-error` | `bool` | `false` | Force error state |
| `aria-label` | `string\|null` | `null` | ARIA label |
| `aria-describedby` | `string\|null` | `null` | ARIA described-by |

## Shorthand Mode (with Label)

```blade
<x-keys::select
    name="status"
    label="Status"
    :value="$user->status"
    required
>
    <x-keys::select.option value="active">Active</x-keys::select.option>
    <x-keys::select.option value="inactive">Inactive</x-keys::select.option>
    <x-keys::select.option value="pending">Pending</x-keys::select.option>
</x-keys::select>
```

## Standard Mode (without Label)

```blade
<x-keys::label for="country">Country</x-keys::label>
<x-keys::select id="country" name="country">
    <x-keys::select.option value="us">United States</x-keys::select.option>
    <x-keys::select.option value="ca">Canada</x-keys::select.option>
</x-keys::select>
```

## Multiple Selection

Enable multi-select with chips display:

```blade
<x-keys::select
    name="tags"
    label="Tags"
    :multiple="true"
    :value="['laravel', 'php']"
    placeholder="Select tags..."
>
    <x-keys::select.option value="laravel">Laravel</x-keys::select.option>
    <x-keys::select.option value="php">PHP</x-keys::select.option>
    <x-keys::select.option value="javascript">JavaScript</x-keys::select.option>
    <x-keys::select.option value="tailwind">Tailwind CSS</x-keys::select.option>
</x-keys::select>
```

## Searchable Select

Add search functionality:

```blade
<x-keys::select
    name="user_id"
    label="Select User"
    :searchable="true"
    placeholder="Search users..."
>
    @foreach($users as $user)
        <x-keys::select.option :value="$user->id">
            {{ $user->name }}
        </x-keys::select.option>
    @endforeach
</x-keys::select>
```

## Clearable Select

Add a clear button:

```blade
<x-keys::select
    name="category"
    label="Category"
    :clearable="true"
    :value="$product->category"
>
    <x-keys::select.option value="electronics">Electronics</x-keys::select.option>
    <x-keys::select.option value="clothing">Clothing</x-keys::select.option>
    <x-keys::select.option value="books">Books</x-keys::select.option>
</x-keys::select>
```

## Sizes

```blade
<x-keys::select size="sm" label="Small">
    <x-keys::select.option value="1">Option 1</x-keys::select.option>
</x-keys::select>

<x-keys::select size="md" label="Medium (Default)">
    <x-keys::select.option value="1">Option 1</x-keys::select.option>
</x-keys::select>

<x-keys::select size="lg" label="Large">
    <x-keys::select.option value="1">Option 1</x-keys::select.option>
</x-keys::select>
```

## Width Options

```blade
<x-keys::select width="auto" label="Auto Width">
    <x-keys::select.option value="1">Option 1</x-keys::select.option>
</x-keys::select>

<x-keys::select width="sm" label="Small Width (8rem)">
    <x-keys::select.option value="1">Option 1</x-keys::select.option>
</x-keys::select>

<x-keys::select width="md" label="Medium Width (12rem)">
    <x-keys::select.option value="1">Option 1</x-keys::select.option>
</x-keys::select>

<x-keys::select width="full" label="Full Width">
    <x-keys::select.option value="1">Option 1</x-keys::select.option>
</x-keys::select>
```

## With Icons

Options can include icons:

```blade
<x-keys::select name="priority" label="Priority">
    <x-keys::select.option value="high" icon="heroicon-o-arrow-up">
        High Priority
    </x-keys::select.option>
    <x-keys::select.option value="medium" icon="heroicon-o-minus">
        Medium Priority
    </x-keys::select.option>
    <x-keys::select.option value="low" icon="heroicon-o-arrow-down">
        Low Priority
    </x-keys::select.option>
</x-keys::select>
```

## Disabled Options

```blade
<x-keys::select name="plan" label="Subscription Plan">
    <x-keys::select.option value="free">Free</x-keys::select.option>
    <x-keys::select.option value="pro">Pro</x-keys::select.option>
    <x-keys::select.option value="enterprise" :disabled="true">
        Enterprise (Coming Soon)
    </x-keys::select.option>
</x-keys::select>
```

## Livewire Integration

### Two-Way Binding

```blade
<x-keys::select
    wire:model="selectedCountry"
    name="country"
    label="Country"
>
    <x-keys::select.option value="us">United States</x-keys::select.option>
    <x-keys::select.option value="ca">Canada</x-keys::select.option>
    <x-keys::select.option value="mx">Mexico</x-keys::select.option>
</x-keys::select>
```

### Live Binding

```blade
<x-keys::select
    wire:model.live="category"
    name="category"
    label="Category"
>
    @foreach($categories as $category)
        <x-keys::select.option :value="$category->id">
            {{ $category->name }}
        </x-keys::select.option>
    @endforeach
</x-keys::select>

@if($category)
    <div class="mt-4">
        <!-- Display products for selected category -->
    </div>
@endif
```

### Multiple Selection with Livewire

```blade
<x-keys::select
    wire:model="selectedTags"
    name="tags"
    label="Tags"
    :multiple="true"
>
    @foreach($availableTags as $tag)
        <x-keys::select.option :value="$tag->id">
            {{ $tag->name }}
        </x-keys::select.option>
    @endforeach
</x-keys::select>
```

Component class:
```php
class MyComponent extends Component
{
    public array $selectedTags = [];

    public function updatedSelectedTags()
    {
        // React to selection changes
    }
}
```

## Combined Features

### Searchable Multi-Select with Clear

```blade
<x-keys::select
    wire:model="skills"
    name="skills"
    label="Skills"
    :multiple="true"
    :searchable="true"
    :clearable="true"
    placeholder="Search and select skills..."
>
    @foreach($allSkills as $skill)
        <x-keys::select.option :value="$skill->id">
            {{ $skill->name }}
        </x-keys::select.option>
    @endforeach
</x-keys::select>
```

## Dynamic Options

### Filtered Options

```blade
<x-keys::select
    wire:model.live="cityId"
    name="city"
    label="City"
    :searchable="true"
>
    @forelse($cities as $city)
        <x-keys::select.option :value="$city->id">
            {{ $city->name }}
        </x-keys::select.option>
    @empty
        <x-keys::select.option value="" disabled>
            Select a country first
        </x-keys::select.option>
    @endforelse
</x-keys::select>
```

### With Grouping

```blade
<x-keys::select name="timezone" label="Timezone" :searchable="true">
    <optgroup label="North America">
        <x-keys::select.option value="america/new_york">Eastern Time</x-keys::select.option>
        <x-keys::select.option value="america/chicago">Central Time</x-keys::select.option>
        <x-keys::select.option value="america/denver">Mountain Time</x-keys::select.option>
        <x-keys::select.option value="america/los_angeles">Pacific Time</x-keys::select.option>
    </optgroup>

    <optgroup label="Europe">
        <x-keys::select.option value="europe/london">London</x-keys::select.option>
        <x-keys::select.option value="europe/paris">Paris</x-keys::select.option>
        <x-keys::select.option value="europe/berlin">Berlin</x-keys::select.option>
    </optgroup>
</x-keys::select>
```

## Validation & Errors

```blade
<x-keys::select
    wire:model="category"
    name="category"
    label="Category"
    :errors="$errors->get('category')"
    required
>
    <x-keys::select.option value="">Select category...</x-keys::select.option>
    @foreach($categories as $category)
        <x-keys::select.option :value="$category->id">
            {{ $category->name }}
        </x-keys::select.option>
    @endforeach
</x-keys::select>
```

## Use Cases

### User Selection

```blade
<x-keys::select
    wire:model="assignedTo"
    name="assigned_to"
    label="Assign To"
    :searchable="true"
    :clearable="true"
>
    @foreach($users as $user)
        <x-keys::select.option :value="$user->id">
            <div class="flex items-center gap-2">
                <x-keys::avatar :src="$user->avatar" :name="$user->name" size="xs" />
                <span>{{ $user->name }}</span>
            </div>
        </x-keys::select.option>
    @endforeach
</x-keys::select>
```

### Status Selector

```blade
<x-keys::select
    wire:model.live="status"
    name="status"
    label="Status"
    size="sm"
>
    <x-keys::select.option value="draft">
        <x-keys::badge color="gray" size="xs">Draft</x-keys::badge>
    </x-keys::select.option>
    <x-keys::select.option value="published">
        <x-keys::badge color="success" size="xs">Published</x-keys::badge>
    </x-keys::select.option>
    <x-keys::select.option value="archived">
        <x-keys::badge color="neutral" size="xs">Archived</x-keys::badge>
    </x-keys::select.option>
</x-keys::select>
```

### Multi-Select Tags

```blade
<x-keys::select
    wire:model="tags"
    name="tags"
    label="Tags"
    :multiple="true"
    :searchable="true"
    :clearable="true"
    placeholder="Add tags..."
>
    @foreach($allTags as $tag)
        <x-keys::select.option :value="$tag->id">
            <div class="flex items-center justify-between w-full">
                <span>{{ $tag->name }}</span>
                <x-keys::badge color="{{ $tag->color }}" size="xs">
                    {{ $tag->count }}
                </x-keys::badge>
            </div>
        </x-keys::select.option>
    @endforeach
</x-keys::select>
```

### Country & State Cascading

```blade
<x-keys::select
    wire:model.live="countryId"
    name="country_id"
    label="Country"
    required
>
    @foreach($countries as $country)
        <x-keys::select.option :value="$country->id">
            {{ $country->name }}
        </x-keys::select.option>
    @endforeach
</x-keys::select>

@if($countryId)
    <x-keys::select
        wire:model="stateId"
        name="state_id"
        label="State/Province"
        required
    >
        <x-keys::select.option value="">Select state...</x-keys::select.option>
        @foreach($states as $state)
            <x-keys::select.option :value="$state->id">
                {{ $state->name }}
            </x-keys::select.option>
        @endforeach
    </x-keys::select>
@endif
```

### Permission Selector

```blade
<x-keys::select
    wire:model="permissions"
    name="permissions"
    label="Permissions"
    :multiple="true"
    :searchable="true"
    size="lg"
>
    @foreach($permissionGroups as $group => $groupPermissions)
        <div class="px-3 py-2 text-xs font-semibold text-text-muted uppercase bg-panel">
            {{ $group }}
        </div>
        @foreach($groupPermissions as $permission)
            <x-keys::select.option :value="$permission->id">
                <div>
                    <div class="font-medium">{{ $permission->name }}</div>
                    <div class="text-xs text-text-muted">{{ $permission->description }}</div>
                </div>
            </x-keys::select.option>
        @endforeach
    @endforeach
</x-keys::select>
```

## Accessibility

The Select component includes comprehensive accessibility features:

- `role="listbox"` and `role="option"` for screen readers
- `aria-multiselectable` for multiple selection
- `aria-labelledby` for label association
- Keyboard navigation (Arrow keys, Enter, Escape)
- Search functionality for easier navigation
- Clear focus indicators

```blade
<x-keys::select
    name="product"
    aria-label="Select a product"
    aria-describedby="product-help"
>
    <x-keys::select.option value="1">Product 1</x-keys::select.option>
    <x-keys::select.option value="2">Product 2</x-keys::select.option>
</x-keys::select>
<span id="product-help" class="text-sm text-text-muted">
    Choose the product you want to order
</span>
```

## Component Structure

The Select component consists of:

1. **PHP Class** (`Select.php`)
   - Props validation
   - Value selection handling
   - Livewire integration
   - Data attributes generation

2. **Blade Template** (`select.blade.php`)
   - Popover-based dropdown
   - Hidden input management (supports both Livewire and standard forms)
   - Search input
   - Chips display for multi-select
   - Clear button

3. **Child Component** (`Select\Option.php`)
   - Individual option rendering
   - Icon support
   - Disabled state

4. **TypeScript Actions** (`SelectActions.ts`)
   - Option selection handling
   - Search filtering
   - Multi-select chip management
   - Keyboard navigation

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-select="true"` - Component identifier
- `data-size="md"` - Size variant
- `data-width="full"` - Width setting
- `data-multiple="true"` - Multiple selection
- `data-searchable="true"` - Search enabled
- `data-clearable="true"` - Clear button enabled
- `data-disabled="false"` - Disabled state
- `data-name="..."` - Field name
- `data-required="true"` - Required field
- `data-invalid="true"` - Error state
- `data-has-value="true"` - Has selection
- `data-selected-count="3"` - Number of selections (multi-select)
- `data-livewire-enabled="true"` - Livewire integration

## Best Practices

1. **Use shorthand mode when possible**: Simpler syntax for most cases

2. **Enable search for long lists**: Improves usability when > 10 options

3. **Use multi-select sparingly**: Consider if checkboxes might be clearer

4. **Provide placeholder text**: Guide users on what to select

5. **Group related options**: Use optgroup for better organization

6. **Show validation errors**: Help users fix mistakes

7. **Use appropriate widths**: Match select width to content

8. **Enable clear for optional fields**: Allow users to deselect

9. **Use icons meaningfully**: Visual aids should clarify options

10. **Handle empty states**: Show helpful message when no options available

## Known Limitations

- Maximum 100 selections in non-Livewire multiple select mode (configurable in template)
- Search is client-side only (consider server-side search for large datasets)
- Nested option groups not supported
- Custom option rendering limited to slot content

## Performance Tips

- For datasets > 100 items, consider server-side search with Livewire
- Use `wire:model.live` sparingly to avoid excessive updates
- Lazy load options when possible
- Consider virtual scrolling for extremely large lists
