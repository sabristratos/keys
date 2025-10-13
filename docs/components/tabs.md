# Tabs Component

An accessible tabs component with animated sliding indicator, multiple style variants, and support for both array-based and slot-based tab definitions. Features keyboard navigation and smooth transitions.

## Basic Usage

```blade
<x-keys::tabs defaultValue="tab1">
    <x-slot:tabs>
        <x-keys::tabs.tab target="tab1">Overview</x-keys::tabs.tab>
        <x-keys::tabs.tab target="tab2">Details</x-keys::tabs.tab>
        <x-keys::tabs.tab target="tab3">Settings</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="tab1">
        <x-keys::text>Overview content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="tab2">
        <x-keys::text>Details content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="tab3">
        <x-keys::text>Settings content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

## Props

### Tabs Container

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string\|null` | Auto-generated | Unique identifier for the tabs |
| `items` | `array` | `[]` | Array-based tab definitions |
| `defaultValue` | `string\|null` | First tab | Initial active tab |
| `variant` | `string` | `'default'` | Style: `default`, `pills`, `underline` |
| `orientation` | `string` | `'horizontal'` | Orientation: `horizontal`, `vertical` |
| `size` | `string` | `'md'` | Size: `sm`, `md`, `lg` |
| `stretch` | `bool` | `false` | Stretch tabs to fill width |
| `disabled` | `bool` | `false` | Disable all tabs |

### Tab

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `target` | `string\|null` | `null` | Panel ID to show |
| `icon` | `string\|null` | `null` | Icon name |
| `active` | `bool` | `false` | Initially active |
| `disabled` | `bool` | `false` | Disabled state |

### Panel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string\|null` | `null` | Panel identifier |
| `active` | `bool` | `false` | Initially active |

## Variants

### Default
```blade
<x-keys::tabs variant="default" defaultValue="home">
    <x-slot:tabs>
        <x-keys::tabs.tab target="home">Home</x-keys::tabs.tab>
        <x-keys::tabs.tab target="profile">Profile</x-keys::tabs.tab>
        <x-keys::tabs.tab target="settings">Settings</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="home">
        <x-keys::text>Home content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="profile">
        <x-keys::text>Profile content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="settings">
        <x-keys::text>Settings content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

### Pills
```blade
<x-keys::tabs variant="pills" defaultValue="messages">
    <x-slot:tabs>
        <x-keys::tabs.tab target="messages">Messages</x-keys::tabs.tab>
        <x-keys::tabs.tab target="calls">Calls</x-keys::tabs.tab>
        <x-keys::tabs.tab target="contacts">Contacts</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="messages">
        <x-keys::text>Messages content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="calls">
        <x-keys::text>Calls content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="contacts">
        <x-keys::text>Contacts content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

### Underline
```blade
<x-keys::tabs variant="underline" defaultValue="overview">
    <x-slot:tabs>
        <x-keys::tabs.tab target="overview">Overview</x-keys::tabs.tab>
        <x-keys::tabs.tab target="analytics">Analytics</x-keys::tabs.tab>
        <x-keys::tabs.tab target="reports">Reports</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="overview">
        <x-keys::text>Overview content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="analytics">
        <x-keys::text>Analytics content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="reports">
        <x-keys::text>Reports content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

## Size Variants

### Small
```blade
<x-keys::tabs size="sm" defaultValue="tab1">
    <x-slot:tabs>
        <x-keys::tabs.tab target="tab1">Tab 1</x-keys::tabs.tab>
        <x-keys::tabs.tab target="tab2">Tab 2</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="tab1">
        <x-keys::text size="sm">Small tab content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="tab2">
        <x-keys::text size="sm">More small content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

### Medium (Default)
```blade
<x-keys::tabs size="md" defaultValue="tab1">
    <x-slot:tabs>
        <x-keys::tabs.tab target="tab1">Tab 1</x-keys::tabs.tab>
        <x-keys::tabs.tab target="tab2">Tab 2</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="tab1">
        <x-keys::text>Medium tab content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="tab2">
        <x-keys::text>More medium content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

### Large
```blade
<x-keys::tabs size="lg" defaultValue="tab1">
    <x-slot:tabs>
        <x-keys::tabs.tab target="tab1">Tab 1</x-keys::tabs.tab>
        <x-keys::tabs.tab target="tab2">Tab 2</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="tab1">
        <x-keys::text size="lg">Large tab content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="tab2">
        <x-keys::text size="lg">More large content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

## With Icons

```blade
<x-keys::tabs defaultValue="inbox">
    <x-slot:tabs>
        <x-keys::tabs.tab target="inbox" icon="heroicon-o-inbox">
            Inbox
        </x-keys::tabs.tab>
        <x-keys::tabs.tab target="sent" icon="heroicon-o-paper-airplane">
            Sent
        </x-keys::tabs.tab>
        <x-keys::tabs.tab target="drafts" icon="heroicon-o-document">
            Drafts
        </x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="inbox">
        <x-keys::text>Inbox messages</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="sent">
        <x-keys::text>Sent messages</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="drafts">
        <x-keys::text>Draft messages</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

## Stretch Tabs

```blade
<x-keys::tabs :stretch="true" defaultValue="tab1">
    <x-slot:tabs>
        <x-keys::tabs.tab target="tab1">Tab 1</x-keys::tabs.tab>
        <x-keys::tabs.tab target="tab2">Tab 2</x-keys::tabs.tab>
        <x-keys::tabs.tab target="tab3">Tab 3</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="tab1">
        <x-keys::text>Content 1</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="tab2">
        <x-keys::text>Content 2</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="tab3">
        <x-keys::text>Content 3</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

## Vertical Orientation

```blade
<x-keys::tabs orientation="vertical" defaultValue="general">
    <x-slot:tabs>
        <x-keys::tabs.tab target="general">General</x-keys::tabs.tab>
        <x-keys::tabs.tab target="security">Security</x-keys::tabs.tab>
        <x-keys::tabs.tab target="notifications">Notifications</x-keys::tabs.tab>
        <x-keys::tabs.tab target="billing">Billing</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="general">
        <x-keys::heading level="h3" size="lg">General Settings</x-keys::heading>
        <x-keys::text>General settings content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="security">
        <x-keys::heading level="h3" size="lg">Security Settings</x-keys::heading>
        <x-keys::text>Security settings content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="notifications">
        <x-keys::heading level="h3" size="lg">Notification Settings</x-keys::heading>
        <x-keys::text>Notification settings content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="billing">
        <x-keys::heading level="h3" size="lg">Billing Settings</x-keys::heading>
        <x-keys::text>Billing settings content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

## Array-Based Tabs

```blade
<x-keys::tabs
    :items="[
        ['value' => 'overview', 'label' => 'Overview', 'icon' => 'heroicon-o-chart-bar'],
        ['value' => 'customers', 'label' => 'Customers', 'icon' => 'heroicon-o-users'],
        ['value' => 'products', 'label' => 'Products', 'icon' => 'heroicon-o-shopping-bag'],
    ]"
    defaultValue="overview"
>
    <x-keys::tabs.panel id="overview">
        <x-keys::text>Overview content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="customers">
        <x-keys::text>Customers content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="products">
        <x-keys::text>Products content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

## Disabled Tabs

### Disabled Individual Tab
```blade
<x-keys::tabs defaultValue="active">
    <x-slot:tabs>
        <x-keys::tabs.tab target="active">Active</x-keys::tabs.tab>
        <x-keys::tabs.tab target="disabled" :disabled="true">Disabled</x-keys::tabs.tab>
        <x-keys::tabs.tab target="another">Another</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="active">
        <x-keys::text>Active content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="disabled">
        <x-keys::text>Disabled content</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="another">
        <x-keys::text>Another content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

### All Tabs Disabled
```blade
<x-keys::tabs :disabled="true" defaultValue="tab1">
    <x-slot:tabs>
        <x-keys::tabs.tab target="tab1">Tab 1</x-keys::tabs.tab>
        <x-keys::tabs.tab target="tab2">Tab 2</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="tab1">
        <x-keys::text>Content 1</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="tab2">
        <x-keys::text>Content 2</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

## Real-World Examples

### User Profile Tabs
```blade
<x-keys::tabs variant="underline" defaultValue="posts">
    <x-slot:tabs>
        <x-keys::tabs.tab target="posts" icon="heroicon-o-document-text">
            Posts
        </x-keys::tabs.tab>
        <x-keys::tabs.tab target="about" icon="heroicon-o-information-circle">
            About
        </x-keys::tabs.tab>
        <x-keys::tabs.tab target="media" icon="heroicon-o-photo">
            Media
        </x-keys::tabs.tab>
        <x-keys::tabs.tab target="activity" icon="heroicon-o-clock">
            Activity
        </x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="posts">
        @foreach($posts as $post)
            <x-keys::card class="mb-4">
                <x-keys::heading level="h4" size="md">{{ $post->title }}</x-keys::heading>
                <x-keys::text color="muted">{{ $post->excerpt }}</x-keys::text>
            </x-keys::card>
        @endforeach
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="about">
        <div class="space-y-4">
            <div>
                <x-keys::text weight="semibold">Bio</x-keys::text>
                <x-keys::text color="muted">{{ $user->bio }}</x-keys::text>
            </div>
            <div>
                <x-keys::text weight="semibold">Location</x-keys::text>
                <x-keys::text color="muted">{{ $user->location }}</x-keys::text>
            </div>
        </div>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="media">
        <div class="grid grid-cols-3 gap-4">
            @foreach($media as $item)
                <x-keys::image
                    :src="$item->url"
                    :alt="$item->title"
                    aspectRatio="square"
                    size="full"
                />
            @endforeach
        </div>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="activity">
        <div class="space-y-3">
            @foreach($activities as $activity)
                <div class="flex items-start gap-3">
                    <x-keys::icon name="heroicon-o-{{ $activity->icon }}" size="sm" />
                    <div>
                        <x-keys::text>{{ $activity->description }}</x-keys::text>
                        <x-keys::text size="xs" color="muted">
                            {{ $activity->created_at->diffForHumans() }}
                        </x-keys::text>
                    </div>
                </div>
            @endforeach
        </div>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

### Settings Panel
```blade
<x-keys::tabs variant="pills" orientation="vertical" defaultValue="profile">
    <x-slot:tabs>
        <x-keys::tabs.tab target="profile" icon="heroicon-o-user">
            Profile
        </x-keys::tabs.tab>
        <x-keys::tabs.tab target="account" icon="heroicon-o-cog">
            Account
        </x-keys::tabs.tab>
        <x-keys::tabs.tab target="security" icon="heroicon-o-lock-closed">
            Security
        </x-keys::tabs.tab>
        <x-keys::tabs.tab target="notifications" icon="heroicon-o-bell">
            Notifications
        </x-keys::tabs.tab>
        <x-keys::tabs.tab target="billing" icon="heroicon-o-credit-card">
            Billing
        </x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="profile">
        <x-keys::card>
            <x-keys::heading level="h3" size="lg" class="mb-4">Profile Settings</x-keys::heading>

            <div class="space-y-4">
                <div>
                    <x-keys::label for="name">Full Name</x-keys::label>
                    <x-keys::input id="name" wire:model="name" />
                </div>

                <div>
                    <x-keys::label for="email">Email</x-keys::label>
                    <x-keys::input id="email" type="email" wire:model="email" />
                </div>

                <div>
                    <x-keys::label for="bio">Bio</x-keys::label>
                    <x-keys::textarea id="bio" wire:model="bio" rows="4" />
                </div>

                <x-keys::button color="brand">Save Changes</x-keys::button>
            </div>
        </x-keys::card>
    </x-keys::tabs.panel>

    {{-- Other panels --}}
</x-keys::tabs>
```

### Product Details
```blade
<x-keys::tabs defaultValue="description" variant="underline">
    <x-slot:tabs>
        <x-keys::tabs.tab target="description">Description</x-keys::tabs.tab>
        <x-keys::tabs.tab target="specifications">Specifications</x-keys::tabs.tab>
        <x-keys::tabs.tab target="reviews">Reviews ({{ $reviewsCount }})</x-keys::tabs.tab>
        <x-keys::tabs.tab target="shipping">Shipping</x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="description">
        <x-keys::text>{{ $product->description }}</x-keys::text>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="specifications">
        <x-keys::table>
            @foreach($product->specifications as $spec)
                <tr>
                    <td class="font-medium">{{ $spec->name }}</td>
                    <td>{{ $spec->value }}</td>
                </tr>
            @endforeach
        </x-keys::table>
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="reviews">
        @forelse($reviews as $review)
            <x-keys::card class="mb-4">
                <div class="flex items-start justify-between mb-2">
                    <x-keys::text weight="semibold">{{ $review->user->name }}</x-keys::text>
                    <x-keys::rating :value="$review->rating" readonly />
                </div>
                <x-keys::text color="muted">{{ $review->comment }}</x-keys::text>
            </x-keys::card>
        @empty
            <x-keys::empty-state
                title="No reviews yet"
                description="Be the first to review this product"
                size="sm"
            />
        @endforelse
    </x-keys::tabs.panel>

    <x-keys::tabs.panel id="shipping">
        <x-keys::text>Shipping information content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

## With Livewire

### Dynamic Tabs
```blade
<x-keys::tabs wire:model.live="activeTab" defaultValue="{{ $activeTab }}">
    <x-slot:tabs>
        @foreach($tabs as $tab)
            <x-keys::tabs.tab target="{{ $tab['id'] }}">
                {{ $tab['label'] }}
            </x-keys::tabs.tab>
        @endforeach
    </x-slot:tabs>

    @foreach($tabs as $tab)
        <x-keys::tabs.panel id="{{ $tab['id'] }}">
            {!! $tab['content'] !!}
        </x-keys::tabs.panel>
    @endforeach
</x-keys::tabs>
```

## Accessibility

The Tabs component includes comprehensive accessibility features:

- `role="tablist"` on tab container
- `role="tab"` on each tab button
- `aria-selected` for active state
- `tabindex` management for keyboard navigation
- Keyboard support:
  - Arrow keys navigate between tabs
  - Home/End keys jump to first/last tab
  - Tab key moves focus out of tab list

```blade
<x-keys::tabs defaultValue="accessible">
    <x-slot:tabs>
        <x-keys::tabs.tab target="accessible">
            Accessible Tab
        </x-keys::tabs.tab>
    </x-slot:tabs>

    <x-keys::tabs.panel id="accessible">
        <x-keys::text>Fully accessible content</x-keys::text>
    </x-keys::tabs.panel>
</x-keys::tabs>
```

## Best Practices

1. **Limit tab count**: 3-7 tabs is optimal for usability

2. **Use clear labels**: Tab names should be concise and descriptive

3. **Match content to label**: Panel content should match expectations

4. **Consider mobile**: Test tab overflow on small screens

5. **Use icons consistently**: All tabs should have icons, or none

6. **Set default wisely**: Default to the most important or frequently used tab

7. **Avoid nested tabs**: Keep navigation hierarchy simple

8. **Use appropriate variant**: Pills for segmented controls, underline for content sections

9. **Test keyboard navigation**: Ensure all tabs are accessible via keyboard

10. **Provide feedback**: Use the sliding indicator for visual confirmation

## Keyboard Navigation

- **Arrow Left/Right** (or Up/Down for vertical): Navigate between tabs
- **Home**: Jump to first tab
- **End**: Jump to last tab
- **Tab**: Move focus to panel content
- **Enter/Space**: Activate focused tab

## Component Structure

The Tabs component consists of:

1. **PHP Container Class** (`Tabs.php`)
   - Props validation
   - Default value handling
   - Array-based tabs support
   - Data attributes generation

2. **PHP Tab Class** (`Tabs\Tab.php`)
   - Individual tab configuration
   - Icon support
   - Disabled state

3. **PHP Panel Class** (`Tabs\Panel.php`)
   - Panel identification
   - Active state management

4. **Blade Templates**
   - Tabs container with sliding indicator
   - Responsive layout
   - Variant-based styling

## Data Attributes

The component generates helpful data attributes:

- `data-keys-tabs="true"` - Component identifier
- `data-orientation="horizontal"` - Orientation
- `data-variant="default"` - Style variant
- `data-size="md"` - Size variant
- `data-value="tab-id"` - Active tab
- `data-disabled="true"` - Disabled state
- `data-stretch="true"` - Stretch mode
- `data-tab="target"` - Tab target identifier
- `data-tab-panel="id"` - Panel identifier
- `data-active="true"` - Active state
