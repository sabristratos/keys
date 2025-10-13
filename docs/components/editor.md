# Editor Component

A rich text editor component powered by Quill.js with customizable toolbar, themes, validation support, and action buttons. Perfect for content creation, comments, and formatted text input.

## Basic Usage

```blade
<x-keys::editor name="content" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string\|null` | `null` | Form field name |
| `id` | `string\|null` | auto-generated | Editor ID |
| `value` | `string\|null` | `null` | Editor content (HTML) |
| `placeholder` | `string\|null` | `null` | Placeholder text |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg` |
| `disabled` | `bool` | `false` | Disable the editor |
| `readonly` | `bool` | `false` | Make readonly |
| `required` | `bool` | `false` | Mark as required |
| `theme` | `string` | `'snow'` | Quill theme: `snow`, `bubble` |
| `toolbar` | `array` | default config | Custom toolbar configuration |
| `label` | `string\|null` | `null` | Label text (shorthand mode) |
| `optional` | `bool` | `false` | Show optional indicator |
| `errors` | `string\|array\|Collection\|null` | `null` | Validation errors |
| `show-errors` | `bool` | `true` | Display validation errors |
| `hint` | `string\|null` | `null` | Hint text |
| `actions` | `array` | `[]` | Custom action buttons |
| `clearable` | `bool` | `false` | Show clear button |
| `copyable` | `bool` | `false` | Show copy button |
| `action-variant` | `string` | `'ghost'` | Action button variant |
| `action-size` | `string` | `'xs'` | Action button size |
| `min-height` | `int\|null` | `null` | Minimum height in pixels |
| `max-height` | `int\|null` | `null` | Maximum height in pixels |

## Basic Examples

```blade
<x-keys::field>
    <x-keys::label for="description">Description</x-keys::label>
    <x-keys::editor
        id="description"
        name="description"
        placeholder="Enter description..."
    />
</x-keys::field>
```

## Shorthand with Label

```blade
<x-keys::editor
    label="Article Content"
    name="content"
    placeholder="Write your article..."
/>
```

## Themes

### Snow Theme (Default)
Standard toolbar theme with visible toolbar:

```blade
<x-keys::editor
    name="content"
    theme="snow"
/>
```

### Bubble Theme
Floating toolbar that appears on selection:

```blade
<x-keys::editor
    name="content"
    theme="bubble"
/>
```

## Custom Toolbar

```blade
<x-keys::editor
    name="content"
    :toolbar="[
        ['bold', 'italic', 'underline'],
        [['list' => 'ordered'], ['list' => 'bullet']],
        ['link'],
        ['clean']
    ]"
/>
```

### Minimal Toolbar

```blade
<x-keys::editor
    name="comment"
    :toolbar="[
        ['bold', 'italic'],
        ['link']
    ]"
/>
```

### Full Toolbar

```blade
<x-keys::editor
    name="article"
    :toolbar="[
        [['header' => [1, 2, 3, 4, 5, 6, false]]],
        ['bold', 'italic', 'underline', 'strike'],
        [['list' => 'ordered'], ['list' => 'bullet']],
        [['script' => 'sub'], ['script' => 'super']],
        [['indent' => '-1'], ['indent' => '+1']],
        [['direction' => 'rtl']],
        [['color' => []], ['background' => []]],
        [['align' => []]],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
    ]"
/>
```

## Height Constraints

```blade
<x-keys::editor
    name="content"
    :min-height="200"
    :max-height="600"
/>
```

## With Actions

### Clear and Copy
```blade
<x-keys::editor
    label="Notes"
    name="notes"
    :clearable="true"
    :copyable="true"
/>
```

### Custom Actions
```blade
<x-keys::editor
    name="content"
    :actions="[
        [
            'action' => 'save-draft',
            'icon' => 'heroicon-o-document',
            'label' => 'Save Draft'
        ],
        [
            'action' => 'preview',
            'icon' => 'heroicon-o-eye',
            'label' => 'Preview'
        ]
    ]"
/>
```

## Livewire Integration

```blade
<x-keys::editor
    label="Post Content"
    name="content"
    wire:model="content"
    placeholder="Write your post..."
/>

<div class="mt-4">
    <h3 class="font-semibold">Preview:</h3>
    <div class="prose">
        {!! $content !!}
    </div>
</div>
```

## With Validation

```blade
<form wire:submit="save">
    <x-keys::editor
        label="Article"
        name="article"
        wire:model="article"
        :required="true"
        :errors="$errors->get('article')"
        hint="Minimum 100 words required"
    />

    <x-keys::button type="submit" color="primary" class="mt-4">
        Publish Article
    </x-keys::button>
</form>
```

## Use Cases

### Blog Post Editor

```blade
<form wire:submit="publishPost">
    <x-keys::field>
        <x-keys::label for="title">Title</x-keys::label>
        <x-keys::input
            id="title"
            wire:model="title"
            placeholder="Enter post title..."
        />
    </x-keys::field>

    <x-keys::editor
        label="Content"
        name="content"
        wire:model="content"
        :min-height="400"
        :clearable="true"
        :copyable="true"
        :required="true"
    />

    <div class="flex gap-3 mt-6">
        <x-keys::button type="button" variant="outlined">
            Save Draft
        </x-keys::button>
        <x-keys::button type="submit" color="primary">
            Publish
        </x-keys::button>
    </div>
</form>
```

### Comment Editor

```blade
<x-keys::editor
    name="comment"
    placeholder="Add a comment..."
    theme="bubble"
    :toolbar="[
        ['bold', 'italic'],
        ['link']
    ]"
    size="sm"
/>
```

### Email Composer

```blade
<div class="space-y-4">
    <x-keys::input
        label="Subject"
        name="subject"
        wire:model="email.subject"
    />

    <x-keys::editor
        label="Message"
        name="message"
        wire:model="email.message"
        :min-height="300"
        placeholder="Compose your email..."
    />

    <x-keys::button color="primary">
        Send Email
    </x-keys::button>
</div>
```

## Accessibility

The Editor component includes:

- Proper ARIA labels
- Keyboard navigation (standard Quill shortcuts)
- Screen reader support
- Focus management
- Semantic HTML output

## Data Attributes

- `data-keys-editor="true"`
- `data-size="md"`
- `data-theme="snow"`
- `data-disabled="true"` (if applicable)
- `data-readonly="true"` (if applicable)
- `data-required="true"` (if applicable)
- `data-invalid="true"` (if applicable)
- `data-has-actions="true"` (if applicable)
- `data-clearable="true"` (if applicable)
- `data-copyable="true"` (if applicable)
- `data-toolbar` - JSON-encoded toolbar configuration

## Best Practices

1. **Choose appropriate theme**: Snow for forms, Bubble for inline editing
2. **Customize toolbar**: Only include tools users need
3. **Set height constraints**: Prevent editors from becoming too large or small
4. **Validate content**: Check for minimum length, required fields
5. **Sanitize output**: Always sanitize HTML before saving/displaying
6. **Provide placeholders**: Guide users on what to write
7. **Consider mobile**: Test toolbar usability on small screens

## Component Structure

1. **PHP Class** (`Editor.php`)
   - Props validation
   - Toolbar configuration
   - Actions handling
   - Data attributes generation

2. **Blade Template** (`editor.blade.php`)
   - Quill editor container
   - Toolbar rendering
   - Action buttons
   - Hidden input for form submission

3. **TypeScript Actions** (`EditorActions.ts`)
   - Quill initialization
   - Content updates
   - Action handlers
