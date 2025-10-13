# Textarea Component

A comprehensive multi-line text input component with auto-resize, character counting, icon support, actions, and extensive validation features. Supports clearable and copyable actions similar to the Input component.

## Basic Usage

```blade
<x-keys::textarea
    name="description"
    label="Description"
    placeholder="Enter description..."
    :rows="4"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | Auto-generated | Textarea ID |
| `value` | `string\|null` | `null` | Textarea value |
| `placeholder` | `string\|null` | `null` | Placeholder text |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg`, `xl` |
| `disabled` | `bool` | `false` | Disabled state |
| `readonly` | `bool` | `false` | Readonly state |
| `required` | `bool` | `false` | Required field |
| `rows` | `int` | `4` | Number of visible text lines |
| `cols` | `int\|null` | `null` | Number of visible character widths |
| `resize` | `string` | `'vertical'` | Resize: `none`, `both`, `horizontal`, `vertical` |
| `auto-resize` | `bool` | `false` | Auto height adjustment |
| `label` | `string\|null` | `null` | Label for shorthand mode |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display errors |
| `icon` | `string\|null` | `null` | Alias for `icon-left` |
| `icon-left` | `string\|null` | `null` | Left icon (Heroicon) |
| `icon-right` | `string\|null` | `null` | Right icon (Heroicon) |
| `hint` | `string\|null` | `null` | Hint text below textarea |
| `actions` | `array` | `[]` | Custom actions |
| `clearable` | `bool` | `false` | Enable clear button |
| `copyable` | `bool` | `false` | Enable copy button |
| `external-url` | `string\|null` | `null` | Enable external link |
| `action-variant` | `string` | `'ghost'` | Action button variant |
| `action-size` | `string` | `'xs'` | Action button size |
| `has-error` | `bool` | `false` | Force error state |
| `show-character-count` | `bool` | `false` | Show character count |
| `max-length` | `int\|null` | `null` | Maximum character length |

## Shorthand Mode (with Label)

```blade
<x-keys::textarea
    name="bio"
    label="Biography"
    placeholder="Tell us about yourself..."
    :rows="6"
    required
/>
```

## Sizes

```blade
<x-keys::textarea size="xs" label="Extra Small" />
<x-keys::textarea size="sm" label="Small" />
<x-keys::textarea size="md" label="Medium (Default)" />
<x-keys::textarea size="lg" label="Large" />
<x-keys::textarea size="xl" label="Extra Large" />
```

## Rows & Columns

```blade
<x-keys::textarea
    name="notes"
    label="Notes"
    :rows="10"
    :cols="50"
/>
```

## Resize Options

### Vertical (Default)
```blade
<x-keys::textarea
    name="content"
    label="Content"
    resize="vertical"
/>
```

### Horizontal
```blade
<x-keys::textarea
    name="content"
    label="Content"
    resize="horizontal"
/>
```

### Both Directions
```blade
<x-keys::textarea
    name="content"
    label="Content"
    resize="both"
/>
```

### No Resize
```blade
<x-keys::textarea
    name="content"
    label="Content"
    resize="none"
/>
```

## Auto-Resize

Automatically adjusts height based on content:

```blade
<x-keys::textarea
    wire:model.live="content"
    name="content"
    label="Content"
    :auto-resize="true"
    :rows="3"
/>
```

## Character Count

### Basic Count
```blade
<x-keys::textarea
    name="tweet"
    label="Tweet"
    :show-character-count="true"
    :rows="3"
/>
```

### With Max Length
```blade
<x-keys::textarea
    wire:model="tweet"
    name="tweet"
    label="Tweet"
    placeholder="What's happening?"
    :show-character-count="true"
    :max-length="280"
    :rows="3"
/>
```

## With Icons

### Left Icon
```blade
<x-keys::textarea
    name="notes"
    label="Notes"
    icon-left="heroicon-o-document-text"
/>
```

### Right Icon
```blade
<x-keys::textarea
    name="content"
    label="Content"
    icon-right="heroicon-o-pencil"
/>
```

## Actions

### Clearable
```blade
<x-keys::textarea
    name="notes"
    label="Notes"
    :clearable="true"
/>
```

### Copyable
```blade
<x-keys::textarea
    name="api-response"
    label="API Response"
    :value="$apiResponse"
    :copyable="true"
    :readonly="true"
/>
```

### Multiple Actions
```blade
<x-keys::textarea
    name="content"
    label="Content"
    :clearable="true"
    :copyable="true"
/>
```

## Validation & Errors

```blade
<x-keys::textarea
    wire:model="description"
    name="description"
    label="Description"
    :errors="$errors->get('description')"
    required
/>
```

## With Hint Text

```blade
<x-keys::textarea
    name="bio"
    label="Biography"
    hint="Brief description of your professional background (max 500 characters)"
    :max-length="500"
    :show-character-count="true"
/>
```

## States

### Disabled
```blade
<x-keys::textarea
    name="content"
    label="Content"
    value="This field is disabled"
    :disabled="true"
/>
```

### Readonly
```blade
<x-keys::textarea
    name="terms"
    label="Terms & Conditions"
    :value="$termsContent"
    :readonly="true"
    :rows="10"
/>
```

### Required
```blade
<x-keys::textarea
    name="message"
    label="Message"
    :required="true"
/>
```

## Livewire Integration

### Two-Way Binding
```blade
<x-keys::textarea
    wire:model="description"
    name="description"
    label="Description"
/>
```

### Live Binding
```blade
<x-keys::textarea
    wire:model.live="content"
    name="content"
    label="Content"
    :auto-resize="true"
/>

<div class="mt-4">
    <p>Preview: {{ $content }}</p>
</div>
```

### With Debounce
```blade
<x-keys::textarea
    wire:model.live.debounce.500ms="notes"
    name="notes"
    label="Notes"
/>
```

### Auto-Save
```blade
<x-keys::textarea
    wire:model.blur="content"
    name="content"
    label="Content"
    hint="Changes are saved automatically"
/>
```

Component class:
```php
public function updatedContent()
{
    $this->save();
    $this->dispatch('saved');
}
```

## Use Cases

### Blog Post Content
```blade
<x-keys::textarea
    wire:model="post.content"
    name="content"
    label="Post Content"
    placeholder="Write your blog post..."
    :rows="15"
    :auto-resize="true"
    :show-character-count="true"
    :errors="$errors->get('content')"
    required
/>
```

### Comments
```blade
<x-keys::textarea
    wire:model="comment"
    name="comment"
    label="Leave a Comment"
    placeholder="What do you think?"
    :rows="4"
    :auto-resize="true"
    :show-character-count="true"
    :max-length="500"
/>
```

### Product Description
```blade
<x-keys::textarea
    wire:model="product.description"
    name="description"
    label="Product Description"
    hint="Detailed description of the product features and benefits"
    :rows="6"
    :clearable="true"
    :errors="$errors->get('description')"
/>
```

### Message Compose
```blade
<x-keys::textarea
    wire:model="message"
    name="message"
    label="Message"
    placeholder="Type your message..."
    :rows="5"
    :auto-resize="true"
    :show-character-count="true"
    :max-length="1000"
    :clearable="true"
/>
```

### Code Snippet Display
```blade
<x-keys::textarea
    name="code"
    label="Code Snippet"
    :value="$codeSnippet"
    :readonly="true"
    :copyable="true"
    :rows="10"
    resize="none"
    class="font-mono text-xs"
/>
```

### Feedback Form
```blade
<x-keys::textarea
    wire:model="feedback"
    name="feedback"
    label="Your Feedback"
    placeholder="We'd love to hear your thoughts..."
    hint="Help us improve by sharing your experience"
    :rows="6"
    :auto-resize="true"
    :show-character-count="true"
    :max-length="2000"
    required
/>
```

### Note Taking
```blade
<x-keys::textarea
    wire:model.blur="notes"
    name="notes"
    label="Meeting Notes"
    icon-left="heroicon-o-document-text"
    :rows="12"
    :auto-resize="true"
    :show-character-count="true"
    :clearable="true"
    hint="Notes are auto-saved when you click outside"
/>
```

## Complete Form Example

```blade
<form wire:submit="createPost">
    <div class="space-y-4">
        <x-keys::input
            wire:model="title"
            name="title"
            label="Title"
            :errors="$errors->get('title')"
            required
        />

        <x-keys::textarea
            wire:model="content"
            name="content"
            label="Content"
            :rows="10"
            :auto-resize="true"
            :show-character-count="true"
            :errors="$errors->get('content')"
            required
        />

        <x-keys::textarea
            wire:model="excerpt"
            name="excerpt"
            label="Excerpt"
            hint="Brief summary (optional)"
            :rows="3"
            :show-character-count="true"
            :max-length="250"
            :errors="$errors->get('excerpt')"
            :optional="true"
        />

        <div class="flex justify-end gap-3">
            <x-keys::button variant="ghost" type="button">
                Cancel
            </x-keys::button>
            <x-keys::button type="submit" color="primary">
                Create Post
            </x-keys::button>
        </div>
    </div>
</form>
```

## Accessibility

The Textarea component includes comprehensive accessibility features:

- Proper label association via `for` attribute
- Required indicators
- Error message association via `aria-describedby`
- Disabled state with proper attributes
- Focus-visible styles
- Screen reader support for actions
- Character count announcements

```blade
<x-keys::textarea
    name="message"
    label="Message"
    required
    aria-describedby="message-hint"
/>
<span id="message-hint" class="text-sm text-text-muted">
    Your message will be sent to the support team
</span>
```

## Component Structure

The Textarea component consists of:

1. **PHP Class** (`Textarea.php`)
   - Props validation
   - Auto-generated actions
   - Error handling
   - Data attributes generation

2. **Blade Template** (`textarea.blade.php`)
   - Responsive wrapper
   - Icon positioning
   - Action buttons
   - Character counter
   - Error display

3. **TypeScript Actions** (`TextareaActions.ts`)
   - Auto-resize functionality
   - Clear functionality
   - Copy to clipboard
   - Character counting
   - External link opening

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-textarea="true"` - Component identifier
- `data-size="md"` - Size variant
- `data-disabled="true"` - Disabled state
- `data-readonly="true"` - Readonly state
- `data-required="true"` - Required field
- `data-invalid="true"` - Error state
- `data-auto-resize="true"` - Auto-resize enabled
- `data-show-character-count="true"` - Character count displayed
- `data-max-length="500"` - Maximum length
- `data-has-icon-left="true"` - Has left icon
- `data-has-icon-right="true"` - Has right icon
- `data-has-actions="true"` - Has actions
- `data-clearable="true"` - Clearable
- `data-copyable="true"` - Copyable
- `data-has-value="true"` - Has value

## Best Practices

1. **Use appropriate row count**: Match initial height to expected content length

2. **Enable auto-resize for dynamic content**: Better UX for variable-length content

3. **Show character counts for limited fields**: Help users stay within limits

4. **Provide clear labels**: Help users understand what to enter

5. **Use hint text for guidelines**: Explain requirements or format

6. **Enable clear for draft fields**: Allow users to start over easily

7. **Use readonly with copy for display**: Don't disable copyable content

8. **Set reasonable max-length**: Prevent excessive content

9. **Handle validation errors clearly**: Show what needs to be fixed

10. **Consider auto-save**: Prevent data loss on long-form content

## Known Limitations

- Auto-resize doesn't work with fixed height CSS
- Character count is client-side only (may not match server validation exactly)
- Maximum of 3 action buttons recommended for usability
- Icon positioning may need adjustment with custom padding

## Performance Tips

- Use `wire:model.blur` instead of `wire:model.live` for long content to reduce server requests
- Enable auto-resize only when needed (slight performance impact)
- Consider debouncing live updates for character-intensive fields
- Use auto-save sparingly to avoid excessive database writes
