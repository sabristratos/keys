# EmptyState Component

A flexible empty state component for displaying when no data is available. Features customizable icons, titles, descriptions, action buttons, and multiple variants to guide users to the next step.

## Basic Usage

```blade
<x-keys::empty-state />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'No data found'` | Main heading for the empty state |
| `description` | `string` | `'There are no items to display.'` | Descriptive text explaining the state |
| `icon` | `string\|null` | `'heroicon-o-document-text'` | Icon name (heroicon format) |
| `variant` | `string` | `'neutral'` | Color variant: `neutral`, `brand`, `success`, `warning`, `danger`, `info` |
| `size` | `string` | `'md'` | Size variant: `sm`, `md`, `lg` |
| `actionText` | `string\|null` | `null` | Text for the action button |
| `actionUrl` | `string\|null` | `null` | URL for the action button |
| `actionIcon` | `string\|null` | `null` | Icon for the action button |

## Custom Title and Description

```blade
<x-keys::empty-state
    title="No products found"
    description="Start by adding your first product to the inventory."
/>
```

## Size Variants

### Small
```blade
<x-keys::empty-state
    size="sm"
    title="No items"
    description="Add your first item to get started."
/>
```

### Medium (Default)
```blade
<x-keys::empty-state
    size="md"
    title="No data available"
    description="There are currently no items to display."
/>
```

### Large
```blade
<x-keys::empty-state
    size="lg"
    title="Nothing to show"
    description="Get started by creating your first item."
/>
```

## Color Variants

### Neutral (Default)
```blade
<x-keys::empty-state
    variant="neutral"
    title="No results"
    description="Try adjusting your filters."
/>
```

### Brand
```blade
<x-keys::empty-state
    variant="brand"
    title="Welcome!"
    description="Let's get started with your first project."
/>
```

### Success
```blade
<x-keys::empty-state
    variant="success"
    icon="heroicon-o-check-circle"
    title="All caught up"
    description="You've completed all tasks!"
/>
```

### Warning
```blade
<x-keys::empty-state
    variant="warning"
    icon="heroicon-o-exclamation-triangle"
    title="Action required"
    description="Please complete your profile to continue."
/>
```

### Danger
```blade
<x-keys::empty-state
    variant="danger"
    icon="heroicon-o-x-circle"
    title="No access"
    description="You don't have permission to view this content."
/>
```

### Info
```blade
<x-keys::empty-state
    variant="info"
    icon="heroicon-o-information-circle"
    title="Getting started"
    description="Follow these steps to set up your account."
/>
```

## With Icons

### Default Icon
```blade
<x-keys::empty-state
    title="No documents"
    description="Upload your first document to get started."
/>
```

### Custom Icon
```blade
<x-keys::empty-state
    icon="heroicon-o-inbox"
    title="Empty inbox"
    description="You have no new messages."
/>
```

### Without Icon
```blade
<x-keys::empty-state
    :icon="null"
    title="No results"
    description="Try different search terms."
/>
```

## With Action Button

### Simple Action
```blade
<x-keys::empty-state
    title="No products"
    description="Start building your product catalog."
    actionText="Add Product"
    actionUrl="/products/create"
/>
```

### Action with Icon
```blade
<x-keys::empty-state
    title="No team members"
    description="Invite people to collaborate with you."
    actionText="Invite Team"
    actionUrl="/team/invite"
    actionIcon="heroicon-o-user-plus"
    variant="brand"
/>
```

### Multiple Actions via Slot
```blade
<x-keys::empty-state
    title="No data found"
    description="Import data or create manually."
>
    <div class="flex gap-3">
        <x-keys::button href="/import" variant="outline">
            Import Data
        </x-keys::button>
        <x-keys::button href="/create" color="brand">
            Create New
        </x-keys::button>
    </div>
</x-keys::empty-state>
```

## Real-World Examples

### Empty Product List
```blade
<x-keys::empty-state
    icon="heroicon-o-shopping-bag"
    title="No products yet"
    description="Add your first product to start selling."
    actionText="Add Product"
    actionUrl="/products/create"
    actionIcon="heroicon-o-plus"
    variant="brand"
/>
```

### Empty Search Results
```blade
<x-keys::empty-state
    icon="heroicon-o-magnifying-glass"
    title="No results found"
    description="We couldn't find any items matching '{{ $searchQuery }}'. Try different keywords."
    size="sm"
/>
```

### Empty Notifications
```blade
<x-keys::empty-state
    icon="heroicon-o-bell"
    title="No notifications"
    description="You're all caught up! Check back later for updates."
    variant="success"
    size="sm"
/>
```

### Empty Shopping Cart
```blade
<x-keys::empty-state
    icon="heroicon-o-shopping-cart"
    title="Your cart is empty"
    description="Add items to your cart to get started."
    actionText="Continue Shopping"
    actionUrl="/shop"
    actionIcon="heroicon-o-arrow-right"
/>
```

### Empty File List
```blade
<x-keys::empty-state
    icon="heroicon-o-folder-open"
    title="No files uploaded"
    description="Drag and drop files here or click to browse."
    actionText="Upload Files"
    actionUrl="#upload"
    actionIcon="heroicon-o-arrow-up-tray"
/>
```

### Empty Favorites
```blade
<x-keys::empty-state
    icon="heroicon-o-heart"
    title="No favorites yet"
    description="Star your favorite items to find them quickly later."
    size="sm"
/>
```

### No Access
```blade
<x-keys::empty-state
    icon="heroicon-o-lock-closed"
    title="Access denied"
    description="You don't have permission to view this page. Contact your administrator for access."
    variant="danger"
    actionText="Go Back"
    actionUrl="javascript:history.back()"
/>
```

### Pending Approval
```blade
<x-keys::empty-state
    icon="heroicon-o-clock"
    title="Pending approval"
    description="Your account is under review. We'll notify you once it's approved."
    variant="warning"
/>
```

### Completed Tasks
```blade
<x-keys::empty-state
    icon="heroicon-o-check-badge"
    title="All done!"
    description="You've completed all your tasks. Great work!"
    variant="success"
    actionText="View Archive"
    actionUrl="/tasks/archive"
/>
```

### Empty Inbox
```blade
<x-keys::empty-state
    icon="heroicon-o-inbox-arrow-down"
    title="Inbox zero"
    description="You have no unread messages. Enjoy the peace!"
    variant="success"
    size="lg"
/>
```

## With Livewire

### Conditional Display
```blade
<div>
    @if(count($items) > 0)
        @foreach($items as $item)
            {{-- Display items --}}
        @endforeach
    @else
        <x-keys::empty-state
            title="No items found"
            description="Create your first item to get started."
            actionText="Create Item"
            actionUrl="/items/create"
        />
    @endif
</div>
```

### With Dynamic Actions
```blade
<x-keys::empty-state
    title="No results"
    description="Try adjusting your search criteria."
>
    <div class="flex gap-3">
        <x-keys::button
            wire:click="clearFilters"
            variant="outline"
        >
            Clear Filters
        </x-keys::button>
        <x-keys::button
            wire:click="resetSearch"
            color="brand"
        >
            Reset Search
        </x-keys::button>
    </div>
</x-keys::empty-state>
```

### Loading State Transition
```blade
<div>
    @if($loading)
        <div class="flex justify-center py-12">
            <x-keys::loading size="lg" />
        </div>
    @elseif(count($results) > 0)
        @foreach($results as $result)
            {{-- Display results --}}
        @endforeach
    @else
        <x-keys::empty-state
            icon="heroicon-o-magnifying-glass"
            title="No results found"
            description="Try different search terms."
        />
    @endif
</div>
```

## In Tables

```blade
<x-keys::table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        @forelse($users as $user)
            <tr>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
                <td>{{ $user->status }}</td>
            </tr>
        @empty
            <tr>
                <td colspan="3" class="p-0">
                    <x-keys::empty-state
                        icon="heroicon-o-users"
                        title="No users found"
                        description="Add your first user to get started."
                        actionText="Add User"
                        actionUrl="/users/create"
                        size="sm"
                    />
                </td>
            </tr>
        @endforelse
    </tbody>
</x-keys::table>
```

## In Modals

```blade
<x-keys::modal wire:model="showModal" title="Select Item">
    @if(count($items) > 0)
        <div class="space-y-2">
            @foreach($items as $item)
                {{-- Item list --}}
            @endforeach
        </div>
    @else
        <x-keys::empty-state
            icon="heroicon-o-squares-2x2"
            title="No items available"
            description="Create items before you can select them."
            size="sm"
        />
    @endif
</x-keys::modal>
```

## In Dropdowns

```blade
<x-keys::dropdown id="recent-files">
    <x-slot:trigger>
        <x-keys::button>Recent Files</x-keys::button>
    </x-slot:trigger>

    @forelse($recentFiles as $file)
        <x-keys::dropdown.item>
            {{ $file->name }}
        </x-keys::dropdown.item>
    @empty
        <div class="px-4">
            <x-keys::empty-state
                icon="heroicon-o-document"
                title="No recent files"
                description="Your recent files will appear here."
                size="sm"
                :actionText="null"
                :actionUrl="null"
            />
        </div>
    @endforelse
</x-keys::dropdown>
```

## Custom Actions

```blade
<x-keys::empty-state
    icon="heroicon-o-cloud-arrow-up"
    title="No backups"
    description="Set up automatic backups to protect your data."
>
    <div class="flex flex-col sm:flex-row gap-3">
        <x-keys::button
            href="/backups/setup"
            color="brand"
            icon-left="heroicon-o-cog"
        >
            Configure Backups
        </x-keys::button>
        <x-keys::button
            href="/backups/learn-more"
            variant="outline"
        >
            Learn More
        </x-keys::button>
    </div>
</x-keys::empty-state>
```

## Accessibility

The EmptyState component includes comprehensive accessibility features:

- Semantic HTML structure
- Descriptive headings for screen readers
- Sufficient color contrast
- Keyboard-accessible action buttons
- Clear, concise messaging
- Icon + text combination for better comprehension

```blade
<x-keys::empty-state
    title="No items available"
    description="There are currently no items to display. Please check back later or create a new item."
    actionText="Create New Item"
    actionUrl="/items/create"
/>
```

## Best Practices

1. **Be specific**: Tailor the title and description to the context

2. **Provide guidance**: Tell users what to do next

3. **Use appropriate icons**: Match the icon to the content type

4. **Choose correct variants**: Use success for positive states, warning for actions needed, danger for errors

5. **Include actions**: Provide a clear path forward when possible

6. **Keep it concise**: Use short, clear messaging

7. **Match size to context**: Use sm for small containers, lg for prominent displays

8. **Test with real data**: Ensure messages make sense in actual use

9. **Consider multiple empty states**: Different contexts may need different messages

10. **Maintain consistency**: Use similar patterns across your application

## State Selection Guide

- **Neutral**: Default, generic empty states
- **Brand**: Welcome screens, onboarding, getting started
- **Success**: Completed states (inbox zero, all done)
- **Warning**: Action required, pending states
- **Danger**: Access denied, permission errors
- **Info**: Informational, help, guidance

## Component Structure

The EmptyState component consists of:

1. **PHP Class** (`EmptyState.php`)
   - Props validation and defaults
   - Variant validation
   - Size-based calculations for icons and buttons
   - Action button detection
   - Data attributes generation

2. **Blade Template** (`empty-state.blade.php`)
   - Centered container layout
   - Icon with variant-based coloring
   - Heading and description
   - Optional action button
   - Custom actions via slot
   - Responsive padding and spacing

## Data Attributes

The component generates helpful data attributes:

- `data-keys-empty-state="true"` - Component identifier
- `data-variant="neutral"` - Color variant
- `data-size="md"` - Size variant
- `data-has-action="true"` - Action button presence
- `data-has-icon="true"` - Icon presence
- `data-icon="heroicon-o-document-text"` - Icon name
