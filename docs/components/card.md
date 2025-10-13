# Card Component

A flexible container component for grouping related content. Supports header, body, and footer slots with multiple size and variant options. Perfect for dashboards, content layouts, and UI sections.

## Basic Usage

```blade
<x-keys::card>
    Card content goes here.
</x-keys::card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string` | `'md'` | Padding size: `xs`, `sm`, `md`, `lg`, `xl` |
| `variant` | `string` | `'elevated'` | Visual style: `elevated`, `solid`, `outline` |

## Variants

### Elevated (Default)
Card with drop shadow:

```blade
<x-keys::card variant="elevated">
    Content with elevated shadow effect.
</x-keys::card>
```

### Solid
Card with border:

```blade
<x-keys::card variant="solid">
    Content with solid border.
</x-keys::card>
```

### Outline
Transparent card with border only:

```blade
<x-keys::card variant="outline">
    Content with outline only.
</x-keys::card>
```

## Sizes

Control padding for all sections:

```blade
<x-keys::card size="xs">Extra Small Padding</x-keys::card>
<x-keys::card size="sm">Small Padding</x-keys::card>
<x-keys::card size="md">Medium Padding (Default)</x-keys::card>
<x-keys::card size="lg">Large Padding</x-keys::card>
<x-keys::card size="xl">Extra Large Padding</x-keys::card>
```

## With Header

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="lg">Card Title</x-keys::heading>
    </x-slot:header>

    Card body content goes here.
</x-keys::card>
```

## With Footer

```blade
<x-keys::card>
    Card body content.

    <x-slot:footer>
        <div class="flex justify-end gap-3">
            <x-keys::button variant="ghost">Cancel</x-keys::button>
            <x-keys::button color="primary">Save</x-keys::button>
        </div>
    </x-slot:footer>
</x-keys::card>
```

## Complete Card

```blade
<x-keys::card size="lg">
    <x-slot:header>
        <div class="flex items-center justify-between">
            <x-keys::heading size="lg">User Profile</x-keys::heading>
            <x-keys::button variant="ghost" size="sm" icon-left="heroicon-o-pencil">
                Edit
            </x-keys::button>
        </div>
    </x-slot:header>

    <div class="space-y-4">
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        <p>Role: Administrator</p>
    </div>

    <x-slot:footer>
        <div class="flex justify-between items-center">
            <x-keys::text size="sm" color="muted">
                Last updated: 2 hours ago
            </x-keys::text>
            <x-keys::button color="primary" size="sm">
                View Details
            </x-keys::button>
        </div>
    </x-slot:footer>
</x-keys::card>
```

## Use Cases

### Dashboard Statistics Card

```blade
<x-keys::card variant="elevated">
    <x-slot:header>
        <div class="flex items-center gap-2">
            <x-keys::icon name="heroicon-o-users" size="md" class="text-brand" />
            <x-keys::heading size="md">Total Users</x-keys::heading>
        </div>
    </x-slot:header>

    <div class="text-center py-4">
        <x-keys::heading size="3xl" weight="bold">1,234</x-keys::heading>
        <x-keys::text color="success" class="mt-2">
            <x-keys::icon name="heroicon-o-arrow-trending-up" size="xs" />
            +12% from last month
        </x-keys::text>
    </div>
</x-keys::card>
```

### Product Card

```blade
<x-keys::card variant="solid">
    <x-keys::image
        src="/images/product.jpg"
        alt="Product Name"
        class="w-full h-48 object-cover rounded-lg mb-4"
    />

    <x-keys::heading size="lg">Product Name</x-keys::heading>
    <x-keys::text color="muted" class="mt-2">
        Brief product description goes here.
    </x-keys::text>

    <x-slot:footer>
        <div class="flex items-center justify-between">
            <x-keys::heading size="xl" color="brand">$99.99</x-keys::heading>
            <x-keys::button color="primary">Add to Cart</x-keys::button>
        </div>
    </x-slot:footer>
</x-keys::card>
```

### Notification Card

```blade
<x-keys::card variant="outline" size="sm">
    <div class="flex items-start gap-3">
        <x-keys::avatar
            src="/avatars/user.jpg"
            name="Jane Smith"
            size="md"
        />
        <div class="flex-1">
            <x-keys::heading size="sm">Jane Smith</x-keys::heading>
            <x-keys::text size="sm" color="muted">
                Commented on your post
            </x-keys::text>
            <x-keys::text size="xs" color="muted" class="mt-1">
                2 hours ago
            </x-keys::text>
        </div>
        <x-keys::button variant="ghost" size="xs" icon-left="heroicon-o-x-mark" />
    </div>
</x-keys::card>
```

### Profile Card

```blade
<x-keys::card variant="elevated" size="lg">
    <x-slot:header>
        <div class="flex items-center gap-4">
            <x-keys::avatar
                src="/avatars/profile.jpg"
                name="John Doe"
                size="xl"
            />
            <div>
                <x-keys::heading size="xl">John Doe</x-keys::heading>
                <x-keys::text color="muted">Software Engineer</x-keys::text>
            </div>
        </div>
    </x-slot:header>

    <div class="space-y-4">
        <div>
            <x-keys::heading size="sm">About</x-keys::heading>
            <x-keys::text class="mt-2">
                Passionate about building great software and leading teams.
            </x-keys::text>
        </div>

        <div>
            <x-keys::heading size="sm">Skills</x-keys::heading>
            <div class="flex flex-wrap gap-2 mt-2">
                <x-keys::badge>PHP</x-keys::badge>
                <x-keys::badge>Laravel</x-keys::badge>
                <x-keys::badge>JavaScript</x-keys::badge>
                <x-keys::badge>Vue.js</x-keys::badge>
            </div>
        </div>
    </div>

    <x-slot:footer>
        <div class="flex gap-3">
            <x-keys::button variant="outlined" class="flex-1">
                Message
            </x-keys::button>
            <x-keys::button color="primary" class="flex-1">
                Follow
            </x-keys::button>
        </div>
    </x-slot:footer>
</x-keys::card>
```

### Settings Card

```blade
<x-keys::card>
    <x-slot:header>
        <x-keys::heading size="lg">Account Settings</x-keys::heading>
    </x-slot:header>

    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <x-keys::heading size="sm">Email Notifications</x-keys::heading>
                <x-keys::text size="sm" color="muted">
                    Receive email about your account activity
                </x-keys::text>
            </div>
            <x-keys::toggle wire:model="emailNotifications" />
        </div>

        <x-keys::separator />

        <div class="flex items-center justify-between">
            <div>
                <x-keys::heading size="sm">Two-Factor Authentication</x-keys::heading>
                <x-keys::text size="sm" color="muted">
                    Add an extra layer of security
                </x-keys::text>
            </div>
            <x-keys::toggle wire:model="twoFactor" />
        </div>
    </div>

    <x-slot:footer>
        <x-keys::button color="primary" class="w-full">
            Save Changes
        </x-keys::button>
    </x-slot:footer>
</x-keys::card>
```

### Pricing Card

```blade
<x-keys::card variant="solid" size="lg">
    <x-slot:header>
        <div class="text-center">
            <x-keys::badge color="brand" class="mb-4">Popular</x-keys::badge>
            <x-keys::heading size="2xl">Pro Plan</x-keys::heading>
            <div class="mt-4">
                <x-keys::heading size="4xl" color="brand">$29</x-keys::heading>
                <x-keys::text color="muted">/month</x-keys::text>
            </div>
        </div>
    </x-slot:header>

    <div class="space-y-3">
        <div class="flex items-center gap-2">
            <x-keys::icon name="heroicon-o-check" size="sm" class="text-success" />
            <x-keys::text>Unlimited projects</x-keys::text>
        </div>
        <div class="flex items-center gap-2">
            <x-keys::icon name="heroicon-o-check" size="sm" class="text-success" />
            <x-keys::text>Priority support</x-keys::text>
        </div>
        <div class="flex items-center gap-2">
            <x-keys::icon name="heroicon-o-check" size="sm" class="text-success" />
            <x-keys::text>Advanced analytics</x-keys::text>
        </div>
    </div>

    <x-slot:footer>
        <x-keys::button color="primary" class="w-full">
            Get Started
        </x-keys::button>
    </x-slot:footer>
</x-keys::card>
```

### Form Card

```blade
<x-keys::card size="lg">
    <x-slot:header>
        <x-keys::heading size="xl">Create Account</x-keys::heading>
    </x-slot:header>

    <form wire:submit="register">
        <div class="space-y-4">
            <x-keys::input
                wire:model="name"
                name="name"
                label="Full Name"
                required
            />

            <x-keys::input
                wire:model="email"
                type="email"
                name="email"
                label="Email"
                required
            />

            <x-keys::input
                wire:model="password"
                type="password"
                name="password"
                label="Password"
                :show-password="true"
                required
            />
        </div>
    </form>

    <x-slot:footer>
        <x-keys::button
            wire:click="register"
            color="primary"
            class="w-full"
        >
            Create Account
        </x-keys::button>
    </x-slot:footer>
</x-keys::card>
```

## Grid Layout

```blade
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    @foreach($items as $item)
        <x-keys::card variant="elevated">
            <x-slot:header>
                <x-keys::heading size="md">{{ $item->title }}</x-keys::heading>
            </x-slot:header>

            <x-keys::text>{{ $item->description }}</x-keys::text>

            <x-slot:footer>
                <x-keys::button href="{{ route('items.show', $item) }}" class="w-full">
                    View Details
                </x-keys::button>
            </x-slot:footer>
        </x-keys::card>
    @endforeach
</div>
```

## Component Structure

The Card component consists of:

1. **PHP Class** (`Card.php`)
   - Size and variant validation
   - Data attributes generation

2. **Blade Template** (`card.blade.php`)
   - Responsive container
   - Header slot with border
   - Body section with padding
   - Footer slot with border
   - Variant-based styling

## Data Attributes

The component generates data attributes:

- `data-keys-card="true"` - Component identifier
- `data-size="md"` - Size variant
- `data-variant="elevated"` - Visual variant

## Best Practices

1. **Use appropriate variants**: Elevated for primary content, outline for secondary

2. **Match size to content**: Larger sizes for forms, smaller for compact lists

3. **Use headers for titles**: Provides clear content hierarchy

4. **Use footers for actions**: Keep actions separate from content

5. **Maintain consistent spacing**: Use the size prop instead of custom padding

6. **Group related content**: Cards should represent a single logical unit

7. **Consider mobile layouts**: Cards stack well on smaller screens

8. **Use semantic heading levels**: Match heading sizes to document structure

## Accessibility

- Use semantic HTML within card content
- Ensure sufficient color contrast
- Provide descriptive headings
- Make interactive elements keyboard accessible

## Customization

Cards can be easily customized with Tailwind classes:

```blade
<x-keys::card class="hover:shadow-lg transition-shadow">
    Hover for enhanced shadow
</x-keys::card>

<x-keys::card class="max-w-md mx-auto">
    Centered with max width
</x-keys::card>

<x-keys::card class="border-l-4 border-brand">
    Accent border
</x-keys::card>
```
