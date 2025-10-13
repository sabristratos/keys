# Accordion Component

A flexible accordion component built on native HTML `<details>` elements with smooth animations, multiple variants, and support for actions. Features keyboard navigation, customizable colors, sizes, and accessibility built-in.

## Basic Usage

```blade
<x-keys::accordion>
    <x-keys::accordion.item title="What is Keys UI?">
        <x-keys::text>
            Keys UI is a comprehensive Blade component library built with Livewire 3 and Tailwind v4.
        </x-keys::text>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="How do I install it?">
        <x-keys::text>
            Install Keys UI via Composer and follow the setup instructions in the documentation.
        </x-keys::text>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="Is it free to use?">
        <x-keys::text>
            Yes, Keys UI is open source and free to use in your projects.
        </x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## Props

### Accordion Container

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string\|null` | Auto-generated | Unique identifier |
| `spacing` | `string` | `'md'` | Spacing between items: `none`, `xs`, `sm`, `md`, `lg`, `xl` |

### Accordion Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string\|null` | `null` | Item title text |
| `id` | `string\|null` | Auto-generated | Unique identifier |
| `icon` | `string\|null` | `'heroicon-o-chevron-down'` | Chevron icon name |
| `open` | `bool` | `false` | Initially open state |
| `disabled` | `bool` | `false` | Disabled state |
| `color` | `string` | `'neutral'` | Color variant: `brand`, `success`, `warning`, `danger`, `neutral` |
| `size` | `string` | `'md'` | Size: `xs`, `sm`, `md`, `lg` |
| `variant` | `string` | `'default'` | Style: `default`, `flush`, `spaced`, `outlined`, `elevated` |
| `rounded` | `string` | `'lg'` | Border radius: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl` |
| `actions` | `array` | `[]` | Action buttons |
| `actionVariant` | `string` | `'ghost'` | Action button variant |
| `actionSize` | `string` | `'xs'` | Action button size |
| `animated` | `bool` | `true` | Enable animations |

## Spacing Variants

### None
```blade
<x-keys::accordion spacing="none">
    <x-keys::accordion.item title="Item 1">Content 1</x-keys::accordion.item>
    <x-keys::accordion.item title="Item 2">Content 2</x-keys::accordion.item>
</x-keys::accordion>
```

### Extra Small
```blade
<x-keys::accordion spacing="xs">
    <x-keys::accordion.item title="Item 1">Content 1</x-keys::accordion.item>
    <x-keys::accordion.item title="Item 2">Content 2</x-keys::accordion.item>
</x-keys::accordion>
```

### Small
```blade
<x-keys::accordion spacing="sm">
    <x-keys::accordion.item title="Item 1">Content 1</x-keys::accordion.item>
    <x-keys::accordion.item title="Item 2">Content 2</x-keys::accordion.item>
</x-keys::accordion>
```

### Medium (Default)
```blade
<x-keys::accordion spacing="md">
    <x-keys::accordion.item title="Item 1">Content 1</x-keys::accordion.item>
    <x-keys::accordion.item title="Item 2">Content 2</x-keys::accordion.item>
</x-keys::accordion>
```

### Large
```blade
<x-keys::accordion spacing="lg">
    <x-keys::accordion.item title="Item 1">Content 1</x-keys::accordion.item>
    <x-keys::accordion.item title="Item 2">Content 2</x-keys::accordion.item>
</x-keys::accordion>
```

### Extra Large
```blade
<x-keys::accordion spacing="xl">
    <x-keys::accordion.item title="Item 1">Content 1</x-keys::accordion.item>
    <x-keys::accordion.item title="Item 2">Content 2</x-keys::accordion.item>
</x-keys::accordion>
```

## Variants

### Default
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Default Variant" variant="default">
        <x-keys::text>Standard bordered card appearance</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Flush
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Flush Variant" variant="flush">
        <x-keys::text>No background or border, minimal styling</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Spaced
```blade
<x-keys::accordion spacing="none">
    <x-keys::accordion.item title="Spaced Item 1" variant="spaced">
        <x-keys::text>Individual spacing included in variant</x-keys::text>
    </x-keys::accordion.item>
    <x-keys::accordion.item title="Spaced Item 2" variant="spaced">
        <x-keys::text>Each item has its own margin</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Outlined
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Outlined Variant" variant="outlined">
        <x-keys::text>Border without background</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Elevated
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Elevated Variant" variant="elevated">
        <x-keys::text>Includes shadow for depth</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## Size Variants

### Extra Small
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Extra Small" size="xs">
        <x-keys::text size="xs">Compact content</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Small
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Small Size" size="sm">
        <x-keys::text size="sm">Small content</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Medium (Default)
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Medium Size" size="md">
        <x-keys::text>Standard content</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Large
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Large Size" size="lg">
        <x-keys::text size="lg">Large content</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## Color Variants

### Neutral (Default)
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Neutral Color" color="neutral">
        <x-keys::text>Default neutral appearance</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Brand
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Brand Color" color="brand">
        <x-keys::text>Brand colored accent</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Success
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Success Color" color="success">
        <x-keys::text>Success state indication</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Warning
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Warning Color" color="warning">
        <x-keys::text>Warning state indication</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Danger
```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Danger Color" color="danger">
        <x-keys::text>Error or danger state</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## Initially Open

```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Always Open" :open="true">
        <x-keys::text>This item starts expanded</x-keys::text>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="Initially Closed">
        <x-keys::text>This item starts collapsed</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## Disabled State

```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Active Item">
        <x-keys::text>This item can be toggled</x-keys::text>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="Disabled Item" :disabled="true">
        <x-keys::text>This item cannot be toggled</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## Custom Icons

```blade
<x-keys::accordion>
    <x-keys::accordion.item
        title="Custom Icon"
        icon="heroicon-o-plus"
    >
        <x-keys::text>Uses a plus icon instead of chevron</x-keys::text>
    </x-keys::accordion.item>

    <x-keys::accordion.item
        title="No Icon"
        :icon="null"
    >
        <x-keys::text>No expand/collapse icon</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## With Actions

```blade
<x-keys::accordion>
    <x-keys::accordion.item
        title="Item with Actions"
        :actions="[
            ['icon' => 'heroicon-o-pencil', 'data_action' => 'edit', 'label' => 'Edit'],
            ['icon' => 'heroicon-o-trash', 'data_action' => 'delete', 'label' => 'Delete'],
        ]"
    >
        <x-keys::text>Content with inline actions</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## Border Radius

```blade
<x-keys::accordion>
    <x-keys::accordion.item title="No Radius" rounded="none">
        <x-keys::text>Square corners</x-keys::text>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="Small Radius" rounded="sm">
        <x-keys::text>Small rounded corners</x-keys::text>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="Extra Large Radius" rounded="xl">
        <x-keys::text>Very rounded corners</x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## Real-World Examples

### FAQ Section
```blade
<x-keys::accordion spacing="md">
    <x-keys::accordion.item title="What payment methods do you accept?">
        <x-keys::text color="muted">
            We accept all major credit cards (Visa, MasterCard, American Express),
            PayPal, and Apple Pay. All payments are processed securely through our
            payment provider.
        </x-keys::text>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="What is your return policy?">
        <x-keys::text color="muted">
            We offer a 30-day money-back guarantee on all purchases. If you're not
            completely satisfied, you can return the product for a full refund within
            30 days of purchase.
        </x-keys::text>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="How long does shipping take?">
        <x-keys::text color="muted">
            Standard shipping typically takes 5-7 business days. Express shipping
            options are available at checkout for 2-3 day delivery.
        </x-keys::text>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="Do you ship internationally?">
        <x-keys::text color="muted">
            Yes, we ship to over 50 countries worldwide. International shipping
            times vary by location but typically take 10-14 business days.
        </x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Product Features
```blade
<x-keys::accordion variant="elevated" spacing="lg">
    <x-keys::accordion.item
        title="Technical Specifications"
        color="brand"
        :open="true"
    >
        <div class="space-y-2">
            <div class="flex justify-between">
                <x-keys::text>Processor</x-keys::text>
                <x-keys::text weight="medium">Intel Core i7</x-keys::text>
            </div>
            <div class="flex justify-between">
                <x-keys::text>RAM</x-keys::text>
                <x-keys::text weight="medium">16GB DDR4</x-keys::text>
            </div>
            <div class="flex justify-between">
                <x-keys::text>Storage</x-keys::text>
                <x-keys::text weight="medium">512GB SSD</x-keys::text>
            </div>
        </div>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="What's in the Box" color="brand">
        <ul class="list-disc list-inside space-y-1">
            <li><x-keys::text>Main device</x-keys::text></li>
            <li><x-keys::text>Power adapter</x-keys::text></li>
            <li><x-keys::text>USB-C cable</x-keys::text></li>
            <li><x-keys::text>Quick start guide</x-keys::text></li>
            <li><x-keys::text>Warranty card</x-keys::text></li>
        </ul>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="Warranty Information" color="brand">
        <x-keys::text color="muted">
            This product comes with a 2-year manufacturer warranty covering all
            manufacturing defects. Extended warranty options are available at checkout.
        </x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Settings Sections
```blade
<x-keys::accordion variant="flush" spacing="none">
    <x-keys::accordion.item
        title="Account Settings"
        icon="heroicon-o-user"
        :actions="[
            ['icon' => 'heroicon-o-pencil', 'data_action' => 'edit', 'data_url' => '/settings/account/edit', 'label' => 'Edit account'],
        ]"
    >
        <div class="space-y-4">
            <div>
                <x-keys::label for="username">Username</x-keys::label>
                <x-keys::input id="username" value="{{ $user->username }}" disabled />
            </div>
            <div>
                <x-keys::label for="email">Email</x-keys::label>
                <x-keys::input id="email" type="email" value="{{ $user->email }}" disabled />
            </div>
        </div>
    </x-keys::accordion.item>

    <x-keys::accordion.item
        title="Privacy Settings"
        icon="heroicon-o-lock-closed"
    >
        <div class="space-y-3">
            <div class="flex items-center justify-between">
                <x-keys::text>Profile Visibility</x-keys::text>
                <x-keys::toggle wire:model="profilePublic" />
            </div>
            <div class="flex items-center justify-between">
                <x-keys::text>Show Email</x-keys::text>
                <x-keys::toggle wire:model="showEmail" />
            </div>
        </div>
    </x-keys::accordion.item>

    <x-keys::accordion.item
        title="Notification Preferences"
        icon="heroicon-o-bell"
    >
        <div class="space-y-3">
            <div class="flex items-center justify-between">
                <x-keys::text>Email Notifications</x-keys::text>
                <x-keys::toggle wire:model="emailNotifications" />
            </div>
            <div class="flex items-center justify-between">
                <x-keys::text>Push Notifications</x-keys::text>
                <x-keys::toggle wire:model="pushNotifications" />
            </div>
        </div>
    </x-keys::accordion.item>
</x-keys::accordion>
```

### Task List
```blade
<x-keys::accordion spacing="sm">
    @foreach($tasks as $task)
        <x-keys::accordion.item
            :title="$task->title"
            :color="$task->priority === 'high' ? 'danger' : ($task->priority === 'medium' ? 'warning' : 'neutral')"
            variant="outlined"
            :actions="[
                ['icon' => 'heroicon-o-check', 'data_action' => 'complete', 'label' => 'Complete task'],
                ['icon' => 'heroicon-o-pencil', 'data_action' => 'edit', 'label' => 'Edit task'],
            ]"
        >
            <div class="space-y-3">
                <x-keys::text color="muted">{{ $task->description }}</x-keys::text>

                @if($task->due_date)
                    <div class="flex items-center gap-2">
                        <x-keys::icon name="heroicon-o-calendar" size="sm" />
                        <x-keys::text size="sm">Due: {{ $task->due_date->format('M d, Y') }}</x-keys::text>
                    </div>
                @endif

                @if($task->assignee)
                    <div class="flex items-center gap-2">
                        <x-keys::avatar :src="$task->assignee->avatar" :name="$task->assignee->name" size="xs" />
                        <x-keys::text size="sm">{{ $task->assignee->name }}</x-keys::text>
                    </div>
                @endif
            </div>
        </x-keys::accordion.item>
    @endforeach
</x-keys::accordion>
```

### Order Details
```blade
<x-keys::accordion variant="spaced">
    <x-keys::accordion.item
        title="Order #{{ $order->number }}"
        :open="true"
        color="brand"
    >
        <div class="space-y-4">
            <div class="flex justify-between">
                <x-keys::text>Order Date</x-keys::text>
                <x-keys::text weight="medium">{{ $order->created_at->format('M d, Y') }}</x-keys::text>
            </div>
            <div class="flex justify-between">
                <x-keys::text>Status</x-keys::text>
                <x-keys::badge :color="$order->status_color">
                    {{ $order->status }}
                </x-keys::badge>
            </div>
            <div class="flex justify-between">
                <x-keys::text>Total</x-keys::text>
                <x-keys::text weight="semibold">${{ number_format($order->total, 2) }}</x-keys::text>
            </div>
        </div>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="Items ({{ $order->items->count() }})" color="brand">
        <div class="space-y-3">
            @foreach($order->items as $item)
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <x-keys::image :src="$item->product->image" alt="{{ $item->product->name }}" size="sm" />
                        <div>
                            <x-keys::text weight="medium">{{ $item->product->name }}</x-keys::text>
                            <x-keys::text size="sm" color="muted">Qty: {{ $item->quantity }}</x-keys::text>
                        </div>
                    </div>
                    <x-keys::text weight="medium">${{ number_format($item->total, 2) }}</x-keys::text>
                </div>
            @endforeach
        </div>
    </x-keys::accordion.item>

    <x-keys::accordion.item title="Shipping Information" color="brand">
        <div class="space-y-2">
            <x-keys::text weight="medium">{{ $order->shipping_name }}</x-keys::text>
            <x-keys::text color="muted">{{ $order->shipping_address }}</x-keys::text>
            <x-keys::text color="muted">{{ $order->shipping_city }}, {{ $order->shipping_state }} {{ $order->shipping_zip }}</x-keys::text>
        </div>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## With Livewire

### Dynamic Accordion
```blade
<x-keys::accordion>
    @foreach($sections as $section)
        <x-keys::accordion.item
            :title="$section->title"
            :open="$section->id === $openSection"
            wire:click="setOpenSection({{ $section->id }})"
        >
            <x-keys::text>{{ $section->content }}</x-keys::text>
        </x-keys::accordion.item>
    @endforeach
</x-keys::accordion>
```

## Accessibility

The Accordion component includes comprehensive accessibility features:

- Native `<details>` and `<summary>` elements for built-in semantics
- Keyboard navigation (Space/Enter to toggle)
- `tabindex` management for disabled items
- Focus-visible styles
- Screen reader friendly
- Proper ARIA attributes via native elements

```blade
<x-keys::accordion>
    <x-keys::accordion.item title="Accessible Accordion">
        <x-keys::text>
            Built with accessibility in mind using native HTML elements
        </x-keys::text>
    </x-keys::accordion.item>
</x-keys::accordion>
```

## Best Practices

1. **Use descriptive titles**: Make titles clear and concise

2. **Limit content**: Keep accordion content focused and scannable

3. **Consider defaults**: Open important items by default

4. **Group related content**: Use accordions for related information

5. **Avoid nesting**: Don't nest accordions within accordions

6. **Use appropriate variants**: Match variant to context (flush for simple lists, elevated for prominent sections)

7. **Test on mobile**: Ensure touch targets are adequate

8. **Provide actions carefully**: Don't overload with too many actions

9. **Use colors meaningfully**: Apply colors to indicate status or category

10. **Keep spacing consistent**: Use the same spacing throughout a section

## Technical Details

### Native Details Element

The component uses the native HTML `<details>` element, providing:
- Zero JavaScript for basic functionality
- Built-in accessibility
- Browser-native expand/collapse
- Smooth CSS animations
- Better performance

### CSS Animations

Uses modern CSS features:
- `::details-content` pseudo-element
- `transition-discrete` for display changes
- `block-size` transitions
- Hardware-accelerated transforms

## Component Structure

The Accordion component consists of:

1. **PHP Container Class** (`Accordion.php`)
   - Spacing configuration
   - Unique ID generation
   - Data attributes

2. **PHP Item Class** (`Accordion\Item.php`)
   - Props validation
   - Color, size, variant handling
   - Actions support
   - Data attributes generation

3. **Blade Templates**
   - Container with spacing
   - Items with `<details>` elements
   - Animated expand/collapse
   - Action buttons

## Data Attributes

The component generates helpful data attributes:

- `data-keys-accordion="true"` - Container identifier
- `data-spacing="md"` - Spacing variant
- `data-keys-accordion-item="true"` - Item identifier
- `data-variant="default"` - Style variant
- `data-size="md"` - Size variant
- `data-color="neutral"` - Color variant
- `data-rounded="lg"` - Border radius
- `data-disabled="true"` - Disabled state
- `data-animated="true"` - Animation enabled
- `data-has-actions="true"` - Actions present
- `data-has-icon="true"` - Icon present
- `data-icon="heroicon-o-chevron-down"` - Icon name
- `data-has-title="true"` - Title present
- `data-open="true"` - Open state
