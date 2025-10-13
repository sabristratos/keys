kee# Modal Component

A comprehensive modal component supporting multiple sizes, backdrop variants, scrollable content, Livewire integration, and accessibility features. Features focus trapping, lazy loading, persistent modals, and comprehensive event handling.

## Basic Usage

```blade
<x-keys::modal id="example-modal">
    Modal content goes here.
</x-keys::modal>

<x-keys::button onclick="document.getElementById('example-modal').showModal()">
    Open Modal
</x-keys::button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Required | Unique identifier for the modal |
| `size` | `string` | `'md'` | Modal size: `xs`, `sm`, `md`, `lg`, `xl`, `full` |
| `closedby` | `string` | `'any'` | How modal closes: `any`, `closerequest`, `none` |
| `backdrop` | `string` | `'blur'` | Backdrop style: `blur`, `dark`, `none` |
| `centered` | `bool` | `true` | Vertically center the modal |
| `scrollable` | `bool` | `false` | Enable scrollable body |
| `animate` | `bool` | `true` | Enable CSS animations |
| `lazy` | `bool` | `false` | Lazy load modal content |
| `persistent` | `bool` | `false` | Persist across navigation |
| `trap-focus` | `bool` | `true` | Trap focus within modal |
| `wire:model` | `string\|null` | `null` | Livewire model binding |

## Sizes

### Extra Small
```blade
<x-keys::modal id="xs-modal" size="xs">
    Compact modal for simple confirmations.
</x-keys::modal>
```

### Small
```blade
<x-keys::modal id="sm-modal" size="sm">
    Small modal for brief interactions.
</x-keys::modal>
```

### Medium (Default)
```blade
<x-keys::modal id="md-modal" size="md">
    Standard modal size for most use cases.
</x-keys::modal>
```

### Large
```blade
<x-keys::modal id="lg-modal" size="lg">
    Large modal for forms or detailed content.
</x-keys::modal>
```

### Extra Large
```blade
<x-keys::modal id="xl-modal" size="xl">
    Extra large modal for complex interfaces.
</x-keys::modal>
```

### Full Screen
```blade
<x-keys::modal id="full-modal" size="full">
    Full-screen modal that takes up entire viewport.
</x-keys::modal>
```

## Modal Sections

### With Header
```blade
<x-keys::modal id="header-modal">
    <x-slot:header>
        <x-keys::heading size="lg">Modal Title</x-keys::heading>
        <button
            type="button"
            onclick="this.closest('dialog').close()"
            class="ml-auto"
        >
            <x-keys::icon name="heroicon-o-x-mark" size="sm" />
        </button>
    </x-slot:header>

    Modal body content goes here.
</x-keys::modal>
```

### With Footer
```blade
<x-keys::modal id="footer-modal">
    Form content or modal body.

    <x-slot:footer>
        <x-keys::button
            type="button"
            variant="ghost"
            onclick="this.closest('dialog').close()"
        >
            Cancel
        </x-keys::button>
        <x-keys::button color="primary">
            Confirm
        </x-keys::button>
    </x-slot:footer>
</x-keys::modal>
```

### Complete Modal
```blade
<x-keys::modal id="complete-modal" size="lg">
    <x-slot:header>
        <x-keys::heading size="lg">Edit Profile</x-keys::heading>
        <button
            type="button"
            onclick="this.closest('dialog').close()"
            class="ml-auto"
        >
            <x-keys::icon name="heroicon-o-x-mark" size="sm" />
        </button>
    </x-slot:header>

    <form wire:submit="save">
        <!-- Form fields -->
    </form>

    <x-slot:footer>
        <x-keys::button
            type="button"
            variant="ghost"
            onclick="this.closest('dialog').close()"
        >
            Cancel
        </x-keys::button>
        <x-keys::button wire:click="save" color="primary">
            Save Changes
        </x-keys::button>
    </x-slot:footer>
</x-keys::modal>
```

## Backdrop Variants

### Blur (Default)
```blade
<x-keys::modal id="blur-modal" backdrop="blur">
    Modal with blurred backdrop.
</x-keys::modal>
```

### Dark
```blade
<x-keys::modal id="dark-modal" backdrop="dark">
    Modal with dark backdrop (no blur).
</x-keys::modal>
```

### None
```blade
<x-keys::modal id="no-backdrop-modal" backdrop="none">
    Modal with transparent backdrop.
</x-keys::modal>
```

## Closing Behavior

### Any (Default)
Close on backdrop click or escape key:
```blade
<x-keys::modal id="any-close-modal" closedby="any">
    Click backdrop or press Escape to close.
</x-keys::modal>
```

### Close Request Only
Close only via close button:
```blade
<x-keys::modal id="closerequest-modal" closedby="closerequest">
    Only close button will close this modal.
</x-keys::modal>
```

### None
Prevent all default closing methods:
```blade
<x-keys::modal id="no-close-modal" closedby="none">
    This modal must be closed programmatically.
</x-keys::modal>
```

## Scrollable Content

For long content, enable scrollable body:

```blade
<x-keys::modal id="scrollable-modal" size="lg" :scrollable="true">
    <x-slot:header>
        <x-keys::heading size="lg">Terms of Service</x-keys::heading>
    </x-slot:header>

    <!-- Long content that will scroll -->
    <div class="space-y-4">
        <x-keys::text>Very long content...</x-keys::text>
        <x-keys::text>More content...</x-keys::text>
        <!-- ... -->
    </div>

    <x-slot:footer>
        <x-keys::button color="primary">
            I Agree
        </x-keys::button>
    </x-slot:footer>
</x-keys::modal>
```

## Opening & Closing Modals

### JavaScript
```blade
<x-keys::button onclick="document.getElementById('my-modal').showModal()">
    Open Modal
</x-keys::button>

<x-keys::button onclick="document.getElementById('my-modal').close()">
    Close Modal
</x-keys::button>
```

### From Within Modal
```blade
<x-keys::modal id="self-close-modal">
    <x-keys::text>Modal content</x-keys::text>

    <x-keys::button onclick="this.closest('dialog').close()">
        Close
    </x-keys::button>
</x-keys::modal>
```

## Livewire Integration

### With wire:model
```blade
<x-keys::modal id="livewire-modal" wire:model="showModal">
    <x-slot:header>
        <x-keys::heading size="lg">Livewire Modal</x-keys::heading>
    </x-slot:header>

    Modal controlled by Livewire property: $showModal

    <x-slot:footer>
        <x-keys::button wire:click="$set('showModal', false)">
            Close
        </x-keys::button>
    </x-slot:footer>
</x-keys::modal>
```

Component class:
```php
class MyComponent extends Component
{
    public bool $showModal = false;

    public function openModal()
    {
        $this->showModal = true;
    }

    public function closeModal()
    {
        $this->showModal = false;
    }
}
```

### With Livewire Events
```blade
<x-keys::modal
    id="event-modal"
    wire:open="handleOpen"
    wire:close="handleClose"
    wire:escape="handleEscape"
>
    Modal with event handlers
</x-keys::modal>
```

Component class:
```php
public function handleOpen()
{
    // Called when modal opens
}

public function handleClose()
{
    // Called when modal closes
}

public function handleEscape()
{
    // Called when Escape key pressed
}
```

### Open from Livewire
```php
// In your Livewire component
public function openUserModal()
{
    $this->dispatch('openModal', id: 'user-modal');
}

public function closeUserModal()
{
    $this->dispatch('closeModal', id: 'user-modal');
}
```

## Confirmation Dialogs

### Simple Confirmation
```blade
<x-keys::modal id="confirm-delete" size="sm">
    <x-slot:header>
        <x-keys::heading size="lg">Confirm Delete</x-keys::heading>
    </x-slot:header>

    <x-keys::text>Are you sure you want to delete this item? This action cannot be undone.</x-keys::text>

    <x-slot:footer>
        <x-keys::button
            variant="ghost"
            onclick="this.closest('dialog').close()"
        >
            Cancel
        </x-keys::button>
        <x-keys::button
            color="danger"
            wire:click="delete"
            onclick="this.closest('dialog').close()"
        >
            Delete
        </x-keys::button>
    </x-slot:footer>
</x-keys::modal>

<x-keys::button
    color="danger"
    onclick="document.getElementById('confirm-delete').showModal()"
>
    Delete Item
</x-keys::button>
```

### With Loading State
```blade
<x-keys::modal id="save-modal">
    <x-slot:header>
        <x-keys::heading size="lg">Save Changes?</x-keys::heading>
    </x-slot:header>

    <x-keys::text>Do you want to save your changes before leaving?</x-keys::text>

    <x-slot:footer>
        <x-keys::button
            variant="ghost"
            onclick="this.closest('dialog').close()"
        >
            Discard
        </x-keys::button>
        <x-keys::button
            color="primary"
            wire:click="save"
            :loading="$isSaving"
        >
            Save Changes
        </x-keys::button>
    </x-slot:footer>
</x-keys::modal>
```

## Form Modals

### Create Form
```blade
<x-keys::modal id="create-modal" size="lg" :scrollable="true">
    <x-slot:header>
        <x-keys::heading size="lg">Create New Item</x-keys::heading>
        <button
            type="button"
            onclick="this.closest('dialog').close()"
            class="ml-auto"
        >
            <x-keys::icon name="heroicon-o-x-mark" size="sm" />
        </button>
    </x-slot:header>

    <form wire:submit="create">
        <div class="space-y-4">
            <x-keys::input
                wire:model="name"
                label="Name"
                required
                :errors="$errors->get('name')"
            />

            <x-keys::textarea
                wire:model="description"
                label="Description"
                :errors="$errors->get('description')"
            />

            <x-keys::select
                wire:model="category"
                label="Category"
                :errors="$errors->get('category')"
            >
                <option value="">Select category...</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
            </x-keys::select>
        </div>
    </form>

    <x-slot:footer>
        <x-keys::button
            type="button"
            variant="ghost"
            onclick="this.closest('dialog').close()"
        >
            Cancel
        </x-keys::button>
        <x-keys::button
            wire:click="create"
            color="primary"
            :loading="$isCreating"
        >
            Create
        </x-keys::button>
    </x-slot:footer>
</x-keys::modal>
```

## Advanced Features

### Lazy Loading
Load content only when modal opens:
```blade
<x-keys::modal id="lazy-modal" :lazy="true" wire:model="showModal">
    @if ($showModal)
        <!-- Content loaded only when open -->
        <x-livewire:modal-content />
    @endif
</x-keys::modal>
```

### Persistent Modal
Persist modal state across Livewire navigation:
```blade
<x-keys::modal id="persistent-modal" :persistent="true">
    This modal state persists during navigation.
</x-keys::modal>
```

### Disable Focus Trap
Allow focus outside modal (use carefully):
```blade
<x-keys::modal id="no-trap-modal" :trap-focus="false">
    Focus can move outside this modal.
</x-keys::modal>
```

### Non-Centered Modal
Position modal at top of viewport:
```blade
<x-keys::modal id="top-modal" :centered="false">
    This modal appears at the top of the screen.
</x-keys::modal>
```

## Accessibility

The Modal component includes comprehensive accessibility features:

- Native `<dialog>` element for proper semantics
- Focus trapping within modal
- Escape key support
- `role="document"` for screen readers
- Keyboard navigation support
- Backdrop click to close (configurable)
- Close button with proper ARIA labels

```blade
<x-keys::modal id="accessible-modal">
    <x-slot:header>
        <x-keys::heading size="lg" id="modal-title">
            Accessible Modal
        </x-keys::heading>
        <button
            type="button"
            onclick="this.closest('dialog').close()"
            aria-label="Close modal"
            class="ml-auto"
        >
            <x-keys::icon name="heroicon-o-x-mark" size="sm" />
        </button>
    </x-slot:header>

    <x-keys::text id="modal-description">
        This modal is fully accessible with proper ARIA attributes.
    </x-keys::text>
</x-keys::modal>
```

## Use Cases

### Delete Confirmation
```blade
<x-keys::modal id="delete-confirm" size="sm" closedby="closerequest">
    <x-slot:header>
        <div class="flex items-center gap-3">
            <div class="flex-shrink-0 w-10 h-10 bg-danger-subtle rounded-full flex items-center justify-center">
                <x-keys::icon name="heroicon-o-exclamation-triangle" class="text-danger" />
            </div>
            <x-keys::heading size="lg">Delete Account</x-keys::heading>
        </div>
    </x-slot:header>

    <x-keys::text>Are you absolutely sure? This will permanently delete your account and all associated data. This action cannot be undone.</x-keys::text>

    <x-slot:footer>
        <x-keys::button variant="ghost" onclick="this.closest('dialog').close()">
            Cancel
        </x-keys::button>
        <x-keys::button color="danger" wire:click="deleteAccount">
            Yes, Delete Account
        </x-keys::button>
    </x-slot:footer>
</x-keys::modal>
```

### Image Gallery
```blade
<x-keys::modal id="image-gallery" size="xl">
    <x-slot:header>
        <x-keys::heading size="lg">Image Gallery</x-keys::heading>
        <button onclick="this.closest('dialog').close()" class="ml-auto">
            <x-keys::icon name="heroicon-o-x-mark" />
        </button>
    </x-slot:header>

    <div class="grid grid-cols-3 gap-4">
        @foreach($images as $image)
            <img src="{{ $image->url }}" alt="{{ $image->title }}" class="rounded-lg" />
        @endforeach
    </div>
</x-keys::modal>
```

### Settings Panel
```blade
<x-keys::modal id="settings" size="lg" :scrollable="true">
    <x-slot:header>
        <x-keys::heading size="lg">Settings</x-keys::heading>
        <button onclick="this.closest('dialog').close()" class="ml-auto">
            <x-keys::icon name="heroicon-o-x-mark" />
        </button>
    </x-slot:header>

    <x-keys::tabs variant="pills">
        <x-slot:tabs>
            <x-keys::tabs.tab target="profile">Profile</x-keys::tabs.tab>
            <x-keys::tabs.tab target="account">Account</x-keys::tabs.tab>
            <x-keys::tabs.tab target="notifications">Notifications</x-keys::tabs.tab>
        </x-slot:tabs>

        <x-keys::tabs.panel id="profile">
            <!-- Profile settings -->
        </x-keys::tabs.panel>

        <x-keys::tabs.panel id="account">
            <!-- Account settings -->
        </x-keys::tabs.panel>

        <x-keys::tabs.panel id="notifications">
            <!-- Notification settings -->
        </x-keys::tabs.panel>
    </x-keys::tabs>

    <x-slot:footer>
        <x-keys::button color="primary" wire:click="saveSettings">
            Save Changes
        </x-keys::button>
    </x-slot:footer>
</x-keys::modal>
```

## Best Practices

1. **Always provide an ID**: Required for opening/closing the modal

2. **Include close mechanism**: Provide a way to close the modal (button, escape key, backdrop)

3. **Use appropriate sizes**: Match modal size to content volume

4. **Handle loading states**: Show feedback during async operations

5. **Confirm destructive actions**: Always confirm before deleting or making irreversible changes

6. **Keep content focused**: Modals should have a single, clear purpose

7. **Use headers for context**: Help users understand what the modal is for

8. **Consider mobile users**: Test modal usability on smaller screens

## Component Structure

The Modal component consists of:

1. **PHP Class** (`Modal.php`)
   - Props validation
   - Livewire integration detection
   - Event attributes generation
   - Data attributes generation

2. **Blade Template** (`modal.blade.php`)
   - Native dialog element
   - Backdrop styling
   - Size-based layout
   - Header/footer slots
   - Livewire event listeners

3. **TypeScript Actions** (`ModalActions.ts`)
   - Focus trapping
   - Event handling
   - Animation control
   - Livewire integration

## Data Attributes

The component generates comprehensive data attributes:

- `data-keys-modal="true"` - Component identifier
- `data-size="md"` - Modal size
- `data-backdrop="blur"` - Backdrop variant
- `data-closedby="any"` - Closing behavior
- `data-animate="true"` - Animation state
- `data-scrollable="true"` - Scrollable body
- `data-centered="false"` - Vertical alignment
- `data-has-header="true"` - Has header
- `data-has-footer="true"` - Has footer
- `data-lazy="true"` - Lazy loading
- `data-persistent="true"` - Persistence
- `data-livewire-enabled="true"` - Livewire integration
- `data-trap-focus="false"` - Focus trapping
